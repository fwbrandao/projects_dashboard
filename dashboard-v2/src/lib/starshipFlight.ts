/** Pure Starship mission: phase machine + poses in globe-radius units. */

import { COMING_UP_Z, type Vec3 } from './geoProject'

export const STACK_HEIGHT = 0.042
export const LEO_RADIUS = 1.17

export const PHASE_ORDER = [
  'idle',
  'liftoff',
  'ascent',
  'hot_stage',
  'boostback',
  'booster_land',
  'ship_orbit',
  'translunar',
  'moon_orbit',
  'moon_land',
  'done',
] as const

export type FlightPhase = (typeof PHASE_ORDER)[number]

export type Mission = {
  phase: FlightPhase
  armed: boolean
  startedAtMs: number | null
}

export type VehiclePose = {
  x: number
  y: number
  z: number
  visible: boolean
}

export type FlightPose = {
  phase: FlightPhase
  ship: VehiclePose
  booster?: VehiclePose
  plume: number
  flash: number
  dust: number
}

type MoonLike = { x: number; y: number; z: number; radius: number; scale: number }

const T = {
  liftoff: 4_000,
  ascent: 10_000,
  hotStage: 13_000,
  boostback: 22_000,
  boosterLand: 26_000,
  shipOrbit: 46_000,
  translunar: 58_000,
  moonOrbit: 66_000,
  moonLand: 72_000,
} as const

const ORBIT_START = T.boosterLand
/** 26.2s → 45.8s is exactly one turn when period is 19.6s. */
const ORBIT_PERIOD = 19_600

export function createMission(): Mission {
  return { phase: 'idle', armed: true, startedAtMs: null }
}

export function phaseAt(missionTimeMs: number): FlightPhase {
  const t = missionTimeMs
  if (t < T.liftoff) return 'liftoff'
  if (t < T.ascent) return 'ascent'
  if (t < T.hotStage) return 'hot_stage'
  if (t < T.boostback) return 'boostback'
  if (t < T.boosterLand) return 'booster_land'
  if (t < T.shipOrbit) return 'ship_orbit'
  if (t < T.translunar) return 'translunar'
  if (t < T.moonOrbit) return 'moon_orbit'
  if (t < T.moonLand) return 'moon_land'
  return 'done'
}

export function shouldTrigger(args: {
  prevZ: number
  z: number
  armed: boolean
  phase: FlightPhase
  reducedMotion: boolean
}): boolean {
  if (args.reducedMotion) return false
  if (!args.armed || args.phase !== 'idle') return false
  return args.prevZ < COMING_UP_Z && args.z >= COMING_UP_Z
}

export function stepMission(
  m: Mission,
  args: {
    nowMs: number
    prevBocaZ: number
    bocaZ: number
    reducedMotion: boolean
  },
): Mission {
  if (args.reducedMotion) {
    return { phase: 'idle', armed: m.armed, startedAtMs: null }
  }

  if (m.phase === 'idle') {
    if (
      shouldTrigger({
        prevZ: args.prevBocaZ,
        z: args.bocaZ,
        armed: m.armed,
        phase: 'idle',
        reducedMotion: false,
      })
    ) {
      return { phase: 'liftoff', armed: false, startedAtMs: args.nowMs }
    }
    return m
  }

  const started = m.startedAtMs ?? args.nowMs
  const phase = phaseAt(args.nowMs - started)

  if (phase === 'done') {
    if (args.bocaZ < 0) {
      return { phase: 'idle', armed: true, startedAtMs: null }
    }
    return { phase: 'done', armed: false, startedAtMs: started }
  }

  return { phase, armed: false, startedAtMs: started }
}

function v(x: number, y: number, z: number): Vec3 {
  return { x, y, z }
}

function add(a: Vec3, b: Vec3): Vec3 {
  return v(a.x + b.x, a.y + b.y, a.z + b.z)
}

function scale(a: Vec3, s: number): Vec3 {
  return v(a.x * s, a.y * s, a.z * s)
}

function hypot3(a: Vec3): number {
  return Math.hypot(a.x, a.y, a.z)
}

