const shouldUseVercelOptimizer = () => {
  if (typeof window === 'undefined') return false

  const explicitOptIn = import.meta.env?.VITE_USE_VERCEL_IMAGE === 'true'
  if (explicitOptIn) return true

  const hostname = window.location?.hostname ?? ''
  return /\.vercel\.(app|sh)$/i.test(hostname)
}

export const getOptimizedImageUrl = (src, width, quality = 75) => {
  if (!src) return src
  if (typeof window === 'undefined') return src
  if (!shouldUseVercelOptimizer()) return src

  const origin = window.location?.origin
  if (!origin || /localhost|127\.0\.0\.1/.test(origin)) {
    return src
  }

  const absoluteSrc = src.startsWith('http') ? src : `${origin}${src}`
  const params = new URLSearchParams({
    url: absoluteSrc,
    w: width ? String(width) : '1080',
    q: String(quality),
  })

  return `/_vercel/image?${params.toString()}`
}
