import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  DEFAULT_ORBIT,
  MOON_DIAMETER_KM,
  EARTH_DIAMETER_KM,
  MOON_EARTH_DIAMETER_RATIO,
  layerForDepth,
  moonPose,
  thetaAt,
} from './moonOrbit.ts'

describe('moon / earth size', () => {
  it('uses the real diameter ratio ≈ 0.273', () => {
    assert.equal(MOON_DIAMETER_KM, 3474)
    assert.equal(EARTH_DIAMETER_KM, 12742)
    assert.ok(Math.abs(MOON_EARTH_DIAMETER_RATIO - 3474 / 12742) < 1e-12)
    assert.ok(MOON_EARTH_DIAMETER_RATIO > 0.27)
    assert.ok(MOON_EARTH_DIAMETER_RATIO < 0.28)
  })

  it('gives the moon a disk 0.273 of the globe radius units', () => {
    const pose = moonPose(0)
    assert.ok(Math.abs(pose.radius - MOON_EARTH_DIAMETER_RATIO) < 1e-9)
  })
})

describe('thetaAt', () => {
  it('wraps a full period to 0..2π', () => {
    assert.ok(Math.abs(thetaAt(0, 28_000)) < 1e-9)
    assert.ok(Math.abs(thetaAt(14_000, 28_000) - Math.PI) < 1e-9)
    assert.ok(Math.abs(thetaAt(28_000, 28_000)) < 1e-9)
    assert.ok(thetaAt(7_000, 28_000) > 0)
    assert.ok(thetaAt(7_000, 28_000) < Math.PI)
  })
})

describe('elliptical orbit + depth', () => {
  it('traces a wide oval in screen space, not a circle', () => {
    let maxAbsX = 0
    let maxAbsY = 0
    for (let i = 0; i < 360; i++) {
      const p = moonPose((i * Math.PI) / 180)
      maxAbsX = Math.max(maxAbsX, Math.abs(p.x))
      maxAbsY = Math.max(maxAbsY, Math.abs(p.y))
    }
    assert.ok(maxAbsX > maxAbsY * 1.6, `expected wide ellipse, got ${maxAbsX} vs ${maxAbsY}`)
    assert.ok(maxAbsY > 0.2, 'vertical amplitude should still be visible')
  })

  it('goes both in front of and behind the globe in one period', () => {
    const layers = new Set<string>()
    for (let i = 0; i < 360; i++) {
      layers.add(moonPose((i * Math.PI) / 180).layer)
    }
    assert.deepEqual([...layers].sort(), ['behind', 'front'])
  })

  it('marks positive z as front and negative z as behind', () => {
    assert.equal(layerForDepth(0.2), 'front')
    assert.equal(layerForDepth(-0.2), 'behind')
    assert.equal(layerForDepth(0), 'front')
  })

  it('is smaller when far and larger when near', () => {
    let front: ReturnType<typeof moonPose> | null = null
    let behind: ReturnType<typeof moonPose> | null = null
    for (let i = 0; i < 360; i++) {
      const p = moonPose((i * Math.PI) / 180)
      if (p.layer === 'front' && (!front || p.z > front.z)) front = p
      if (p.layer === 'behind' && (!behind || p.z < behind.z)) behind = p
    }
    assert.ok(front && behind)
    assert.ok(front.scale > behind.scale)
    assert.ok(front.scale > 1)
    assert.ok(behind.scale < 1)
  })

  it('keeps a stylized radius around the globe (not a real lunar distance)', () => {
    const p = moonPose(0)
    const dist = Math.hypot(p.x, p.y, p.z)
    assert.ok(dist > 1.05, 'moon center should clear the globe surface')
    assert.ok(dist < 1.8, 'moon should stay close to the globe, not fly off the hero')
  })

  it('uses the default cinematic period and a 15–25° tilt', () => {
    assert.ok(DEFAULT_ORBIT.periodMs >= 20_000)
    assert.ok(DEFAULT_ORBIT.periodMs <= 35_000)
    const deg = (DEFAULT_ORBIT.tiltRad * 180) / Math.PI
    assert.ok(deg >= 15 && deg <= 25)
  })
})

describe('reduced-motion pose', () => {
  it('freezes slightly in front of the globe, on the limb', () => {
    const p = moonPose(DEFAULT_ORBIT.reducedMotionTheta)
    assert.equal(p.layer, 'front')
    assert.ok(p.z > 0)
    assert.ok(Math.abs(p.x) > 0.35, 'should sit toward the limb, not dead-center')
  })
})
