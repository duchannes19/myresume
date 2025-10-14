import cipensaeleLarge1 from '../images/1.png?w=1280&as=metadata&imagetools'
import cipensaeleThumb1 from '../images/1.png?w=320&as=metadata&imagetools'
import cipensaeleLarge2 from '../images/2.png?w=1280&as=metadata&imagetools'
import cipensaeleThumb2 from '../images/2.png?w=320&as=metadata&imagetools'
import cipensaeleLarge3 from '../images/3.png?w=1280&as=metadata&imagetools'
import cipensaeleThumb3 from '../images/3.png?w=320&as=metadata&imagetools'

import dohrLarge1 from '../images/d1.png?w=1280&as=metadata&imagetools'
import dohrThumb1 from '../images/d1.png?w=320&as=metadata&imagetools'
import dohrLarge2 from '../images/d2.png?w=1280&as=metadata&imagetools'
import dohrThumb2 from '../images/d2.png?w=320&as=metadata&imagetools'
import dohrLarge3 from '../images/d3.png?w=1280&as=metadata&imagetools'
import dohrThumb3 from '../images/d3.png?w=320&as=metadata&imagetools'

import foureverLarge1 from '../images/fourever1.png?w=1440&as=metadata&imagetools'
import foureverThumb1 from '../images/fourever1.png?w=360&as=metadata&imagetools'
import foureverLarge2 from '../images/fourever2.png?w=1440&as=metadata&imagetools'
import foureverThumb2 from '../images/fourever2.png?w=360&as=metadata&imagetools'
import foureverLarge3 from '../images/fourever3.png?w=1440&as=metadata&imagetools'
import foureverThumb3 from '../images/fourever3.png?w=360&as=metadata&imagetools'
import foureverLarge4 from '../images/fourever4.png?w=1440&as=metadata&imagetools'
import foureverThumb4 from '../images/fourever4.png?w=360&as=metadata&imagetools'
import foureverLarge5 from '../images/fourever5.png?w=1440&as=metadata&imagetools'
import foureverThumb5 from '../images/fourever5.png?w=360&as=metadata&imagetools'

import angelLarge from '../images/angel1.png?w=1280&as=metadata&imagetools'
import angelThumb from '../images/angel1.png?w=360&as=metadata&imagetools'

import psegmentLarge from '../images/psegment1.png?w=1280&as=metadata&imagetools'
import psegmentThumb from '../images/psegment1.png?w=360&as=metadata&imagetools'

import iotLarge from '../images/iot1.png?w=1280&as=metadata&imagetools'
import iotThumb from '../images/iot1.png?w=360&as=metadata&imagetools'

import mlLarge from '../images/ml1.avif?w=1280&as=metadata&imagetools'
import mlThumb from '../images/ml1.avif?w=360&as=metadata&imagetools'

import hciwLarge from '../images/hciw1.png?w=1280&as=metadata&imagetools'
import hciwThumb from '../images/hciw1.png?w=360&as=metadata&imagetools'

import deeplLarge1 from '../images/deepl1.png?w=1440&as=metadata&imagetools'
import deeplThumb1 from '../images/deepl1.png?w=360&as=metadata&imagetools'
import deeplLarge2 from '../images/deepl2.png?w=1440&as=metadata&imagetools'
import deeplThumb2 from '../images/deepl2.png?w=360&as=metadata&imagetools'
import deeplLarge3 from '../images/deepl3.png?w=1440&as=metadata&imagetools'
import deeplThumb3 from '../images/deepl3.png?w=360&as=metadata&imagetools'

const buildGalleryEntry = (large, thumb, alt) => ({
  large,
  thumb,
  alt,
})

export const projectGalleries = {
  cipensaele: {
    gallery: [
      buildGalleryEntry(cipensaeleLarge1, cipensaeleThumb1, 'Ci Pensa Ele dashboard'),
      buildGalleryEntry(cipensaeleLarge2, cipensaeleThumb2, 'Ci Pensa Ele scheduling interface'),
      buildGalleryEntry(cipensaeleLarge3, cipensaeleThumb3, 'Ci Pensa Ele reporting view'),
    ],
  },
  dohr: {
    gallery: [
      buildGalleryEntry(dohrLarge1, dohrThumb1, 'DOHR login experience'),
      buildGalleryEntry(dohrLarge2, dohrThumb2, 'DOHR analytics dashboard'),
      buildGalleryEntry(dohrLarge3, dohrThumb3, 'DOHR collaboration tools'),
    ],
  },
  fourever: {
    gallery: [
      buildGalleryEntry(foureverLarge1, foureverThumb1, '4Ever overview'),
      buildGalleryEntry(foureverLarge2, foureverThumb2, '4Ever prototype screens'),
      buildGalleryEntry(foureverLarge3, foureverThumb3, '4Ever user flow'),
      buildGalleryEntry(foureverLarge4, foureverThumb4, '4Ever data insights'),
      buildGalleryEntry(foureverLarge5, foureverThumb5, '4Ever mobile UI'),
    ],
  },
  angel: {
    gallery: [buildGalleryEntry(angelLarge, angelThumb, 'Angel assistant prototype')],
  },
  psegment: {
    gallery: [buildGalleryEntry(psegmentLarge, psegmentThumb, 'P-Segmentation personas board')],
  },
  iot: {
    gallery: [buildGalleryEntry(iotLarge, iotThumb, 'IoT greenhouse dashboard')],
  },
  ml: {
    gallery: [buildGalleryEntry(mlLarge, mlThumb, 'Machine learning climate insights')],
  },
  hciw: {
    gallery: [buildGalleryEntry(hciwLarge, hciwThumb, 'Gym Tracker workout live feedback screen')],
  },
  deepl: {
    gallery: [
      buildGalleryEntry(deeplLarge1, deeplThumb1, 'Audio Restoration Studio degradation controls'),
      buildGalleryEntry(deeplLarge2, deeplThumb2, 'Audio Restoration Studio comparison view'),
      buildGalleryEntry(deeplLarge3, deeplThumb3, 'Audio Restoration Studio UNet training dashboard'),
    ],
  },
}
