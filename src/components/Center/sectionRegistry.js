import { lazy } from 'react'

const sectionLoaders = [
  () => import('./about'),
  () => import('./resume'),
  () => import('./portfolio'),
  () => import('./contact'),
]

export const lazySections = sectionLoaders.map((loader) => lazy(loader))

export const preloadSection = (index) => {
  const loader = sectionLoaders[index]
  return loader ? loader() : Promise.resolve()
}
