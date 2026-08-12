/**
 * Dual-layer hero moon on one rAF loop. Both canvases sit at z-[2] (above
 * DotGlobe z-[1], below copy z-10). When behind, only the *visual Earth disk*
 * is punched — never the square cobe container — so the moon stays visible
 * until it actually hits the globe limb.
 *
 * Shading is a Lambert + Phong sphere with crater bowls / rims (no extra
 * WebGL — smoke + cobe already occupy GPU slots). pointer-events-none so
 * globe drag still works.
 */

import { useEffect, useRef } from 'react'
import {
  DEFAULT_ORBIT,
  moonPose,
  thetaAt,
  visualGlobeDiskRadiusPx,
  type MoonPose,
} from '../lib/moonOrbit'
import { useReducedMotion } from '../lib/useReducedMotion'

/** Matches DotGlobe `offset: [0, 20]` (cobe backing-store pixels). */
const COBE_OFFSET_Y = 20
const GLOBE_FILL = 0.96
const COBE_SCALE = 1
const MOON_TEX = 384
const EDGE_FADE_PX = 28

type OrbitLayer = 'front' | 'behind'

type ThemeMoon = {
  rock: [number, number, number]
  rockHi: [number, number, number]
  crater: [number, number, number]
  rim: [number, number, number]
}

function readTheme(): ThemeMoon {
  const isLight = document.documentElement.classList.contains('light')
  if (isLight) {
    return {
      rock: [158, 150, 138],
      rockHi: [228, 220, 206],
      crater: [102, 96, 88],
      rim: [236, 230, 218],
    }
  }
  return {
    rock: [176, 168, 154],
    rockHi: [240, 232, 216],
    crater: [92, 86, 78],
    rim: [248, 242, 228],
  }
}

function bakeMoon(theme: ThemeMoon): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = MOON_TEX
  c.height = MOON_TEX
  const ctx = c.getContext('2d')
  if (!ctx) return c

  const img = ctx.createImageData(MOON_TEX, MOON_TEX)
  const data = img.data
  // Key light upper-left, slight fill so the dark side still reads as volume.
  const lx = -0.48
  const ly = 0.52
  const lz = 0.71
  const inv = 1 / Math.hypot(lx, ly, lz)
  const Lx = lx * inv
  const Ly = ly * inv
  const Lz = lz * inv

  const craters = [
    { x: -0.22, y: 0.18, r: 0.18, d: 0.55 },
    { x: 0.34, y: -0.14, r: 0.12, d: 0.48 },
    { x: 0.08, y: 0.44, r: 0.1, d: 0.42 },
    { x: -0.42, y: -0.28, r: 0.15, d: 0.5 },
    { x: 0.2, y: 0.06, r: 0.07, d: 0.36 },
    { x: -0.08, y: -0.38, r: 0.08, d: 0.4 },
    { x: 0.46, y: 0.28, r: 0.09, d: 0.38 },
    { x: -0.54, y: 0.1, r: 0.055, d: 0.32 },
    { x: 0.02, y: -0.08, r: 0.045, d: 0.3 },
    { x: -0.16, y: 0.48, r: 0.05, d: 0.28 },
  ]

  for (let py = 0; py < MOON_TEX; py++) {
    for (let px = 0; px < MOON_TEX; px++) {
      const nx = ((px + 0.5) / MOON_TEX) * 2 - 1
      const ny = -(((py + 0.5) / MOON_TEX) * 2 - 1)
      const r2 = nx * nx + ny * ny
      const i = (py * MOON_TEX + px) * 4
      if (r2 > 1) {
        data[i] = 0
        data[i + 1] = 0
        data[i + 2] = 0
        data[i + 3] = 0
        continue
      }

      // Sphere normal + crater bowl displacement (pushes normal inward).
      let nz = Math.sqrt(Math.max(0, 1 - r2))
      let nnx = nx
      let nny = ny
      let crater = 0
      let rim = 0
      for (const c0 of craters) {
        const dx = nx - c0.x
        const dy = ny - c0.y
        const d = Math.hypot(dx, dy)
        if (d >= c0.r * 1.18) continue
        const u = d / c0.r
        if (u < 1) {
          const bowl = (1 - u * u) * c0.d
          crater = Math.max(crater, bowl)
          // Fake slope toward crater center.
          const slope = c0.d * (1 - u) * 0.85
          if (d > 1e-4) {
            nnx -= (dx / d) * slope
            nny -= (dy / d) * slope
          }
        } else {
          // Raised rim just outside the bowl.
          const t = 1 - (u - 1) / 0.18
          rim = Math.max(rim, t * t * 0.45)
        }
      }

      const nlen = Math.hypot(nnx, nny, nz) || 1
      nnx /= nlen
      nny /= nlen
      nz /= nlen

      let ndl = nnx * Lx + nny * Ly + nz * Lz
      if (ndl < 0) ndl = 0

      // Phong specular — small hot highlight so it reads as a ball, not a disk.
      const specBase = Math.max(0, 2 * ndl * nz - Lz)
      const spec = Math.pow(specBase, 28) * 0.55 * (1 - crater * 0.7)

      const wrap = 0.16 + 0.84 * ndl
      const shade = wrap * (1 - crater * 0.62) + rim * 0.28
      const limb = Math.pow(1 - r2, 0.55) * 0.1

      const mixR = theme.rock[0] + (theme.rockHi[0] - theme.rock[0]) * shade
      const mixG = theme.rock[1] + (theme.rockHi[1] - theme.rock[1]) * shade
      const mixB = theme.rock[2] + (theme.rockHi[2] - theme.rock[2]) * shade
      let r = mixR * (1 - crater) + theme.crater[0] * crater
      let g = mixG * (1 - crater) + theme.crater[1] * crater
      let b = mixB * (1 - crater) + theme.crater[2] * crater
      r += theme.rim[0] * rim * 0.22 + spec * 255 + limb * 36
      g += theme.rim[1] * rim * 0.2 + spec * 248 + limb * 32
      b += theme.rim[2] * rim * 0.16 + spec * 230 + limb * 24

      const terminator = ndl < 0.12 ? 0.12 + (ndl / 0.12) * 0.88 : 1
      data[i] = Math.max(0, Math.min(255, r * terminator))
      data[i + 1] = Math.max(0, Math.min(255, g * terminator))
      data[i + 2] = Math.max(0, Math.min(255, b * terminator))
      // Hard circular alpha so the sprite reads as a sphere, not a soft blob.
      data[i + 3] = Math.round(255 * Math.min(1, (1 - r2) * 40))
    }
  }
  ctx.putImageData(img, 0, 0)
  return c
}

