// Tiny isometric renderer for the site's generated imagery.
// Runs in the browser (loaded by render.html, driven by scripts/generate-images.mjs).

export const PALETTES = {
  dark: {
    bg: '#0a0a0c',
    bgGlow: 'rgba(242,128,62,0.07)',
    top: '#2c2c34',
    left: '#1e1e24',
    right: '#16161b',
    slabTop: '#141418',
    slabLeft: '#0f0f13',
    slabRight: '#0c0c0f',
    edge: 'rgba(255,255,255,0.075)',
    hi: 'rgba(255,255,255,0.16)',
    line: 'rgba(255,255,255,0.05)',
    paint: 'rgba(255,255,255,0.14)',
    window: 'rgba(255,255,255,0.05)',
    windowLit: 'rgba(255,214,170,0.55)',
    shadow: 0.6,
    accent: '#f2803e',
    accentL: '#c4642c',
    accentR: '#9c4c1f',
    positive: '#5fc59a',
    warning: '#e2b454',
    text: '#ededeb',
    muted: '#8b8b93',
    labelBg: 'rgba(16,16,20,0.92)',
    labelBorder: 'rgba(255,255,255,0.12)',
    grain: 9,
    vignette: 'rgba(0,0,0,0.55)',
  },
  light: {
    bg: '#f3f2ee',
    bgGlow: 'rgba(236,117,50,0.08)',
    top: '#ffffff',
    left: '#ebeae5',
    right: '#dcdbd5',
    slabTop: '#f8f7f4',
    slabLeft: '#e6e5e0',
    slabRight: '#d8d7d1',
    edge: 'rgba(20,20,30,0.09)',
    hi: 'rgba(255,255,255,1)',
    line: 'rgba(20,20,30,0.055)',
    paint: 'rgba(20,20,30,0.13)',
    window: 'rgba(20,20,30,0.06)',
    windowLit: 'rgba(236,117,50,0.55)',
    shadow: 0.2,
    accent: '#ec7532',
    accentL: '#db6427',
    accentR: '#c0541e',
    positive: '#1c8a5c',
    warning: '#b07c14',
    text: '#111114',
    muted: '#6b6b74',
    labelBg: 'rgba(255,255,255,0.96)',
    labelBorder: 'rgba(20,20,30,0.1)',
    grain: 6,
    vignette: 'rgba(120,110,95,0.12)',
  },
}

const C30 = Math.cos(Math.PI / 6)
const S30 = Math.sin(Math.PI / 6)

// Deterministic PRNG so images are reproducible.
export function rng(seed = 1) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
function quadPoint(q, u, v) {
  // q = [bottomLeft, bottomRight, topRight, topLeft]
  return lerp(lerp(q[0], q[1], u), lerp(q[3], q[2], u), v)
}

export class Scene {
  constructor(canvas, theme, { scale, originX, originY }) {
    this.c = canvas
    this.ctx = canvas.getContext('2d')
    this.p = PALETTES[theme]
    this.theme = theme
    this.s = scale
    this.ox = originX
    this.oy = originY
    this.items = []
    this.labels = []
    this.overlays = []
    this.W = canvas.width
    this.H = canvas.height
  }

  iso(x, y, z = 0) {
    return [this.ox + (x - y) * C30 * this.s, this.oy + (x + y) * S30 * this.s - z * this.s]
  }

  /** Queue a box. opts: { tone: 'clay'|'accent'|'slab', windows, ridges, topPaint, sort } */
  box(x, y, z, w, d, h, opts = {}) {
    const item = { x, y, z, w, d, h, ...opts }
    this.items.push(item)
    return item
  }

  label(x, y, z, text, { dot = 'accent', dx = 0, dy = -70, align = 'center' } = {}) {
    this.labels.push({ x, y, z, text, dot, dx, dy, align })
  }

  /** Something drawn on top of the boxes (in scene order) e.g. paths on the ground. */
  overlay(fn, layer = 'after') {
    this.overlays.push({ fn, layer })
  }

