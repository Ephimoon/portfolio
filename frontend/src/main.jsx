import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import { PostHogProvider } from '@posthog/react'

import './styles/theme.css'
import Portfolio from './Portfolio.jsx'

const posthogEnabled =
  import.meta.env.PROD && import.meta.env.VITE_POSTHOG_PROJECT_TOKEN

if (posthogEnabled) {
  posthog.init(import.meta.env.VITE_POSTHOG_PROJECT_TOKEN, {
    api_host: import.meta.env.VITE_POSTHOG_HOST,

    // Cookieless mode
    cookieless_mode: 'always',

    // Heatmaps
    enable_heatmaps: true,
    capture_pageview: true,
    capture_pageleave: true,

    // Autocapture only safe click behavior
    autocapture: {
      dom_event_allowlist: ['click'],
      element_allowlist: ['a', 'button'],
      css_selector_ignorelist: [
        '.ph-no-autocapture',
        '[data-ph-no-autocapture]',
        '.ph-no-capture',
        '[data-ph-no-capture]',
        '[data-sensitive]',
        '.terminal__hidden-input',
        '.terminal__honeypot'
      ]
    }
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {posthogEnabled ? (
      <PostHogProvider client={posthog}>
        <Portfolio />
      </PostHogProvider>
    ) : (
      <Portfolio />
    )}
  </StrictMode>
)