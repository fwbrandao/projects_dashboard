/** Cheap fading polylines for the 2D Starship canvas. */

export const TRAIL_CAP = 96

export type TrailSample = { x: number; y: number; z: number; t: number }

export type Trail = {
  samples: TrailSample[]
  cap: number
}

export function createTrail(cap = TRAIL_CAP): Trail {
  return { samples: [], cap: Math.max(2, cap) }
}

export function pushTrail(
  trail: Trail,
  p: { x: number; y: number; z: number },
  t: number,
): void {
  const last = trail.samples[trail.samples.length - 1]
  if (last && last.x === p.x && last.y === p.y && last.z === p.z) return
  trail.samples.push({ x: p.x, y: p.y, z: p.z, t })
  const extra = trail.samples.length - trail.cap
  if (extra > 0) trail.samples.splice(0, extra)
}

export function clearTrail(trail: Trail): void {
  trail.samples.length = 0
}

/** Newest sample is brightest; oldest fades to 0. */
export function trailAlpha(index: number, count: number): number {
  if (count <= 1) return 1
  const u = index / (count - 1)
  return u * u
}
