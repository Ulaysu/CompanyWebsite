// Scene definitions for generated imagery. Each export draws onto a canvas.
import { Scene, PALETTES, rng, slabGrid } from './engine.js'

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

export function fleet(canvas, theme) {
  const s = setup(canvas, theme, 16, 11, 3)
  const u = s.s

  // Containers along the back
  s.box(1, 0.6, Z, 3.2, 1.2, 1.1, { ridges: 14 })
  s.box(4.5, 0.6, Z, 3.2, 1.2, 1.1, { ridges: 14 })
  s.box(1, 0.6, Z + 1.1, 3.2, 1.2, 1.1, { ridges: 14, sort: 3.2 })
  // Site office
  s.box(12, 0.8, Z, 3.2, 2, 1.4, { windows: { rows: 1, density: 1.1 } })

  // Generators
  for (let i = 0; i < 4; i++) s.box(1 + i * 1.55, 3.3, Z, 1.15, 0.9, 0.85, { ridges: 6 })

  // Telehandler (accent: the tracked asset)
  s.box(8, 4, Z, 2.4, 1.3, 0.55, { tone: 'accent' })
  s.box(8.2, 4.2, Z + 0.55, 0.8, 0.9, 0.9, { tone: 'accent', screen: { accent: false } })
  for (let k = 0; k < 5; k++) s.box(9.05 + k * 0.36, 4.45, Z + 0.62 + k * 0.3, 0.46, 0.4, 0.3, { tone: 'accent', noShadow: k > 0 })
  s.overlay((sc) => sc.glow(9.2, 4.6, Z, 2.6, 0.35), 'before')

  // Bays
  s.overlay((sc) => {
    for (const x of [1.4, 6.9, 11.3, 15.5]) sc.groundLine([[x, 6.6], [x, 10.3]], { z: Z, width: 1.4 })
    sc.groundLine([[0.6, 6.2], [15.4, 6.2]], { z: Z, dash: [u * 0.25, u * 0.2] })
  }, 'ground')

  // Flatbed truck
  s.box(2, 7.6, Z, 3.4, 1.3, 0.45)
  s.box(2.2, 7.7, Z + 0.45, 2.3, 1.1, 0.75, { ridges: 8 })
  s.box(5.4, 7.6, Z, 1.1, 1.3, 1.25, { screen: { u0: 0.25, u1: 0.75, v0: 0.5, v1: 0.85 } })
  // Van
  s.box(7.8, 7.7, Z, 2.4, 1.2, 1.1)
  s.box(10.2, 7.7, Z, 0.75, 1.2, 0.75, { screen: { u0: 0.15, u1: 0.85, v0: 0.45, v1: 0.85 } })
  // Excavator
  s.box(12, 6.8, Z, 2.4, 0.45, 0.4)
  s.box(12, 7.9, Z, 2.4, 0.45, 0.4)
  s.box(12.3, 7, Z + 0.4, 1.8, 1.3, 0.7)
  s.box(12.4, 7.1, Z + 1.1, 0.8, 0.8, 0.7, { screen: {} })
  s.box(14.1, 7.45, Z + 0.7, 0.35, 0.35, 1.6, { sort: 30 })
  s.box(14.1, 7.45, Z + 2.3, 1.2, 0.35, 0.3, { sort: 30.1 })

  label(s, 9.6, 4.6, Z + 2.2, 'TH-12 · On hire', 'accent', 0, -u * 1.3)
  label(s, 3.6, 3.7, Z + 0.85, 'GEN-60 · Available', 'positive', -u * 0.4, -u * 1.5)
  label(s, 13.2, 7.4, Z + 1.8, 'EX-08 · Service due', 'warning', u * 0.8, -u * 1.6)
  s.render()
}

