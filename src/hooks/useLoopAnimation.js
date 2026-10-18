import { useEffect } from 'react'
import { useMediaQuery } from './useMediaQuery'

export const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

export const loop = (element, keyframes, duration, options) =>
  element.animate(keyframes, { duration, iterations: Infinity, ...options })

// Sits at `rest`, switches to `active` at `from`, holds until `to`, then returns
// to rest. Offsets are fractions of one loop.
export function pulse(from, to, rest, active, ramp = 0.02) {
  return [
    { offset: 0, ...rest },
    { offset: from, ...rest },
    { offset: from + ramp, ...active },
    { offset: to, ...active },
    { offset: Math.min(to + ramp, 1), ...rest },
    { offset: 1, ...rest },
  ]
}

// Sends a short dash along a path between `from` and `to`. Packets are hidden in
// CSS, so they only exist while an animation is running.
export function travel(path, from, to, duration, options) {
  const length = path.getTotalLength()
  const dash = 8
  const frame = (offset, at) => ({
    offset,
    opacity: 1,
    strokeDasharray: `${dash}px ${length + dash * 2}px`,
    strokeDashoffset: `${at}px`,
  })
  return loop(
    path,
    [frame(0, dash), frame(from, dash), frame(to, -length - dash), frame(1, -length - dash)],
    duration,
    options,
  )
}

// Runs the looping animations `build(root, layout)` returns while `ref` is on
// screen and pauses them, in sync, while it is not. With reduced motion nothing
// is created, so the diagram keeps its static, fully drawn default state.
export function useLoopAnimation(ref, build, layout) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    const root = ref.current
    if (reduced || !root?.animate || !('IntersectionObserver' in window)) return undefined

    const animations = build(root, layout)
    let time = 0
    animations.forEach((animation) => animation.pause())

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animations.forEach((animation) => {
          animation.currentTime = time
          animation.play()
        })
      } else {
        time = animations[0]?.currentTime ?? time
        animations.forEach((animation) => animation.pause())
      }
    })
    observer.observe(root)

    return () => {
      observer.disconnect()
      animations.forEach((animation) => animation.cancel())
    }
  }, [ref, build, layout, reduced])
}
