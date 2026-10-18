import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import Icon from './Icon'
import ResponsiveImage from './ResponsiveImage'
import logoImage from './images/logo.png?w=48;96&as=picture&imagetools'

const SECTIONS = ['experience', 'work', 'skills', 'projects', 'contact']
const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'it', label: 'IT', name: 'Italiano' },
]

// Tracks which section is under the header while the one-page view is shown.
function useActiveSection(enabled) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!enabled) return undefined
    const targets = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean)
    const visible = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting)
        setActive(SECTIONS.find((id) => visible.get(id)) ?? null)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [enabled])

  return enabled ? active : 'projects'
}

function Header({ view }) {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(view === 'home')

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#top" onClick={closeMenu} aria-label={t('nav.home')}>
          <ResponsiveImage
            data={logoImage}
            alt=""
            className="brand__logo"
            loading="eager"
            fetchpriority="high"
            width={32}
            height={32}
            sizes="32px"
          />
          <span className="brand__name" aria-hidden="true">Andrea Massignan</span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
          <span className="visually-hidden">{t('nav.menu')}</span>
        </button>

        <nav
          id="site-nav"
          className={clsx('site-nav', { 'is-open': menuOpen })}
          aria-label={t('nav.label')}
        >
          <ul className="site-nav__list">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="site-nav__link"
                  aria-current={active === id ? 'true' : undefined}
                  onClick={closeMenu}
                >
                  {t(`nav.${id}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lang-switch" role="group" aria-label={t('nav.language')}>
          {LANGUAGES.map(({ code, label, name }) => (
            <button
              key={code}
              type="button"
              lang={code}
              className="lang-switch__option"
              aria-pressed={i18n.resolvedLanguage === code}
              aria-label={name}
              onClick={() => i18n.changeLanguage(code)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
