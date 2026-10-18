import dohrEn from '../components/dohr/Dohr_en.pdf'
import dohrIt from '../components/dohr/Dohr_it.pdf'
import foureverReport from '../components/fourever/4Ever_report.pdf'
import angelReport from '../components/angel/Angel_Report.pdf'
import psegmentDeck from '../components/psegmnet/psegment.pdf'
import iotReport from '../components/iot/iot.pdf'
import mlHomework1 from '../components/ml/h1.pdf'
import mlHomework2 from '../components/ml/h2.pdf'
import gymTrackerReport from '../components/hciw/Gym_Tracker.pdf'
import audioDocs from '../components/deepl/DLAI.pdf'

// One entry per project. Copy lives in i18n under `projects.<i18nKey>.*`;
// `media` keys point into projectCardMedia / projectMedia.
// Download `label` is an i18n key under `downloads.*`.
export const projectGroups = [
  { id: 'ai', projects: ['p-segmentation', 'audio-restoration', 'angel', 'machine-learning', 'iot-balloon-caching'] },
  { id: 'web', projects: ['ci-pensa-ele', '4ever', 'gym-tracker', 'dohr'] },
]

export const projects = {
  'p-segmentation': {
    title: 'P-Segmentation',
    i18nKey: 'psegment',
    media: { card: 'psegment', gallery: 'psegment' },
    tags: ['Python', 'U-Net', 'CNN', 'Vite.js'],
    collaborators: ['Cesare Corsi'],
    downloads: [{ label: 'presentation', href: psegmentDeck }],
    links: [{ label: 'GitHub', href: 'https://github.com/duchannes19/CV-Project' }],
  },
  'audio-restoration': {
    title: 'Audio Restoration Studio',
    i18nKey: 'deepl',
    media: { card: 'deepl', gallery: 'deepl' },
    tags: ['Python', 'Gradio', 'MusicGen', 'Demucs', 'U-Net'],
    collaborators: [],
    downloads: [{ label: 'documentation', href: audioDocs }],
    links: [{ label: 'GitHub', href: 'https://github.com/duchannes19/audio-restoration-for-generative-models' }],
  },
  angel: {
    title: 'Angel',
    i18nKey: 'angel',
    media: { card: 'angel', gallery: 'angel' },
    tags: ['Chrome Extension', 'Flask', 'CNN'],
    collaborators: ['Cesare Corsi'],
    downloads: [{ label: 'report', href: angelReport }],
    links: [{ label: 'GitHub', href: 'https://github.com/duchannes19/Angel' }],
  },
  'machine-learning': {
    title: 'Machine Learning',
    i18nKey: 'ml',
    media: { card: 'ml', gallery: 'ml' },
    tags: ['Python', 'Neural networks', 'OpenAI Gym'],
    collaborators: [],
    downloads: [
      { label: 'homework1', href: mlHomework1 },
      { label: 'homework2', href: mlHomework2 },
    ],
    links: [
      { label: 'GitHub · Homework 1', href: 'https://github.com/duchannes19/Homework-1-2024' },
      { label: 'GitHub · Homework 2', href: 'https://github.com/duchannes19/Homework-2' },
    ],
    sections: ['firsthw', 'secondhw'],
  },
  'iot-balloon-caching': {
    title: 'IoT Balloon Caching',
    i18nKey: 'iot',
    media: { card: 'iot', gallery: 'iot' },
    tags: ['ROS', 'Gazebo', 'Python'],
    collaborators: ['Cesare Corsi', 'Kevin Cukaj'],
    downloads: [{ label: 'report', href: iotReport }],
    links: [{ label: 'GitHub', href: 'https://github.com/duchannes19/iotproject' }],
  },
  'ci-pensa-ele': {
    title: 'Ci Pensa Ele',
    i18nKey: 'cipensaele',
    media: { card: 'cipensaele', gallery: 'cipensaele' },
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    collaborators: [],
    downloads: [],
    links: [],
    privateCode: true,
  },
  '4ever': {
    title: '4Ever',
    i18nKey: 'fourever',
    media: { card: 'fourever', gallery: 'fourever' },
    tags: ['Ethereum', 'Solidity', 'React', 'Web3'],
    collaborators: ['Cesare Corsi'],
    downloads: [{ label: 'report', href: foureverReport }],
    links: [],
  },
  'gym-tracker': {
    title: 'Gym Tracker',
    i18nKey: 'hciw',
    media: { card: 'gymtracker', gallery: 'hciw' },
    tags: ['React Native', 'ESP32', 'Arduino', 'Python'],
    collaborators: [],
    downloads: [{ label: 'designReport', href: gymTrackerReport }],
    links: [{ label: 'GitHub', href: 'https://github.com/duchannes19/hciw' }],
  },
  dohr: {
    title: 'Dohr',
    i18nKey: 'dohr',
    media: { card: 'dohr', gallery: 'dohr' },
    tags: ['Web app', 'B.Sc. thesis'],
    tagsLabel: 'type',
    collaborators: ['Paolo Saquella'],
    downloads: [
      { label: 'thesisEn', href: dohrEn },
      { label: 'thesisIt', href: dohrIt },
    ],
    links: [],
  },
}

export const projectOrder = projectGroups.flatMap((group) => group.projects)
