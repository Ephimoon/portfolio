import { usePostHog } from '@posthog/react'

import {
  trackTerminalCommand,
  trackOutboundClick,
  trackContactAction
} from '../../lib/analytics'

import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, forwardRef } from 'react'

import {
  findProject,
  getAboutLines,
  getEducationLines,
  getExperienceLines,
  getHelpLines,
  getProjectDetailLines,
  getProjectsLines,
  getSkillsLines,
  getWelcomeLines,
  parseCommand,
  sanitizeMultiLineInput,
  sanitizeSingleLineInput,
  sendContactMessage,
  validateContactEmail,
  validateContactMessage,
  validateContactName
} from './terminalCommands'

import './terminal.css'

const line = (text, tone = 'normal', command = null) => ({ text, tone, command })
const lineParts = (parts, tone = 'normal') => ({ text: '', tone, command: null, parts })

const ABOUT_CMDS = ['skills', 'experience', 'education']
const nextHint = (current, visited = new Set()) => {
  const others = ABOUT_CMDS.filter((c) => c !== current && !visited.has(c))
  if (!others.length) return null
  const parts = [{ text: 'Try ' }]
  others.forEach((cmd, i) => {
    parts.push({ text: `"${cmd}"`, command: cmd })
    if (i < others.length - 1) parts.push({ text: ', ' })
  })
  parts.push({ text: ' next.' })
  return lineParts(parts, 'hint')
}

const CONTACT_CANCEL_INPUTS = new Set(['cancel', 'exit', 'quit'])
const TERMINAL_COMMANDS = new Set(['about', 'skills', 'experience', 'education', 'projects', 'project', 'contact', 'help', 'clear', 'next', 'prev', 'github', 'linkedin'])

