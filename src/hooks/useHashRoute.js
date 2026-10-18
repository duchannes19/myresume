import { useSyncExternalStore } from 'react'

// Routes:
//   #/projects/<slug>  → project detail
//   anything else      → the one-page CV (a plain #id is an in-page anchor)
const PROJECT_PREFIX = '#/projects/'

const subscribe = (callback) => {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

const getHash = () => window.location.hash

export const projectHref = (slug) => `${PROJECT_PREFIX}${slug}`

export function useHashRoute() {
  const hash = useSyncExternalStore(subscribe, getHash, () => '')

  if (hash.startsWith(PROJECT_PREFIX)) {
    return { view: 'project', slug: decodeURIComponent(hash.slice(PROJECT_PREFIX.length)), hash }
  }

  return { view: 'home', anchor: hash.length > 1 ? hash.slice(1) : null, hash }
}
