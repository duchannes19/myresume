import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import Icon from './Icon'

// Accessible carousel with a native <dialog> lightbox (Esc closes, focus returns).
function Gallery({ items, label }) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const dialogRef = useRef(null)
  const total = items.length
  const current = items[index]
  const multiple = total > 1

  const go = (step) => setIndex((value) => (value + step + total) % total)

  const onKeyDown = (event) => {
    if (!multiple) return
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    }
  }

  const openLightbox = () => dialogRef.current?.showModal()
  const closeLightbox = () => dialogRef.current?.close()

  const controls = multiple && (
    <div className="gallery__controls">
      <button type="button" className="icon-button" onClick={() => go(-1)}>
        <Icon name="chevronLeft" size={20} />
        <span className="visually-hidden">{t('projects.gallery.previous')}</span>
      </button>
      <p className="gallery__count" aria-live="polite">
        <span className="visually-hidden">
          {t('projects.gallery.position', { current: index + 1, total })}
        </span>
        <span aria-hidden="true">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </p>
      <button type="button" className="icon-button" onClick={() => go(1)}>
        <Icon name="chevronRight" size={20} />
        <span className="visually-hidden">{t('projects.gallery.next')}</span>
      </button>
    </div>
  )

  return (
    <section
      className="gallery"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      <div className="gallery__stage">
        <button type="button" className="gallery__open" onClick={openLightbox}>
          <img
            key={current.src}
            src={current.src}
            width={current.width}
            height={current.height}
            alt={current.alt}
            className="gallery__image"
            decoding="async"
          />
          <span className="gallery__expand">
            <Icon name="expand" size={18} />
            <span className="visually-hidden">{t('projects.gallery.open')}</span>
          </span>
        </button>
      </div>

      {controls}

      {multiple && (
        <ul className="gallery__thumbs">
          {items.map((item, i) => (
            <li key={item.src}>
              <button
                type="button"
                className={clsx('gallery__thumb', { 'is-active': i === index })}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => setIndex(i)}
              >
                <img src={item.thumb} alt="" width="96" height="60" loading="lazy" />
                <span className="visually-hidden">{t('projects.gallery.show', { index: i + 1 })}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={label}
        onClick={(event) => event.target === dialogRef.current && closeLightbox()}
      >
        <img
          src={current.src}
          width={current.width}
          height={current.height}
          alt={current.alt}
          className="lightbox__image"
        />
        <div className="lightbox__bar">
          {controls}
          <button type="button" className="icon-button" onClick={closeLightbox} autoFocus>
            <Icon name="close" size={20} />
            <span className="visually-hidden">{t('projects.gallery.close')}</span>
          </button>
        </div>
      </dialog>
    </section>
  )
}

export default Gallery
