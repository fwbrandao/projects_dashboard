import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { projectLatLon } from './geoProject.ts'
import {
  EARTH_SPIN_PERIOD_MS,
  GLOBE_SPIN_PER_FRAME,
  GLOBE_START_PHI,
  GLOBE_START_THETA,
  getGlobeView,
} from './globeView.ts'
import { DEFAULT_ORBIT } from './moonOrbit.ts'

describe('hero globe start pose', () => {
  it('starts at Greenwich meridian / midnight (prime meridian facing camera)', () => {
    assert.ok(Math.abs(GLOBE_START_PHI + Math.PI / 2) < 1e-9)
    assert.ok(Math.abs(GLOBE_START_THETA) < 1e-9)
    const greenwich = projectLatLon(0, 0, GLOBE_START_PHI, GLOBE_START_THETA)
    assert.ok(Math.abs(greenwich.x) < 1e-6, `Greenwich should sit on camera +Z, x=${greenwich.x}`)
    assert.ok(Math.abs(greenwich.y) < 1e-6, `midnight equator, y=${greenwich.y}`)
    assert.ok(greenwich.z > 0.99, `prime meridian faces camera, z=${greenwich.z}`)
    const published = getGlobeView()
    assert.equal(published.phi, GLOBE_START_PHI)
    assert.equal(published.theta, GLOBE_START_THETA)
  })

  it('keeps Boca Chica behind the limb at t=0 so spin still triggers launch', () => {
    const boca = projectLatLon(25.997, -97.157, GLOBE_START_PHI, GLOBE_START_THETA)
    assert.ok(boca.z < 0.12, `Boca must not already be coming-up at start, z=${boca.z}`)
  })
})

describe('moon period vs Earth spin', () => {
  it('gives the moon a slower angular period than one Earth turn', () => {
    assert.ok(GLOBE_SPIN_PER_FRAME > 0)
    assert.ok(EARTH_SPIN_PERIOD_MS > 15_000)
    assert.ok(EARTH_SPIN_PERIOD_MS < 45_000)
    assert.ok(
      DEFAULT_ORBIT.periodMs > EARTH_SPIN_PERIOD_MS,
      `moon ${DEFAULT_ORBIT.periodMs}ms should be slower than Earth ${EARTH_SPIN_PERIOD_MS}ms`,
    )
  })
})
