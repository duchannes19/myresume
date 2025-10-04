export const getOptimizedImageUrl = (src, width, quality = 75) => {
  if (!src) return src
  if (typeof window === 'undefined') return src
  const origin = window.location?.origin
  if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
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
