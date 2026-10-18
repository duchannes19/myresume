import { useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EASE, loop, pulse, pulses, travel, typed, useLoopAnimation } from '../../hooks/useLoopAnimation'
import { useWiderThan } from '../../hooks/useWiderThan'
import { box, center } from './geometry'

const LOOP = 10000
const ADVANCE = 0.65 // Martian Mono advance at 87.5% width, in em
const CONTROL = ['etcd', 'api-server', 'scheduler', 'controller']
const PODS = 3
const CHIPS = 3

// Terraform owns the control plane, the node groups and the provider add-ons;
// Helm owns its charts. One command per tool, typed on the same terminal line.
const COMMANDS = [
  { text: 'terraform apply', type: [0.01, 0.05], shown: [0, 0.45] },
  { text: 'helm upgrade -i addons ./charts', type: [0.46, 0.53], shown: [0.46, 0.94] },
]

// Second terminal line. `gke` swaps in on every other loop.
const STATUS = [
  { eks: '+ control plane', at: [0.08, 0.2] },
  { eks: '+ nodegroups', gke: '+ node pools', at: [0.22, 0.34] },
  { eks: '+ EKS add-ons', gke: '+ GKE add-ons', at: [0.36, 0.4] },
  { eks: 'Apply complete', at: [0.42, 0.45] },
  { eks: 'release "addons" upgraded', at: [0.55, 0.62] },
  { eks: 'scheduling pods', at: [0.64, 0.84] },
  { eks: 'cluster ready', at: [0.86, 0.94], done: true },
]

// When the scheduler places pods on each of the four nodes.
const PLACE = [0.66, 0.705, 0.75, 0.795]

// Three planes, as a labelled column of bands (wide) or stacked sections (tall).
const LAYOUTS = {
  wide: {
    width: 560,
    height: 342,
    font: 12,
    term: { x: 8, y: 8, w: 544, h: 56, text: 22, lines: [30, 52] },
    frame: { x: 8, y: 76, w: 544, h: 258 },
    title: { x: 22, y: 98 },
    planes: [{ x: 22, y: 132 }, { x: 22, y: 218 }, { x: 22, y: 300 }],
    rules: ['M16 164 H544', 'M16 268 H544'],
    control: [136, 240, 344, 448].map((x) => ({ x, y: 116, w: 92, h: 32 })),
    chain: ['M228 132 H240', 'M332 132 H344', 'M436 132 H448'],
    groups: [136, 344].map((x) => ({ x, y: 176, w: 196, h: 84 })),
    node: { dy: 28, h: 46, xs: [10, 102], w: 84, pod: 18, gap: 6 },
    bus: ['M390 148 V168 H234 V176', 'M390 148 V168 H442 V176'],
    infra: [136, 344].map((x) => ({ x, y: 278, w: 196, h: 44 })),
  },
  tall: {
    width: 320,
    height: 560,
    font: 13,
    term: { x: 8, y: 8, w: 304, h: 60, text: 20, lines: [32, 54] },
    frame: { x: 8, y: 80, w: 304, h: 472 },
    title: { x: 20, y: 102 },
    planes: [{ x: 20, y: 126 }, { x: 20, y: 236 }, { x: 20, y: 440 }],
    rules: ['M16 216 H304', 'M16 420 H304'],
    control: [[24, 138], [164, 138], [164, 176], [24, 176]].map(([x, y]) => ({ x, y, w: 132, h: 30 })),
    chain: ['M156 153 H164', 'M230 168 V176', 'M164 191 H156'],
    groups: [250, 336].map((y) => ({ x: 24, y, w: 272, h: 76 })),
    node: { dy: 30, h: 38, xs: [10, 141], w: 121, pod: 20, gap: 8 },
    bus: ['M230 206 V226 H304 V288 H296', 'M230 206 V226 H304 V374 H296'],
    infra: [452, 500].map((y) => ({ x: 24, y, w: 272, h: 40 })),
  },
}

const PLANES = ['control plane', 'data plane', 'infra plane']
const GROUPS = [
  { eks: 'nodegroup-1', gke: 'node-pool-1' },
  { eks: 'nodegroup-2', gke: 'node-pool-2' },
]
const INFRA = [{ eks: 'EKS add-ons', gke: 'GKE add-ons' }, { eks: 'Helm charts' }]

const commandWidth = (text, layout) => text.length * ADVANCE * LAYOUTS[layout].font

const nodesOf = (g) =>
  g.groups.flatMap((group) =>
    g.node.xs.map((dx) => ({ x: group.x + dx, y: group.y + g.node.dy, w: g.node.w, h: g.node.h })),
  )

function podsOf(node, { pod, gap }) {
  const left = node.x + (node.w - (PODS * pod + (PODS - 1) * gap)) / 2
  return Array.from({ length: PODS }, (_, k) => ({ x: left + k * (pod + gap), y: node.y + (node.h - pod) / 2, w: pod, h: pod }))
}

