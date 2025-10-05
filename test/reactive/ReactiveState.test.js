import ReactiveState from '../../dist/src/reactive/ReactiveState.js';

describe('ReactiveState', () => {
  let reactiveState;

  beforeEach(() => {
    reactiveState = new ReactiveState();
  });

  afterEach(() => {
    reactiveState.clearListeners();
  });

  describe('constructor()', () => {
    test('should create a new ReactiveState', () => {
      expect(reactiveState).toBeInstanceOf(ReactiveState);
      expect(reactiveState.size()).toBe(0);
      expect(reactiveState.listenerCount()).toBe(0);
    });
  });

  describe('subscribe()', () => {
    test('should add a listener and return unsubscribe function', () => {
      const listener = jest.fn();
      const unsubscribe = reactiveState.subscribe(listener);
      
      expect(reactiveState.listenerCount()).toBe(1);
      expect(typeof unsubscribe).toBe('function');
      
      unsubscribe();
      expect(reactiveState.listenerCount()).toBe(0);
    });

    test('should notify listeners when state changes', () => {
      const listener = jest.fn();
      reactiveState.subscribe(listener);
      
      reactiveState.set('test', 'value');
      
      expect(listener).toHaveBeenCalledWith(reactiveState);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    test('should not notify listeners when value does not change', () => {
      const listener = jest.fn();
      reactiveState.set('test', 'value');
      reactiveState.subscribe(listener);
      
      reactiveState.set('test', 'value'); // Same value
      
      expect(listener).not.toHaveBeenCalled();
    });

    test('should handle multiple listeners', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      
      reactiveState.subscribe(listener1);
      reactiveState.subscribe(listener2);
      
      reactiveState.set('test', 'value');
      
      expect(listener1).toHaveBeenCalledWith(reactiveState);
      expect(listener2).toHaveBeenCalledWith(reactiveState);
    });

    test('should handle listener errors gracefully', () => {
      const errorListener = jest.fn(() => {
        throw new Error('Listener error');
      });
      const goodListener = jest.fn();
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      reactiveState.subscribe(errorListener);
      reactiveState.subscribe(goodListener);
      
      reactiveState.set('test', 'value');
      
      expect(consoleSpy).toHaveBeenCalledWith('Error in ReactiveState listener:', expect.any(Error));
      expect(goodListener).toHaveBeenCalledWith(reactiveState);
      
      consoleSpy.mockRestore();
    });
  });

  describe('set()', () => {
    test('should set value and notify listeners', () => {
      const listener = jest.fn();
      reactiveState.subscribe(listener);
      
      reactiveState.set('key', 'value');
      
      expect(reactiveState.get('key')).toBe('value');
      expect(listener).toHaveBeenCalledTimes(1);
    });

    test('should not notify when setting same value', () => {
      const listener = jest.fn();
      reactiveState.set('key', 'value');
      reactiveState.subscribe(listener);
      
      reactiveState.set('key', 'value');
      
      expect(listener).not.toHaveBeenCalled();
    });

    test('should notify when changing value', () => {
      const listener = jest.fn();
      reactiveState.set('key', 'value1');
      reactiveState.subscribe(listener);
      
      reactiveState.set('key', 'value2');
      
      expect(listener).toHaveBeenCalledTimes(1);
      expect(reactiveState.get('key')).toBe('value2');
    });
  });

  describe('delete()', () => {
    test('should delete key and notify listeners', () => {
      const listener = jest.fn();
      reactiveState.set('key', 'value');
      reactiveState.subscribe(listener);
      
      const result = reactiveState.delete('key');
      
      expect(result).toBe('value');
      expect(reactiveState.exists('key')).toBe(false);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    test('should not notify when deleting non-existent key', () => {
      const listener = jest.fn();
      reactiveState.subscribe(listener);
      
      const result = reactiveState.delete('nonexistent');
      
      expect(result).toBeNull();
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('batch()', () => {
    test('should batch multiple changes into single notification', () => {
      const listener = jest.fn();
      reactiveState.subscribe(listener);
      
      reactiveState.batch(() => {
        reactiveState.set('key1', 'value1');
        reactiveState.set('key2', 'value2');
        reactiveState.set('key3', 'value3');
      });
      
      expect(listener).toHaveBeenCalledTimes(1);
      expect(reactiveState.get('key1')).toBe('value1');
      expect(reactiveState.get('key2')).toBe('value2');
      expect(reactiveState.get('key3')).toBe('value3');
    });

    test('should not notify if no changes occur in batch', () => {
      const listener = jest.fn();
      reactiveState.set('key', 'value');
      reactiveState.subscribe(listener);
      
      reactiveState.batch(() => {
        reactiveState.set('key', 'value'); // Same value
        reactiveState.delete('nonexistent'); // Non-existent key
      });
      
      expect(listener).not.toHaveBeenCalled();
    });

    test('should handle nested batches', () => {
      const listener = jest.fn();
      reactiveState.subscribe(listener);
      
      reactiveState.batch(() => {
        reactiveState.set('key1', 'value1');
        reactiveState.batch(() => {
          reactiveState.set('key2', 'value2');
        });
        reactiveState.set('key3', 'value3');
      });
      
      expect(listener).toHaveBeenCalledTimes(1);
    });

    test('should handle errors in batch function', () => {
      const listener = jest.fn();
      reactiveState.subscribe(listener);
      
      expect(() => {
        reactiveState.batch(() => {
          reactiveState.set('key1', 'value1');
          throw new Error('Batch error');
        });
      }).toThrow('Batch error');
      
      // Should still notify even if error occurred
      expect(listener).toHaveBeenCalledTimes(1);
      expect(reactiveState.get('key1')).toBe('value1');
    });
  });

  describe('clearListeners()', () => {
    test('should remove all listeners', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      
      reactiveState.subscribe(listener1);
      reactiveState.subscribe(listener2);
      
      expect(reactiveState.listenerCount()).toBe(2);
      
      reactiveState.clearListeners();
      
      expect(reactiveState.listenerCount()).toBe(0);
      
      reactiveState.set('test', 'value');
      
      expect(listener1).not.toHaveBeenCalled();
      expect(listener2).not.toHaveBeenCalled();
    });
  });

  describe('inherited State functionality', () => {
    test('should inherit all State methods', () => {
      reactiveState.set('key1', 'value1');
      reactiveState.set('key2', 42);
      reactiveState.set('key3', true);
      
      expect(reactiveState.get('key1')).toBe('value1');
      expect(reactiveState.get('key2')).toBe(42);
      expect(reactiveState.get('key3')).toBe(true);
      expect(reactiveState.exists('key1')).toBe(true);
      expect(reactiveState.exists('nonexistent')).toBe(false);
      expect(reactiveState.size()).toBe(3);
      
      const deleted = reactiveState.delete('key2');
      expect(deleted).toBe(42);
      expect(reactiveState.size()).toBe(2);
    });
  });
});