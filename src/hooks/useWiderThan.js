import { useEffect, useState } from 'react'

// True while the element's content box is at least `min` px wide. Defaults to
// true until the first measurement, so desktop renders the wide layout at once.
export function useWiderThan(ref, min) {
  const [wider, setWider] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element || !('ResizeObserver' in window)) return undefined
    const observer = new ResizeObserver(([entry]) => setWider(entry.contentRect.width >= min))
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, min])

  return wider
}
