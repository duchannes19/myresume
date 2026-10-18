import { Suspense, useEffect, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import ParticlesContainer from './particles'
import SectionLoading from './SectionLoading'
import Hero from './sections/Hero'
import Experience from './sections/Experience'
import Work from './sections/Work'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import { ProjectDetail } from '../routes'
import { projects } from '../data/projects'
import { useHashRoute } from '../hooks/useHashRoute'
import { getRestoreTop } from '../hooks/scrollRestore'

function useDocumentMeta(route) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const project = route.view === 'project' ? projects[route.slug] : null
    document.title = project ? `${project.title} · Andrea Massignan` : t('meta.title')
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))
  }, [route.view, route.slug, t, i18n.resolvedLanguage])
}

// After a refresh, put the reader back where they were before the first paint.
function useScrollRestore(route) {
  useLayoutEffect(() => {
    const top = getRestoreTop()
    if (route.view === 'home' && top != null) window.scrollTo({ top, behavior: 'instant' })
  }, [route.view])
}

// Returning from a project view to an in-page anchor: the target only exists
// after the one-page view renders, so scroll once it has.
function useAnchorScroll(route) {
  useEffect(() => {
    if (route.view !== 'home' || !route.anchor || getRestoreTop() != null) return undefined
    const frame = requestAnimationFrame(() => {
      document.getElementById(route.anchor)?.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [route.view, route.anchor])
}

function Homepage() {
  const { t } = useTranslation()
  const route = useHashRoute()

  useDocumentMeta(route)
  useScrollRestore(route)
  useAnchorScroll(route)

  return (
    <>
      <a className="skip-link" href="#content">{t('skip')}</a>
      <ParticlesContainer />
      <Header view={route.view} />

      <main id="content" tabIndex={-1}>
        {route.view === 'project' ? (
          <Suspense fallback={<SectionLoading />}>
            <ProjectDetail slug={route.slug} />
          </Suspense>
        ) : (
          <>
            <Hero />
            <Experience />
            <Work />
            <Skills />
            <Projects />
            <Contact />
          </>
        )}
      </main>

      <footer className="site-footer">
        <p>{t('footer', { year: new Date().getFullYear() })}</p>
      </footer>
    </>
  )
}

export default Homepage
