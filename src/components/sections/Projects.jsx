import { useTranslation } from 'react-i18next'
import ResponsiveImage from '../ResponsiveImage'
import Icon from '../Icon'
import { projectGroups, projects } from '../../data/projects'
import { projectCardMedia } from '../../data/projectCardMedia'
import { projectHref } from '../../hooks/useHashRoute'
import { preloadProjectDetail } from '../../routes'

function ProjectCard({ slug, featured }) {
  const { t } = useTranslation()
  const project = projects[slug]
  const media = projectCardMedia[project.media.card]

  return (
    <li className={featured ? 'project-grid__featured' : undefined}>
      <a
        className="project-card"
        href={projectHref(slug)}
        onPointerEnter={preloadProjectDetail}
        onFocus={preloadProjectDetail}
      >
        <ResponsiveImage
          data={media.picture}
          placeholder={media.placeholder}
          alt={media.alt}
          className="project-card__media"
          sizes={featured ? '(min-width: 832px) 560px, 96px' : '(min-width: 832px) 260px, 96px'}
        />
        <span className="project-card__body">
          <span className="project-card__title">
            {project.title}
            <Icon name="arrowUpRight" size={16} className="project-card__arrow" />
          </span>
          <span className="project-card__summary">{t(`project.${project.i18nKey}.summary`)}</span>
          <span className="project-card__tags">{project.tags.join(' · ')}</span>
        </span>
      </a>
    </li>
  )
}

function Projects() {
  const { t } = useTranslation()

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <h2 id="projects-title" className="section__title">{t('projects.title')}</h2>

        {projectGroups.map((group) => (
          <div key={group.id} className="project-group">
            <h3 className="project-group__title">
              {t(`projects.groups.${group.id}`)}
              <span className="project-group__count">{group.projects.length}</span>
            </h3>
            <ul className="project-grid">
              {/* In the two-column grid an odd group leads with a full-width card, so no row is left half-empty. */}
              {group.projects.map((slug, index) => (
                <ProjectCard key={slug} slug={slug} featured={index === 0 && group.projects.length % 2 === 1} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
