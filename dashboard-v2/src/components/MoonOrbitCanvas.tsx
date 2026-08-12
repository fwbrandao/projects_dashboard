/**
 * Dual-layer hero moon on one rAF loop. Both canvases sit at z-[2] (above
 * DotGlobe z-[1], below copy z-10). The behind canvas punches the Earth disk
 * so the moon never shines through continents, while still wrapping around
 * cobe's square canvas.
 *
 * Shading is a Lambert sphere + baked craters on a 2D canvas (no extra WebGL
 * context — smoke + cobe already occupy GPU slots). pointer-events-none so
 * globe drag still works.
 */

import { useEffect, useRef } from 'react'
import { DEFAULT_ORBIT, moonPose, thetaAt, type MoonPose } from '../lib/moonOrbit'
import { useReducedMotion } from '../lib/useReducedMotion'

/** Matches DotGlobe `offset: [0, 20]` (cobe backing-store pixels). */
const COBE_OFFSET_Y = 20
const GLOBE_FILL = 0.96
const GLOBE_RADIUS_FACTOR = 0.5
const MOON_TEX = 256
const EDGE_FADE_PX = 28

type OrbitLayer = 'front' | 'behind'

type ThemeMoon = {
  rock: [number, number, number]
  rockHi: [number, number, number]
  crater: [number, number, number]
}

function readTheme(): ThemeMoon {
  const isLight = document.documentElement.classList.contains('light')
  if (isLight) {
    return {
      rock: [168, 160, 148],
      rockHi: [214, 206, 192],
      crater: [120, 114, 104],
    }
  }
  return {
    rock: [186, 178, 164],
    rockHi: [232, 224, 210],
    crater: [118, 112, 102],
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
  const lx = -0.42
  const ly = 0.48
  const lz = 0.77
  const inv = 1 / Math.hypot(lx, ly, lz)
  const Lx = lx * inv
  const Ly = ly * inv
  const Lz = lz * inv

  const craters = [
    { x: -0.22, y: 0.18, r: 0.16, d: 0.38 },
    { x: 0.32, y: -0.12, r: 0.11, d: 0.32 },
    { x: 0.08, y: 0.42, r: 0.09, d: 0.28 },
    { x: -0.4, y: -0.28, r: 0.13, d: 0.34 },
    { x: 0.18, y: 0.08, r: 0.06, d: 0.22 },
    { x: -0.08, y: -0.36, r: 0.07, d: 0.26 },
    { x: 0.44, y: 0.3, r: 0.08, d: 0.24 },
    { x: -0.52, y: 0.12, r: 0.05, d: 0.2 },
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
      const nz = Math.sqrt(1 - r2)
      let ndl = nx * Lx + ny * Ly + nz * Lz
      if (ndl < 0) ndl = 0

      let crater = 0
      for (const c0 of craters) {
        const dx = nx - c0.x
        const dy = ny - c0.y
        const d2 = dx * dx + dy * dy
        const rr = c0.r * c0.r
        if (d2 < rr) {
          const t = 1 - d2 / rr
          crater = Math.max(crater, t * t * c0.d)
        }
      }

      const wrap = 0.12 + 0.88 * ndl
      const shade = wrap * (1 - crater * 0.55)
      const rim = Math.pow(1 - r2, 0.35) * 0.08
      const mixR = theme.rock[0] + (theme.rockHi[0] - theme.rock[0]) * shade
      const mixG = theme.rock[1] + (theme.rockHi[1] - theme.rock[1]) * shade
      const mixB = theme.rock[2] + (theme.rockHi[2] - theme.rock[2]) * shade
      const r = mixR * (1 - crater) + theme.crater[0] * crater + rim * 40
      const g = mixG * (1 - crater) + theme.crater[1] * crater + rim * 36
      const b = mixB * (1 - crater) + theme.crater[2] * crater + rim * 28
      const terminator = ndl < 0.08 ? ndl / 0.08 : 1
      data[i] = Math.max(0, Math.min(255, r * (0.22 + 0.78 * terminator)))
      data[i + 1] = Math.max(0, Math.min(255, g * (0.22 + 0.78 * terminator)))
      data[i + 2] = Math.max(0, Math.min(255, b * (0.22 + 0.78 * terminator)))
      data[i + 3] = Math.round(255 * Math.min(1, (1 - r2) * 18))
    }
  }
  ctx.putImageData(img, 0, 0)
  return c
}

function layout(wrap: HTMLElement) {
  const rect = wrap.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const displaySize = Math.min(rect.width, rect.height) * GLOBE_FILL
  const globeR = displaySize * GLOBE_RADIUS_FACTOR
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
    // Even if cobe's square canvas is opaque, never shine through the Earth disk.
    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(cx, cy, globeR * 0.98, 0, Math.PI * 2)
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
