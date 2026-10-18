import { useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { loop, pulse, travel, useLoopAnimation } from '../../hooks/useLoopAnimation'
import { useWiderThan } from '../../hooks/useWiderThan'
import { box, center } from './geometry'

const LOOP = 12000
const ENVS = ['dev', 'prod']
const CLOUDS = ['AWS · EKS', 'GCP · GKE']

// Per environment: [start, end] of the trigger, init, plan, apply and helm
// upgrade, then the deploy to both clouds. prod starts once dev is promoted.
const RUNS = [
  { steps: [[0.02, 0.03], [0.05, 0.1], [0.12, 0.19], [0.21, 0.29], [0.31, 0.37]], deploy: [0.38, 0.43] },
  { steps: [[0.48, 0.485], [0.5, 0.54], [0.56, 0.62], [0.64, 0.71], [0.73, 0.78]], deploy: [0.79, 0.84] },
]
const PROMOTE = [0.44, 0.48]

const row = (xs, ws, y, h) => xs.map((x, i) => ({ x, y, w: ws[i], h }))

// Two environment rows in one lane, the clouds below. Wide puts each trigger at
// the start of its row; tall puts it above the row and enters along a rail.
const LAYOUTS = {
  wide: {
    width: 560,
    height: 266,
    font: 12,
    lane: { x: 8, y: 8, w: 544, h: 166 },
    label: { x: 22, y: 32 },
    brackets: [
      { d: 'M152 64 V58 H368 V64', x: 260, y: 50, text: 'terraform' },
      { d: 'M380 64 V58 H488 V64', x: 434, y: 50, text: 'helm' },
    ],
    names: ['init', 'plan', 'apply', 'helm upgrade'],
    rows: [70, 122].map((y) => ({
      env: { x: 22, y: y + 16 },
      trigger: { x: 64, y, w: 76, h: 32 },
      stages: row([152, 228, 304, 380], [64, 64, 64, 108], y, 32),
      entry: `M140 ${y + 16} H152`,
    })),
    promote: 'M434 102 V112 H102 V122',
    clouds: [56, 288].map((x) => ({ x, y: 202, w: 216, h: 52 })),
    routes: ['M434 174 V188 H164 V202', 'M434 174 V188 H396 V202'],
  },
  tall: {
    width: 320,
    height: 360,
    font: 13,
    lane: { x: 8, y: 8, w: 304, h: 244 },
    label: { x: 20, y: 32 },
    brackets: [
      { d: 'M28 104 V98 H222 V104', x: 125, y: 90, text: 'terraform' },
      { d: 'M238 104 V98 H292 V104', x: 265, y: 90, text: 'helm' },
    ],
    names: ['init', 'plan', 'apply', 'helm'],
    rows: [[46, 112], [166, 210]].map(([y, stageY]) => ({
      env: { x: 140, y: y + 15 },
      trigger: { x: 24, y, w: 104, h: 30 },
      stages: row([24, 94, 164, 234], [62, 62, 62, 62], stageY, 30),
      entry: `M24 ${y + 15} H16 V${stageY + 15} H24`,
    })),
    promote: 'M265 142 V154 H16 V181 H24',
    clouds: [16, 164].map((x) => ({ x, y: 284, w: 140, h: 64 })),
    routes: ['M265 252 V268 H86 V284', 'M265 252 V268 H234 V284'],
  },
}

// Environment chips inside a cloud box: beside the name (wide) or under it (tall).
function cloudParts(cloud, layout) {
  const chips = (x0, y) => ENVS.map((_, i) => ({ x: x0 + i * 52, y, w: 44, h: 22 }))
  return layout === 'wide'
    ? { name: { x: cloud.x + 14, y: cloud.y + cloud.h / 2 }, anchor: 'start', chips: chips(cloud.x + cloud.w - 110, cloud.y + 15) }
    : { name: { x: cloud.x + cloud.w / 2, y: cloud.y + 20 }, anchor: 'middle', chips: chips(cloud.x + (cloud.w - 96) / 2, cloud.y + 33) }
}

function animatePipeline(root) {
  const all = (selector) => [...root.querySelectorAll(selector)]
  const hidden = { opacity: 0 }
  const shown = { opacity: 1 }
  const animations = []
  const add = (element, keyframes) => animations.push(loop(element, keyframes, LOOP))
  const step = (element) => RUNS[Number(element.dataset.env)].steps[Number(element.dataset.step)]

  // Each stage fills its progress bar, then stays marked as passed.
  all('[data-progress]').forEach((bar) => {
    const [start, end] = step(bar)
    add(bar, pulse(start, end, hidden, shown, 0.005))
    add(bar, [
      { offset: 0, transform: 'scaleX(0)' },
      { offset: start, transform: 'scaleX(0)' },
      { offset: end, transform: 'scaleX(1)' },
      { offset: 1, transform: 'scaleX(1)' },
    ])
  })
  all('[data-passed]').forEach((rect) => add(rect, pulse(step(rect)[1], 0.93, hidden, shown, 0.01)))

  // A packet hops to the next stage as the previous one passes.
  all('[data-hop]').forEach((path) => {
    const { steps } = RUNS[Number(path.dataset.env)]
    const index = Number(path.dataset.hop)
    animations.push(travel(path, steps[index - 1][1], steps[index][0], LOOP))
  })
  animations.push(travel(root.querySelector('[data-promote]'), PROMOTE[0], PROMOTE[1], LOOP))

  // Each environment's release lands on both clouds and lights its chip there.
  all('[data-deploy]').forEach((path) => {
    const [from, to] = RUNS[Number(path.dataset.deploy)].deploy
    animations.push(travel(path, from, to, LOOP))
  })
  all('[data-chip]').forEach((rect) => {
    add(rect, pulse(RUNS[Number(rect.dataset.chip)].deploy[1], 0.93, hidden, shown))
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

  // A stage box with its passed overlay and, for real stages, a progress bar.
  const stage = (rect, label, env, index) => (
    <g key={`${env}-${index}`}>
      <rect className="diagram__box" {...box(rect)} rx="4" />
      <rect className="diagram__box diagram__box--lit" {...box(rect)} rx="4" data-passed="" data-env={env} data-step={index} />
      {index > 0 && (
        <rect
          className="diagram__progress"
          x={rect.x + 6}
          y={rect.y + rect.h - 6}
          width={rect.w - 12}
          height="2"
          rx="1"
          data-progress=""
          data-env={env}
          data-step={index}
        />
      )}
      <text className="diagram__name" {...center(rect)}>{label}</text>
    </g>
  )

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
        {g.brackets.map(({ d, x, y, text }) => (
          <g key={text}>
            <path className="diagram__link" d={d} />
            <text className="diagram__label" x={x} y={y} textAnchor="middle">{text}</text>
          </g>
        ))}

        {g.routes.map((d) => <path key={d} className="diagram__link" d={d} />)}
        <path className="diagram__link" d={g.promote} />
        <path className="diagram__packet" d={g.promote} data-promote="" />

        {g.rows.map(({ env, trigger, stages, entry }, r) => {
          const hops = [entry, ...stages.slice(1).map((rect, i) => {
            const prev = stages[i]
            const y = rect.y + rect.h / 2
            return `M${prev.x + prev.w} ${y} H${rect.x}`
          })]
          return (
            <g key={ENVS[r]}>
              {hops.map((d) => <path key={d} className="diagram__link" d={d} />)}
              {hops.map((d, i) => <path key={d} className="diagram__packet" d={d} data-env={r} data-hop={i + 1} />)}
              {g.routes.map((d) => <path key={d} className="diagram__packet" d={d} data-deploy={r} />)}
              <text className="diagram__plane" x={env.x} y={env.y} dominantBaseline="central">{ENVS[r]}</text>
              {stage(trigger, r === 0 ? 'git push' : 'promote', r, 0)}
              {stages.map((rect, i) => stage(rect, g.names[i], r, i + 1))}
            </g>
          )
        })}

        {g.clouds.map((cloud, c) => {
          const parts = cloudParts(cloud, layout)
          return (
            <g key={CLOUDS[c]}>
              <rect className="diagram__box" {...box(cloud)} rx="4" />
              <text
                className="diagram__name"
                x={parts.name.x}
                y={parts.name.y}
                textAnchor={parts.anchor}
                dominantBaseline="central"
              >
                {CLOUDS[c]}
              </text>
              {parts.chips.map((chip, e) => (
                <g key={ENVS[e]}>
                  <rect className="diagram__box" {...box(chip)} rx="3" />
                  <rect className="diagram__box diagram__box--lit" {...box(chip)} rx="3" data-chip={e} />
                  <text className="diagram__label" {...center(chip)}>{ENVS[e]}</text>
                </g>
              ))}
            </g>
          )
        })}
      </svg>
    </figure>
  )
}

export default PipelineDiagram
