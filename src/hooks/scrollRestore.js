// The page renders after the load event, so the browser's own scroll restoration
// meets an empty document and a refresh lands at the top. Keep the position ourselves.
const STORAGE_KEY = 'scroll-position'

function readRestoreTop() {
  const type = performance.getEntriesByType?.('navigation')[0]?.type
  if (type !== 'reload' && type !== 'back_forward') return null
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
    return saved?.href === window.location.href ? saved.top : null
  } catch {
    return null
  }
}

let restoreTop = readRestoreTop()

window.addEventListener('pagehide', () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ href: window.location.href, top: window.scrollY }))
  } catch {
    // Storage unavailable: a refresh starts at the top.
  }
})

// Only the view the page loaded with is restored; the first in-app navigation drops it.
window.addEventListener('hashchange', () => { restoreTop = null }, { once: true })

export const getRestoreTop = () => restoreTop
