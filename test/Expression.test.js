import Expression from '../src/Expression.js';
import State from '../src/State.js';

describe('constructor()', () => {
  let e = null;

  beforeAll(() => {
    e = new Expression();
  });

  test('constructor() - has a State', () => {
    expect(e.state instanceof State).toBe(true);
  });

  test('constructor() - value to be false on empty string', () => {
    expect(e.value).toBe(false);
  });
});

describe('#parseExpression()', () => {
  test('constructor() - parses a valid expression, variable-op-value', () => {
    const e = new Expression(new State(), 'variable-eq-value');
    expect(e.valid).toBe(true);
  });

  test('constructor() - parses a valid expression, variable-op-variable', () => {
    const e = new Expression(new State(), 'variable-eqvar-variable');
    expect(e.valid).toBe(true);
  });

  test('constructor() - attempt to parse invalid expression', () => {
    const e = new Expression(new State(), null);
    expect(e.valid).toBe(false);
  });
});

describe('change()', () => {
  test('change() - parse new value string expression', () => {
    const e = new Expression(new State(), null);
    expect(e.expression).toBe(null);
    expect(e.valid).toBe(false);
    e.change('variable-eq-value');
    expect(e.expression).toBe('variable-eq-value');
    expect(e.valid).toBe(true);
  });
});

describe('check()', () => {
  let e = null;
  let s = null;

  beforeAll(() => {
    s = new State();
    e = new Expression(s, null);
    s.add('test', 1);
    s.add('test 2', 2);
  });

  test('check() - equality, variable to value', () => {
    e.change('test-eq-1');
    expect(e.valid).toBe(true);
    expect(e.check()).toBe(true);
  });

  test('check() - inequality, variable to value', () => {
    e.change('test-neq-2');
    expect(e.valid).toBe(true);
    expect(e.check()).toBe(true);
  });

  test('check() - less than, variable to value', () => {
    e.change('test-lt-2');
    expect(e.valid).toBe(true);
    expect(e.check()).toBe(true);
  });

  test('check() - greater than, variable to value', () => {
    e.change('test-gt-0');
    expect(e.valid).toBe(true);
    expect(e.check()).toBe(true);
  });

  test('check() - less than or equal to, variable to value', () => {
    e.change('test-lte-1');
    expect(e.valid).toBe(true);
    expect(e.check()).toBe(true);
  });

  test('check() - greater than or equal to, variable to value', () => {
    e.change('test-gte-1');
    expect(e.valid).toBe(true);
    expect(e.check()).toBe(true);
  });

  test('check() - equality, variable to variable', () => {
    e.change('test-eqvar-test');
    expect(e.valid).toBe(true);
    expect(e.check()).toBe(true);
  });

  test('check() - inequality, variable to variable', () => {
    e.change('test-neqvar-test 2');
    expect(e.valid).toBe(true);
    expect(e.check()).toBe(true);
  });

  test('check() - less than, variable to variable', () => {
    e.change('test-ltvar-test 2');
    expect(e.valid).toBe(true);
    expect(e.check()).toBe(true);
  });

  test('check() - greater than, variable to variable', () => {
    e.change('test 2-gtvar-test');
    expect(e.valid).toBe(true);
    expect(e.check()).toBe(true);
  });

  test('check() - less than or equal to, variable to variable', () => {
    e.change('test-ltevar-test 2');
    expect(e.valid).toBe(true);
    expect(e.check()).toBe(true);
  });

  test('check() - greater than or equal to, variable to variable', () => {
    e.change('test 2-gtevar-test');
    expect(e.valid).toBe(true);
    expect(e.check()).toBe(true);
  });
});
