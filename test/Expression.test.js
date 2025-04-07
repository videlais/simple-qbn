import Expression from '../src/Expression.js';
import State from '../src/State.js';

describe('expression', () => {
  test('expression - expression should be object', () => {
    const e = new Expression({ score: { $eq: 19 } });
    expect(typeof e.expression).toBe('object');
  });
});

describe('change()', () => {
  test('change() - should throw error with non-object', () => {
    const e = new Expression({ score: { $eq: 19 } });
    expect(() => {
      e.change(1);
    }).toThrow();
  });
});

describe('check()', () => {
  test('check() - true, given state', () => {
    // Create State.
    const s = new State();
    // Setup a variable.
    s.set('j', 2);
    // Create an expression.
    const e = new Expression({ j: 2 });
    // Check the expression.
    expect(e.check(s)).toBe(true);
  });

  test('check() - false, given state', () => {
    // Create State.
    const s = new State();
    // Setup a variable.
    s.set('j', 2);
    // Create an expression.
    const e = new Expression({ j: 3 });
    // Check the expression.
    expect(e.check(s)).toBe(false);
  });

  test('check() - false, invalid state', () => {
    // Create an expression.
    const e = new Expression({ j: 2 });
    // Check the expression.
    expect(e.check(null)).toBe(false);
  });
});
