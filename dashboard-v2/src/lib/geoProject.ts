/** Cobe lat/lon + phi/theta → unit sphere / camera / screen (globe-R = 1). */

export type Vec3 = { x: number; y: number; z: number }

export const BOCA_CHICA = { lat: 25.997, lon: -97.157 } as const
export const BRAZIL = { lat: -23.55, lon: -46.63 } as const

/**
 * Front-limb trigger. Not dead-center: Boca is “coming up” once camera-z
 * crosses this small positive threshold (ticket: 0.12–0.25).
 */
export const COMING_UP_Z = 0.18

/** Cobe `latLonTo3D`: lon shifted by −π, y = sin(lat). */
export function latLonToWorld(lat: number, lon: number): Vec3 {
  const latRad = (lat * Math.PI) / 180
  const lonRad = (lon * Math.PI) / 180 - Math.PI
  const cosLat = Math.cos(latRad)
  return {
    x: -cosLat * Math.cos(lonRad),
    y: Math.sin(latRad),
    z: cosLat * Math.sin(lonRad),
  }
}

/**
 * Cobe fragment basis `J(theta, phi)` applied to a column world vector.
 * +Z is toward the camera; +Y is up; identity at phi=0, theta=0.
 */
export function cameraFromWorld(world: Vec3, phi: number, theta: number): Vec3 {
  const c = Math.cos(theta)
  const d = Math.cos(phi)
  const e = Math.sin(theta)
  const f = Math.sin(phi)
  return {
    x: d * world.x + f * world.z,
    y: f * e * world.x + c * world.y - d * e * world.z,
    z: -f * c * world.x + e * world.y + d * c * world.z,
  }
}

/** Inverse of `cameraFromWorld` (orthonormal J). Keep trails on the globe as it spins. */
export function worldFromCamera(cam: Vec3, phi: number, theta: number): Vec3 {
  const c = Math.cos(theta)
  const d = Math.cos(phi)
  const e = Math.sin(theta)
  const f = Math.sin(phi)
  return {
    x: d * cam.x + f * e * cam.y - f * c * cam.z,
    y: c * cam.y + e * cam.z,
    z: f * cam.x - d * e * cam.y + d * c * cam.z,
  }
}

export type Projected = Vec3

/** Unit vector in camera space. Screen mapping is `cx + x·R`, `cy − y·R`. */
export function projectLatLon(lat: number, lon: number, phi: number, theta: number): Projected {
  return cameraFromWorld(latLonToWorld(lat, lon), phi, theta)
}

export function isFrontHemisphere(z: number): boolean {
  return z >= 0
}

export function isComingUp(args: { prevZ: number; z: number }): boolean {
  return args.prevZ < COMING_UP_Z && args.z >= COMING_UP_Z
}
