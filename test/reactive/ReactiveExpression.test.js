import ReactiveExpression from '../../dist/src/reactive/ReactiveExpression.js';
import ReactiveState from '../../dist/src/reactive/ReactiveState.js';

describe('ReactiveExpression', () => {
  let reactiveState;
  let reactiveExpression;

  beforeEach(() => {
    reactiveState = new ReactiveState();
    reactiveState.set('test', 1);
    reactiveState.set('level', 5);
  });

  afterEach(() => {
    if (reactiveExpression) {
      reactiveExpression.dispose();
    }
  });

  describe('constructor()', () => {
    test('should create ReactiveExpression without state', () => {
      reactiveExpression = new ReactiveExpression('$test == 1');
      expect(reactiveExpression.expressionString).toBe('$test == 1');
    });

    test('should create ReactiveExpression with state', () => {
      reactiveExpression = new ReactiveExpression('$test == 1', reactiveState);
      expect(reactiveExpression.expressionString).toBe('$test == 1');
      expect(reactiveExpression.result).toBe(true);
    });
  });

  describe('bindToState()', () => {
    test('should bind to reactive state', () => {
      reactiveExpression = new ReactiveExpression('$test == 1');
      reactiveExpression.bindToState(reactiveState);
      
      expect(reactiveExpression.result).toBe(true);
    });

    test('should update result when state changes', () => {
      reactiveExpression = new ReactiveExpression('$test == 1', reactiveState);
      
      expect(reactiveExpression.result).toBe(true);
      
      reactiveState.set('test', 2);
      
      expect(reactiveExpression.result).toBe(false);
    });

    test('should notify listeners when state changes', () => {
      reactiveExpression = new ReactiveExpression('$test == 1', reactiveState);
      const listener = jest.fn();
      reactiveExpression.subscribe(listener);
      
      reactiveState.set('test', 2);
      
      expect(listener).toHaveBeenCalledWith(false);
    });

    test('should handle rebinding to different state', () => {
      const state2 = new ReactiveState();
      state2.set('test', 2);
      
      reactiveExpression = new ReactiveExpression('$test == 1', reactiveState);
      expect(reactiveExpression.result).toBe(true);
      
      reactiveExpression.bindToState(state2);
      expect(reactiveExpression.result).toBe(false);
      
      state2.clearListeners();
    });
  });

  describe('unbind()', () => {
    test('should unbind from state', () => {
      reactiveExpression = new ReactiveExpression('$test == 1', reactiveState);
      const listener = jest.fn();
      reactiveExpression.subscribe(listener);
      
      reactiveExpression.unbind();
      
      reactiveState.set('test', 2);
      expect(listener).not.toHaveBeenCalled();
    });

    test('should throw when accessing result after unbind', () => {
      reactiveExpression = new ReactiveExpression('$test == 1', reactiveState);
      reactiveExpression.unbind();
      
      expect(() => reactiveExpression.result).toThrow('ReactiveExpression must be bound to a state');
    });
  });

  describe('subscribe()', () => {
    test('should add listener and return unsubscribe function', () => {
      reactiveExpression = new ReactiveExpression('$test == 1', reactiveState);
      const listener = jest.fn();
      
      const unsubscribe = reactiveExpression.subscribe(listener);
      
      expect(reactiveExpression.listenerCount()).toBe(1);
      expect(typeof unsubscribe).toBe('function');
      
      unsubscribe();
      expect(reactiveExpression.listenerCount()).toBe(0);
    });

    test('should handle listener errors gracefully', () => {
      reactiveExpression = new ReactiveExpression('$test == 1', reactiveState);
      const errorListener = jest.fn(() => {
        throw new Error('Listener error');
      });
      const goodListener = jest.fn();
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      reactiveExpression.subscribe(errorListener);
      reactiveExpression.subscribe(goodListener);
      
      reactiveState.set('test', 2);
      
      expect(consoleSpy).toHaveBeenCalledWith('Error in ReactiveExpression listener:', expect.any(Error));
      expect(goodListener).toHaveBeenCalledWith(false);
      
      consoleSpy.mockRestore();
    });
  });

  describe('result', () => {
    test('should return cached result', () => {
      reactiveExpression = new ReactiveExpression('$test == 1', reactiveState);
      
      // First access calculates
      expect(reactiveExpression.result).toBe(true);
      
      // Second access uses cache (we can't directly test this, but it should work)
      expect(reactiveExpression.result).toBe(true);
    });

    test('should invalidate cache when state changes', () => {
      reactiveExpression = new ReactiveExpression('$test == 1', reactiveState);
      
      expect(reactiveExpression.result).toBe(true);
      
      reactiveState.set('test', 2);
      
      expect(reactiveExpression.result).toBe(false);
    });

    test('should work with complex expressions', () => {
      reactiveExpression = new ReactiveExpression('$test > 0 && $level >= 5', reactiveState);
      
      expect(reactiveExpression.result).toBe(true);
      
      reactiveState.set('level', 3);
      expect(reactiveExpression.result).toBe(false);
      
      reactiveState.set('level', 10);
      expect(reactiveExpression.result).toBe(true);
    });
  });

  describe('check()', () => {
    test('should delegate to base Expression check', () => {
      reactiveExpression = new ReactiveExpression('$test == 1');
      
      const result = reactiveExpression.check(reactiveState);
      
      expect(result).toBe(true);
    });

    test('should work with different state', () => {
      const otherState = new ReactiveState();
      otherState.set('test', 2);
      
      reactiveExpression = new ReactiveExpression('$test == 2');
      
      const result = reactiveExpression.check(otherState);
      
      expect(result).toBe(true);
      
      otherState.clearListeners();
    });
  });

  describe('change()', () => {
    test('should change expression and invalidate cache', () => {
      reactiveExpression = new ReactiveExpression('$test == 1', reactiveState);
      
      expect(reactiveExpression.result).toBe(true);
      
      reactiveExpression.change('$test == 2');
      
      expect(reactiveExpression.expressionString).toBe('$test == 2');
      expect(reactiveExpression.result).toBe(false);
    });

    test('should notify listeners when expression changes', () => {
      reactiveExpression = new ReactiveExpression('$test == 1', reactiveState);
      const listener = jest.fn();
      reactiveExpression.subscribe(listener);
      
      reactiveExpression.change('$test == 2');
      
      expect(listener).toHaveBeenCalledWith(false);
    });
  });

  describe('clearListeners()', () => {
    test('should remove all listeners', () => {
      reactiveExpression = new ReactiveExpression('$test == 1', reactiveState);
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      
      reactiveExpression.subscribe(listener1);
      reactiveExpression.subscribe(listener2);
      
      expect(reactiveExpression.listenerCount()).toBe(2);
      
      reactiveExpression.clearListeners();
      
      expect(reactiveExpression.listenerCount()).toBe(0);
      
      reactiveState.set('test', 2);
      
      expect(listener1).not.toHaveBeenCalled();
      expect(listener2).not.toHaveBeenCalled();
    });
  });

  describe('dispose()', () => {
    test('should clean up all subscriptions and listeners', () => {
      reactiveExpression = new ReactiveExpression('$test == 1', reactiveState);
      const listener = jest.fn();
      reactiveExpression.subscribe(listener);
      
      expect(reactiveExpression.listenerCount()).toBe(1);
      
      reactiveExpression.dispose();
      
      expect(reactiveExpression.listenerCount()).toBe(0);
      
      // Should not throw when accessing result after dispose
      expect(() => reactiveExpression.result).toThrow('ReactiveExpression must be bound to a state');
    });
  });
});