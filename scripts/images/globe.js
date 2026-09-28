// Africa-centred network globe: land as a dot matrix, arcs travelling outward.
// Rendered on a transparent canvas so it sits on any dark section.
import { geoOrthographic, geoContains, geoDistance, geoInterpolate, geoRotation, geoGraticule10, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

const deg = Math.PI / 180

/** Where the arcs start: a point on the West African coast. */
const ORIGIN = [-15.5, 12.5]
const DESTINATIONS = [
  [-0.1, 51.5], // London
  [2.35, 48.9], // Paris
  [-74, 40.7], // New York
  [-79.4, 43.7], // Toronto
  [-46.6, -23.5], // São Paulo
  [3.4, 6.5], // Lagos
  [36.8, -1.3], // Nairobi
  [28, -26.2], // Johannesburg
  [31.2, 30], // Cairo
  [55.3, 25.2], // Dubai
  [72.8, 19], // Mumbai
]

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Rough Africa test so the continent reads slightly brighter than the rest of the world.
function inAfrica([lon, lat]) {
  if (lat > 37.5 || lat < -35.5 || lon < -18.5 || lon > 52) return false
  if (lon > 43 && lat > 11.5) return false // Arabian peninsula
  if (lon > 32.5 && lat > 29.5) return false // Levant
  return true
}

export async function globe(canvas) {
  const topo = await (await fetch('/node_modules/world-atlas/land-50m.json')).json()
  const land = feature(topo, topo.objects.land)

  const W = canvas.width
  const H = canvas.height
  const ctx = canvas.getContext('2d')
  const R = Math.min(W, H) * 0.36
  const cx = W / 2
  const cy = H / 2
  const rotate = [-4, -16, 0]
  const center = [4, 16]
  const projection = geoOrthographic().scale(R).translate([cx, cy]).rotate(rotate).clipAngle(90)
  const rot = geoRotation(rotate)
  const path = geoPath(projection, ctx)

  // Atmosphere glow
  const glow = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.32)
  glow.addColorStop(0, 'rgba(92,207,230,0.20)')
  glow.addColorStop(0.35, 'rgba(92,207,230,0.07)')
  glow.addColorStop(1, 'rgba(92,207,230,0)')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(cx, cy, R * 1.32, 0, Math.PI * 2)
  ctx.fill()

  // Ocean sphere
  const ocean = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R)
  ocean.addColorStop(0, '#12213a')
  ocean.addColorStop(0.7, '#0a1426')
  ocean.addColorStop(1, '#060c18')
  ctx.fillStyle = ocean
  ctx.beginPath()
  ctx.arc(cx, cy, R, 0, Math.PI * 2)
  ctx.fill()

  // Graticule
  ctx.beginPath()
  path(geoGraticule10())
  ctx.strokeStyle = 'rgba(140,180,220,0.06)'
  ctx.lineWidth = 1
  ctx.stroke()

  // Land dots
  const step = 1.05
  for (let lat = -84; lat <= 84; lat += step) {
    const lonStep = step / Math.max(0.2, Math.cos(lat * deg))
    for (let lon = -180; lon < 180; lon += lonStep) {
      const p = [lon, lat]
      const d = geoDistance(p, center)
      if (d > Math.PI / 2 - 0.02) continue
      if (!geoContains(land, p)) continue
      const [x, y] = projection(p)
      const facing = Math.cos(d) // 1 at centre, 0 at the limb
      const africa = inAfrica(p)
      const r = (africa ? 2.3 : 1.9) * (0.45 + 0.55 * facing) * (W / 2000)
      ctx.globalAlpha = (africa ? 0.95 : 0.7) * (0.3 + 0.7 * facing)
      ctx.fillStyle = africa ? '#eef3f9' : '#8fb2d6'
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  ctx.globalAlpha = 1

  // Limb shading for depth
  const limb = ctx.createRadialGradient(cx, cy, R * 0.55, cx, cy, R)
  limb.addColorStop(0, 'rgba(6,9,16,0)')
  limb.addColorStop(1, 'rgba(6,9,16,0.55)')
  ctx.fillStyle = limb
  ctx.beginPath()
  ctx.arc(cx, cy, R, 0, Math.PI * 2)
  ctx.fill()

  // Screen position of a lon/lat lifted `alt` (fraction of R) above the surface.
  const lift = (p, alt) => {
    const [lon, lat] = rot(p)
    const x = Math.cos(lat * deg) * Math.sin(lon * deg)
    const y = Math.sin(lat * deg)
    const z = Math.cos(lat * deg) * Math.cos(lon * deg)
    const k = R * (1 + alt)
    const visible = z > 0 || Math.hypot(x, y) * (1 + alt) > 1.002
    return { x: cx + k * x, y: cy - k * y, visible }
  }

  // Arcs
  const r = rng(4)
  for (const dest of DESTINATIONS) {
    const dist = geoDistance(ORIGIN, dest)
    const h = 0.04 + dist * 0.16
    const interp = geoInterpolate(ORIGIN, dest)
    const n = 120
    const pts = []
    for (let i = 0; i <= n; i++) {
      const t = i / n
      pts.push({ t, ...lift(interp(t), h * Math.sin(Math.PI * t)) })
    }
    const a = pts[0]
    const b = pts[pts.length - 1]
    const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
    grad.addColorStop(0, 'rgba(242,128,62,0.95)')
    grad.addColorStop(1, 'rgba(92,207,230,0.9)')
    ctx.save()
    ctx.strokeStyle = grad
    ctx.lineWidth = 2.2 * (W / 2000)
    ctx.lineCap = 'round'
    ctx.shadowColor = 'rgba(92,207,230,0.6)'
    ctx.shadowBlur = 10 * (W / 2000)
    ctx.beginPath()
    let drawing = false
    for (const p of pts) {
      if (!p.visible) {
        drawing = false
        continue
      }
      if (!drawing) ctx.moveTo(p.x, p.y)
      else ctx.lineTo(p.x, p.y)
      drawing = true
    }
    ctx.stroke()
    ctx.restore()

    // Travelling pulse somewhere along each arc
    const pulse = pts[Math.floor((0.35 + r() * 0.5) * n)]
    if (pulse.visible) {
      ctx.fillStyle = 'rgba(220,245,255,0.95)'
      ctx.beginPath()
      ctx.arc(pulse.x, pulse.y, 3.2 * (W / 2000), 0, Math.PI * 2)
      ctx.fill()
    }

    if (b.visible && geoDistance(dest, center) < Math.PI / 2) {
      const halo = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, 16 * (W / 2000))
      halo.addColorStop(0, 'rgba(92,207,230,0.55)')
      halo.addColorStop(1, 'rgba(92,207,230,0)')
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(b.x, b.y, 16 * (W / 2000), 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#bff1fb'
      ctx.beginPath()
      ctx.arc(b.x, b.y, 3.6 * (W / 2000), 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Origin
  const o = lift(ORIGIN, 0)
  for (const [rad, alpha] of [[46, 0.12], [30, 0.22], [18, 0.45]]) {
    ctx.strokeStyle = `rgba(242,128,62,${alpha})`
    ctx.lineWidth = 1.5 * (W / 2000)
    ctx.beginPath()
    ctx.arc(o.x, o.y, rad * (W / 2000), 0, Math.PI * 2)
    ctx.stroke()
  }
  const og = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, 28 * (W / 2000))
  og.addColorStop(0, 'rgba(242,128,62,0.8)')
  og.addColorStop(1, 'rgba(242,128,62,0)')
  ctx.fillStyle = og
  ctx.beginPath()
  ctx.arc(o.x, o.y, 28 * (W / 2000), 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#ffd9c2'
  ctx.beginPath()
  ctx.arc(o.x, o.y, 6 * (W / 2000), 0, Math.PI * 2)
  ctx.fill()
}
