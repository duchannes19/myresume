import cipensaeleLarge1 from '../components/images/1.png?w=1280&as=metadata&imagetools'
import cipensaeleThumb1 from '../components/images/1.png?w=320&as=metadata&imagetools'
import cipensaeleLarge2 from '../components/images/2.png?w=1280&as=metadata&imagetools'
import cipensaeleThumb2 from '../components/images/2.png?w=320&as=metadata&imagetools'
import cipensaeleLarge3 from '../components/images/3.png?w=1280&as=metadata&imagetools'
import cipensaeleThumb3 from '../components/images/3.png?w=320&as=metadata&imagetools'

import dohrLarge1 from '../components/images/d1.png?w=1280&as=metadata&imagetools'
import dohrThumb1 from '../components/images/d1.png?w=320&as=metadata&imagetools'
import dohrLarge2 from '../components/images/d2.png?w=1280&as=metadata&imagetools'
import dohrThumb2 from '../components/images/d2.png?w=320&as=metadata&imagetools'
import dohrLarge3 from '../components/images/d3.png?w=1280&as=metadata&imagetools'
import dohrThumb3 from '../components/images/d3.png?w=320&as=metadata&imagetools'

import foureverLarge1 from '../components/images/fourever1.png?w=1440&as=metadata&imagetools'
import foureverThumb1 from '../components/images/fourever1.png?w=360&as=metadata&imagetools'
import foureverLarge2 from '../components/images/fourever2.png?w=1440&as=metadata&imagetools'
import foureverThumb2 from '../components/images/fourever2.png?w=360&as=metadata&imagetools'
import foureverLarge3 from '../components/images/fourever3.png?w=1440&as=metadata&imagetools'
import foureverThumb3 from '../components/images/fourever3.png?w=360&as=metadata&imagetools'
import foureverLarge4 from '../components/images/fourever4.png?w=1440&as=metadata&imagetools'
import foureverThumb4 from '../components/images/fourever4.png?w=360&as=metadata&imagetools'
import foureverLarge5 from '../components/images/fourever5.png?w=1440&as=metadata&imagetools'
import foureverThumb5 from '../components/images/fourever5.png?w=360&as=metadata&imagetools'

import angelLarge from '../components/images/angel1.png?w=1280&as=metadata&imagetools'
import angelThumb from '../components/images/angel1.png?w=360&as=metadata&imagetools'

import psegmentLarge from '../components/images/psegment1.png?w=1280&as=metadata&imagetools'
import psegmentThumb from '../components/images/psegment1.png?w=360&as=metadata&imagetools'

import iotLarge from '../components/images/iot1.png?w=1280&as=metadata&imagetools'
import iotThumb from '../components/images/iot1.png?w=360&as=metadata&imagetools'

import mlLarge from '../components/images/ml1.avif?w=1280&as=metadata&imagetools'
import mlThumb from '../components/images/ml1.avif?w=360&as=metadata&imagetools'

import hciwLarge from '../components/images/hciw1.png?w=1280&as=metadata&imagetools'
import hciwThumb from '../components/images/hciw1.png?w=360&as=metadata&imagetools'

import deeplLarge1 from '../components/images/deepl1.png?w=1440&as=metadata&imagetools'
import deeplThumb1 from '../components/images/deepl1.png?w=360&as=metadata&imagetools'
import deeplLarge2 from '../components/images/deepl2.png?w=1440&as=metadata&imagetools'
import deeplThumb2 from '../components/images/deepl2.png?w=360&as=metadata&imagetools'
import deeplLarge3 from '../components/images/deepl3.png?w=1440&as=metadata&imagetools'
import deeplThumb3 from '../components/images/deepl3.png?w=360&as=metadata&imagetools'

const buildGalleryEntry = (large, thumb, alt) => ({
  large,
  thumb,
  alt,
})

export const projectGalleries = {
  cipensaele: {
    gallery: [
      buildGalleryEntry(cipensaeleLarge1, cipensaeleThumb1, 'Ci Pensa Ele screenshot 1'),
      buildGalleryEntry(cipensaeleLarge2, cipensaeleThumb2, 'Ci Pensa Ele screenshot 2'),
      buildGalleryEntry(cipensaeleLarge3, cipensaeleThumb3, 'Ci Pensa Ele screenshot 3'),
    ],
  },
  dohr: {
    gallery: [
      buildGalleryEntry(dohrLarge1, dohrThumb1, 'Dohr screenshot 1'),
      buildGalleryEntry(dohrLarge2, dohrThumb2, 'Dohr screenshot 2'),
      buildGalleryEntry(dohrLarge3, dohrThumb3, 'Dohr screenshot 3'),
    ],
  },
  fourever: {
    gallery: [
      buildGalleryEntry(foureverLarge1, foureverThumb1, '4Ever screenshot 1'),
      buildGalleryEntry(foureverLarge2, foureverThumb2, '4Ever screenshot 2'),
      buildGalleryEntry(foureverLarge3, foureverThumb3, '4Ever screenshot 3'),
      buildGalleryEntry(foureverLarge4, foureverThumb4, '4Ever screenshot 4'),
      buildGalleryEntry(foureverLarge5, foureverThumb5, '4Ever screenshot 5'),
    ],
  },
  angel: {
    gallery: [buildGalleryEntry(angelLarge, angelThumb, 'Angel screenshot 1')],
  },
  psegment: {
    gallery: [buildGalleryEntry(psegmentLarge, psegmentThumb, 'P-Segmentation screenshot 1')],
  },
  iot: {
    gallery: [buildGalleryEntry(iotLarge, iotThumb, 'IoT Balloon Caching screenshot 1')],
  },
  ml: {
    gallery: [buildGalleryEntry(mlLarge, mlThumb, 'Machine Learning screenshot 1')],
  },
  hciw: {
    gallery: [buildGalleryEntry(hciwLarge, hciwThumb, 'Gym Tracker screenshot 1')],
  },
  deepl: {
    gallery: [
      buildGalleryEntry(deeplLarge1, deeplThumb1, 'Audio Restoration Studio screenshot 1'),
      buildGalleryEntry(deeplLarge2, deeplThumb2, 'Audio Restoration Studio screenshot 2'),
      buildGalleryEntry(deeplLarge3, deeplThumb3, 'Audio Restoration Studio screenshot 3'),
    ],
  },
}
