/** Live cobe pose published by DotGlobe, read by the starship canvas. */

export type GlobeView = { phi: number; theta: number }

/**
 * Greenwich meridian / midnight: prime meridian on camera +Z at t=0.
 * Cobe applies lon′ = lon − π, so φ = −π/2 yaws 0°E onto the camera.
 */
export const GLOBE_START_PHI = -Math.PI / 2
export const GLOBE_START_THETA = 0

/** Radians per cobe frame while idle (matches historic auto-spin). */
export const GLOBE_SPIN_PER_FRAME = 0.0028

/** Wall-clock Earth turn at 60fps auto-spin. */
export const EARTH_SPIN_PERIOD_MS = ((2 * Math.PI) / GLOBE_SPIN_PER_FRAME) * (1000 / 60)

let view: GlobeView = { phi: GLOBE_START_PHI, theta: GLOBE_START_THETA }
const listeners = new Set<(v: GlobeView) => void>()

export function publishGlobeView(phi: number, theta: number): void {
  view = { phi, theta }
  listeners.forEach((fn) => fn(view))
}

export function getGlobeView(): GlobeView {
  return view
}

export function subscribeGlobeView(fn: (v: GlobeView) => void): () => void {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}
