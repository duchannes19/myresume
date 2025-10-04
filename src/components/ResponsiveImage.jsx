import React, { useMemo, useState } from 'react'
import clsx from 'clsx'

import { getOptimizedImageUrl } from '../utils/image'

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
  useCdn = true,
  sizes = '(min-width: 768px) 33vw, 90vw',
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  if (!data) return null

  const {
    sources: rawSources = [],
    img,
    image,
    fallback,
    ...rest
  } = data

  const sources = useMemo(() => {
    if (Array.isArray(rawSources)) {
      return rawSources.filter((source) => Boolean(source?.srcset))
    }

    if (rawSources && typeof rawSources === 'object') {
      return [rawSources].filter((source) => Boolean(source?.srcset))
    }

    return []
  }, [rawSources])

  const baseImage = useMemo(() => {
    if (img && img.src) return img
    if (image && image.src) return image
    if (fallback && fallback.src) return fallback
    if (rest?.src) return rest

    return { src: undefined, width, height }
  }, [fallback, image, img, rest, width, height])

  const resolvedWidth = width ?? baseImage.width
  const resolvedHeight = height ?? baseImage.height

  const finalSrc = useMemo(() => {
    if (!baseImage?.src) return undefined
    if (!useCdn) return baseImage.src
    return getOptimizedImageUrl(baseImage.src, resolvedWidth)
  }, [baseImage, resolvedWidth, useCdn])

  const handleLoad = (event) => {
    if (event?.target?.complete) {
      setIsLoaded(true)
    }
  }

  return (
    <picture className={clsx('responsive-image', className)}>
      {sources.map((source) => (
        <source
          key={`${source.type ?? 'img'}-${source.srcset ?? source.src}`}
          {...source}
          sizes={source.sizes ?? sizes}
        />
      ))}
      <img
        src={finalSrc}
        width={resolvedWidth}
        height={resolvedHeight}
        alt={alt}
        className={clsx('responsive-image__img', { 'is-loaded': isLoaded })}
        style={placeholder && !isLoaded ? { backgroundImage: `url(${placeholder})` } : undefined}
        loading={loading}
        decoding={decoding}
        fetchpriority={fetchpriority}
        onLoad={handleLoad}
      />
    </picture>
  )
}

export default ResponsiveImage
