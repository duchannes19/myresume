import { useEffect, useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Icon from './Icon'
import Gallery from './Gallery'
import { projectOrder, projects } from '../data/projects'
import { projectGalleries } from '../data/projectMedia'
import { projectHref } from '../hooks/useHashRoute'
import { getRestoreTop } from '../hooks/scrollRestore'

const richText = { p: <p />, b: <b />, i: <i /> }

const toGalleryItems = (key) =>
  (projectGalleries[key]?.gallery ?? []).map(({ large, thumb, alt }) => ({
    src: large.src,
    width: large.width,
    height: large.height,
    thumb: thumb.src,
    alt,
  }))

function ProjectNotFound() {
  const { t } = useTranslation()
  return (
    <div className="container project-page">
      <a className="back-link" href="#projects">
        <Icon name="arrowLeft" />
        {t('projects.back')}
      </a>
      <h1 className="project-page__title">{t('projects.notFound')}</h1>
    </div>
  )
}

function ProjectDetail({ slug }) {
  const { t } = useTranslation()
  const titleRef = useRef(null)
  const project = projects[slug]

  useEffect(() => {
    window.scrollTo({ top: getRestoreTop() ?? 0, behavior: 'instant' })
    titleRef.current?.focus({ preventScroll: true })
  }, [slug])

  if (!project) return <ProjectNotFound />

  const key = project.i18nKey
  const position = projectOrder.indexOf(slug)
  const previous = projectOrder[(position - 1 + projectOrder.length) % projectOrder.length]
  const next = projectOrder[(position + 1) % projectOrder.length]
  const gallery = toGalleryItems(project.media.gallery)

  return (
    <article className="container project-page" aria-labelledby="project-title">
      <a className="back-link" href="#projects">
        <Icon name="arrowLeft" />
        {t('projects.back')}
      </a>

      <header className="project-page__head">
        <h1 id="project-title" ref={titleRef} tabIndex={-1} className="project-page__title">
          {project.title}
        </h1>
        <p className="project-page__summary">{t(`project.${key}.summary`)}</p>
      </header>

      <dl className="project-facts">
        <div>
          <dt>{t(`projects.${project.tagsLabel ?? 'stack'}`)}</dt>
          <dd>
            <ul className="tags">
              {project.tags.map((tag) => (
                <li key={tag}><span className="tag">{tag}</span></li>
              ))}
            </ul>
          </dd>
        </div>
        {(project.links.length > 0 || project.privateCode) && (
          <div>
            <dt>{t('projects.code')}</dt>
            <dd>
              {project.privateCode ? (
                <p className="project-facts__note">{t('projects.privateCode')}</p>
              ) : (
                <ul className="link-list">
                  {project.links.map(({ label, href }) => (
                    <li key={href}>
                      <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">
                        <Icon name="github" />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </dd>
          </div>
        )}
        {project.downloads.length > 0 && (
          <div>
            <dt>{t('projects.downloads')}</dt>
            <dd>
              <ul className="link-list">
                {project.downloads.map(({ label, href }) => (
                  <li key={href}>
                    <a className="text-link" href={href} download>
                      <Icon name="download" />
                      {t(`downloads.${label}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>

      {gallery.length > 0 && (
        <Gallery key={slug} items={gallery} label={t('projects.gallery.label', { project: project.title })} />
      )}

      <div className="prose">
        <Trans i18nKey={`project.${key}.description`} components={richText} />
        {project.sections?.map((section) => (
          <section key={section} className="prose__section">
            <h2>{t(`project.${key}.${section}.title`)}</h2>
            <Trans i18nKey={`project.${key}.${section}.body`} components={richText} />
          </section>
        ))}
        {project.collaborators.length > 0 && (
          <p className="prose__credit">
            {t('projects.builtWith', { names: project.collaborators.join(' & ') })}
          </p>
        )}
      </div>

      <nav className="pager" aria-label={t('projects.title')}>
        <a className="pager__link" href={projectHref(previous)} rel="prev">
          <span className="pager__label">
            <Icon name="arrowLeft" size={16} />
            {t('projects.previous')}
          </span>
          <span className="pager__title">{projects[previous].title}</span>
        </a>
        <a className="pager__link pager__link--next" href={projectHref(next)} rel="next">
          <span className="pager__label">
            {t('projects.next')}
            <Icon name="arrowRight" size={16} />
          </span>
          <span className="pager__title">{projects[next].title}</span>
        </a>
      </nav>
    </article>
  )
}

export default ProjectDetail
