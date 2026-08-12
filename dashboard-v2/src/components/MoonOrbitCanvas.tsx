/**
 * Dual-layer hero moon on one rAF loop. Both canvases sit at z-[2] (above
 * DotGlobe z-[1], below copy z-10). When behind, only the *visual Earth disk*
 * is punched — never the square cobe container — so the moon stays visible
 * until it actually hits the globe limb.
 *
 * Sprite is NASA Galileo PIA00405 (public domain) clipped to the lunar disk,
 * with a light photometric wrap so it still reads as a sphere at icon size.
 * No extra WebGL — smoke + cobe already occupy GPU slots.
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
const MOON_TEX = 512
const EDGE_FADE_PX = 28
const MOON_PHOTO = '/moon.jpg'

type OrbitLayer = 'front' | 'behind'

function loadMoonPhoto(): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('moon photo failed'))
    img.src = MOON_PHOTO
  })
}

/** Tight circle around the bright lunar disk (ignore the black NASA frame). */
function detectDisk(img: HTMLImageElement): { sx: number; sy: number; sr: number } {
  const w = img.naturalWidth || img.width
  const h = img.naturalHeight || img.height
  const probe = 160
  const c = document.createElement('canvas')
  c.width = probe
  c.height = probe
  const ctx = c.getContext('2d', { willReadFrequently: true })
  if (!ctx) return { sx: 0, sy: 0, sr: Math.min(w, h) / 2 }
  ctx.drawImage(img, 0, 0, probe, probe)
  const data = ctx.getImageData(0, 0, probe, probe).data
  let minX = probe
  let minY = probe
  let maxX = 0
  let maxY = 0
  for (let y = 0; y < probe; y++) {
    for (let x = 0; x < probe; x++) {
      const i = (y * probe + x) * 4
      const luma = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
      if (luma < 18) continue
      if (x < minX) minX = x
      if (y < minY) minY = y
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
    }
  }
  if (maxX <= minX || maxY <= minY) {
    return { sx: 0, sy: 0, sr: Math.min(w, h) / 2 }
  }
  const scaleX = w / probe
  const scaleY = h / probe
  const cx = ((minX + maxX) / 2) * scaleX
  const cy = ((minY + maxY) / 2) * scaleY
  const r = (Math.max(maxX - minX, maxY - minY) / 2) * ((scaleX + scaleY) / 2)
  return { sx: cx - r, sy: cy - r, sr: r }
}

function bakeFromPhoto(img: HTMLImageElement, isLight: boolean): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = MOON_TEX
  c.height = MOON_TEX
  const ctx = c.getContext('2d')
  if (!ctx) return c

  const disk = detectDisk(img)
  ctx.save()
  ctx.beginPath()
  ctx.arc(MOON_TEX / 2, MOON_TEX / 2, MOON_TEX / 2 - 0.5, 0, Math.PI * 2)
  ctx.clip()
  ctx.drawImage(
    img,
    disk.sx,
    disk.sy,
    disk.sr * 2,
    disk.sr * 2,
    0,
    0,
    MOON_TEX,
    MOON_TEX,
  )
  ctx.restore()

  // Soft photometric wrap — keeps maria/craters, adds a little volume at icon size.
  const overlay = ctx.getImageData(0, 0, MOON_TEX, MOON_TEX)
  const data = overlay.data
  const lx = -0.35
  const ly = 0.42
  const lz = 0.84
  const inv = 1 / Math.hypot(lx, ly, lz)
  const Lx = lx * inv
  const Ly = ly * inv
  const Lz = lz * inv
  const lift = isLight ? 0.92 : 1
  for (let py = 0; py < MOON_TEX; py++) {
    for (let px = 0; px < MOON_TEX; px++) {
      const nx = ((px + 0.5) / MOON_TEX) * 2 - 1
      const ny = -(((py + 0.5) / MOON_TEX) * 2 - 1)
      const r2 = nx * nx + ny * ny
      const i = (py * MOON_TEX + px) * 4
      if (r2 > 1) {
        data[i + 3] = 0
        continue
      }
      const nz = Math.sqrt(1 - r2)
      let ndl = nx * Lx + ny * Ly + nz * Lz
      if (ndl < 0) ndl = 0
      const wrap = 0.62 + 0.38 * ndl
      const limb = 1 - Math.pow(r2, 2.4) * 0.18
      const k = wrap * limb * lift
      data[i] = Math.max(0, Math.min(255, data[i] * k))
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] * k))
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] * k))
      data[i + 3] = Math.round(255 * Math.min(1, (1 - r2) * 80))
    }
  }
  ctx.putImageData(overlay, 0, 0)
  return c
}

/** Last-resort rock sphere if the NASA photo fails to load. */
function bakeFallback(isLight: boolean): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = MOON_TEX
  c.height = MOON_TEX
  const ctx = c.getContext('2d')
  if (!ctx) return c
  const img = ctx.createImageData(MOON_TEX, MOON_TEX)
  const data = img.data
  const rock = isLight ? 168 : 186
  for (let py = 0; py < MOON_TEX; py++) {
    for (let px = 0; px < MOON_TEX; px++) {
      const nx = ((px + 0.5) / MOON_TEX) * 2 - 1
      const ny = -(((py + 0.5) / MOON_TEX) * 2 - 1)
      const r2 = nx * nx + ny * ny
      const i = (py * MOON_TEX + px) * 4
      if (r2 > 1) continue
      const nz = Math.sqrt(1 - r2)
      const ndl = Math.max(0, nx * -0.35 + ny * 0.42 + nz * 0.84)
      const n =
        Math.sin(nx * 17.3 + ny * 13.1) * 0.04 +
        Math.sin(nx * 41 + ny * 29.7) * 0.025 +
        Math.sin((nx + ny) * 73.2) * 0.015
      const shade = 0.55 + 0.45 * ndl + n
      data[i] = Math.max(0, Math.min(255, rock * shade))
      data[i + 1] = Math.max(0, Math.min(255, (rock - 8) * shade))
      data[i + 2] = Math.max(0, Math.min(255, (rock - 18) * shade))
      data[i + 3] = 255
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

    let cancelled = false
    const isLight = () => document.documentElement.classList.contains('light')
    let sprite = bakeFallback(isLight())
    let running = true
    let inView = true
    let raf = 0
    let geo = layout(wrap)
    sizeCanvas(behind, geo)
    sizeCanvas(front, geo)

    const rebakeFrom = (img: HTMLImageElement | null) => {
      sprite = img ? bakeFromPhoto(img, isLight()) : bakeFallback(isLight())
    }

    let photo: HTMLImageElement | null = null
    loadMoonPhoto()
      .then((img) => {
        if (cancelled) return
        photo = img
        rebakeFrom(img)
      })
      .catch(() => {
        if (!cancelled) rebakeFrom(null)
      })

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
      rebakeFrom(photo)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    raf = requestAnimationFrame(tick)

    return () => {
      cancelled = true
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
