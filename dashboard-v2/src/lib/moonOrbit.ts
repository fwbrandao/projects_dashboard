/** Pure ellipse + depth for the hero moon. Units: globe radius = 1. */

export const MOON_DIAMETER_KM = 3474
export const EARTH_DIAMETER_KM = 12742
export const MOON_EARTH_DIAMETER_RATIO = MOON_DIAMETER_KM / EARTH_DIAMETER_KM

/**
 * Display size vs real lunar diameter. Real ratio (~0.273) reads huge next to
 * the dotted globe; 1/3 of that keeps the moon a small satellite.
 */
export const MOON_DISPLAY_SCALE = 1 / 3
export const MOON_DISPLAY_RADIUS = MOON_EARTH_DIAMETER_RATIO * MOON_DISPLAY_SCALE

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
  // Previous cinematic axes 1.38 / 1.18, then +1/3 farther from the globe.
  a: 1.38 * (4 / 3),
  b: 1.18 * (4 / 3),
  tiltRad: (20 * Math.PI) / 180,
  // Slower than one Earth auto-spin (~37s) so the moon reads as the outer body.
  periodMs: 48_000,
  perspective: 0.22,
  // Slightly in front, on the right limb.
  reducedMotionTheta: 0.35,
}

export type MoonPose = {
  x: number
  y: number
  z: number
  /** Moon radius in globe-radius units (display, not raw lunar ratio). */
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

/**
 * Cobe draws land when `dot(a,a) <= 0.64` → NDC radius 0.8 of the square
 * canvas (see node_modules/cobe shader). The square itself is larger; punching
 * half the canvas hid the moon at the *container* edge instead of the globe.
 */
export const COBE_DISK_NDC_RADIUS = 0.8

/**
 * Visual Earth *disk* radius in CSS px — the dotted sphere, not the square
 * cobe canvas and not the hero panel.
 */
export function visualGlobeDiskRadiusPx(displaySize: number, cobeScale = 1): number {
  return displaySize * 0.5 * cobeScale * COBE_DISK_NDC_RADIUS
}

/**
 * Occlude the moon only when it is behind AND overlapping the Earth *disk*
 * (circle), never the square globe container.
 */
export function moonOverlapsEarthDisk(
  moonX: number,
  moonY: number,
  moonR: number,
  earthX: number,
  earthY: number,
  earthR: number,
): boolean {
  const dx = moonX - earthX
  const dy = moonY - earthY
  return dx * dx + dy * dy < (earthR + moonR) * (earthR + moonR)
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
    radius: MOON_DISPLAY_RADIUS,
    scale: 1 + orbit.perspective * z,
    layer: layerForDepth(z),
  }
}