export function property(canvas, theme) {
  const s = setup(canvas, theme, 16, 12, 5)
  const u = s.s
  const blocks = [
    [1, 1, 3.8, 4, 3.2],
    [6.1, 1, 3.8, 4, 4.8],
    [11.2, 1, 3.8, 4, 2.4],
    [1, 6.8, 3.8, 4, 2.0],
    [6.1, 6.8, 3.8, 4, 3.6, [[2, 1]]],
    [11.2, 6.8, 3.8, 4, 2.8],
  ]
  s.overlay((sc) => {
    sc.groundLine([[5.45, 0.3], [5.45, 11.7]], { z: Z, dash: [u * 0.3, u * 0.25], width: 1.3 })
    sc.groundLine([[10.55, 0.3], [10.55, 11.7]], { z: Z, dash: [u * 0.3, u * 0.25], width: 1.3 })
    sc.groundLine([[0.3, 5.9], [15.7, 5.9]], { z: Z, dash: [u * 0.3, u * 0.25], width: 1.3 })
  }, 'ground')
  for (const [x, y, w, d, h, lit = []] of blocks) {
    const rows = Math.max(1, Math.round(h * 1.25))
    const key = x + w / 2 + y + d / 2
    s.box(x, y, Z, w, d, h, { windows: { rows, density: 1.3, lit }, sort: key })
    // Roof plant: drawn straight after its building.
    s.box(x + w * 0.55, y + d * 0.25, Z + h, 0.7, 0.6, 0.3, { sort: key + 0.01, noShadow: true })
    s.box(x + w * 0.2, y + d * 0.6, Z + h, 0.5, 0.5, 0.22, { sort: key + 0.02, noShadow: true })
  }
  // Planters
  for (const [x, y] of [[4.8, 5.3], [9.9, 5.3], [0.4, 11], [15, 0.4]]) s.box(x, y, Z, 0.5, 0.5, 0.35)
  s.overlay((sc) => sc.glow(8, 10.8, Z + 1.2, 2.2, 0.25), 'before')

  label(s, 7.1, 10.8, Z + 2.2, 'Unit 4B · Renewal due', 'accent', -u * 2.8, -u * 2.2)
  label(s, 8, 3, Z + 4.8, 'Block C · 2 open jobs', 'warning', u * 1.2, -u * 1.1)
  label(s, 13.1, 8.8, Z + 2.8, 'Unit 7C · Signed', 'positive', u * 2, -u * 0.9)
  s.render()
}

export function wholesale(canvas, theme) {
  const s = setup(canvas, theme, 16, 12, 3.2)
  const u = s.s
  const r = rng(11)
  // Explicit painter order: row (y), then height, then x.
  const key = (x, y, z, w, d) => (y + d / 2) * 100 + z * 10 + (x + w / 2) * 0.1
  const add = (x, y, z, w, d, h, o = {}) => s.box(x, y, z, w, d, h, { sort: key(x, y, z, w, d), ...o })

  const rows = [1.2, 4.3, 7.4]
  const accentSlots = new Set(['2-1-1', '2-1-2', '2-0-2'])
  rows.forEach((y, ri) => {
    for (let lv = 0; lv < 3; lv++) {
      const z = Z + lv * 1.05
      add(1, y, z + 0.9, 9, 1.1, 0.08)
      for (let slot = 0; slot < 6; slot++) {
        if (r() < 0.2) continue
        const accent = accentSlots.has(`${ri}-${lv}-${slot}`)
        const h = 0.55 + r() * 0.25
        add(1.15 + slot * 1.47, y + 0.12, z, 1.25, 0.86, Math.min(h, 0.86), { tone: accent ? 'accent' : undefined, noShadow: lv > 0 })
      }
    }
    // Corner posts: back posts first, front posts last in the row.
    for (const x of [1, 5.44, 9.88]) {
      add(x, y, Z, 0.12, 0.12, 3.05, { noShadow: true, sort: y * 100 - 1 + x * 0.1 })
      add(x, y + 0.98, Z, 0.12, 0.12, 3.05, { sort: (y + 1.1) * 100 + 60 + x * 0.1 })
    }
  })

  // Dock and truck
  add(12.2, 6.4, Z, 1.4, 4.6, 0.55)
  add(13.9, 7.2, Z, 1.6, 1.3, 1.25, { screen: { u0: 0.2, u1: 0.8, v0: 0.5, v1: 0.85 } })
  add(13.9, 8.5, Z, 1.6, 2.6, 1.55, { ridges: 10 })
  add(12.4, 1, Z, 2.8, 2.6, 1.8, { windows: { rows: 1, density: 0.9 } })

  s.overlay((sc) => {
    sc.groundLine([[3.3, 8.7], [3.3, 9.3], [11.4, 9.3], [11.4, 8.7], [12.2, 8.7]], { color: sc.p.accent, width: 2, dash: [u * 0.22, u * 0.16], z: Z })
    sc.groundLine([[0.6, 3.6], [11.5, 3.6]], { z: Z, width: 1.2 })
    sc.groundLine([[0.6, 6.7], [11.5, 6.7]], { z: Z, width: 1.2 })
  }, 'ground')
  s.overlay((sc) => sc.glow(3.5, 8.1, Z, 2.4, 0.3), 'before')

  label(s, 3.3, 7.8, Z + 1.85, 'SO-10482 · Allocated', 'accent', -u * 2.2, -u * 2.6)
  label(s, 14.6, 9.5, Z + 1.6, 'Dock 2 · Loading', 'positive', u * 0.6, -u * 1.5)
  label(s, 7.2, 1.7, Z + 3.1, 'SKU-331 · Low stock', 'warning', u * 1.8, -u * 1.0)
  s.render()
}

