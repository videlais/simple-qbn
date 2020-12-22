import QualitySet from '../src/QualitySet.js';
import State from '../src/State.js';

describe('constructor()', () => {
  test('constructor() - starts with empty array', () => {
    const qs = new QualitySet();
    expect(qs.size()).toBe(0);
  });
});

describe('add()', () => {
  test('add() - add an Expression via a string', () => {
    const qs = new QualitySet();
    qs.add('variable-eq-value');
    expect(qs.size()).toBe(1);
  });

  test('add() - avoid duplicates', () => {
    const qs = new QualitySet();
    qs.add('variable-eq-value');
    qs.add('variable-eq-value');
    expect(qs.size()).toBe(1);
  });
});

describe('has()', () => {
  test('has() - returns true if Expression is in set', () => {
    const qs = new QualitySet();
    qs.add('variable-eq-value');
    expect(qs.has('variable-eq-value')).toBe(true);
  });

  test('has() - returns false if Express is not in set', () => {
    const qs = new QualitySet();
    expect(qs.has('variable2-eq-value')).toBe(false);
  });

  test('has() - throw error if pass anything but string', () => {
    const qs = new QualitySet();
    expect(() => {
      qs.has(null);
    }).toThrow();
  });
});

describe('remove()', () => {
  test('remove() - Removes existing Expressions', () => {
    const qs = new QualitySet();
    qs.add('variable-eq-value');
    qs.remove('variable-eq-value');
    expect(qs.size()).toBe(0);
  });

  test('remove() - throw error if a non-string value passed to it', () => {
    const qs = new QualitySet();
    qs.add('variable-eq-value');
    expect(() => {
      qs.remove(null);
    }).toThrow();
  });
});

describe('check()', () => {
  test('check() - Should throw error if non-State is passed', () => {
    const qs = new QualitySet();
    expect(() => {
      qs.check(null);
    }).toThrow();
  });

  test('check() - Should return true if no Expressions in Set', () => {
    const s = new State();
    const qs = new QualitySet();
    expect(qs.check(s)).toBe(true);
  });

  test('check() - Should return true if single Expression (of one) is true', () => {
    const s = new State();
    s.add('test', 1);
    const qs = new QualitySet();
    qs.add('test-eq-1');
    expect(qs.check(s)).toBe(true);
  });

  test('check() - Should return false if single Expression (of one) is false', () => {
    const s = new State();
    s.add('test', 1);
    const qs = new QualitySet();
    qs.add('test-eq-2');
    expect(qs.check(s)).toBe(false);
  });

  test('check() - Should return true if all Expressions are true', () => {
    const s = new State();
    s.add('test', 1);
    s.add('test1', 1);
    s.add('test2', 1);
    const qs = new QualitySet();
    qs.add('test-eq-1');
    qs.add('test1-eq-1');
    qs.add('test2-eq-1');
    expect(qs.check(s)).toBe(true);
  });

  test('check() - Should return false if any Expressions are false', () => {
    const s = new State();
    s.add('test', 1);
    s.add('test1', 1);
    s.add('test2', 1);
    const qs = new QualitySet();
    qs.add('test-eq-1');
    qs.add('test1-eq-2');
    qs.add('test2-eq-1');
    expect(qs.check(s)).toBe(false);
  });
});

describe('set', () => {
  test('set - Should be an array', () => {
    const qs = new QualitySet();
    expect(Array.isArray(qs.set)).toBe(true);
  });

  test('set - should throw error if attempt to change', () => {
    const qs = new QualitySet();
    expect(() => {
      qs.set = null;
    }).toThrow();
  });
});
