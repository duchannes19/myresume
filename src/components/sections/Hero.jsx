import { Trans, useTranslation } from 'react-i18next'
import DecodeText from '../DecodeText'
import Icon from '../Icon'
import ReplyLogo from '../ReplyLogo'
import { profile, socialLinks } from '../../data/profile'
import monitorGif from '../images/about.gif'

const heroLinks = socialLinks.filter(({ id }) => id !== 'instagram')

function Hero() {
  const { t } = useTranslation()

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="hero__inner container">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__name">
            <DecodeText text={profile.name} />
          </h1>
          <p className="hero__role">
            <Trans i18nKey="hero.role" components={{ b: <b /> }} />
            <ReplyLogo />
          </p>
          <p className="hero__intro">{t('hero.intro')}</p>

          <div className="hero__actions">
            <a className="button button--primary" href={profile.cvUrl} download={profile.cvFileName}>
              <Icon name="download" />
              {t('hero.cv')}
            </a>
            <a className="button button--ghost" href={`mailto:${profile.email}`}>
              <Icon name="mail" />
              {t('hero.email')}
            </a>
            <ul className="hero__social">
              {heroLinks.map(({ id, label, href }) => (
                <li key={id}>
                  <a className="icon-link" href={href} target="_blank" rel="noopener noreferrer">
                    <Icon name={id} size={20} />
                    <span className="visually-hidden">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure className="hero__plate">
          <img
            src={monitorGif}
            alt={t('hero.gifAlt')}
            width="480"
            height="480"
            className="hero__monitor"
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  )
}

export default Hero
