import QualitySet from '../src/QualitySet.js';
import State from '../src/State.js';

describe('constructor()', () => {
  test('constructor() - has a State', () => {
    const qs = new QualitySet();
    expect(qs.state instanceof State).toBe(true);
  });

  test('constructor() - has a Set', () => {
    const qs = new QualitySet();
    expect(qs.set instanceof Set).toBe(true);
  });
});

describe('add()', () => {
  test('add() - add an Expression via a string', () => {
    const qs = new QualitySet();
    qs.add('variable-eq-value');
    expect(qs.set.size).toBe(1);
  });
});

describe('find()', () => {
  test('find() - returns existing Expression based on string', () => {
    const qs = new QualitySet();
    qs.add('variable-eq-value');
    expect(qs.find('variable-eq-value')).not.toBe(null);
  });

  test('find() - returns null if Expression not part of Set', () => {
    const qs = new QualitySet();
    expect(qs.find('variable2-eq-value')).toBe(null);
  });
});

describe('remove()', () => {
  test('remove() - Removes existing Expressions', () => {
    const qs = new QualitySet();
    qs.add('variable-eq-value');
    qs.remove('variable-eq-value');
    expect(qs.set.size).toBe(0);
  });

  test('remove() - Returns null if trying to remove Expression not in Set', () => {
    const qs = new QualitySet();
    const e = qs.remove('variable-eq-value');
    expect(e).toBe(null);
  });
});

describe('check()', () => {
  test('check() - Should return true if no Expressions in Set', () => {
    const qs = new QualitySet();
    expect(qs.check()).toBe(true);
  });

  test('check() - Should return true if single Expression (of one) is true', () => {
    const s = new State();
    s.add('test', 1);
    const qs = new QualitySet(s);
    qs.add('test-eq-1');
    expect(qs.check()).toBe(true);
  });

  test('check() - Should return false if single Expression (of one) is false', () => {
    const s = new State();
    s.add('test', 1);
    const qs = new QualitySet(s);
    qs.add('test-eq-2');
    expect(qs.check()).toBe(false);
  });

  test('check() - Should return true if all Expressions are true', () => {
    const s = new State();
    s.add('test', 1);
    s.add('test1', 1);
    s.add('test2', 1);
    const qs = new QualitySet(s);
    qs.add('test-eq-1');
    qs.add('test1-eq-1');
    qs.add('test2-eq-1');
    expect(qs.check()).toBe(true);
  });

  test('check() - Should return false if any Expressions are false', () => {
    const s = new State();
    s.add('test', 1);
    s.add('test1', 1);
    s.add('test2', 1);
    const qs = new QualitySet(s);
    qs.add('test-eq-1');
    qs.add('test1-eq-2');
    qs.add('test2-eq-1');
    expect(qs.check()).toBe(false);
  });
});