export function admin(canvas, theme) {
  const s = setup(canvas, theme, 15, 10, 3.2)
  const u = s.s
  const r = rng(5)

  // Document stacks
  const stack = (x, y, n, tone) => {
    for (let i = 0; i < n; i++) {
      const jx = (r() - 0.5) * 0.18
      const jy = (r() - 0.5) * 0.18
      s.box(x + jx, y + jy, Z + i * 0.09, 2, 1.45, 0.07, { noShadow: i > 0, sort: x + y + 1.7 + i * 0.001, tone: i === n - 1 ? tone : undefined })
    }
  }
  stack(1.4, 1.4, 9)
  stack(1.4, 5.8, 5)
  stack(4.6, 1.2, 4)

  // Approval block with a check mark on top
  s.box(6.4, 3.6, Z, 2.6, 2.6, 0.9, {
    topPaint: (top, sc) => {
      const { ctx } = sc
      const pt = (a, b) => sc.iso(6.4 + a * 2.6, 3.6 + b * 2.6, Z + 0.9)
      ctx.save()
      ctx.strokeStyle = sc.p.accent
      ctx.lineWidth = sc.s * 0.14
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.moveTo(...pt(0.28, 0.52))
      ctx.lineTo(...pt(0.44, 0.7))
      ctx.lineTo(...pt(0.74, 0.3))
      ctx.stroke()
      ctx.restore()
    },
  })
  s.overlay((sc) => sc.glow(7.7, 4.9, Z, 2.2, 0.28), 'before')

  // Floating task cards
  const cards = [
    [6.6, 0.6, 2.6, 'accent'],
    [0.6, 3.6, 2.0],
    [11.4, 0.6, 2.2],
  ]
  for (const [x, y, z, tone] of cards) {
    s.box(x, y, Z + z, 1.8, 1.2, 0.08, { tone, noShadow: true, sort: 100 })
  }
  s.overlay((sc) => {
    for (const [x, y, z] of cards) {
      const a = sc.iso(x + 0.9, y + 0.6, Z)
      const b = sc.iso(x + 0.9, y + 0.6, Z + z)
      sc.ctx.save()
      sc.ctx.strokeStyle = sc.p.paint
      sc.ctx.setLineDash([u * 0.1, u * 0.1])
      sc.ctx.beginPath()
      sc.ctx.moveTo(...a)
      sc.ctx.lineTo(...b)
      sc.ctx.stroke()
      sc.ctx.restore()
    }
    sc.groundLine([[3.4, 2.1], [6.4, 2.1], [6.4, 4.9]], { color: sc.p.accent, width: 2, dash: [u * 0.2, u * 0.15], z: Z })
    sc.groundLine([[3.4, 6.5], [5.2, 6.5], [5.2, 5.5], [6.4, 5.5]], { color: sc.p.paint, width: 1.5, dash: [u * 0.2, u * 0.15], z: Z })
    sc.groundLine([[9, 4.9], [10.8, 4.9]], { color: sc.p.accent, width: 2, dash: [u * 0.2, u * 0.15], z: Z })
  }, 'ground')

  // Report bars
  const heights = [0.8, 1.3, 1.0, 1.7, 2.3]
  heights.forEach((h, i) => s.box(10.8 + i * 0.75, 3.8, Z, 0.5, 1.6, h, { tone: i === heights.length - 1 ? 'accent' : undefined }))

  label(s, 7.5, 1.2, Z + 2.7, 'Approved · Finance', 'accent', 0, -u * 1.1)
  label(s, 2.4, 2.1, Z + 0.85, 'INV-2041 · Sent', 'positive', -u * 1.2, -u * 1.4)
  label(s, 13.8, 4.6, Z + 2.3, 'Monthly report · Ready', 'muted', u * 0.6, -u * 1.2)
  s.render()
}

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

