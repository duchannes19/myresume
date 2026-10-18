import { useState } from 'react'
import clsx from 'clsx'

const pickBaseImage = (data, width, height) => {
  if (!data) return { src: undefined, width, height }
  const { img, image, fallback } = data
  if (img?.src) return img
  if (image?.src) return image
  if (fallback?.src) return fallback
  if (data.src) return data
  return { src: undefined, width, height }
}

const normalizeSources = (rawSources) => {
  if (Array.isArray(rawSources)) return rawSources.filter((source) => Boolean(source?.srcset))
  if (rawSources && typeof rawSources === 'object') return [rawSources].filter((source) => Boolean(source?.srcset))
  return []
}

const ResponsiveImage = ({
  data,
  alt,
  className,
  placeholder,
  loading = 'lazy',
  decoding = 'async',
  width,
  height,
  fetchpriority,
  sizes = '(min-width: 768px) 33vw, 90vw',
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  if (!data) return null

  const sources = normalizeSources(data.sources)
  const baseImage = pickBaseImage(data, width, height)

  return (
    <picture className={clsx('responsive-image', className)}>
      {sources.map((source) => (
        <source
          key={`${source.type ?? 'img'}-${source.srcset}`}
          {...source}
          sizes={source.sizes ?? sizes}
        />
      ))}
      <img
        src={baseImage.src}
        width={width ?? baseImage.width}
        height={height ?? baseImage.height}
        alt={alt}
        className={clsx('responsive-image__img', { 'is-loaded': isLoaded })}
        style={placeholder && !isLoaded ? { backgroundImage: `url(${placeholder})` } : undefined}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchpriority}
        onLoad={() => setIsLoaded(true)}
      />
    </picture>
  )
}

export default ResponsiveImage
