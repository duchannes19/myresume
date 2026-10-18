import { useTranslation } from 'react-i18next'
import Icon from '../Icon'
import { profile, socialLinks } from '../../data/profile'

function Contact() {
  const { t } = useTranslation()

  return (
    <section className="section section--contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact">
        <h2 id="contact-title" className="contact__title">{t('contact.title')}</h2>
        <p className="contact__lead">{t('contact.lead')}</p>

        <a className="contact__email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>

        <div className="contact__actions">
          <a className="button button--primary" href={profile.cvUrl} download={profile.cvFileName}>
            <Icon name="download" />
            {t('hero.cv')}
          </a>
          <ul className="contact__links" aria-label={t('contact.elsewhere')}>
            {socialLinks.map(({ id, label, href }) => (
              <li key={id}>
                <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">
                  <Icon name={id} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Contact
