/**
 * Dual-layer 2D Starship mission. No extra WebGL (cobe + smoke already fight).
 * z-[3] above moon. pointer-events-none. Behind layer punches the Earth disk.
 */

import { useEffect, useRef } from 'react'
import { BOCA_CHICA, projectLatLon, type Vec3 } from '../lib/geoProject'
import {
  TRAIL_CAP,
  clearTrail,
  createTrail,
  pushTrail,
  trailAlpha,
  type Trail,
} from '../lib/flightTrail'
import { getGlobeView } from '../lib/globeView'
import { DEFAULT_ORBIT, moonPose, thetaAt, visualGlobeDiskRadiusPx } from '../lib/moonOrbit'
import {
  STACK_HEIGHT,
  createMission,
  flightPose,
  stepMission,
  type FlightPose,
  type VehiclePose,
} from '../lib/starshipFlight'
import { useReducedMotion } from '../lib/useReducedMotion'

const COBE_OFFSET_Y = 20
const GLOBE_FILL = 0.96
const COBE_SCALE = 1
const EDGE_FADE_PX = 28

type Layer = 'front' | 'behind'

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

function sizeCanvas(canvas: HTMLCanvasElement, geo: ReturnType<typeof layout>) {
  const bw = Math.max(1, Math.floor(geo.w * geo.dpr))
  const bh = Math.max(1, Math.floor(geo.h * geo.dpr))
  if (canvas.width !== bw) canvas.width = bw
  if (canvas.height !== bh) canvas.height = bh
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

function screenOf(p: Vec3, geo: ReturnType<typeof layout>) {
  return {
    x: geo.cx + p.x * geo.globeR,
    y: geo.cy - p.y * geo.globeR,
    behind: p.z < 0,
  }
}

function drawPlume(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  h: number,
  strength: number,
  heading: number,
) {
  if (strength <= 0.02) return
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(heading + Math.PI)
  const len = h * (1.4 + strength)
  const grd = ctx.createLinearGradient(0, 0, 0, len)
  grd.addColorStop(0, `rgba(47, 246, 246, ${0.85 * strength})`)
  grd.addColorStop(0.45, `rgba(166, 140, 255, ${0.45 * strength})`)
  grd.addColorStop(1, `rgba(255, 92, 247, 0)`)
  ctx.fillStyle = grd
  ctx.beginPath()
  ctx.moveTo(-h * 0.18, 0)
  ctx.lineTo(h * 0.18, 0)
  ctx.lineTo(0, len)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

function drawShip(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  h: number,
  heading: number,
  alpha: number,
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(heading)
  ctx.globalAlpha = alpha
  ctx.fillStyle = 'rgba(214, 220, 228, 0.95)'
  ctx.beginPath()
  ctx.moveTo(0, -h * 0.55)
  ctx.quadraticCurveTo(h * 0.12, -h * 0.2, h * 0.1, h * 0.2)
  ctx.lineTo(h * 0.16, h * 0.38)
  ctx.lineTo(0, h * 0.28)
  ctx.lineTo(-h * 0.16, h * 0.38)
  ctx.lineTo(-h * 0.1, h * 0.2)
  ctx.quadraticCurveTo(-h * 0.12, -h * 0.2, 0, -h * 0.55)
  ctx.closePath()
  ctx.fill()
  ctx.fillStyle = 'rgba(47, 246, 246, 0.35)'
  ctx.fillRect(-h * 0.035, -h * 0.12, h * 0.07, h * 0.28)
  ctx.restore()
}

function drawBooster(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  h: number,
  heading: number,
  alpha: number,
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(heading)
  ctx.globalAlpha = alpha
  ctx.fillStyle = 'rgba(188, 196, 206, 0.95)'
  const w = h * 0.16
  ctx.beginPath()
  ctx.roundRect(-w, -h * 0.42, w * 2, h * 0.84, h * 0.06)
  ctx.fill()
  ctx.strokeStyle = 'rgba(166, 140, 255, 0.7)'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.moveTo(-w * 1.6, -h * 0.22)
  ctx.lineTo(-w, -h * 0.08)
  ctx.moveTo(w * 1.6, -h * 0.22)
  ctx.lineTo(w, -h * 0.08)
  ctx.stroke()
  ctx.restore()
}

function drawTrail(
  ctx: CanvasRenderingContext2D,
  trail: Trail,
  layer: Layer,
  geo: ReturnType<typeof layout>,
  color: string,
) {
  const pts = trail.samples
  if (pts.length < 2) return
  ctx.save()
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineWidth = 1.6
  for (let i = 1; i < pts.length; i++) {
    const a = screenOf(pts[i - 1]!, geo)
    const b = screenOf(pts[i]!, geo)
    if (b.behind !== (layer === 'behind')) continue
    const alpha = trailAlpha(i, pts.length)
    if (alpha < 0.02) continue
    ctx.strokeStyle = color
    ctx.globalAlpha = alpha * 0.72
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.stroke()
  }
  ctx.restore()
}

function drawLayer(
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  geo: ReturnType<typeof layout>,
  pose: FlightPose,
  pad: Vec3,
  shipTrail: Trail,
  boosterTrail: Trail,
) {
  const { w, h, dpr, cx, cy, globeR } = geo
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)
  if (pose.phase === 'idle' && !pose.ship.visible) return

  drawTrail(ctx, shipTrail, layer, geo, 'rgba(47, 246, 246, 1)')
  drawTrail(ctx, boosterTrail, layer, geo, 'rgba(166, 140, 255, 1)')

  const stackPx = STACK_HEIGHT * globeR
  const drawOne = (veh: VehiclePose, kind: 'ship' | 'booster', plume: number) => {
    if (!veh.visible) return
    const scr = screenOf(veh, geo)
    if (scr.behind !== (layer === 'behind')) return
    const fade = edgeFade(scr.x, scr.y, stackPx, w, h)
    if (fade <= 0.01) return
    const head = veh.heading
    if (plume > 0) drawPlume(ctx, scr.x, scr.y, stackPx, plume * fade, head)
    if (kind === 'ship') drawShip(ctx, scr.x, scr.y, stackPx, head, fade)
    else drawBooster(ctx, scr.x, scr.y, stackPx * 0.85, head, fade)
  }

  drawOne(pose.ship, 'ship', pose.plume)
  if (pose.booster) drawOne(pose.booster, 'booster', pose.phase === 'hot_stage' ? pose.plume * 0.6 : 0)

  if (pose.flash > 0.05 && layer === 'front') {
    const scr = screenOf(pose.ship, geo)
    ctx.save()
    ctx.globalAlpha = pose.flash * 0.55
    ctx.fillStyle = 'rgba(255, 220, 180, 0.9)'
    ctx.beginPath()
    ctx.arc(scr.x, scr.y, stackPx * 0.9, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  if (pose.dust > 0.05 && layer === 'front') {
    const padScr = screenOf(pad, geo)
    ctx.save()
    ctx.globalAlpha = pose.dust * 0.35
    ctx.fillStyle = 'rgba(200, 196, 188, 0.5)'
    ctx.beginPath()
    ctx.ellipse(padScr.x, padScr.y, stackPx * 1.4, stackPx * 0.45, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  if (layer === 'behind') {
    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(cx, cy, globeR, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

export default function StarshipLaunchCanvas() {
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

    let running = true
    let inView = true
    let raf = 0
    let geo = layout(wrap)
    sizeCanvas(behind, geo)
    sizeCanvas(front, geo)

    let mission = createMission()
    let prevBocaZ = projectLatLon(
      BOCA_CHICA.lat,
      BOCA_CHICA.lon,
      getGlobeView().phi,
      getGlobeView().theta,
    ).z
    const shipTrail = createTrail(TRAIL_CAP)
    const boosterTrail = createTrail(TRAIL_CAP)
    let boosterLanded = false

    const tick = () => {
      if (!running) return
      raf = requestAnimationFrame(tick)
      if (!inView || document.hidden) return

      const now = performance.now()
      const view = getGlobeView()
      const pad = projectLatLon(BOCA_CHICA.lat, BOCA_CHICA.lon, view.phi, view.theta)
      mission = stepMission(mission, {
        nowMs: now,
        prevBocaZ,
        bocaZ: pad.z,
        reducedMotion: reduced,
      })
      prevBocaZ = pad.z

      const moonTheta = reduced
        ? DEFAULT_ORBIT.reducedMotionTheta
        : thetaAt(now, DEFAULT_ORBIT.periodMs)
      const moon = moonPose(moonTheta)
      const missionTime = mission.startedAtMs == null ? 0 : now - mission.startedAtMs
      const pose = flightPose({
        missionTimeMs: missionTime,
        pad,
        moon,
        reducedMotion: reduced || mission.phase === 'idle',
      })

      if (pose.phase === 'idle' || reduced) {
        clearTrail(shipTrail)
        clearTrail(boosterTrail)
        boosterLanded = false
      } else {
        if (pose.ship.visible) pushTrail(shipTrail, pose.ship, now)
        if (pose.phase === 'booster_land' && pose.dust > 0.4) boosterLanded = true
        if (pose.booster?.visible && !boosterLanded) pushTrail(boosterTrail, pose.booster, now)
      }

      drawLayer(behindCtx, 'behind', geo, pose, pad, shipTrail, boosterTrail)
      drawLayer(frontCtx, 'front', geo, pose, pad, shipTrail, boosterTrail)
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

    raf = requestAnimationFrame(tick)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      io?.disconnect()
      ro?.disconnect()
    }
  }, [reduced])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
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