const chipsOf = (rect) =>
  Array.from({ length: CHIPS }, (_, k) => ({ x: rect.x + rect.w - 90 + k * 28, y: rect.y + (rect.h - 16) / 2, w: 22, h: 16 }))

function animateCluster(root, layout) {
  const all = (selector) => [...root.querySelectorAll(selector)]
  const hidden = { opacity: 0 }
  const shown = { opacity: 1 }
  const lit = (from) => pulse(from, 0.94, hidden, shown)
  const animations = []
  const add = (element, keyframes, duration = LOOP) => animations.push(loop(element, keyframes, duration))

  // EKS on one loop, GKE on the next: labels cross-fade while the scene is reset.
  all('[data-flavour]').forEach((group) => {
    const eks = group.dataset.flavour === 'eks'
    add(group, [
      { offset: 0, opacity: eks ? 1 : 0 },
      { offset: 0.485, opacity: eks ? 1 : 0 },
      { offset: 0.5, opacity: eks ? 0 : 1 },
      { offset: 0.985, opacity: eks ? 0 : 1 },
      { offset: 1, opacity: eks ? 1 : 0 },
    ], LOOP * 2)
  })

  // Terminal: each command types itself, then gives way to the next.
  COMMANDS.forEach(({ text, type: [from, to], shown: [on, off] }, index) => {
    const width = commandWidth(text, layout)
    add(root.querySelector(`[data-cmd="${index}"]`), pulse(on, off, hidden, shown, 0.005))
    add(root.querySelector(`[data-cover="${index}"]`), typed(from, to, 'scaleX(1)', 'scaleX(0)', text.length))
    const caret = root.querySelector(`[data-caret="${index}"]`)
    add(caret, pulse(from, to + 0.02, hidden, shown, 0.001))
    add(caret, typed(from, to, `translateX(${-width}px)`, 'translateX(0)', text.length))
  })
  all('[data-blink]').forEach((rect) => {
    add(rect, [
      { offset: 0, opacity: 1 },
      { offset: 0.5, opacity: 1, easing: 'steps(1, end)' },
      { offset: 0.51, opacity: 0 },
      { offset: 1, opacity: 0 },
    ], 1000)
  })
  all('[data-status]').forEach((text) => {
    const [from, to] = STATUS[Number(text.dataset.status)].at
    add(text, pulse(from, to, hidden, shown))
  })

  // terraform apply: control plane, then node groups and nodes, then provider add-ons.
  all('[data-control]').forEach((rect) => add(rect, lit(0.08 + Number(rect.dataset.control) * 0.03)))
  all('[data-group]').forEach((rect) => add(rect, lit(0.22 + Number(rect.dataset.group) * 0.05)))
  all('[data-node]').forEach((rect) => add(rect, lit(0.24 + Number(rect.dataset.node) * 0.025)))
  all('[data-infra]').forEach((rect) => add(rect, lit(rect.dataset.infra === '0' ? 0.36 : 0.54)))
  all('[data-chip]').forEach((rect) => {
    const start = rect.dataset.chip === '0' ? 0.36 : 0.55
    add(rect, lit(start + Number(rect.dataset.k) * 0.012))
  })

  // The control plane at work: api-server and etcd record the change, the
  // scheduler places pods node by node, the controller reconciles after each.
  const around = (shift, width = 0.015) => PLACE.map((t) => [t + shift, t + shift + width])
  const flashes = [around(-0.06), around(-0.06), around(-0.035), around(0.035)]
  all('[data-flash]').forEach((rect) => {
    add(rect, pulses(flashes[Number(rect.dataset.flash)], hidden, shown, 0.006))
  })
  all('[data-place]').forEach((path) => {
    const t = PLACE[Number(path.dataset.place)]
    animations.push(travel(path, t - 0.03, t - 0.002, LOOP))
  })
  all('[data-pod]').forEach((rect) => {
    const start = PLACE[Number(rect.dataset.pod)] + Number(rect.dataset.k) * 0.012
    const out = { opacity: 0, transform: 'scale(0.4)' }
    const placed = { opacity: 1, transform: 'scale(1)' }
    add(rect, [
      { offset: 0, ...out },
      { offset: start, ...out, easing: EASE },
      { offset: start + 0.03, ...placed },
      { offset: 0.94, ...placed },
      { offset: 0.97, opacity: 0, transform: 'scale(1)' },
      { offset: 1, ...out },
    ])
  })

  return animations
}

// A label that reads differently on EKS and GKE loops. Plain text when it doesn't.
function Flavoured({ eks, gke, ...props }) {
  if (!gke) return <text {...props}>{eks}</text>
  return (
    <>
      <g data-flavour="eks"><text {...props}>{eks}</text></g>
      <g data-flavour="gke" className="diagram__flavour--alt"><text {...props}>{gke}</text></g>
    </>
  )
}

