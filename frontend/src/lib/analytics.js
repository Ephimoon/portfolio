const KNOWN_COMMANDS = new Set([
  'about',
  'skills',
  'experience',
  'education',
  'projects',
  'project',
  'contact',
  'help',
  'clear',
  'next',
  'prev',
  'github',
  'linkedin',
  'resume'
])

function sanitizeTerminalInput(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\s]+@[^\s]+\.[^\s]+/g, '[email]')
    .replace(/https?:\/\/\S+/g, '[url]')
    .replace(/\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g, '[phone]')
    .replace(/\b(?:\d[ -]*?){13,16}\b/g, '[number]')
    .replace(/\s+/g, ' ')
    .slice(0, 80)
}

export function trackTerminalCommand(posthog, parsed, rawInput) {
  if (!posthog || !parsed?.name) return

  const command = parsed.name.toLowerCase()
  const isKnown = KNOWN_COMMANDS.has(command)
  const sanitizedInput = sanitizeTerminalInput(rawInput)

  posthog.capture('terminal_command_used', {
    command: isKnown ? command : 'unknown',
    is_known: isKnown,
    has_argument: Boolean(parsed.args?.length),
    input_length: rawInput.trim().length,
    unknown_input_preview: isKnown ? undefined : sanitizedInput
  })
}

export function trackOutboundClick(posthog, destination, source) {
  if (!posthog) return

  posthog.capture('outbound_link_clicked', {
    destination,
    source
  })
}

export function trackContactAction(posthog, action) {
  if (!posthog) return

  posthog.capture('contact_action_used', {
    action
  })
}