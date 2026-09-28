// Scene definitions for generated imagery. Each export draws onto a canvas.
import { Scene, slabGrid } from './engine.js'

const C30 = Math.cos(Math.PI / 6)
const S30 = Math.sin(Math.PI / 6)
const Z = 0.35 // slab thickness: objects stand on z = Z

/** Create a scene sized so a W×D slab (plus maxZ of height) fills the canvas. */
function setup(canvas, theme, W, D, maxZ, { fill = 0.95, topRoom = 0.07 } = {}) {
  const cw = canvas.width
  const ch = canvas.height
  const spanX = (W + D) * C30
  const spanY = (W + D) * S30 + Z + maxZ
  const s = Math.min((cw * fill) / spanX, (ch * (fill - topRoom)) / spanY)
  const ox = cw / 2 - ((W - D) * C30 * s) / 2
  const oy = ch / 2 - ((W + D) * S30 * s) / 2 + ((maxZ + Z) * s) / 2 + ch * topRoom * 0.5
  const scene = new Scene(canvas, theme, { scale: s, originX: ox, originY: oy })
  scene.box(0, 0, 0, W, D, Z, { tone: 'slab' })
  scene.overlay((sc) => slabGrid(sc, 0, 0, W, D, Z, 1), 'ground')
  return scene
}

const label = (s, x, y, z, text, dot, dx, dy, align) => s.label(x, y, z, text, { dot, dx, dy, align })

export function system(canvas, theme) {
  const s = setup(canvas, theme, 16, 12, 2.4)
  const u = s.s
  const hub = [6.4, 4.4, 3.2, 3.2]
  s.box(hub[0], hub[1], Z, hub[2], hub[3], 1.5, {
    screen: { u0: 0.15, u1: 0.85, v0: 0.3, v1: 0.75, accent: true },
    topPaint: (top, sc) => {
      const { ctx } = sc
      const q = [0.3, 0.7].flatMap((a) => [0.3, 0.7].map((b) => sc.iso(hub[0] + a * 3.2, hub[1] + b * 3.2, Z + 1.5)))
      ctx.fillStyle = sc.p.accent
      ctx.beginPath()
      ctx.moveTo(...q[0])
      ctx.lineTo(...q[2])
      ctx.lineTo(...q[3])
      ctx.lineTo(...q[1])
      ctx.closePath()
      ctx.fill()
    },
  })
  s.box(hub[0] + 0.8, hub[1] + 0.8, Z + 1.5, 1.6, 1.6, 0.35)
  s.overlay((sc) => sc.glow(8, 6, Z, 3.4, 0.4), 'before')

  const modules = [
    [1.2, 1.2, 'Payments'],
    [12.2, 1.2, 'Orders'],
    [1.2, 8.6, 'Reporting'],
    [12.2, 8.6, 'Inventory'],
    [7, 0.4, 'CRM'],
    [7.2, 9.6, 'Documents'],
  ]
  s.overlay((sc) => {
    for (const [x, y] of modules) {
      const mx = x + 1.2
      const my = y + 0.9
      sc.groundLine([[mx, my], [mx, 6], [8, 6]], { color: sc.p.paint, width: 1.4, z: Z })
      sc.groundLine([[mx, my], [mx, 6], [8, 6]], { color: sc.p.accent, width: 2, dash: [u * 0.08, u * 0.5], z: Z })
    }
  }, 'ground')
  for (const [x, y, name] of modules) {
    s.box(x, y, Z, 2.4, 1.8, 1.0, { screen: { u0: 0.15, u1: 0.85, v0: 0.3, v1: 0.75 } })
    s.label(x + 1.2, y + 0.9, Z + 1.0, name, { dot: 'muted', dy: -u * 1.0 })
  }
  s.label(8, 6, Z + 1.85, 'Your system', { dot: 'accent', dy: -u * 1.3 })
  s.render()
}

