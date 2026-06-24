import { useCallback, useEffect, useRef, useState } from 'react'
import { usePostHog } from '@posthog/react'

const navItems = [
  { label: '[ ABOUT ME ]', command: 'about' },
  { label: '[ MY PROJECTS ]', command: 'projects' },
  { label: '[ CONTACT ME ]', command: 'contact' }
]

const Header = ({ name, onRunCommand }) => {
  const posthog = usePostHog()
  const containerRef = useRef(null)
  const measureCanvasRef = useRef(null)
  const [titleSize, setTitleSize] = useState(null)

  const fitTitleWidth = useCallback(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const targetWidth = container.clientWidth * 0.98
    if (!targetWidth) {
      return
    }

    if (!measureCanvasRef.current) {
      measureCanvasRef.current = document.createElement('canvas')
    }

    const context = measureCanvasRef.current.getContext('2d')
    if (!context) {
      return
    }

    const baseSize = 100
    const computed = window.getComputedStyle(container)
    context.font = `${computed.fontWeight} ${baseSize}px ${computed.fontFamily}`

    const metrics = context.measureText(name)
    const glyphWidth = metrics.width
    const computedFontSize = Number.parseFloat(computed.fontSize)
    const computedLetterSpacing = Number.parseFloat(computed.letterSpacing)
    const letterSpacingPx =
      Number.isFinite(computedLetterSpacing) && Number.isFinite(computedFontSize) && computedFontSize > 0
        ? computedLetterSpacing * (baseSize / computedFontSize)
        : 0
    const trackingWidth = Math.max(0, name.length - 1) * letterSpacingPx
    const measuredWidth = glyphWidth + trackingWidth

    if (measuredWidth <= 0) {
      return
    }

    const fitted = (baseSize * container.clientWidth) / measuredWidth
    const clamped = Math.max(32, Math.min(fitted, 200))
    setTitleSize(clamped)
  }, [name])

  useEffect(() => {
    fitTitleWidth()

    let frame = 0
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(fitTitleWidth)
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    const fontReady = document.fonts?.ready
    if (fontReady) {
      void fontReady.then(fitTitleWidth)
    }

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
    }
  }, [fitTitleWidth, name])

  return (
    <header className="site-header">
      <h1
        ref={containerRef}
        className="site-header__title"
        style={titleSize ? { fontSize: `${titleSize}px` } : undefined}
      >
        {name}
      </h1>
      <nav className="site-header__nav" aria-label="Terminal quick commands">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.command}
            className="site-header__button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              posthog?.capture('nav_button_clicked', { command: item.command })
              onRunCommand(item.command)
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Header
