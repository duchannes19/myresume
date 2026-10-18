import { useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EASE, loop, pulse, travel, useLoopAnimation } from '../../hooks/useLoopAnimation'
import { useWiderThan } from '../../hooks/useWiderThan'
import { box, center } from './geometry'

const LOOP = 8000
const COMMAND = 'helm upgrade api ./chart'
const ADVANCE = 0.65 // Martian Mono advance at 87.5% width, in em
const PODS = 3

// Two arrangements of the same cluster: side by side, or stacked for narrow plates.
const LAYOUTS = {
  wide: {
    width: 560,
    height: 296,
    font: 12,
    frame: { x: 8, y: 8, w: 544, h: 212 },
    label: { x: 22, y: 32 },
    ingress: { x: 24, y: 106, w: 88, h: 32 },
    service: { x: 152, y: 106, w: 88, h: 32 },
    nodes: [48, 100, 152].map((y) => ({ x: 300, y, w: 236, h: 44 })),
    podX: [104, 144, 184],
    routes: ['M112 122 H270 V70 H300', 'M112 122 H300', 'M112 122 H270 V174 H300'],
    term: { x: 8, y: 232, w: 544, h: 56, text: 22, lines: [256, 276] },
  },
  tall: {
    width: 320,
    height: 424,
    font: 13,
    frame: { x: 8, y: 8, w: 304, h: 332 },
    label: { x: 20, y: 32 },
    ingress: { x: 116, y: 48, w: 88, h: 30 },
    service: { x: 116, y: 104, w: 88, h: 30 },
    nodes: [164, 220, 276].map((y) => ({ x: 24, y, w: 272, h: 44 })),
    podX: [140, 180, 220],
    routes: ['M160 78 V150 H16 V186 H24', 'M160 78 V150 H16 V242 H24', 'M160 78 V150 H16 V298 H24'],
    term: { x: 8, y: 352, w: 304, h: 64, text: 20, lines: [378, 402] },
  },
}

const commandWidth = (layout) => COMMAND.length * ADVANCE * LAYOUTS[layout].font
const nodeStart = (node) => 0.22 + node * 0.15

function animateCluster(root, layout) {
  const all = (selector) => [...root.querySelectorAll(selector)]
  const width = commandWidth(layout)
  const animations = []

  // Steady traffic: ingress → service → each node.
  all('[data-packet]').forEach((path, index) => {
    animations.push(travel(path, 0, 0.7, 2000, { delay: index * 650 }))
  })

  // The command types itself, runs, and clears when the loop resets.
  const typing = { easing: `steps(${COMMAND.length}, end)` }
  const cleared = { easing: 'steps(1, end)' }
  animations.push(
    loop(root.querySelector('[data-cover]'), [
      { offset: 0, transform: 'scaleX(1)' },
      { offset: 0.03, transform: 'scaleX(1)', ...typing },
      { offset: 0.15, transform: 'scaleX(0)' },
      { offset: 0.94, transform: 'scaleX(0)', ...cleared },
      { offset: 0.95, transform: 'scaleX(1)' },
      { offset: 1, transform: 'scaleX(1)' },
    ], LOOP),
    loop(root.querySelector('[data-caret]'), [
      { offset: 0, opacity: 1, transform: `translateX(${-width}px)` },
      { offset: 0.03, opacity: 1, transform: `translateX(${-width}px)`, ...typing },
      { offset: 0.15, opacity: 1, transform: 'translateX(0)' },
      { offset: 0.17, opacity: 1, transform: 'translateX(0)', ...cleared },
      { offset: 0.18, opacity: 0, transform: 'translateX(0)' },
      { offset: 1, opacity: 0, transform: `translateX(${-width}px)`, ...cleared },
    ], LOOP),
    loop(root.querySelector('[data-blink]'), [
      { offset: 0, opacity: 1 },
      { offset: 0.5, opacity: 1, easing: 'steps(1, end)' },
      { offset: 0.51, opacity: 0 },
      { offset: 1, opacity: 0 },
    ], 1000),
  )

  // Rolling update: one node at a time, its pods replaced in quick succession.
  all('[data-status]').forEach((text) => {
    const node = Number(text.dataset.status)
    const [from, to] = node < 3 ? [nodeStart(node), nodeStart(node + 1) - 0.02] : [0.68, 0.92]
    animations.push(loop(text, pulse(from, to, { opacity: 0 }, { opacity: 1 }), LOOP))
  })

  all('[data-active]').forEach((rect) => {
    const start = nodeStart(Number(rect.dataset.active))
    animations.push(loop(rect, pulse(start - 0.01, start + 0.12, { opacity: 0 }, { opacity: 1 }), LOOP))
  })

  all('[data-pod]').forEach((rect) => {
    const start = nodeStart(Number(rect.dataset.node)) + Number(rect.dataset.pod) * 0.025
    const out = { opacity: 0, transform: 'scale(0.4)' }
    const shown = { opacity: 1, transform: 'scale(1)' }
    const keyframes = 'next' in rect.dataset
      ? [
          { offset: 0, ...out },
          { offset: start, ...out, easing: EASE },
          { offset: start + 0.04, ...shown },
          { offset: 0.93, ...shown },
          { offset: 0.97, opacity: 0, transform: 'scale(1)' },
          { offset: 1, ...out },
        ]
      : [
          { offset: 0, ...shown },
          { offset: start, ...shown },
          { offset: start + 0.03, opacity: 0, transform: 'scale(0.6)' },
          { offset: 0.92, opacity: 0, transform: 'scale(0.6)', easing: 'steps(1, end)' },
          { offset: 0.93, ...shown },
          { offset: 1, ...shown },
        ]
    animations.push(loop(rect, keyframes, LOOP))
  })

  return animations
}

