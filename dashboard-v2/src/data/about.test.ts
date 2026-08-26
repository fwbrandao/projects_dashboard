import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { experience, profile } from './about.ts'

describe('about profile', () => {
  it('names Fernando Brandao and lists experience', () => {
    assert.equal(profile.name, 'Fernando Brandao')
    assert.ok(experience.length > 0)
    assert.equal(experience[0].name, 'VASS UK&I')
  })

  it('does not keep overlapping Present dates on VASS Senior vs Tech Lead', () => {
    const vass = experience.find((c) => c.name === 'VASS UK&I')
    assert.ok(vass)
    const lead = vass.roles.find((r) => r.current)
    const senior = vass.roles.find((r) => r.title === 'Senior Software Engineer')
    assert.ok(lead)
    assert.ok(senior)
    assert.match(lead.dates, /Present/)
    assert.doesNotMatch(senior.dates, /Present/)
    assert.equal(senior.dates, 'January 2024 – January 2025')
  })

  it('omits snapshot tenure strings that go stale', () => {
    for (const company of experience) {
      assert.equal('tenure' in company, false)
    }
  })
})
