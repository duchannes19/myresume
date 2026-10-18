import { useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { loop, pulse, travel, useLoopAnimation } from '../../hooks/useLoopAnimation'
import { useWiderThan } from '../../hooks/useWiderThan'
import { box, center } from './geometry'

const LOOP = 9000
const CLOUDS = ['AWS', 'Azure', 'GCP']
// When each stage starts and finishes, as fractions of the loop.
const STAGES = [[0.02, 0.07], [0.1, 0.24], [0.27, 0.38], [0.41, 0.52], [0.55, 0.66]]
const DEPLOY = [0.67, 0.75]

const stageRects = (xs, ys, w, h) => xs.map((x, i) => ({ x, y: ys[i], w, h }))

// A left-to-right lane with clouds below, or a top-to-bottom lane for narrow plates.
const LAYOUTS = {
  wide: {
    width: 560,
    height: 232,
    font: 12,
    lane: { x: 8, y: 8, w: 544, h: 104 },
    label: { x: 22, y: 32 },
    stages: stageRects([22, 126, 230, 334, 438], Array(5).fill(58), 88, 36),
    names: ['git push', 'build', 'test', 'plan', 'apply'],
    bracket: { d: 'M338 50 V44 H522 V50', x: 430, y: 34 },
    hops: [110, 214, 318, 422].map((x) => `M${x} 76 H${x + 16}`),
    clouds: [62, 242, 422].map((x) => ({ x, y: 176, w: 120, h: 40 })),
    routes: ['M482 94 V146 H122 V176', 'M482 94 V146 H302 V176', 'M482 94 V176'],
  },
  tall: {
    width: 320,
    height: 384,
    font: 13,
    lane: { x: 8, y: 8, w: 304, h: 280 },
    label: { x: 20, y: 32 },
    stages: stageRects(Array(5).fill(24), [46, 94, 142, 190, 238], 272, 34),
    names: ['git push', 'build', 'test', 'terraform plan', 'terraform apply'],
    hops: [80, 128, 176, 224].map((y) => `M160 ${y} V${y + 14}`),
    clouds: [12, 116, 220].map((x) => ({ x, y: 328, w: 88, h: 40 })),
    routes: ['M160 272 V306 H56 V328', 'M160 272 V328', 'M160 272 V306 H264 V328'],
  },
}

function animatePipeline(root) {
  const all = (selector) => [...root.querySelectorAll(selector)]
  const hidden = { opacity: 0 }
  const shown = { opacity: 1 }
  const animations = []

  // Each stage fills its progress bar, then stays marked as passed.
  all('[data-progress]').forEach((bar) => {
    const [start, end] = STAGES[Number(bar.dataset.progress)]
    animations.push(
      loop(bar, pulse(start, end, hidden, shown, 0.005), LOOP),
      loop(bar, [
        { offset: 0, transform: 'scaleX(0)' },
        { offset: start, transform: 'scaleX(0)' },
        { offset: end, transform: 'scaleX(1)' },
        { offset: 1, transform: 'scaleX(1)' },
      ], LOOP),
    )
  })

  all('[data-passed]').forEach((rect) => {
    const [, end] = STAGES[Number(rect.dataset.passed)]
    animations.push(loop(rect, pulse(end, 0.93, hidden, shown, 0.01), LOOP))
  })

  // A packet hops to the next stage as the previous one passes.
  all('[data-hop]').forEach((path) => {
    const index = Number(path.dataset.hop)
    animations.push(travel(path, STAGES[index][1], STAGES[index + 1][0], LOOP))
  })

  // The release fans out and lands on all three clouds together.
  all('[data-route]').forEach((path) => {
    animations.push(travel(path, DEPLOY[0], DEPLOY[1], LOOP))
  })

  all('[data-deployed]').forEach((rect) => {
    animations.push(loop(rect, pulse(DEPLOY[1], 0.93, hidden, shown), LOOP))
  })

  return animations
}

function PipelineDiagram() {
  const { t } = useTranslation()
  const id = useId()
  const plateRef = useRef(null)
  const svgRef = useRef(null)
  const layout = useWiderThan(plateRef, 500) ? 'wide' : 'tall'
  const g = LAYOUTS[layout]

  useLoopAnimation(svgRef, animatePipeline, layout)

  return (
    <figure className="work__plate" ref={plateRef}>
      <svg
        ref={svgRef}
        className={`diagram diagram--${layout}`}
        viewBox={`0 0 ${g.width} ${g.height}`}
        fontSize={g.font}
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
      >
        <title id={`${id}-title`}>{t('work.cloud.diagram.title')}</title>
        <desc id={`${id}-desc`}>{t('work.cloud.diagram.desc')}</desc>

        <rect className="diagram__frame" {...box(g.lane)} rx="6" />
        <text className="diagram__label" x={g.label.x} y={g.label.y}>pipeline · Azure DevOps</text>

        {g.bracket && (
          <>
            <path className="diagram__link" d={g.bracket.d} />
            <text className="diagram__label" x={g.bracket.x} y={g.bracket.y} textAnchor="middle">terraform</text>
          </>
        )}

        {g.hops.map((d) => <path key={d} className="diagram__link" d={d} />)}
        {g.hops.map((d, index) => <path key={d} className="diagram__packet" d={d} data-hop={index} />)}
        {g.routes.map((d) => <path key={d} className="diagram__link" d={d} />)}
        {g.routes.map((d) => <path key={d} className="diagram__packet" d={d} data-route="" />)}

        {g.stages.map((stage, index) => (
          <g key={g.names[index]}>
            <rect className="diagram__box" {...box(stage)} rx="4" />
            <rect className="diagram__box diagram__box--lit" {...box(stage)} rx="4" data-passed={index} />
            <rect
              className="diagram__progress"
              x={stage.x + 6}
              y={stage.y + stage.h - 6}
              width={stage.w - 12}
              height="2"
              rx="1"
              data-progress={index}
            />
            <text className="diagram__name" {...center(stage)}>{g.names[index]}</text>
          </g>
        ))}

        {g.clouds.map((cloud, index) => (
          <g key={CLOUDS[index]}>
            <rect className="diagram__box" {...box(cloud)} rx="4" />
            <rect className="diagram__box diagram__box--lit" {...box(cloud)} rx="4" data-deployed="" />
            <text className="diagram__name" {...center(cloud)}>{CLOUDS[index]}</text>
          </g>
        ))}
      </svg>
    </figure>
  )
}

export default PipelineDiagram
