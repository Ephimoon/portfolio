import { usePostHog } from '@posthog/react'
import { trackOutboundClick } from '../../lib/analytics'

const Footer = ({ links, copyright }) => {
  const posthog = usePostHog()

  return (
    <footer className="site-footer">
      <div className="site-footer__links">
        <a
          className="site-footer__link"
          href={`mailto:${links.email}`}
          onClick={() => trackOutboundClick(posthog, 'email', 'footer')}
        >
          {links.email}
        </a>
        <span className="site-footer__sep">•</span>
        <a
          className="site-footer__link"
          href={links.linkedin}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackOutboundClick(posthog, 'linkedin', 'footer')}
        >
          linkedin
        </a>
        <span className="site-footer__sep">•</span>
        <a
          className="site-footer__link"
          href={links.github}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackOutboundClick(posthog, 'github', 'footer')}
        >
          github
        </a>
      </div>
      <span>{copyright}</span>
    </footer>
  )
}

export default Footer
