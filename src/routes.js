import { lazy } from 'react'

// The project detail view (and its gallery metadata) is split out of the
// initial bundle; cards preload it on hover/focus.
const loadProjectDetail = () => import('./components/ProjectDetail')

export const ProjectDetail = lazy(loadProjectDetail)

export const preloadProjectDetail = () => {
  loadProjectDetail()
}