export function process(canvas, theme) {
  const steps = ['Understand', 'Map', 'Design', 'Build', 'Deploy', 'Improve']
  const s = setup(canvas, theme, 19, 6, 3, { fill: 0.96, topRoom: 0.14 })
  const u = s.s
  s.overlay((sc) => {
    const pts = steps.map((_, i) => [1.9 + i * 3, 3])
    sc.ctx.save()
    sc.ctx.strokeStyle = sc.p.accent
    sc.ctx.lineWidth = 2
    sc.ctx.setLineDash([u * 0.18, u * 0.14])
    sc.ctx.beginPath()
    pts.forEach(([x, y], i) => {
      const q = sc.iso(x, y, Z + 0.3 + i * 0.45)
      i ? sc.ctx.lineTo(...q) : sc.ctx.moveTo(...q)
    })
    sc.ctx.stroke()
    sc.ctx.restore()
  }, 'after')
  steps.forEach((name, i) => {
    const h = 0.3 + i * 0.45
    s.box(0.8 + i * 3, 1.5, Z, 2.2, 3, h, { tone: i === steps.length - 1 ? 'accent' : undefined })
    s.label(1.9 + i * 3, 3, Z + h, `0${i + 1} ${name}`, { dot: i === steps.length - 1 ? 'accent' : 'muted', dy: -u * (1.1 + (i % 2) * 0.55) })
  })
  s.overlay((sc) => sc.glow(16.9, 3, Z, 2.4, 0.35), 'before')
  s.render()
}

/** Abstract "chaos to order" line field for page backgrounds. */
export function field(canvas, theme) {
  const p = PALETTES[theme]
  const ctx = canvas.getContext('2d')
  const W = canvas.width
  const H = canvas.height
  // Matches the page background exactly so the image blends into the hero.
  ctx.fillStyle = theme === 'dark' ? '#08080a' : '#f7f6f3'
  ctx.fillRect(0, 0, W, H)
  const glow = ctx.createRadialGradient(W * 0.78, H * 0.45, 0, W * 0.78, H * 0.45, W * 0.5)
  glow.addColorStop(0, p.bgGlow)
  glow.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, H)

  const r = rng(3)
  const lanes = 64
  const top = H * 0.12
  const spacing = (H * 0.76) / lanes
  const smooth = (a, b, x) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)
  }
  const angle = (x, y) =>
    Math.sin(x * 0.0042 + Math.sin(y * 0.0061) * 2.1) * 1.9 + Math.cos(y * 0.0033 - x * 0.0021) * 1.3

  for (let i = 0; i < lanes; i++) {
    const target = top + i * spacing
    const accent = i % 13 === 6
    for (let copy = 0; copy < 2; copy++) {
      let x = -20
      let y = r() * H
      ctx.beginPath()
      ctx.moveTo(x, y)
      const step = 3
      while (x < W + 20) {
        const t = smooth(W * 0.34, W * 0.7, x)
        const a = angle(x, y) * (1 - t)
        x += Math.max(0.6, Math.cos(a)) * step
        y += Math.sin(a) * step * (1 - t) + (target - y) * 0.035 * t
        ctx.lineTo(x, y)
      }
      ctx.strokeStyle = accent ? p.accent : theme === 'dark' ? 'rgba(255,255,255,1)' : 'rgba(20,20,30,1)'
      ctx.globalAlpha = accent ? 0.55 : theme === 'dark' ? 0.09 : 0.1
      ctx.lineWidth = accent ? 1.4 : 1
      ctx.stroke()
      ctx.globalAlpha = 1
    }
  }

  // Grain
  const img = ctx.getImageData(0, 0, W, H)
  const n = rng(9)
  for (let i = 0; i < img.data.length; i += 4) {
    const v = (n() - 0.5) * p.grain * 2
    img.data[i] += v
    img.data[i + 1] += v
    img.data[i + 2] += v
  }
  ctx.putImageData(img, 0, 0)
}
