/** Pure ellipse + depth for the hero moon. Units: globe radius = 1. */

export const MOON_DIAMETER_KM = 3474
export const EARTH_DIAMETER_KM = 12742
export const MOON_EARTH_DIAMETER_RATIO = MOON_DIAMETER_KM / EARTH_DIAMETER_KM

export type OrbitLayer = 'front' | 'behind'

export type OrbitConfig = {
  /** Semi-major axis (screen X), globe-radius units. */
  a: number
  /** Semi-minor axis (orbital depth before tilt), globe-radius units. */
  b: number
  /** Tilt of the orbital plane around X, radians. */
  tiltRad: number
  /** Full orbit period. */
  periodMs: number
  /** Perspective strength: scale = 1 + k * z. */
  perspective: number
  /** Frozen pose when prefers-reduced-motion is on. */
  reducedMotionTheta: number
}

export const DEFAULT_ORBIT: OrbitConfig = {
  a: 1.38,
  b: 1.18,
  tiltRad: (20 * Math.PI) / 180,
  periodMs: 28_000,
  perspective: 0.18,
  // Slightly in front, on the right limb.
  reducedMotionTheta: 0.35,
}

export type MoonPose = {
  x: number
  y: number
  z: number
  /** Moon radius in globe-radius units (diameter ratio). */
  radius: number
  /** Perspective scale (>1 near, <1 far). */
  scale: number
  layer: OrbitLayer
}

export function thetaAt(elapsedMs: number, periodMs: number): number {
  const period = periodMs <= 0 ? 1 : periodMs
  const t = ((elapsedMs % period) + period) % period
  return (t / period) * Math.PI * 2
}

export function layerForDepth(z: number): OrbitLayer {
  return z >= 0 ? 'front' : 'behind'
}

export function moonPose(theta: number, orbit: OrbitConfig = DEFAULT_ORBIT): MoonPose {
  const cosT = Math.cos(theta)
  const sinT = Math.sin(theta)
  const x = orbit.a * cosT
  // +z toward camera; θ = π/2 is nearest.
  const z0 = orbit.b * sinT
  const sinTilt = Math.sin(orbit.tiltRad)
  const cosTilt = Math.cos(orbit.tiltRad)
  const y = -z0 * sinTilt
  const z = z0 * cosTilt
  return {
    x,
    y,
    z,
    radius: MOON_EARTH_DIAMETER_RATIO,
    scale: 1 + orbit.perspective * z,
    layer: layerForDepth(z),
  }
}
