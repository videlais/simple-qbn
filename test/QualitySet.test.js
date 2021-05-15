import QualitySet from '../src/QualitySet.js'
import State from '../src/State.js'

describe('constructor()', () => {
  test('constructor() - starts with empty array', () => {
    const qs = new QualitySet()
    expect(qs.size()).toBe(0)
  })
})

describe('add()', () => {
  test('add() - add an Expression via a string', () => {
    const qs = new QualitySet()
    qs.add({ test: 1 })
    expect(qs.size()).toBe(1)
  })

  test('add() - do not add duplicate expression', () => {
    const qs = new QualitySet()
    qs.add({ test: 1 })
    qs.add({ test: 1 })
    expect(qs.size()).toBe(1)
  })

  test('add() - allow value but operator different expressions', () => {
    const qs = new QualitySet()
    qs.add({ test: 1 })
    qs.add({ test: { $eq: 1 } })
    expect(qs.size()).toBe(2)
  })
})

describe('has()', () => {
  test('has() - returns true if Expression is in set', () => {
    const qs = new QualitySet()
    qs.add({ test: 1 })
    expect(qs.has({ test: 1 })).toBe(true)
  })

  test('has() - returns false if Express is not in set', () => {
    const qs = new QualitySet()
    expect(qs.has({ test: 2 })).toBe(false)
  })

  test('has() - throw error if pass anything but string', () => {
    const qs = new QualitySet()
    expect(() => {
      qs.has(null)
    }).toThrow()
  })
})

describe('remove()', () => {
  test('remove() - Removes existing Expressions', () => {
    const qs = new QualitySet()
    qs.add({ test: 1 })
    qs.remove({ test: 1 })
    expect(qs.size()).toBe(0)
  })

  test('remove() - throw error if a non-string value passed to it', () => {
    const qs = new QualitySet()
    qs.add({ test: 6 })
    expect(() => {
      qs.remove(null)
    }).toThrow()
  })
})

describe('check()', () => {
  test('check() - Should throw error if non-State is passed', () => {
    const qs = new QualitySet()
    expect(() => {
      qs.check(null)
    }).toThrow()
  })

  test('check() - Should return true if no Expressions in Set', () => {
    const s = new State()
    const qs = new QualitySet()
    expect(qs.check(s)).toBe(true)
  })

  test('check() - Should return true if single Expression (of one) is true', () => {
    const s = new State()
    s.set('test', 1)
    const qs = new QualitySet()
    qs.add({ test: 1 })
    expect(qs.check(s)).toBe(true)
  })

  test('check() - Should return false if single Expression (of one) is false', () => {
    const s = new State()
    s.set('test', 1)
    const qs = new QualitySet()
    qs.add({ test: 2 })
    expect(qs.check(s)).toBe(false)
  })

  test('check() - Should return true if all Expressions are true', () => {
    const s = new State()
    s.set('test', 1)
    s.set('test1', 1)
    s.set('test2', 1)
    const qs = new QualitySet()
    qs.add({ test: 1 })
    qs.add({ test1: 1 })
    qs.add({ test2: 1 })
    expect(qs.check(s)).toBe(true)
  })

  test('check() - Should return false if any Expressions are false', () => {
    const s = new State()
    s.set('test', 1)
    s.set('test1', 1)
    s.set('test2', 1)
    const qs = new QualitySet()
    qs.add({ test: 1 })
    qs.add({ test1: 2 })
    qs.add({ test2: 1 })
    expect(qs.check(s)).toBe(false)
  })
})