const Terminal = forwardRef(({ profile, projects, externalCommand }, ref) => {
  const posthog = usePostHog()

  const basePrompt = `${profile.promptUser} ~`
  const [lines, setLines] = useState(() =>
    getWelcomeLines().map((item) => {
      if (typeof item === 'string') return line(item)
      if (item.parts) return lineParts(item.parts, item.tone ?? 'normal')
      return line(item.text ?? '', item.tone ?? 'normal')
    })
  )
  const [input, setInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [visitedCmds, setVisitedCmds] = useState(new Set())
  const [contactFlow, setContactFlow] = useState({ step: null, data: {} })
  const commandCountRef = useRef(0)
  const [contactTrap, setContactTrap] = useState('')
  const [terminalDimensions, setTerminalDimensions] = useState({ width: 0, height: 0 })

  const terminalBodyRef = useRef(null)
  const terminalRef = useRef(null)
  const inputRef = useRef(null)
  const lastExternalCommandIdRef = useRef(0)
  const currentProjectIndexRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus()
  }), [])

  const prompt = `${basePrompt} %`

  const dotColors = useMemo(
    () => [
      { id: 'red', className: 'terminal__dot terminal__dot--red' },
      { id: 'yellow', className: 'terminal__dot terminal__dot--yellow' },
      { id: 'green', className: 'terminal__dot terminal__dot--green' }
    ],
    []
  )

  const appendLines = useCallback((newLines) => {
    setLines((prev) => [...prev, ...newLines])
  }, [])

  const resetContactFlow = useCallback(() => {
    setContactFlow({ step: null, data: {} })
  }, [])

  const promptContactOptions = useCallback(() => {
    appendLines([
      line('contact copy\tcopy my email melanie@melesco.com to clipboard', 'normal', 'contact copy'),
      line('contact email\topen your email app', 'normal', 'contact email'),
      line('contact form\tsend me a message through the terminal', 'normal', 'contact form')
    ])
  }, [appendLines])

  const startContactForm = useCallback(() => {
    setContactTrap('')
    setContactFlow({ step: 'name', data: {} })
    appendLines([
      line('Starting contact form.'),
      line(''),
      lineParts([{ text: 'Try ' }, { text: '"cancel"', command: 'cancel' }, { text: ' anytime to exit.' }], 'hint'),
      lineParts([{ text: 'Try ' }, { text: '"back"', command: 'back' }, { text: ' to edit the previous answer.' }], 'hint'),
      line(''),
      line('Your name:')
    ])
  }, [appendLines])

  const promptContactReview = useCallback((data) => {
    appendLines([
      line(''),
      line('Review message:'),
      line(''),
      line(`Name: ${data.name || '-'}`),
      line(`Email: ${data.email || '-'}`),
      line(`Message: ${data.message || '-'}`),
      line(''),
      line('Send message? [y/n]'),
      lineParts([
        { text: 'or Try: ' },
        { text: 'send', command: 'y' },
        { text: ', ' },
        { text: 'cancel', command: 'cancel' },
        { text: ', ' },
        { text: 'edit name', command: 'edit name' },
        { text: ', ' },
        { text: 'edit email', command: 'edit email' },
        { text: ', ' },
        { text: 'edit message', command: 'edit message' }
      ], 'hint')
    ])
  }, [appendLines])

  const submitContactMessage = useCallback(async (payload) => {
    if (contactTrap.trim()) {
      appendLines([line('Security check failed. Contact form cancelled.', 'error')])
      resetContactFlow()
      return
    }

    setIsSubmitting(true)
    appendLines([line('Sending message...', 'muted')])

    try {
      await sendContactMessage({ ...payload, _trap: contactTrap })
      trackContactAction(posthog, 'form_submitted')
      appendLines([line('Message sent successfully. Thank you!', 'success')])
      resetContactFlow()
    } catch (error) {
      console.error('Contact send failed:', error)
      const msg = error?.message || 'Unable to send message right now. Please try again later.'
      const isRateLimit = msg.toLowerCase().includes('wait')
      appendLines([
        line(msg, 'error'),
        ...(!isRateLimit ? [line('Try "contact form" to send your message again.', 'hint')] : [])
      ])
      resetContactFlow()
    } finally {
      setIsSubmitting(false)
    }
  }, [appendLines, contactTrap, resetContactFlow])

  const runCommand = useCallback(async (rawValue, { echoPrompt = true } = {}) => {
    const commandValue = rawValue.trim()
    if (!commandValue) {
      return
    }

    const parsed = parseCommand(commandValue)

    if (echoPrompt && !contactFlow.step) {
      trackTerminalCommand(posthog, parsed, commandValue)
      commandCountRef.current += 1
      if (commandCountRef.current === 5) {
        posthog?.capture('visitor_engaged', { commands_run: 5 })
      }
    }

    if (echoPrompt) {
      const isFormStep = contactFlow.step && contactFlow.step !== 'confirm'
      const isControlWord = CONTACT_CANCEL_INPUTS.has(parsed.normalized) || parsed.normalized === 'back'
      const echoText = (isFormStep && !isControlWord) ? `${contactFlow.step} > ${commandValue}` : `${prompt} ${commandValue}`
      appendLines([line(''), line(echoText, 'prompt'), line('')])
    }

    if (contactFlow.step) {
      const normalizedValue = parsed.normalized

      if (CONTACT_CANCEL_INPUTS.has(normalizedValue)) {
        trackContactAction(posthog, 'form_cancelled')
        appendLines([line('Contact form cancelled.', 'success')])
        resetContactFlow()
        return
      }

      if (normalizedValue === 'back') {
        if (contactFlow.step === 'email') {
          setContactFlow((prev) => ({ ...prev, step: 'name' }))
          appendLines([line('Your name:')])
          return
        }

        if (contactFlow.step === 'message') {
          setContactFlow((prev) => ({ ...prev, step: 'email' }))
          appendLines([line('Your email: (so I can reply)')])
          return
        }

        if (contactFlow.step === 'confirm') {
          setContactFlow((prev) => ({ ...prev, step: 'message' }))
          appendLines([line('Message:')])
          return
        }

        appendLines([line('Your name:')])
        return
      }

      if (contactFlow.step !== 'confirm' && TERMINAL_COMMANDS.has(parsed.name)) {
        appendLines([line('You\'re in a contact form. Try "cancel" to exit first.', 'hint')])
        return
      }

      if (contactFlow.step === 'name') {
        const name = sanitizeSingleLineInput(commandValue)
        const nameError = validateContactName(name)

        if (nameError) {
          appendLines([line(nameError, 'error')])
          return
        }

        const nextData = { ...contactFlow.data, name }

        if (contactFlow.editing) {
          setContactFlow({ step: 'confirm', data: nextData })
          promptContactReview(nextData)
          return
        }

        setContactFlow({ step: 'email', data: nextData })
        appendLines([line('Your email: (so I can reply)')])
        return
      }

      if (contactFlow.step === 'email') {
        const email = sanitizeSingleLineInput(commandValue)
        const emailError = validateContactEmail(email)

        if (emailError) {
          appendLines([line(emailError, 'error')])
          return
        }

        const nextData = { ...contactFlow.data, email }

        if (contactFlow.editing) {
          setContactFlow({ step: 'confirm', data: nextData })
          promptContactReview(nextData)
          return
        }

        setContactFlow({ step: 'message', data: nextData })
        appendLines([line('Message:')])
        return
      }

      if (contactFlow.step === 'message') {
        const message = sanitizeMultiLineInput(commandValue)
        const messageError = validateContactMessage(message)

        if (messageError) {
          appendLines([line(messageError, 'error')])
          return
        }

        const nextData = { ...contactFlow.data, message }

        setContactFlow({ step: 'confirm', data: nextData })
        promptContactReview(nextData)
        return
      }

      if (contactFlow.step === 'confirm') {
        if (normalizedValue === 'y' || normalizedValue === 'yes' || normalizedValue === 'send') {
          await submitContactMessage(contactFlow.data)
          return
        }

        if (normalizedValue === 'n' || normalizedValue === 'no') {
          appendLines([line('Contact form cancelled.', 'success')])
          resetContactFlow()
          return
        }

        if (normalizedValue === 'edit name') {
          setContactFlow((prev) => ({ ...prev, step: 'name', editing: true }))
          appendLines([line('Your name:')])
          return
        }

        if (normalizedValue === 'edit email') {
          setContactFlow((prev) => ({ ...prev, step: 'email', editing: true }))
          appendLines([line('Your email: (so I can reply)')])
          return
        }

        if (normalizedValue === 'edit message') {
          setContactFlow((prev) => ({ ...prev, step: 'message', editing: true }))
          appendLines([line('Message:')])
          return
        }

        appendLines([line('Please answer with y or n.', 'error')])
        return
      }
    }

    if (!['project', 'next', 'prev'].includes(parsed.name)) {
      currentProjectIndexRef.current = null
    }

    if (parsed.name === 'clear') {
      setLines([])
      return
    }

    if (parsed.name === 'help') {
      appendLines(getHelpLines().map((text) => {
        if (!text || !text.includes('\t')) return line(text)
        const command = text.split('\t')[0].trim()
        return line(text, 'normal', command)
      }))
      return
    }

    if (parsed.name === 'about') {
      appendLines(
        getAboutLines(profile).map((item) => {
          if (typeof item === 'string') return line(item)
          if (item.command) return line(item.text, 'normal', item.command)
          return line(item.text, item.tone ?? 'normal')
        })
      )
      return
    }

    if (parsed.name === 'github') {
      trackOutboundClick(posthog, 'github', 'terminal')
      window.open(profile.links.github, '_blank')
      appendLines([line('Opening GitHub...', 'muted')])
      return
    }

    if (parsed.name === 'linkedin') {
      trackOutboundClick(posthog, 'linkedin', 'terminal')
      window.open(profile.links.linkedin, '_blank')
      appendLines([line('Opening LinkedIn...', 'muted')])
      return
    }

    if (parsed.name === 'skills') {
      const hint = nextHint('skills', visitedCmds)
      setVisitedCmds((prev) => new Set([...prev, 'skills']))
      appendLines([
        ...getSkillsLines(profile).map((text) => line(text)),
        ...(hint ? [line(''), hint] : [])
      ])
      return
    }

    if (parsed.name === 'experience') {
      const hint = nextHint('experience', visitedCmds)
      setVisitedCmds((prev) => new Set([...prev, 'experience']))
      appendLines([
        ...getExperienceLines(profile).map((item) =>
          typeof item === 'string' ? line(item) : line(item.text, item.tone ?? 'normal')
        ),
        ...(hint ? [line(''), hint] : [])
      ])
      return
    }

    if (parsed.name === 'education') {
      const hint = nextHint('education', visitedCmds)
      setVisitedCmds((prev) => new Set([...prev, 'education']))
      appendLines([
        ...getEducationLines(profile).map((item) =>
          typeof item === 'string' ? line(item) : line(item.text, item.tone ?? 'normal')
        ),
        ...(hint ? [line(''), hint] : [])
      ])
      return
    }

    if (parsed.name === 'projects') {
      const projectLines = getProjectsLines(projects)
      appendLines(projectLines.map((text, index) => {
        const projectIndex = Number.parseInt(text.split('/')[0], 10)
        if (!Number.isNaN(projectIndex)) {
          return line(text, 'normal', `project ${projectIndex}`)
        }

        if (index === projectLines.length - 1) {
          return line(text, 'hint')
        }

        return line(text)
      }))
      return
    }

    if (parsed.name === 'project') {
      const project = findProject(projects, parsed.args)

      if (!project) {
        appendLines([line('Project not found. Try "projects" to list options.', 'error')])
        return
      }

      const index = projects.indexOf(project)
      currentProjectIndexRef.current = index
      posthog?.capture('project_viewed', { project_name: project.name })

      appendLines(getProjectDetailLines(project, index, projects.length, projects).map((item) => {
        if (typeof item === 'string') return line(item)
        if (item.parts) return lineParts(item.parts, item.tone ?? 'normal')
        if (item.url) return lineParts([{ text: item.text + ' ' }, { text: item.url, url: item.url }])
        return line(item.text, item.tone ?? 'normal')
      }))
      return
    }

    if (parsed.name === 'next') {
      const idx = currentProjectIndexRef.current
      if (idx !== null) {
        const nextIdx = (idx + 1) % projects.length
        await runCommand(`project ${projects[nextIdx].aliases?.find((a) => !a.startsWith('project ')) ?? nextIdx + 1}`, { echoPrompt: false })
      } else {
        appendLines([line('No project selected.', 'error')])
      }
      return
    }

    if (parsed.name === 'prev') {
      const idx = currentProjectIndexRef.current
      if (idx !== null) {
        const prevIdx = (idx - 1 + projects.length) % projects.length
        await runCommand(`project ${projects[prevIdx].aliases?.find((a) => !a.startsWith('project ')) ?? prevIdx + 1}`, { echoPrompt: false })
      } else {
        appendLines([line('No project selected.', 'error')])
      }
      return
    }

    if (parsed.name === 'contact') {
      const subcommand = parsed.args[0]

      if (!subcommand) {
        promptContactOptions()
        return
      }

      if (subcommand === 'copy') {
        trackContactAction(posthog, 'copy_email')

        try {
          await navigator.clipboard.writeText(profile.links.email)
          appendLines([line(`Copied ${profile.links.email} to clipboard.`, 'success')])
        } catch {
          appendLines([line(`Email: ${profile.links.email}`, 'hint')])
        }

        return
      }

      if (subcommand === 'email') {
        trackContactAction(posthog, 'open_email')
        window.location.href = `mailto:${profile.links.email}`
        appendLines([line('Opening your email app...', 'muted')])
        return
      }

      if (subcommand === 'form') {
        trackContactAction(posthog, 'start_form')
        startContactForm()
        return
      }

      appendLines([line('Use: contact copy | contact email | contact form', 'error')])
      return
    }

    appendLines([
      line(`Command not found: ${parsed.name}`, 'error'),
      line('Try "help" to list available commands.', 'hint')
    ])
  }, [appendLines, contactFlow.data, contactFlow.editing, contactFlow.step, posthog, profile, prompt, projects, promptContactOptions, promptContactReview, resetContactFlow, startContactForm, submitContactMessage, visitedCmds])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const value = input.trim()
    setInput('')

    if (!value) {
      return
    }

    await runCommand(value)
  }

  useEffect(() => {
    const command = externalCommand?.command
    const commandId = externalCommand?.id ?? 0

    if (!command || commandId === 0) {
      return
    }

    if (commandId === lastExternalCommandIdRef.current) {
      return
    }

    lastExternalCommandIdRef.current = commandId

    void runCommand(command)
  }, [externalCommand, runCommand])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleCopy = (e) => {
      if (document.activeElement !== inputRef.current) return
      const el = inputRef.current
      if (el && el.selectionStart !== el.selectionEnd) return
      const sel = window.getSelection()?.toString()
      if (!sel) return
      e.preventDefault()
      e.clipboardData.setData('text/plain', sel)
    }
    document.addEventListener('copy', handleCopy)
    return () => document.removeEventListener('copy', handleCopy)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement === inputRef.current) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace') {
        window.getSelection()?.removeAllRanges()
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const terminalElement = terminalRef.current
    if (!terminalElement) return

    const updateDimensions = () => {
      const charWidth = 8
      const charHeight = 20
      const width = Math.floor(terminalElement.offsetWidth / charWidth)
      const height = Math.floor(terminalElement.offsetHeight / charHeight)
      setTerminalDimensions({ width, height })
    }

    updateDimensions()

    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(terminalElement)

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const terminalBody = terminalBodyRef.current
    if (!terminalBody) {
      return
    }

    terminalBody.scrollTop = terminalBody.scrollHeight
  }, [lines, input, isSubmitting])

  const handleLineCommandClick = useCallback((command) => {
    void runCommand(command)
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    inputRef.current?.focus()
  }, [runCommand])

  const renderLineContent = useCallback((entry) => {
    if (entry.parts) {
      return entry.parts.map((part, i) =>
        part.command ? (
          <button
            key={i}
            type="button"
            className="terminal__command-link terminal__command-link--inline"
            onClick={() => handleLineCommandClick(part.command)}
          >
            {part.text}
          </button>
        ) : part.url ? (
          <a
            key={i}
            href={part.url}
            target="_blank"
            rel="noreferrer"
            className="terminal__link"
          >
            {part.text}
          </a>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )
    }

    const hasTab = entry.text.includes('\t')

    if (!hasTab) {
      return entry.text
    }

    const [left = '', right = ''] = entry.text.split('\t')

    return (
      <span className="terminal__tab-row">
        <span className="terminal__tab-command">{left}</span>
        <span className="terminal__tab-description">{right}</span>
      </span>
    )
  }, [handleLineCommandClick])

  return (
    <>
    <section
      ref={terminalRef}
      className="terminal"
      aria-label="Interactive portfolio terminal"
    >
      <div
        className="terminal__bar"
        role="presentation"
        onClick={(e) => { if (!e.target.closest('button')) inputRef.current?.focus() }}
      >
        <span className="terminal__dots" aria-hidden>
          {dotColors.map((dot) => (
            <span key={dot.id} className={dot.className} />
          ))}
        </span>
        <span className="terminal__title">
          <span className="terminal__title-user">{profile.promptUser}</span>
          <span className="terminal__title-zsh"> — -zsh — </span>
          <span className="terminal__title-size">{terminalDimensions.width}×{terminalDimensions.height}</span>
        </span>
        <div className="terminal__bar-actions">
          <button type="button" className="terminal__control-btn" onMouseDown={() => inputRef.current?.focus()} onClick={() => handleLineCommandClick('help')}>help</button>
          <button type="button" className="terminal__control-btn" onMouseDown={() => inputRef.current?.focus()} onClick={() => handleLineCommandClick('clear')}>clear</button>
        </div>
      </div>

      <div
        className="terminal__body"
        ref={terminalBodyRef}
        onMouseUp={() => {
          if (window.getSelection()?.toString()) {
            inputRef.current?.blur()
          }
        }}
        onClick={() => {
          if (!window.getSelection()?.toString()) {
            inputRef.current?.focus()
          }
        }}
      >
        <div className="terminal__output">
          {lines.map((entry, index) => {
            const isEmpty = !entry.text && !entry.parts
            const className = isEmpty
              ? 'terminal__line terminal__line--spacer'
              : `terminal__line terminal__line--${entry.tone}`
            return (
              <p className={className} key={`${entry.text}-${index}`}>
                {entry.command ? (
                  <button
                    type="button"
                    className="terminal__command-link"
                    onClick={() => {
                      handleLineCommandClick(entry.command)
                    }}
                  >
                    {renderLineContent(entry)}
                  </button>
                ) : (
                  renderLineContent(entry)
                )}
              </p>
            )
          })}
        </div>

        <form onSubmit={handleSubmit} className={isSubmitting ? 'terminal__disabled' : undefined}>
          <div className="terminal__active-line">
            <span className="terminal__prompt">{prompt}</span>
            <span className="terminal__typed">{input}</span>
            <span className="terminal__cursor" aria-hidden />
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
                  e.preventDefault()
                  const body = terminalBodyRef.current
                  if (body) {
                    const range = document.createRange()
                    range.selectNodeContents(body)
                    const sel = window.getSelection()
                    if (sel) { sel.removeAllRanges(); sel.addRange(range) }
                    inputRef.current?.blur()
                  }
                }
                if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
                  const el = inputRef.current
                  const hasInputSelection = el && el.selectionStart !== el.selectionEnd
                  if (!hasInputSelection && window.getSelection()?.toString()) {
                    e.preventDefault()
                    document.execCommand('copy')
                  }
                }
              }}
              className="terminal__hidden-input"
              aria-label="Terminal command input"
              disabled={isSubmitting}
              autoComplete="off"
              spellCheck={false}
              data-ph-no-capture
            />
          </div>
        </form>
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={contactTrap}
          onChange={(event) => setContactTrap(event.target.value)}
          className="terminal__honeypot"
          aria-hidden="true"
          data-ph-no-capture
        />
      </div>
    </section>
    </>
  )
})

Terminal.displayName = 'Terminal'

export default Terminal
