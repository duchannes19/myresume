import logoImage from '../src/components/images/logo.png?w=96;128&as=picture&imagetools'
import { projectCardMedia } from '../src/components/Center/projectCardMedia.js'
import { projectGalleries } from '../src/components/Center/projectMedia.js'

const TARGET = '8673bfc7792d74bcb1ee94a9770764d347e06512'

const inspectSources = (data, label) => {
  const entries = []
  if (data?.sources && typeof data.sources === 'object') {
    for (const [key, value] of Object.entries(data.sources)) {
      if (typeof value === 'string' && value.includes(TARGET)) {
        entries.push({ format: key, value })
      }
    }
  }
  if (data?.img?.src?.includes(TARGET)) {
    entries.push({ format: 'img', value: data.img.src })
  }
  if (entries.length) {
    console.log(label, entries)
  }
}

inspectSources(logoImage, 'logoImage')

for (const [key, media] of Object.entries(projectCardMedia)) {
  inspectSources(media.picture, `card:${key}`)
}

for (const [key, config] of Object.entries(projectGalleries)) {
  config.gallery.forEach(({ large, thumb }, index) => {
    if (large?.src?.includes(TARGET)) {
      console.log(`gallery:${key}:large:${index}`, large.src)
    }
    if (thumb?.src?.includes(TARGET)) {
      console.log(`gallery:${key}:thumb:${index}`, thumb.src)
    }
  })
}
