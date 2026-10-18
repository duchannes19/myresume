// SVG attribute helpers for the "At work" diagrams. Rects are { x, y, w, h }.
export const box = ({ x, y, w, h }) => ({ x, y, width: w, height: h })

export const center = ({ x, y, w, h }) => ({
  x: x + w / 2,
  y: y + h / 2,
  textAnchor: 'middle',
  dominantBaseline: 'central',
})
