import Expression from '../src/Expression.js';
import State from '../src/State.js';

describe('expression', () => {
  test('expression - expression should be string', () => {
    const e = new Expression('$score == 19');
    expect(typeof e.expression).toBe('string');
  });
});

describe('change()', () => {
  test('change() - should throw error with non-string', () => {
    const e = new Expression('$score == 19');
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
    const e = new Expression('$j == 2');
    // Check the expression.
    expect(e.check(s)).toBe(true);
  });

  test('check() - false, given state', () => {
    // Create State.
    const s = new State();
    // Setup a variable.
    s.set('j', 2);
    // Create an expression.
    const e = new Expression('$j == 3');
    // Check the expression.
    expect(e.check(s)).toBe(false);
  });

  test('check() - false, invalid state', () => {
    // Create an expression.
    const e = new Expression('$j == 2');
    // Check the expression.
    expect(e.check(null)).toBe(false);
  });
});

describe('Quis 1.2.0 Complex Boolean Expressions', () => {
  test('complex AND expression with native Quis syntax', () => {
    // Create State.
    const s = new State();
    s.set('health', 75);
    s.set('level', 10);
    s.set('gold', 150);
    
    // Create complex expression using native Quis syntax
    const e = new Expression('$health > 50 && $level >= 5 && $gold > 100');
    
    // Should be true since all conditions are met
    expect(e.check(s)).toBe(true);
  });

  test('complex OR expression with native Quis syntax', () => {
    // Create State.
    const s = new State();
    s.set('health', 25);
    s.set('magic', 80);
    s.set('strength', 60);
    
    // Create complex expression using native Quis syntax
    const e = new Expression('$health < 30 || $magic > 75 || $strength > 90');
    
    // Should be true since health < 30 and magic > 75
    expect(e.check(s)).toBe(true);
  });

  test('complex expression with parentheses and mixed operators', () => {
    // Create State.
    const s = new State();
    s.set('user_role', 'admin');
    s.set('user_active', true);
    s.set('user_level', 15);
    
    // Create complex expression with grouping
    const e = new Expression('($user_role == "admin" || $user_level >= 20) && $user_active == true');
    
    // Should be true since user is admin and active
    expect(e.check(s)).toBe(true);
  });

  test('comparison operators with native Quis syntax', () => {
    // Create State.
    const s = new State();
    s.set('score', 85);
    s.set('attempts', 3);
    
    // Test greater than
    const e1 = new Expression('$score > 80');
    expect(e1.check(s)).toBe(true);
    
    // Test greater than or equal
    const e2 = new Expression('$score >= 85');
    expect(e2.check(s)).toBe(true);
    
    // Test less than
    const e3 = new Expression('$attempts < 5');
    expect(e3.check(s)).toBe(true);
    
    // Test less than or equal
    const e4 = new Expression('$attempts <= 3');
    expect(e4.check(s)).toBe(true);
    
    // Test not equal
    const e5 = new Expression('$score != 90');
    expect(e5.check(s)).toBe(true);
  });

  test('expression check error handling', () => {
    // Mock console.warn to test error handling
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    // Create State.
    const s = new State();
    s.set('j', 2);
    
    // Create an invalid expression that should cause parsing to fail
    const e = new Expression('invalid quis syntax &&&');
    const result = e.check(s);
    
    expect(result).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith('Expression check failed:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});
