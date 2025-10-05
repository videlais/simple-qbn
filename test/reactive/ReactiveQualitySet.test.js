import ReactiveQualitySet from '../../dist/src/reactive/ReactiveQualitySet.js';
import ReactiveState from '../../dist/src/reactive/ReactiveState.js';

describe('ReactiveQualitySet', () => {
  let reactiveState;
  let reactiveQualitySet;

  beforeEach(() => {
    reactiveState = new ReactiveState();
    reactiveState.set('test', 1);
    reactiveState.set('level', 5);
  });

  afterEach(() => {
    if (reactiveQualitySet) {
      reactiveQualitySet.dispose();
    }
  });

  describe('constructor()', () => {
    test('should create ReactiveQualitySet without state', () => {
      reactiveQualitySet = new ReactiveQualitySet();
      expect(reactiveQualitySet.size()).toBe(0);
    });

    test('should create ReactiveQualitySet with state', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      expect(reactiveQualitySet.size()).toBe(0);
    });
  });

  describe('add()', () => {
    test('should add expression to set', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      
      reactiveQualitySet.add('$test == 1');
      
      expect(reactiveQualitySet.size()).toBe(1);
      expect(reactiveQualitySet.has('$test == 1')).toBe(true);
    });

    test('should not add duplicate expressions', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      
      reactiveQualitySet.add('$test == 1');
      reactiveQualitySet.add('$test == 1');
      
      expect(reactiveQualitySet.size()).toBe(1);
    });

    test('should notify listeners when expression added', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      const listener = jest.fn();
      reactiveQualitySet.subscribe(listener);
      
      reactiveQualitySet.add('$test == 1');
      
      expect(listener).toHaveBeenCalledWith(true);
    });

    test('should throw error with non-string expression', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      
      expect(() => {
        reactiveQualitySet.add(123);
      }).toThrow('Qualities must be strings!');
    });
  });

  describe('has()', () => {
    test('should return true for existing expression', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      reactiveQualitySet.add('$test == 1');
      
      expect(reactiveQualitySet.has('$test == 1')).toBe(true);
    });

    test('should return false for non-existing expression', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      
      expect(reactiveQualitySet.has('$test == 1')).toBe(false);
    });

    test('should throw error with non-string value', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      
      expect(() => {
        reactiveQualitySet.has(123);
      }).toThrow('Can only check string values!');
    });
  });

  describe('remove()', () => {
    test('should remove expression from set', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      reactiveQualitySet.add('$test == 1');
      
      expect(reactiveQualitySet.has('$test == 1')).toBe(true);
      
      reactiveQualitySet.remove('$test == 1');
      
      expect(reactiveQualitySet.has('$test == 1')).toBe(false);
      expect(reactiveQualitySet.size()).toBe(0);
    });

    test('should notify listeners when expression removed', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      reactiveQualitySet.add('$test == 1');
      
      const listener = jest.fn();
      reactiveQualitySet.subscribe(listener);
      
      reactiveQualitySet.remove('$test == 1');
      
      expect(listener).toHaveBeenCalled();
    });

    test('should not notify when removing non-existent expression', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      const listener = jest.fn();
      reactiveQualitySet.subscribe(listener);
      
      reactiveQualitySet.remove('$nonexistent == 1');
      
      expect(listener).not.toHaveBeenCalled();
    });

    test('should throw error with non-string value', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      
      expect(() => {
        reactiveQualitySet.remove(123);
      }).toThrow('Must pass string values to remove!');
    });
  });

  describe('result', () => {
    test('should return true when all expressions are true', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      reactiveQualitySet.add('$test == 1');
      reactiveQualitySet.add('$level >= 5');
      
      expect(reactiveQualitySet.result).toBe(true);
    });

    test('should return false when any expression is false', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      reactiveQualitySet.add('$test == 1');
      reactiveQualitySet.add('$level > 10');
      
      expect(reactiveQualitySet.result).toBe(false);
    });

    test('should return true for empty set', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      
      expect(reactiveQualitySet.result).toBe(true);
    });

    test('should update when state changes', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      reactiveQualitySet.add('$test == 1');
      
      expect(reactiveQualitySet.result).toBe(true);
      
      reactiveState.set('test', 2);
      
      expect(reactiveQualitySet.result).toBe(false);
    });

    test('should throw when not bound to state', () => {
      reactiveQualitySet = new ReactiveQualitySet();
      
      expect(() => reactiveQualitySet.result).toThrow('ReactiveQualitySet must be bound to a state');
    });
  });

  describe('bindToState()', () => {
    test('should bind to reactive state', () => {
      reactiveQualitySet = new ReactiveQualitySet();
      reactiveQualitySet.add('$test == 1');
      
      reactiveQualitySet.bindToState(reactiveState);
      
      expect(reactiveQualitySet.result).toBe(true);
    });

    test('should update result when rebound to different state', () => {
      const state2 = new ReactiveState();
      state2.set('test', 2);
      
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      reactiveQualitySet.add('$test == 1');
      
      expect(reactiveQualitySet.result).toBe(true);
      
      reactiveQualitySet.bindToState(state2);
      
      expect(reactiveQualitySet.result).toBe(false);
      
      state2.clearListeners();
    });

    test('should notify listeners when state changes', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      reactiveQualitySet.add('$test == 1');
      
      const listener = jest.fn();
      reactiveQualitySet.subscribe(listener);
      
      reactiveState.set('test', 2);
      
      expect(listener).toHaveBeenCalledWith(false);
    });
  });

  describe('unbind()', () => {
    test('should unbind from state', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      reactiveQualitySet.add('$test == 1');
      
      const listener = jest.fn();
      reactiveQualitySet.subscribe(listener);
      
      reactiveQualitySet.unbind();
      
      reactiveState.set('test', 2);
      
      expect(listener).not.toHaveBeenCalled();
    });

    test('should throw when accessing result after unbind', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      reactiveQualitySet.unbind();
      
      expect(() => reactiveQualitySet.result).toThrow('ReactiveQualitySet must be bound to a state');
    });
  });

  describe('check()', () => {
    test('should delegate to expressions check', () => {
      reactiveQualitySet = new ReactiveQualitySet();
      reactiveQualitySet.add('$test == 1');
      
      const result = reactiveQualitySet.check(reactiveState);
      
      expect(result).toBe(true);
    });

    test('should work with different state', () => {
      const otherState = new ReactiveState();
      otherState.set('test', 2);
      
      reactiveQualitySet = new ReactiveQualitySet();
      reactiveQualitySet.add('$test == 2');
      
      const result = reactiveQualitySet.check(otherState);
      
      expect(result).toBe(true);
      
      otherState.clearListeners();
    });

    test('should throw with non-ReactiveState', () => {
      reactiveQualitySet = new ReactiveQualitySet();
      
      expect(() => {
        reactiveQualitySet.check({});
      }).toThrow('Must have ReactiveState to check() against!');
    });
  });

  describe('subscribe()', () => {
    test('should add listener and return unsubscribe function', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      const listener = jest.fn();
      
      const unsubscribe = reactiveQualitySet.subscribe(listener);
      
      expect(reactiveQualitySet.listenerCount()).toBe(1);
      expect(typeof unsubscribe).toBe('function');
      
      unsubscribe();
      expect(reactiveQualitySet.listenerCount()).toBe(0);
    });

    test('should handle listener errors gracefully', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      reactiveQualitySet.add('$test == 1');
      
      const errorListener = jest.fn(() => {
        throw new Error('Listener error');
      });
      const goodListener = jest.fn();
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      reactiveQualitySet.subscribe(errorListener);
      reactiveQualitySet.subscribe(goodListener);
      
      reactiveState.set('test', 2);
      
      expect(consoleSpy).toHaveBeenCalledWith('Error in ReactiveQualitySet listener:', expect.any(Error));
      expect(goodListener).toHaveBeenCalledWith(false);
      
      consoleSpy.mockRestore();
    });
  });

  describe('dispose()', () => {
    test('should clean up all subscriptions and listeners', () => {
      reactiveQualitySet = new ReactiveQualitySet(reactiveState);
      reactiveQualitySet.add('$test == 1');
      
      const listener = jest.fn();
      reactiveQualitySet.subscribe(listener);
      
      expect(reactiveQualitySet.listenerCount()).toBe(1);
      
      reactiveQualitySet.dispose();
      
      expect(reactiveQualitySet.listenerCount()).toBe(0);
      expect(reactiveQualitySet.size()).toBe(0);
    });
  });
});