function ClusterDiagram() {
  const { t } = useTranslation()
  const id = useId()
  const plateRef = useRef(null)
  const svgRef = useRef(null)
  const layout = useWiderThan(plateRef, 500) ? 'wide' : 'tall'
  const g = LAYOUTS[layout]
  const width = commandWidth(layout)
  const [line1, line2] = g.term.lines
  const commandX = g.term.text + 2 * ADVANCE * g.font

  useLoopAnimation(svgRef, animateCluster, layout)

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
        <title id={`${id}-title`}>{t('work.k8s.diagram.title')}</title>
        <desc id={`${id}-desc`}>{t('work.k8s.diagram.desc')}</desc>

        <rect className="diagram__frame" {...box(g.frame)} rx="6" />
        <text className="diagram__label" x={g.label.x} y={g.label.y}>cluster · EKS | GKE</text>

        {g.routes.map((d) => <path key={d} className="diagram__link" d={d} />)}
        {g.routes.map((d, index) => <path key={d} className="diagram__packet" d={d} data-packet={index} />)}

        {[['ingress', g.ingress], ['service', g.service]].map(([name, rect]) => (
          <g key={name}>
            <rect className="diagram__box" {...box(rect)} rx="4" />
            <text className="diagram__name" {...center(rect)}>{name}</text>
          </g>
        ))}

        {g.nodes.map((node, n) => (
          <g key={node.y}>
            <rect className="diagram__box" {...box(node)} rx="4" />
            <rect className="diagram__active" {...box(node)} rx="4" data-active={n} />
            <text className="diagram__label" x={node.x + 14} y={node.y + node.h / 2} dominantBaseline="central">
              {`node-${n + 1}`}
            </text>
            {g.podX.slice(0, PODS).map((dx, p) => {
              const pod = { x: node.x + dx, y: node.y + 11, w: 30, h: 22 }
              return (
                <g key={dx}>
                  <rect className="diagram__pod" {...box(pod)} rx="3" data-node={n} data-pod={p} />
                  <rect className="diagram__pod diagram__pod--next" {...box(pod)} rx="3" data-node={n} data-pod={p} data-next="" />
                </g>
              )
            })}
          </g>
        ))}

        <rect className="diagram__term" {...box(g.term)} rx="6" />
        <text className="diagram__prompt" x={g.term.text} y={line1}>$</text>
        <text className="diagram__command" x={commandX} y={line1} textLength={width} lengthAdjust="spacing">
          {COMMAND}
        </text>
        <rect className="diagram__cover" x={commandX} y={line1 - g.font} width={width + 1} height={g.font * 1.35} data-cover="" />
        <g className="diagram__caret" data-caret="">
          <rect
            data-blink=""
            x={commandX + width + 1}
            y={line1 - g.font * 0.8}
            width={g.font * 0.55}
            height={g.font * 0.95}
          />
        </g>
        {g.nodes.map((node, n) => (
          <text key={node.y} className="diagram__status" x={g.term.text} y={line2} data-status={n}>
            {`updating node-${n + 1}`}
          </text>
        ))}
        <text className="diagram__status diagram__status--done" x={g.term.text} y={line2} data-status={3}>
          rollout complete
        </text>
      </svg>
    </figure>
  )
}

export default ClusterDiagram