function norm(a: Vec3): Vec3 {
  const n = hypot3(a) || 1
  return scale(a, 1 / n)
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return v(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x)
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function lerpV(a: Vec3, b: Vec3, t: number): Vec3 {
  return v(lerp(a.x, b.x, t), lerp(a.y, b.y, t), lerp(a.z, b.z, t))
}

function clamp01(t: number): number {
  if (t <= 0) return 0
  if (t >= 1) return 1
  return t
}

function padBasis(pad: Vec3) {
  const radial = norm(pad)
  let east = cross(v(0, 1, 0), radial)
  if (hypot3(east) < 0.15) east = cross(v(1, 0, 0), radial)
  east = norm(east)
  const north = norm(cross(radial, east))
  return { radial, east, north }
}

function rotateAround(p: Vec3, axis: Vec3, angle: number): Vec3 {
  const a = norm(axis)
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  const d = p.x * a.x + p.y * a.y + p.z * a.z
  return add(
    add(scale(p, c), scale(cross(a, p), s)),
    scale(a, d * (1 - c)),
  )
}

function leoAt(u: number, pad: Vec3): Vec3 {
  const { radial, north } = padBasis(pad)
  const insert = scale(radial, LEO_RADIUS)
  return rotateAround(insert, north, u * Math.PI * 2)
}

function hidden(): VehiclePose {
  return { x: 0, y: 0, z: 0, visible: false }
}

function vis(p: Vec3): VehiclePose {
  return { x: p.x, y: p.y, z: p.z, visible: true }
}

export function flightPose(args: {
  missionTimeMs: number
  pad: Vec3
  moon: MoonLike
  reducedMotion: boolean
}): FlightPose {
  if (args.reducedMotion) {
    return { phase: 'idle', ship: hidden(), plume: 0, flash: 0, dust: 0 }
  }

  const t = args.missionTimeMs
  const phase = phaseAt(t)
  const { radial, east } = padBasis(args.pad)
  const moon = v(args.moon.x, args.moon.y, args.moon.z)
  const moonR = args.moon.radius * args.moon.scale
  const landed = add(moon, scale(norm(moon), Math.min(moonR * 0.35, 0.04)))

  let ship = scale(radial, 1 + 0.012)
  let booster: Vec3 | null = null
  let plume = 0
  let flash = 0
  let dust = 0

  if (phase === 'liftoff') {
    const u = clamp01(t / T.liftoff)
    ship = scale(radial, 1 + lerp(0.012, 0.08, u))
    plume = 0.85
  } else if (phase === 'ascent') {
    const u = clamp01((t - T.liftoff) / (T.ascent - T.liftoff))
    const r = lerp(1.08, LEO_RADIUS, u)
    ship = add(scale(radial, r), scale(east, 0.12 * u))
    plume = 0.75
  } else if (phase === 'hot_stage') {
    const u = clamp01((t - T.ascent) / (T.hotStage - T.ascent))
    ship = add(scale(radial, LEO_RADIUS + 0.01), scale(east, 0.14 + 0.04 * u))
    booster = add(scale(radial, LEO_RADIUS - 0.03), scale(east, 0.1 - 0.04 * u))
    plume = 0.55
    flash = 0.85
  } else if (phase === 'boostback') {
    const u = clamp01((t - T.hotStage) / (T.boostback - T.hotStage))
    const insert = add(scale(radial, LEO_RADIUS), scale(east, 0.18))
    ship = lerpV(insert, leoAt(0, args.pad), u)
    const sep = add(scale(radial, LEO_RADIUS - 0.03), scale(east, 0.06))
    booster = lerpV(sep, args.pad, u)
    plume = 0.35 * (1 - u)
  } else if (phase === 'booster_land') {
    const u = clamp01((t - T.boostback) / (T.boosterLand - T.boostback))
    ship = leoAt(0, args.pad)
    booster = lerpV(add(args.pad, scale(radial, 0.04)), args.pad, u)
    dust = 0.7
    plume = 0.2 * (1 - u)
  } else if (phase === 'ship_orbit') {
    const u = (t - ORBIT_START) / ORBIT_PERIOD
    ship = leoAt(u, args.pad)
  } else if (phase === 'translunar') {
    const u = clamp01((t - T.shipOrbit) / (T.translunar - T.shipOrbit))
    ship = lerpV(leoAt(1, args.pad), landed, u)
  } else if (phase === 'moon_orbit') {
    const u = clamp01((t - T.translunar) / (T.moonOrbit - T.translunar))
    const hold = add(landed, scale(east, 0.06 * (1 - u)))
    ship = lerpV(hold, landed, u)
  } else if (phase === 'moon_land') {
    const u = clamp01((t - T.moonOrbit) / (T.moonLand - T.moonOrbit))
    ship = lerpV(add(landed, scale(norm(moon), 0.03)), landed, u)
    dust = 0.25 * u
  } else {
    ship = landed
  }

  return {
    phase,
    ship: vis(ship),
    booster: booster ? vis(booster) : undefined,
    plume,
    flash,
    dust,
  }
}
