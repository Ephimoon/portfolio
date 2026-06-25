import emailjs from '@emailjs/browser'

export const COMMANDS = ['about', 'skills', 'experience', 'education', 'projects', 'contact', 'help', 'clear']
export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  message: 2000
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function getWelcomeLines() {
  return [
    'Hi, welcome to my portfolio!',
    '',
    "I'm Melanie Escobar, a new CS grad building full-stack projects.",
    '',
    { parts: [{ text: 'Try ' }, { text: '"help"', command: 'help' }, { text: ' to get started.' }], tone: 'normal' },
    '',
    { text: 'Tip: purple commands can be typed or clicked.', tone: 'hint' }
  ]
}

export function getHelpLines() {
  return [
    'Try one of the commands below:',
    '',
    'about\tquick intro and links',
    'projects\tview my portfolio projects',
    'contact\tcopy email or send message',
    '',
    'help\tshow these commands',
    'clear\tclear the terminal'
  ]
}

export function getAboutLines(profile) {
  return [
    profile.bio,
    '',
    ...(profile.location ? [`Currently based in ${profile.location}.`, { text: 'Open to relocation.', tone: 'muted' }, ''] : []),
    { text: 'Try:', tone: 'hint' },
    '',
    { text: "skills\tview the tech stacks I've worked with", command: 'skills' },
    { text: 'experience\tview internship and leadership experience', command: 'experience' },
    { text: 'education\tview school and honors', command: 'education' },
    { text: 'projects\tview portfolio projects', command: 'projects' },
    '',
    { text: 'github\topen GitHub', command: 'github' },
    { text: 'linkedin\topen LinkedIn', command: 'linkedin' },
    { text: 'contact\task for my resume or send me a message', command: 'contact' }
  ]
}

export function getSkillsLines(profile) {
  return profile.skills.map((s) => `${s.skillName}\t${s.skills.join(', ')}`)
}

export function getExperienceLines(profile) {
  return profile.experience.flatMap((item, i, arr) => [
    `${item.role} @ ${item.org}  (${item.dateRange})`,
    { text: item.description, tone: 'muted' },
    ...(i < arr.length - 1 ? [''] : [])
  ])
}

export function getEducationLines(profile) {
  return profile.education.flatMap((item, i, arr) => [
    item.school,
    item.degree + (item.minor ? `, Minor in ${item.minor}` : ''),
    item.dateRange,
    ...(item.honors ? [{ text: item.honors, tone: 'muted' }] : []),
    ...(i < arr.length - 1 ? [''] : [])
  ])
}

export function getProjectsLines(projects) {
  if (!projects.length) {
    return ['No projects available yet.']
  }

  const projectRows = projects.map((project, index) => {
    const aliases = project.aliases ?? []
    const primaryAlias = aliases.find((alias) => !alias.startsWith('project ')) ?? `${index + 1}`
    const label = project.dateRange ? `${project.name} (${project.dateRange})` : project.name
    return `${index + 1} / ${primaryAlias}\t${label}`
  })

  return [
    ...projectRows,
    '',
    'Try "project 1" or "project spara" to view details.'
  ]
}

export function parseCommand(rawInput) {
  const normalized = rawInput.trim().toLowerCase()
  const [name = '', ...args] = normalized.split(/\s+/)
  return {
    name,
    args,
    normalized
  }
}

export function findProject(projects, args) {
  if (!args.length) {
    return null
  }

  const query = args.join(' ').trim().toLowerCase()
  const numeric = Number.parseInt(query, 10)

  if (!Number.isNaN(numeric) && numeric >= 1 && numeric <= projects.length) {
    return projects[numeric - 1]
  }

  return projects.find((project) => {
    const aliases = project.aliases ?? []
    return (
      project.name.toLowerCase().includes(query) ||
      aliases.some((alias) => alias.toLowerCase().includes(query))
    )
  }) ?? null
}

const isUrl = (s) => typeof s === 'string' && (s.startsWith('http://') || s.startsWith('https://'))

const getPrimaryAlias = (project, index) => {
  const aliases = project.aliases ?? []
  return aliases.find((a) => !a.startsWith('project ')) ?? `${index + 1}`
}

