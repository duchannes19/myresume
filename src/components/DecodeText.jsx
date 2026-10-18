import { useEffect, useRef } from 'react'

const GLYPHS = '#%&@$/\\<>[]{}=+*01ABDEFGHKMNRSWXZ'
const DURATION = 900

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Resolves `text` out of glitch glyphs once on mount, echoing the wallpaper's
// lettering. Screen readers get the plain text; the animated layer is aria-hidden.
// Monospace keeps every frame the same width, so nothing reflows.
function DecodeText({ text }) {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer || prefersReducedMotion()) return undefined

    const start = performance.now()
    let frame = 0

    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION, 1)
      const settled = Math.floor(progress * text.length)
      let output = ''
      for (let i = 0; i < text.length; i += 1) {
        const char = text[i]
        output += i < settled || char === ' '
          ? char
          : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      layer.textContent = output
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      layer.textContent = text
    }
  }, [text])

  return (
    <>
      <span className="visually-hidden">{text}</span>
      <span ref={layerRef} aria-hidden="true">{text}</span>
    </>
  )
}

export default DecodeText