function layout(wrap: HTMLElement) {
  const rect = wrap.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const displaySize = Math.min(rect.width, rect.height) * GLOBE_FILL
  const globeR = visualGlobeDiskRadiusPx(displaySize, COBE_SCALE)
  return {
    w: rect.width,
    h: rect.height,
    dpr,
    cx: rect.width / 2,
    cy: rect.height / 2 + COBE_OFFSET_Y / dpr,
    globeR,
  }
}

function edgeFade(x: number, y: number, r: number, w: number, h: number): number {
  const left = x - r
  const right = w - (x + r)
  const top = y - r
  const bot = h - (y + r)
  const m = Math.min(left, right, top, bot, EDGE_FADE_PX)
  if (m >= EDGE_FADE_PX) return 1
  if (m <= 0) return 0
  return m / EDGE_FADE_PX
}

function drawLayer(
  ctx: CanvasRenderingContext2D,
  pose: MoonPose,
  layer: OrbitLayer,
  geo: ReturnType<typeof layout>,
  sprite: HTMLCanvasElement,
) {
  const { w, h, dpr, cx, cy, globeR } = geo
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)
  if (pose.layer !== layer) return

  const px = cx + pose.x * globeR
  const py = cy - pose.y * globeR
  const pr = pose.radius * pose.scale * globeR
  const fade = edgeFade(px, py, pr, w, h)
  if (fade <= 0.01 || pr < 0.5) return

  ctx.save()
  ctx.globalAlpha = fade
  ctx.drawImage(sprite, px - pr, py - pr, pr * 2, pr * 2)
  ctx.restore()

  if (layer === 'behind') {
    // Punch only the visual Earth *disk* (cobe globe), not the square canvas.
    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(cx, cy, globeR, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

function sizeCanvas(canvas: HTMLCanvasElement, geo: ReturnType<typeof layout>) {
  const bw = Math.max(1, Math.floor(geo.w * geo.dpr))
  const bh = Math.max(1, Math.floor(geo.h * geo.dpr))
  if (canvas.width !== bw) canvas.width = bw
  if (canvas.height !== bh) canvas.height = bh
}

export default function MoonOrbitCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const behindRef = useRef<HTMLCanvasElement>(null)
  const frontRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const behind = behindRef.current
    const front = frontRef.current
    if (!wrap || !behind || !front) return

    const behindCtx = behind.getContext('2d', { alpha: true })
    const frontCtx = front.getContext('2d', { alpha: true })
    if (!behindCtx || !frontCtx) return

    let sprite = bakeMoon(readTheme())
    let running = true
    let inView = true
    let raf = 0
    let geo = layout(wrap)
    sizeCanvas(behind, geo)
    sizeCanvas(front, geo)

    const tick = () => {
      if (!running) return
      raf = requestAnimationFrame(tick)
      if (!inView || document.hidden) return
      const theta = reduced
        ? DEFAULT_ORBIT.reducedMotionTheta
        : thetaAt(performance.now(), DEFAULT_ORBIT.periodMs)
      const pose = moonPose(theta)
      drawLayer(behindCtx, pose, 'behind', geo, sprite)
      drawLayer(frontCtx, pose, 'front', geo, sprite)
    }

    let io: IntersectionObserver | null = null
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([entry]) => {
        inView = entry?.isIntersecting ?? true
      })
      io.observe(wrap)
    }

    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        geo = layout(wrap)
        sizeCanvas(behind, geo)
        sizeCanvas(front, geo)
      })
      ro.observe(wrap)
    }

    const mo = new MutationObserver(() => {
      sprite = bakeMoon(readTheme())
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io?.disconnect()
      ro?.disconnect()
      mo.disconnect()
    }
  }, [reduced])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
    >
      <canvas
        ref={behindRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <canvas
        ref={frontRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  )
}
