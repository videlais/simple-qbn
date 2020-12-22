import Expression from '../src/Expression.js';
import State from '../src/State.js';

describe('#parseExpression()', () => {
  test('constructor() - parses a valid expression, variable-op-value', () => {
    const e = new Expression('variable-eq-value');
    expect(e.valid).toBe(true);
  });

  test('constructor() - parses a valid expression, variable-op-variable', () => {
    const e = new Expression('variable-eqvar-variable');
    expect(e.valid).toBe(true);
  });

  test('constructor() - attempt to parse invalid expression', () => {
    const e = new Expression('invalid');
    expect(e.valid).toBe(false);
  });
});

describe('expression', () => {
  test('expression - expression should be string', () => {
    const e = new Expression('variable-eq-value');
    expect(typeof e.expression).toBe('string');
  });

  test('expression - setting valid', () => {
    const e = new Expression('test');
    // Should be invalid
    expect(e.valid).toBe(false);
    // Update with valid expression
    e.expression = 'test-eq-1';
    // Test updated expression
    expect(e.valid).toBe(true);
  });

  test('expression - setting invalid', () => {
    const e = new Expression('test');
    expect(() => {
      e.expression = null;
    }).toThrow();
  });
});

describe('change()', () => {
  test('change() - throw error if non-string used', () => {
    const c = new Expression('variable-eqvar-variable');
    expect(() => {
      c.change(null);
    }).toThrow();
  });

  test('change() - update ', () => {
    const c = new Expression('test');
    // Check that expression is invalid
    expect(c.valid).toBe(false);
    // Change the expression
    c.change('test-eq-1');
    // Test the expression again
    expect(c.valid).toBe(true);
  });
});

describe('check()', () => {
  let e = null;
  let s = null;

  beforeAll(() => {
    s = new State();
    e = new Expression('test');
    s.add('test', 1);
    s.add('test 2', 2);
  });

  test('check() - equality, variable to value', () => {
    e.change('test-eq-1');
    expect(e.valid).toBe(true);
    expect(e.check(s)).toBe(true);
  });

  test('check() - inequality, variable to value', () => {
    e.change('test-neq-2');
    expect(e.valid).toBe(true);
    expect(e.check(s)).toBe(true);
  });

  test('check() - less than, variable to value', () => {
    e.change('test-lt-2');
    expect(e.valid).toBe(true);
    expect(e.check(s)).toBe(true);
  });

  test('check() - greater than, variable to value', () => {
    e.change('test-gt-0');
    expect(e.valid).toBe(true);
    expect(e.check(s)).toBe(true);
  });

  test('check() - less than or equal to, variable to value', () => {
    e.change('test-lte-1');
    expect(e.valid).toBe(true);
    expect(e.check(s)).toBe(true);
  });

  test('check() - greater than or equal to, variable to value', () => {
    e.change('test-gte-1');
    expect(e.valid).toBe(true);
    expect(e.check(s)).toBe(true);
  });

  test('check() - equality, variable to variable', () => {
    e.change('test-eqvar-test');
    expect(e.valid).toBe(true);
    expect(e.check(s)).toBe(true);
  });

  test('check() - inequality, variable to variable', () => {
    e.change('test-neqvar-test 2');
    expect(e.valid).toBe(true);
    expect(e.check(s)).toBe(true);
  });

  test('check() - less than, variable to variable', () => {
    e.change('test-ltvar-test 2');
    expect(e.valid).toBe(true);
    expect(e.check(s)).toBe(true);
  });

  test('check() - greater than, variable to variable', () => {
    e.change('test 2-gtvar-test');
    expect(e.valid).toBe(true);
    expect(e.check(s)).toBe(true);
  });

  test('check() - less than or equal to, variable to variable', () => {
    e.change('test-ltevar-test 2');
    expect(e.valid).toBe(true);
    expect(e.check(s)).toBe(true);
  });

  test('check() - greater than or equal to, variable to variable', () => {
    e.change('test 2-gtevar-test');
    expect(e.valid).toBe(true);
    expect(e.check(s)).toBe(true);
  });

  test('check() - throw error if value is not State', () => {
    const e = new Expression('test');
    expect(() => {
      e.check(null);
    }).toThrow();
  });
});