export function getProjectDetailLines(project, index, total, projects) {
  const lines = [
    project.name,
    ...(project.dateRange ? [{ text: project.dateRange, tone: 'muted' }] : []),
    { text: `Project ${index + 1} of ${total}`, tone: 'muted' },
    isUrl(project.links.github)
      ? { text: 'GitHub:', url: project.links.github }
      : `GitHub: ${project.links.github}`
  ]

  if (project.links.live) {
    lines.push(
      isUrl(project.links.live)
        ? { text: 'Live site:', url: project.links.live }
        : `Live site: ${project.links.live}`
    )
  }

  lines.push('', project.description)

  if (project.userFlow) {
    lines.push('', 'User flow:', { text: project.userFlow, tone: 'muted' })
  }

  if (project.problemSolved) {
    lines.push('', 'Why it matters:', { text: project.problemSolved, tone: 'muted' })
  }

  if (project.myContribution) {
    lines.push('', 'My part:', { text: project.myContribution, tone: 'muted' })
  }

  if (project.technicalStory) {
    lines.push('', 'Technical story:', { text: project.technicalStory, tone: 'muted' })
  }

  lines.push(
    '',
    'Stack:',
    { text: project.stack.join(', '), tone: 'muted' }
  )

  if (total > 1) {
    lines.push(
      '',
      {
        parts: [
          { text: 'Try ' },
          { text: '"prev"', command: 'prev' },
          { text: ', ' },
          { text: '"next"', command: 'next' },
          { text: ', or ' },
          { text: '"projects"', command: 'projects' },
          { text: ' to navigate.' }
        ],
        tone: 'hint'
      }
    )
  }

  return lines
}

export function isValidEmail(value) {
  return EMAIL_REGEX.test(value)
}

function stripControlChars(value, { keepNewLines = false } = {}) {
  const chars = [...(value ?? '')]

  return chars.filter((char) => {
    const code = char.charCodeAt(0)

    if (code === 127 || (code >= 0 && code <= 31)) {
      return keepNewLines && (char === '\n' || char === '\r')
    }

    return true
  }).join('')
}

export function sanitizeSingleLineInput(value) {
  return stripControlChars(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function sanitizeMultiLineInput(value) {
  return stripControlChars(value ?? '', { keepNewLines: true })
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function validateContactName(name) {
  if (!name) {
    return 'Please enter your name or try "cancel".'
  }

  if (name.length > CONTACT_LIMITS.name) {
    return `Name must be ${CONTACT_LIMITS.name} characters or fewer.`
  }

  return null
}

export function validateContactEmail(email) {
  if (!email) {
    return 'Please enter your email or try "cancel".'
  }

  if (email.length > CONTACT_LIMITS.email) {
    return `Email must be ${CONTACT_LIMITS.email} characters or fewer.`
  }

  if (!isValidEmail(email)) {
    return 'Please enter a valid email address.'
  }

  return null
}

export function validateContactMessage(message) {
  if (!message) {
    return 'Please enter a message or try "cancel".'
  }

  if (message.length > CONTACT_LIMITS.message) {
    return `Message must be ${CONTACT_LIMITS.message} characters or fewer.`
  }

  return null
}

export async function sendContactMessage(payload) {
  // Client-side rate limiting — secondary defense, server enforces the real limit.
  const LS_KEY = 'mel_contact_ts'
  const WINDOW = 10 * 60 * 1000
  const MAX = 3
  const now = Date.now()
  try {
    const stored = JSON.parse(localStorage.getItem(LS_KEY) ?? '[]')
    const recent = stored.filter((t) => now - t < WINDOW)
    if (recent.length >= MAX) {
      throw new Error('Please wait a few minutes before sending another message.')
    }
    recent.push(now)
    localStorage.setItem(LS_KEY, JSON.stringify(recent))
  } catch (e) {
    if (e.message.startsWith('Please wait')) throw e
    // localStorage unavailable — let the server enforce limits
  }

  if (import.meta.env.DEV) {
    // Local dev: simulate a successful send so the full UI flow is testable
    console.log('[dev] contact form submission:', payload)
    await new Promise((r) => setTimeout(r, 800))
    return
  }

  // Production: credentials stay server-side, never in the bundle
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      message: payload.message,
      _trap: payload._trap ?? ''
    })
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error ?? 'Unable to send message right now. Please try again later.')
  }
}
