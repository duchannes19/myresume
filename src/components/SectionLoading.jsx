import { useTranslation } from 'react-i18next'

const SectionLoading = () => {
  const { t } = useTranslation()

  return (
    <div className="section-loading" role="status">
      <span className="section-loading__bar" aria-hidden="true" />
      <span className="visually-hidden">{t('loading')}</span>
    </div>
  )
}

export default SectionLoading
