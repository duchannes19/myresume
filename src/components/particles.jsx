import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadLinksPreset } from '@tsparticles/preset-links'

// Must stay referentially stable for the app lifetime (ParticlesProvider requirement).
const initEngine = (engine) => loadLinksPreset(engine)

const getEnvironment = () => {
  if (typeof window === 'undefined') return { disabled: true, isMobile: false }

  const isMobile = window.matchMedia('(max-width: 768px)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const cores = navigator.hardwareConcurrency ?? Infinity
  const memory = navigator.deviceMemory ?? Infinity
  const isLowEndDevice = cores <= 4 || memory <= 4

  return { disabled: prefersReducedMotion || (isMobile && isLowEndDevice), isMobile }
}

const { disabled, isMobile } = getEnvironment()

const options = {
  preset: 'links',
  fullScreen: { enable: true, zIndex: -1 },
  background: { color: 'transparent' },
  particles: {
    number: {
      value: isMobile ? 8 : 40,
      density: { enable: true, width: isMobile ? 1200 : 800, height: isMobile ? 1200 : 800 },
    },
    paint: { fill: { color: { value: '#2ddaba' } } },
    links: {
      enable: !isMobile,
      color: '#2ddaba',
      distance: isMobile ? 100 : 150,
      opacity: isMobile ? 0.15 : 0.22,
    },
    opacity: { value: 0.45 },
    move: { speed: isMobile ? 0.5 : 0.8 },
  },
  fpsLimit: isMobile ? 20 : 60,
  detectRetina: !isMobile,
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
}

function ParticlesContainer() {
  if (disabled) return null

  return (
    <ParticlesProvider init={initEngine}>
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  )
}

export default ParticlesContainer
