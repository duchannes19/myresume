import { Trans, useTranslation } from 'react-i18next'
import { projectHref } from '../../hooks/useHashRoute'
import ReplyLogo from '../ReplyLogo'

const entries = [
  { id: 'consultant', group: 'work', current: true, logo: true },
  { id: 'msc', group: 'education' },
  { id: 'bsc', group: 'education', project: 'dohr' },
]

function Experience() {
  const { t } = useTranslation()

  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <h2 id="experience-title" className="section__title">{t('experience.title')}</h2>

        <ol className="timeline">
          {entries.map(({ id, group, current, project, logo }) => (
            <li key={id} className="timeline__item">
              <p className="timeline__meta">
                {current ? (
                  <span className="badge badge--current">{t('experience.current')}</span>
                ) : (
                  <span>{t(`experience.${id}.meta`)}</span>
                )}
                <span className="timeline__group">{t(`experience.${group}`)}</span>
              </p>
              <div className="timeline__body">
                <h3 className="timeline__role">{t(`experience.${id}.role`)}</h3>
                <p className="timeline__org">
                  {t(`experience.${id}.org`)}
                  {logo && <ReplyLogo />}
                </p>
                {id !== 'consultant' && (
                  <p className="timeline__note">
                    <Trans i18nKey={`experience.${id}.thesis`} components={{ i: <i /> }} />
                    {project && (
                      <>
                        {' '}
                        <a href={projectHref(project)}>{t(`experience.${id}.thesisLink`)}</a>
                      </>
                    )}
                  </p>
                )}
              </div>
            </li>
          ))}
          <li className="timeline__item timeline__item--plain">
            <p className="timeline__meta">
              <span className="timeline__group">{t('experience.languagesTitle')}</span>
            </p>
            <div className="timeline__body">
              <p className="timeline__org">{t('experience.languages')}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  )
}

export default Experience
