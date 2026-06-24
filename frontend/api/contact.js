const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_PER_WINDOW = 3
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// In-memory store — persists within a warm Vercel instance, resets on cold start.
// Fine for a portfolio; swap for Upstash Redis if you want persistence across deploys.
const ipLog = new Map()

function getIp(req) {
  const fwd = req.headers['x-forwarded-for']
  return (fwd ? fwd.split(',')[0] : (req.socket?.remoteAddress ?? 'unknown')).trim()
}

function isRateLimited(ip) {
  const now = Date.now()
  const cutoff = now - WINDOW_MS

  // Opportunistically prune the whole map when it grows large
  if (ipLog.size > 500) {
    for (const [key, times] of ipLog) {
      if (times.every((t) => t <= cutoff)) ipLog.delete(key)
    }
  }

  const recent = (ipLog.get(ip) ?? []).filter((t) => t > cutoff)
  if (recent.length >= MAX_PER_WINDOW) {
    ipLog.set(ip, recent)
    return true
  }
  recent.push(now)
  ipLog.set(ip, recent)
  return false
}

export default async function handler(req, res) {
  // CORS — only allow your own domain in production
  const allowed = process.env.ALLOWED_ORIGIN ?? ''
  const origin = req.headers.origin ?? ''
  res.setHeader('Access-Control-Allow-Origin', allowed || origin || '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' })

  // Rate limit by IP
  const ip = getIp(req)
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Please wait a few minutes before sending another message.' })
  }

  const { name, email, message, _trap } = req.body ?? {}

  // Honeypot — silently succeed so bots think it worked
  if (_trap && String(_trap).trim()) return res.status(200).json({ ok: true })

  // Server-side validation (never trust the client)
  const nameStr = String(name ?? '').trim()
  const emailStr = String(email ?? '').trim()
  const messageStr = String(message ?? '').trim()

  if (!nameStr || nameStr.length > 80) return res.status(400).json({ error: 'Invalid name.' })
  if (!emailStr || emailStr.length > 254 || !EMAIL_RE.test(emailStr)) return res.status(400).json({ error: 'Invalid email.' })
  if (!messageStr || messageStr.length > 2000) return res.status(400).json({ error: 'Invalid message.' })

  const serviceId = process.env.EMAILJS_SERVICE_ID
  const templateId = process.env.EMAILJS_TEMPLATE_ID
  const publicKey = process.env.EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    console.error('[contact] Missing EmailJS env vars')
    return res.status(500).json({ error: 'Server misconfiguration.' })
  }

  try {
    const ejsRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': process.env.ALLOWED_ORIGIN ?? 'https://melesco.com'
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: nameStr,
          name: nameStr,
          from_email: emailStr,
          email: emailStr,
          reply_to: emailStr,
          message: messageStr,
          subject: 'Portfolio terminal contact request',
          to_name: 'Melanie Escobar'
        }
      })
    })

    if (!ejsRes.ok) {
      console.error('[contact] EmailJS error:', ejsRes.status, await ejsRes.text())
      throw new Error('Email service error')
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[contact] Send failed:', err)
    return res.status(500).json({ error: 'Unable to send message right now. Please try again later.' })
  }
}