function ClusterDiagram() {
  const { t } = useTranslation()
  const id = useId()
  const plateRef = useRef(null)
  const svgRef = useRef(null)
  const layout = useWiderThan(plateRef, 500) ? 'wide' : 'tall'
  const g = LAYOUTS[layout]
  const [line1, line2] = g.term.lines
  const commandX = g.term.text + 2 * ADVANCE * g.font
  const nodes = nodesOf(g)

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

        <rect className="diagram__term" {...box(g.term)} rx="6" />
        <text className="diagram__prompt" x={g.term.text} y={line1}>$</text>
        {COMMANDS.map(({ text }, index) => {
          const width = commandWidth(text, layout)
          return (
            <g key={text}>
              <g className={index === 0 ? 'diagram__cmd--past' : undefined} data-cmd={index}>
                <text x={commandX} y={line1} textLength={width} lengthAdjust="spacing">{text}</text>
                <rect
                  className="diagram__cover"
                  x={commandX}
                  y={line1 - g.font}
                  width={width + 1}
                  height={g.font * 1.35}
                  data-cover={index}
                />
              </g>
              <g className="diagram__caret" data-caret={index}>
                <rect
                  data-blink=""
                  x={commandX + width + 1}
                  y={line1 - g.font * 0.8}
                  width={g.font * 0.55}
                  height={g.font * 0.95}
                />
              </g>
            </g>
          )
        })}
        {STATUS.map(({ eks, gke, done }, index) => (
          <Flavoured
            key={eks}
            eks={eks}
            gke={gke}
            className={done ? 'diagram__status diagram__status--done' : 'diagram__status'}
            x={g.term.text}
            y={line2}
            data-status={index}
          />
        ))}

        <rect className="diagram__frame" {...box(g.frame)} rx="6" />
        <Flavoured eks="cluster · EKS" gke="cluster · GKE" className="diagram__label" x={g.title.x} y={g.title.y} />
        {g.rules.map((d) => <path key={d} className="diagram__frame" d={d} />)}
        {PLANES.map((name, index) => (
          <text key={name} className="diagram__plane" x={g.planes[index].x} y={g.planes[index].y} dominantBaseline="central">
            {name}
          </text>
        ))}

        {/* Control plane */}
        {g.chain.map((d) => <path key={d} className="diagram__link" d={d} />)}
        {g.control.map((rect, index) => (
          <g key={CONTROL[index]}>
            <rect className="diagram__box" {...box(rect)} rx="4" />
            <rect className="diagram__box diagram__box--lit" {...box(rect)} rx="4" data-control={index} />
            <rect className="diagram__active" {...box(rect)} rx="4" data-flash={index} />
            <text className="diagram__name" {...center(rect)}>{CONTROL[index]}</text>
          </g>
        ))}

        {/* Data plane */}
        {g.bus.map((d) => <path key={d} className="diagram__link" d={d} />)}
        {nodes.map((node, index) => (
          <path key={index} className="diagram__packet" d={g.bus[Math.floor(index / 2)]} data-place={index} />
        ))}
        {g.groups.map((group, index) => (
          <g key={group.x + group.y}>
            <rect className="diagram__box" {...box(group)} rx="4" />
            <rect className="diagram__ring" {...box(group)} rx="4" data-group={index} />
            <Flavoured
              {...GROUPS[index]}
              className="diagram__label"
              x={group.x + 10}
              y={group.y + (layout === 'wide' ? 15 : 16)}
              dominantBaseline="central"
            />
          </g>
        ))}
        {nodes.map((node, n) => (
          <g key={node.x + node.y}>
            <rect className="diagram__box" {...box(node)} rx="3" />
            <rect className="diagram__box diagram__box--lit" {...box(node)} rx="3" data-node={n} />
            {podsOf(node, g.node).map((pod, k) => (
              <rect key={pod.x} className="diagram__pod diagram__pod--next" {...box(pod)} rx="2" data-pod={n} data-k={k} />
            ))}
          </g>
        ))}

        {/* Infra plane */}
        {g.infra.map((rect, index) => (
          <g key={rect.x + rect.y}>
            <rect className="diagram__box" {...box(rect)} rx="4" />
            <rect className="diagram__ring" {...box(rect)} rx="4" data-infra={index} />
            <Flavoured
              {...INFRA[index]}
              className="diagram__name"
              x={rect.x + 12}
              y={rect.y + rect.h / 2}
              dominantBaseline="central"
            />
            {chipsOf(rect).map((chip, k) => (
              <g key={chip.x}>
                <rect className="diagram__box" {...box(chip)} rx="3" />
                <rect className="diagram__box diagram__box--lit" {...box(chip)} rx="3" data-chip={index} data-k={k} />
              </g>
            ))}
          </g>
        ))}
      </svg>
    </figure>
  )
}

export default ClusterDiagram