  background() {
    const { ctx, p, W, H } = this
    ctx.fillStyle = p.bg
    ctx.fillRect(0, 0, W, H)
    const g = ctx.createRadialGradient(W * 0.55, H * 0.35, 0, W * 0.55, H * 0.35, W * 0.7)
    g.addColorStop(0, p.bgGlow)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }

  faces(b) {
    const P = (x, y, z) => this.iso(x, y, z)
    const { x, y, z, w, d, h } = b
    return {
      top: [P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y, z + h), P(x, y, z + h)],
      // +y face, left on screen: [bl, br, tr, tl]
      left: [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)],
      // +x face, right on screen: [bl, br, tr, tl]
      right: [P(x + w, y + d, z), P(x + w, y, z), P(x + w, y, z + h), P(x + w, y + d, z + h)],
    }
  }

  poly(pts) {
    const { ctx } = this
    ctx.beginPath()
    ctx.moveTo(pts[0][0], pts[0][1])
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
    ctx.closePath()
  }

  colors(b) {
    const p = this.p
    if (b.tone === 'accent') return { top: p.accent, left: p.accentL, right: p.accentR }
    if (b.tone === 'slab') return { top: p.slabTop, left: p.slabLeft, right: p.slabRight }
    return { top: p.top, left: p.left, right: p.right }
  }

  drawShadows() {
    const { W, H, ctx, p } = this
    const layer = new OffscreenCanvas(W, H)
    const l = layer.getContext('2d')
    l.fillStyle = '#000'
    for (const b of this.items) {
      if (b.tone === 'slab' || b.noShadow) continue
      const k = 0.55
      const sx = b.h * k
      const sy = b.h * k * 0.25
      const z = b.z
      const pts = [
        this.iso(b.x, b.y, z),
        this.iso(b.x + b.w, b.y, z),
        this.iso(b.x + b.w + sx, b.y + sy, z),
        this.iso(b.x + b.w + sx, b.y + b.d + sy, z),
        this.iso(b.x + sx, b.y + b.d + sy, z),
        this.iso(b.x, b.y + b.d, z),
      ]
      l.beginPath()
      l.moveTo(pts[0][0], pts[0][1])
      for (const q of pts.slice(1)) l.lineTo(q[0], q[1])
      l.closePath()
      l.fill()
    }
    ctx.save()
    ctx.globalAlpha = p.shadow
    ctx.filter = `blur(${Math.round(this.s * 0.35)}px)`
    ctx.drawImage(layer, 0, 0)
    ctx.restore()
    // Contact shadow: tight, darker.
    ctx.save()
    ctx.globalAlpha = p.shadow * 0.6
    ctx.filter = `blur(${Math.max(2, Math.round(this.s * 0.06))}px)`
    const contact = new OffscreenCanvas(W, H)
    const c = contact.getContext('2d')
    c.fillStyle = '#000'
    for (const b of this.items) {
      if (b.tone === 'slab' || b.noShadow || b.z > 0.6) continue
      const pts = [this.iso(b.x, b.y, b.z), this.iso(b.x + b.w + 0.12, b.y, b.z), this.iso(b.x + b.w + 0.12, b.y + b.d + 0.05, b.z), this.iso(b.x, b.y + b.d + 0.05, b.z)]
      c.beginPath()
      c.moveTo(pts[0][0], pts[0][1])
      for (const q of pts.slice(1)) c.lineTo(q[0], q[1])
      c.closePath()
      c.fill()
    }
    ctx.drawImage(contact, 0, 0)
    ctx.restore()
  }

  shadeFace(pts, color, darken) {
    const { ctx } = this
    this.poly(pts)
    ctx.fillStyle = color
    ctx.fill()
    // Soft vertical gradient: darker towards the ground.
    const topY = Math.min(pts[2][1], pts[3][1])
    const botY = Math.max(pts[0][1], pts[1][1])
    const g = ctx.createLinearGradient(0, topY, 0, botY)
    g.addColorStop(0, 'rgba(0,0,0,0)')
    g.addColorStop(1, `rgba(0,0,0,${darken})`)
    this.poly(pts)
    ctx.fillStyle = g
    ctx.fill()
  }

  drawBox(b) {
    const { ctx, p } = this
    const f = this.faces(b)
    const col = this.colors(b)
    const dk = this.theme === 'dark' ? 0.18 : 0.06
    this.shadeFace(f.left, col.left, dk)
    this.shadeFace(f.right, col.right, dk)
    this.poly(f.top)
    ctx.fillStyle = col.top
    ctx.fill()

    if (b.topPaint) b.topPaint(f.top, this)
    if (b.windows) this.windows(b, f)
    if (b.ridges) this.ridges(f, b.ridges)
    if (b.screen) this.screen(f, b.screen)

    ctx.lineJoin = 'round'
    ctx.lineWidth = 1
    ctx.strokeStyle = p.edge
    for (const face of [f.left, f.right, f.top]) {
      this.poly(face)
      ctx.stroke()
    }
    // Catch-light on the front top edges.
    ctx.strokeStyle = b.tone === 'accent' ? 'rgba(255,220,190,0.55)' : p.hi
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(...f.top[0])
    ctx.lineTo(...f.top[1])
    ctx.lineTo(...f.top[2])
    ctx.stroke()
  }

  windows(b, f) {
    const { ctx, p } = this
    const { cols = 4, rows = 3, lit = [], litRight = [] } = b.windows
    const draw = (face, faceCols, litSet, side) => {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < faceCols; c++) {
          const u0 = (c + 0.22) / faceCols
          const u1 = (c + 0.78) / faceCols
          const v0 = (r + 0.28) / rows
          const v1 = (r + 0.72) / rows
          const q = [quadPoint(face, u0, v0), quadPoint(face, u1, v0), quadPoint(face, u1, v1), quadPoint(face, u0, v1)]
          this.poly(q)
          const isLit = litSet.some(([lr, lc]) => lr === r && lc === c)
          ctx.fillStyle = isLit ? p.windowLit : side === 'left' ? p.window : p.window
          ctx.fill()
          if (isLit) {
            ctx.save()
            ctx.shadowColor = p.accent
            ctx.shadowBlur = this.s * 0.5
            ctx.fillStyle = p.accent
            ctx.globalAlpha = 0.8
            this.poly(q)
            ctx.fill()
            ctx.restore()
          }
        }
      }
    }
    draw(f.left, Math.max(1, Math.round(b.w * (b.windows.density || 1.1))), lit, 'left')
    draw(f.right, Math.max(1, Math.round(b.d * (b.windows.density || 1.1))), litRight, 'right')
  }

  ridges(f, n) {
    const { ctx, p } = this
    ctx.strokeStyle = p.edge
    ctx.lineWidth = 1
    for (const face of [f.left, f.right]) {
      for (let i = 1; i < n; i++) {
        const u = i / n
        const a = quadPoint(face, u, 0.06)
        const b = quadPoint(face, u, 0.94)
        ctx.beginPath()
        ctx.moveTo(...a)
        ctx.lineTo(...b)
        ctx.stroke()
      }
    }
  }

  /** A small glowing "screen" on the left face (for modules / cabs). */
  screen(f, { u0 = 0.2, u1 = 0.8, v0 = 0.35, v1 = 0.8, accent = false } = {}) {
    const { ctx, p } = this
    const q = [quadPoint(f.left, u0, v0), quadPoint(f.left, u1, v0), quadPoint(f.left, u1, v1), quadPoint(f.left, u0, v1)]
    this.poly(q)
    ctx.fillStyle = accent ? p.windowLit : p.window
    ctx.fill()
    ctx.strokeStyle = p.edge
    ctx.stroke()
  }

  /** Straight line on the ground plane, in world coordinates. */
  groundLine(pts, { color, width = 1, dash = null, z = 0 } = {}) {
    const { ctx } = this
    ctx.save()
    ctx.strokeStyle = color || this.p.paint
    ctx.lineWidth = width
    if (dash) ctx.setLineDash(dash)
    ctx.beginPath()
    pts.forEach(([x, y], i) => {
      const q = this.iso(x, y, z)
      i ? ctx.lineTo(...q) : ctx.moveTo(...q)
    })
    ctx.stroke()
    ctx.restore()
  }

  glow(x, y, z, radius, alpha = 0.35) {
    const { ctx, p } = this
    const [cx, cy] = this.iso(x, y, z)
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * this.s)
    g.addColorStop(0, p.accent)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.globalCompositeOperation = this.theme === 'dark' ? 'lighter' : 'multiply'
    if (this.theme === 'light') ctx.globalAlpha = alpha * 0.35
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.ellipse(cx, cy, radius * this.s, radius * this.s * 0.55, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  drawLabels() {
    const { ctx, p } = this
    const fs = Math.round(this.s * 0.33)
    ctx.font = `500 ${fs}px "Geist Mono", ui-monospace, monospace`
    for (const l of this.labels) {
      const [ax, ay] = this.iso(l.x, l.y, l.z)
      const tx = ax + l.dx
      const ty = ay + l.dy
      // leader
      ctx.strokeStyle = p.labelBorder
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(ax, ay)
      ctx.lineTo(tx, ty)
      ctx.stroke()
      ctx.fillStyle = p.accent
      ctx.beginPath()
      ctx.arc(ax, ay, Math.max(2.5, fs * 0.18), 0, Math.PI * 2)
      ctx.fill()

      const padX = fs * 0.8
      const dot = fs * 0.36
      const tw = ctx.measureText(l.text).width
      const w = tw + padX * 2 + dot + fs * 0.45
      const h = fs * 2.1
      const x = l.align === 'center' ? tx - w / 2 : l.align === 'left' ? tx : tx - w
      const y = ty - h / 2
      ctx.save()
      ctx.shadowColor = this.theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(40,30,20,0.12)'
      ctx.shadowBlur = fs * 1.2
      ctx.shadowOffsetY = fs * 0.3
      ctx.fillStyle = p.labelBg
      ctx.beginPath()
      ctx.roundRect(x, y, w, h, h / 2)
      ctx.fill()
      ctx.restore()
      ctx.strokeStyle = p.labelBorder
      ctx.beginPath()
      ctx.roundRect(x + 0.5, y + 0.5, w - 1, h - 1, h / 2)
      ctx.stroke()
      ctx.fillStyle = p[l.dot] || p.accent
      ctx.beginPath()
      ctx.arc(x + padX + dot / 2, ty, dot / 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = p.text
      ctx.textBaseline = 'middle'
      ctx.fillText(l.text, x + padX + dot + fs * 0.45, ty + 1)
    }
  }

  finish(seed = 7) {
    const { ctx, p, W, H } = this
    // Vignette
    const g = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.75)
    g.addColorStop(0, 'rgba(0,0,0,0)')
    g.addColorStop(1, p.vignette)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
    // Film grain
    const img = ctx.getImageData(0, 0, W, H)
    const r = rng(seed)
    for (let i = 0; i < img.data.length; i += 4) {
      const n = (r() - 0.5) * p.grain * 2
      img.data[i] += n
      img.data[i + 1] += n
      img.data[i + 2] += n
    }
    ctx.putImageData(img, 0, 0)
  }

  render() {
    this.background()
    const slabs = this.items.filter((b) => b.tone === 'slab')
    const rest = this.items.filter((b) => b.tone !== 'slab')
    for (const b of slabs) this.drawBox(b)
    for (const o of this.overlays.filter((o) => o.layer === 'ground')) o.fn(this)
    this.drawShadows()
    for (const o of this.overlays.filter((o) => o.layer === 'before')) o.fn(this)
    rest.sort((a, b) => (a.sort ?? a.x + a.w / 2 + a.y + a.d / 2) - (b.sort ?? b.x + b.w / 2 + b.y + b.d / 2) || a.z - b.z)
    for (const b of rest) this.drawBox(b)
    for (const o of this.overlays.filter((o) => o.layer === 'after')) o.fn(this)
    this.drawLabels()
    this.finish()
  }
}

/** Grid lines painted on the top of a slab. */
export function slabGrid(scene, x0, y0, w, d, z, step = 1) {
  for (let x = x0 + step; x < x0 + w; x += step) scene.groundLine([[x, y0], [x, y0 + d]], { color: scene.p.line, z })
  for (let y = y0 + step; y < y0 + d; y += step) scene.groundLine([[x0, y], [x0 + w, y]], { color: scene.p.line, z })
}
