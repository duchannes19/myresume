import { useTranslation } from 'react-i18next'
import { skillGroups, skillProof } from '../../data/skills'
import { projects } from '../../data/projects'
import { projectHref } from '../../hooks/useHashRoute'

function Skills() {
  const { t } = useTranslation()

  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <div className="section__head">
          <h2 id="skills-title" className="section__title">{t('skills.title')}</h2>
          <p className="section__hint">{t('skills.hint')}</p>
        </div>

        <dl className="skills">
          {skillGroups.map(({ id, skills }) => (
            <div key={id} className="skills__row">
              <dt className="skills__group">{t(`skills.groups.${id}`)}</dt>
              <dd className="skills__list">
                <ul className="tags">
                  {skills.map((skill) => {
                    const slug = skillProof[skill]
                    return (
                      <li key={skill}>
                        {slug ? (
                          <a
                            className="tag tag--proof"
                            href={projectHref(slug)}
                            title={t('skills.proof', { skill, project: projects[slug].title })}
                          >
                            {skill}
                          </a>
                        ) : (
                          <span className="tag">{skill}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Skills
