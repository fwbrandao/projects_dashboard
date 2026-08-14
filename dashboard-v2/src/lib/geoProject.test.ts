import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { COBE_DISK_NDC_RADIUS } from './moonOrbit.ts'
import {
  BOCA_CHICA,
  BRAZIL,
  COMING_UP_Z,
  cameraFromWorld,
  isComingUp,
  isFrontHemisphere,
  latLonToWorld,
  projectLatLon,
  worldFromCamera,
} from './geoProject.ts'

const PHI0 = 0
const THETA0 = 0

function almost(a: number, b: number, eps = 1e-9) {
  assert.ok(Math.abs(a - b) < eps, `expected ${a} ≈ ${b}`)
}

describe('pad / marker constants', () => {
  it('pins Boca Chica / Starbase at 25.997, -97.157', () => {
    assert.deepEqual(BOCA_CHICA, { lat: 25.997, lon: -97.157 })
  })

  it('keeps the existing Brazil marker', () => {
    assert.deepEqual(BRAZIL, { lat: -23.55, lon: -46.63 })
  })
})

describe('latLonToWorld (cobe convention)', () => {
  it('matches cobe: lon shifted by −π, x = −cos(lat)cos(lon′)', () => {
    const lat = 25.997
    const lon = -97.157
    const latRad = (lat * Math.PI) / 180
    const lonRad = (lon * Math.PI) / 180 - Math.PI
    const cosLat = Math.cos(latRad)
    const expected = {
      x: -cosLat * Math.cos(lonRad),
      y: Math.sin(latRad),
      z: cosLat * Math.sin(lonRad),
    }
    const p = latLonToWorld(lat, lon)
    almost(p.x, expected.x)
    almost(p.y, expected.y)
    almost(p.z, expected.z)
    almost(Math.hypot(p.x, p.y, p.z), 1)
  })

  it('puts the north pole at +Y', () => {
    const p = latLonToWorld(90, 0)
    almost(p.x, 0, 1e-9)
    almost(p.y, 1, 1e-9)
    almost(p.z, 0, 1e-9)
  })

  it('puts the south pole at −Y', () => {
    const p = latLonToWorld(-90, 0)
    almost(p.y, -1)
  })
})

describe('cameraFromWorld (cobe J(theta, phi) inverse)', () => {
  it('is identity at phi=0, theta=0 for a +Z world point', () => {
    // After cobe lon shift, a point that lands on +Z should face the camera.
    const cam = cameraFromWorld({ x: 0, y: 0, z: 1 }, PHI0, THETA0)
    almost(cam.x, 0)
    almost(cam.y, 0)
    almost(cam.z, 1)
  })

  it('keeps the camera basis orthonormal (unit in, unit out)', () => {
    const w = latLonToWorld(BOCA_CHICA.lat, BOCA_CHICA.lon)
    const cam = cameraFromWorld(w, 0.8, 0.28)
    almost(Math.hypot(cam.x, cam.y, cam.z), 1, 1e-9)
  })

  it('spins around Y when only phi changes (equator point)', () => {
    const equator = latLonToWorld(0, 0)
    const a = cameraFromWorld(equator, 0, 0)
    const b = cameraFromWorld(equator, Math.PI / 2, 0)
    // 90° yaw should move the same world point off the previous camera axis
    const dot = a.x * b.x + a.y * b.y + a.z * b.z
    almost(dot, 0, 1e-6)
  })

  it('round-trips cameraFromWorld ↔ worldFromCamera', () => {
    const w = latLonToWorld(BOCA_CHICA.lat, BOCA_CHICA.lon)
    const cam = cameraFromWorld(w, 0.8, 0.28)
    const back = worldFromCamera(cam, 0.8, 0.28)
    almost(back.x, w.x)
    almost(back.y, w.y)
    almost(back.z, w.z)
  })
})

describe('projectLatLon', () => {
  it('reports camera-space z and screen x/y in globe-radius units (disk = 1)', () => {
    const p = projectLatLon(0, 0, PHI0, THETA0)
    assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.z))
    // On the unit sphere, hypot(x,y)² + z² = 1 so the limb sits on the visual disk
    almost(Math.hypot(p.x, p.y, p.z), 1)
    assert.equal(COBE_DISK_NDC_RADIUS, 0.8)
  })

  it('marks the front hemisphere when z > 0 (toward camera)', () => {
    const facing = projectLatLon(0, 0, PHI0, THETA0)
    // Find a phi that puts Boca on the front vs back
    let front = 0
    let back = 0
    for (let i = 0; i < 64; i++) {
      const phi = (i / 64) * Math.PI * 2
      const p = projectLatLon(BOCA_CHICA.lat, BOCA_CHICA.lon, phi, 0.28)
      if (p.z > 0.2) front++
      if (p.z < -0.2) back++
    }
    assert.ok(front > 5, 'Boca should face the camera for part of a turn')
    assert.ok(back > 5, 'Boca should go behind for part of a turn')
    assert.ok(facing.z !== 0 || facing.x !== 0)
  })

  it('isFrontHemisphere follows camera z', () => {
    assert.equal(isFrontHemisphere(0.2), true)
    assert.equal(isFrontHemisphere(0), true)
    assert.equal(isFrontHemisphere(-0.01), false)
  })
})

describe('coming-up trigger window', () => {
  it('uses a small positive z threshold (limb, not dead-center)', () => {
    assert.ok(COMING_UP_Z >= 0.12)
    assert.ok(COMING_UP_Z <= 0.25)
  })

  it('isComingUp only when z crosses the threshold from below', () => {
    assert.equal(isComingUp({ prevZ: 0.05, z: COMING_UP_Z + 0.01 }), true)
    assert.equal(isComingUp({ prevZ: COMING_UP_Z + 0.2, z: COMING_UP_Z + 0.3 }), false)
    assert.equal(isComingUp({ prevZ: -0.4, z: -0.1 }), false)
    assert.equal(isComingUp({ prevZ: COMING_UP_Z + 0.05, z: 0.05 }), false)
  })
})
