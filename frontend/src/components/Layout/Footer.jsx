const Footer = ({ links, copyright }) => {
  return (
    <footer className="site-footer">
      <div className="site-footer__links">
        <a className="site-footer__link" href={`mailto:${links.email}`}>
          {links.email}
        </a>
        <span className="site-footer__sep">•</span>
        <a className="site-footer__link" href={links.linkedin} target="_blank" rel="noreferrer">
          linkedin
        </a>
        <span className="site-footer__sep">•</span>
        <a className="site-footer__link" href={links.github} target="_blank" rel="noreferrer">
          github
        </a>
      </div>
      <span>{copyright}</span>
    </footer>
  )
}

export default Footer
