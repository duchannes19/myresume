import { Trans, useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { workAreas } from '../../data/work'
import ClusterDiagram from '../diagrams/ClusterDiagram'
import PipelineDiagram from '../diagrams/PipelineDiagram'

const diagrams = { k8s: ClusterDiagram, cloud: PipelineDiagram }

// Two sections under one nav entry: the wrapper carries the #work anchor.
function Work() {
  const { t } = useTranslation()

  return (
    <div id="work" className="work">
      {workAreas.map(({ id, anchor, hint, tags }, index) => {
        const Diagram = diagrams[id]
        return (
          <section
            key={id}
            id={anchor}
            className={clsx('section', 'work__area', { 'work__area--flip': index % 2 })}
            aria-labelledby={`${anchor}-title`}
          >
            <div className="container work__grid">
              <div className="work__copy">
                <div className="section__head">
                  <h2 id={`${anchor}-title`} className="section__title">{t(`work.${id}.title`)}</h2>
                  {hint && <p className="section__hint">{t(`work.${id}.hint`)}</p>}
                </div>
                <p className="work__body">
                  <Trans i18nKey={`work.${id}.body`} components={{ b: <b /> }} />
                </p>
                <ul className="tags work__tags">
                  {tags.map((tag) => (
                    <li key={tag}>
                      <span className="tag">{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Diagram />
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default Work
