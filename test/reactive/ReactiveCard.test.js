import ReactiveCard from '../../dist/src/reactive/ReactiveCard.js';
import ReactiveState from '../../dist/src/reactive/ReactiveState.js';

describe('ReactiveCard', () => {
  let reactiveState;
  let reactiveCard;

  beforeEach(() => {
    reactiveState = new ReactiveState();
    reactiveState.set('test', 1);
    reactiveState.set('level', 5);
  });

  afterEach(() => {
    if (reactiveCard) {
      reactiveCard.dispose();
    }
  });

  describe('constructor()', () => {
    test('should create ReactiveCard with default values', () => {
      reactiveCard = new ReactiveCard();
      
      expect(reactiveCard.content).toBe('');
      expect(reactiveCard.qualities.size()).toBe(0);
      expect(typeof reactiveCard.hash).toBe('string');
    });

    test('should create ReactiveCard with content and qualities', () => {
      reactiveCard = new ReactiveCard('Test content', ['$test == 1'], reactiveState);
      
      expect(reactiveCard.content).toBe('Test content');
      expect(reactiveCard.qualities.size()).toBe(1);
      expect(reactiveCard.available).toBe(true);
    });

    test('should create ReactiveCard without state', () => {
      reactiveCard = new ReactiveCard('Test content', ['$test == 1']);
      
      expect(reactiveCard.content).toBe('Test content');
      expect(reactiveCard.qualities.size()).toBe(1);
    });
  });

  describe('content', () => {
    test('should get and set content', () => {
      reactiveCard = new ReactiveCard();
      
      reactiveCard.content = 'New content';
      
      expect(reactiveCard.content).toBe('New content');
    });

    test('should throw error with non-string content', () => {
      reactiveCard = new ReactiveCard();
      
      expect(() => {
        reactiveCard.content = 123;
      }).toThrow('Content must be expressed as a string!');
    });
  });

  describe('qualities', () => {
    test('should set qualities array', () => {
      reactiveCard = new ReactiveCard('', [], reactiveState);
      
      reactiveCard.qualities = ['$test == 1', '$level > 3'];
      
      expect(reactiveCard.qualities.size()).toBe(2);
      expect(reactiveCard.qualities.has('$test == 1')).toBe(true);
      expect(reactiveCard.qualities.has('$level > 3')).toBe(true);
    });

    test('should replace existing qualities when set', () => {
      reactiveCard = new ReactiveCard('', ['$old == 1'], reactiveState);
      
      expect(reactiveCard.qualities.size()).toBe(1);
      
      reactiveCard.qualities = ['$new == 1'];
      
      expect(reactiveCard.qualities.size()).toBe(1);
      expect(reactiveCard.qualities.has('$new == 1')).toBe(true);
      expect(reactiveCard.qualities.has('$old == 1')).toBe(false);
    });
  });

  describe('available', () => {
    test('should return true when all qualities are met', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1', '$level >= 5'], reactiveState);
      
      expect(reactiveCard.available).toBe(true);
    });

    test('should return false when qualities are not met', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 2'], reactiveState);
      
      expect(reactiveCard.available).toBe(false);
    });

    test('should update when state changes', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1'], reactiveState);
      
      expect(reactiveCard.available).toBe(true);
      
      reactiveState.set('test', 2);
      
      expect(reactiveCard.available).toBe(false);
    });

    test('should throw when not bound to state', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1']);
      
      expect(() => reactiveCard.available).toThrow('ReactiveCard must be bound to a state');
    });
  });

  describe('bindToState()', () => {
    test('should bind to reactive state', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1']);
      
      reactiveCard.bindToState(reactiveState);
      
      expect(reactiveCard.available).toBe(true);
    });

    test('should update availability when rebound to different state', () => {
      const state2 = new ReactiveState();
      state2.set('test', 2);
      
      reactiveCard = new ReactiveCard('Test', ['$test == 1'], reactiveState);
      
      expect(reactiveCard.available).toBe(true);
      
      reactiveCard.bindToState(state2);
      
      expect(reactiveCard.available).toBe(false);
      
      state2.clearListeners();
    });

    test('should notify listeners when state changes', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1'], reactiveState);
      const listener = jest.fn();
      reactiveCard.subscribe(listener);
      
      reactiveState.set('test', 2);
      
      expect(listener).toHaveBeenCalledWith(false);
    });
  });

  describe('unbind()', () => {
    test('should unbind from state', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1'], reactiveState);
      const listener = jest.fn();
      reactiveCard.subscribe(listener);
      
      reactiveCard.unbind();
      
      reactiveState.set('test', 2);
      
      expect(listener).not.toHaveBeenCalled();
    });

    test('should throw when accessing available after unbind', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1'], reactiveState);
      
      reactiveCard.unbind();
      
      expect(() => reactiveCard.available).toThrow('ReactiveCard must be bound to a state');
    });
  });

  describe('isAvailable()', () => {
    test('should check availability against given state', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1']);
      
      const result = reactiveCard.isAvailable(reactiveState);
      
      expect(result).toBe(true);
    });

    test('should work with different state', () => {
      const otherState = new ReactiveState();
      otherState.set('test', 2);
      
      reactiveCard = new ReactiveCard('Test', ['$test == 2']);
      
      const result = reactiveCard.isAvailable(otherState);
      
      expect(result).toBe(true);
      
      otherState.clearListeners();
    });

    test('should throw with non-ReactiveState', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1']);
      
      expect(() => {
        reactiveCard.isAvailable({});
      }).toThrow('Must be passed ReactiveState to check if available');
    });
  });

  describe('addQuality()', () => {
    test('should add quality to card', () => {
      reactiveCard = new ReactiveCard('Test', [], reactiveState);
      
      reactiveCard.addQuality('$test == 1');
      
      expect(reactiveCard.qualities.size()).toBe(1);
      expect(reactiveCard.qualities.has('$test == 1')).toBe(true);
    });

    test('should update availability when quality added', () => {
      reactiveCard = new ReactiveCard('Test', [], reactiveState);
      
      expect(reactiveCard.available).toBe(true); // Empty qualities = true
      
      reactiveCard.addQuality('$test == 2'); // This will be false
      
      expect(reactiveCard.available).toBe(false);
    });
  });

  describe('removeQuality()', () => {
    test('should remove quality from card', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1'], reactiveState);
      
      expect(reactiveCard.qualities.size()).toBe(1);
      
      reactiveCard.removeQuality('$test == 1');
      
      expect(reactiveCard.qualities.size()).toBe(0);
    });

    test('should update availability when quality removed', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 2'], reactiveState); // false
      
      expect(reactiveCard.available).toBe(false);
      
      reactiveCard.removeQuality('$test == 2');
      
      expect(reactiveCard.available).toBe(true); // Empty qualities = true
    });
  });

  describe('subscribe()', () => {
    test('should add listener and return unsubscribe function', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1'], reactiveState);
      const listener = jest.fn();
      
      const unsubscribe = reactiveCard.subscribe(listener);
      
      expect(reactiveCard.listenerCount()).toBe(1);
      expect(typeof unsubscribe).toBe('function');
      
      unsubscribe();
      expect(reactiveCard.listenerCount()).toBe(0);
    });

    test('should notify listeners when availability changes', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1'], reactiveState);
      const listener = jest.fn();
      reactiveCard.subscribe(listener);
      
      reactiveState.set('test', 2);
      
      expect(listener).toHaveBeenCalledWith(false);
    });

    test('should handle listener errors gracefully', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1'], reactiveState);
      
      const errorListener = jest.fn(() => {
        throw new Error('Listener error');
      });
      const goodListener = jest.fn();
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      reactiveCard.subscribe(errorListener);
      reactiveCard.subscribe(goodListener);
      
      reactiveState.set('test', 2);
      
      expect(consoleSpy).toHaveBeenCalledWith('Error in ReactiveCard listener:', expect.any(Error));
      expect(goodListener).toHaveBeenCalledWith(false);
      
      consoleSpy.mockRestore();
    });
  });

  describe('hash', () => {
    test('should have unique hash', () => {
      const card1 = new ReactiveCard('Test 1');
      const card2 = new ReactiveCard('Test 2');
      
      expect(card1.hash).not.toBe(card2.hash);
      expect(typeof card1.hash).toBe('string');
      expect(card1.hash.length).toBeGreaterThan(0);
      
      card1.dispose();
      card2.dispose();
    });

    test('should maintain same hash throughout lifecycle', () => {
      reactiveCard = new ReactiveCard('Test');
      const originalHash = reactiveCard.hash;
      
      reactiveCard.content = 'New content';
      reactiveCard.addQuality('$test == 1');
      
      expect(reactiveCard.hash).toBe(originalHash);
    });
  });

  describe('clearListeners()', () => {
    test('should remove all listeners', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1'], reactiveState);
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      
      reactiveCard.subscribe(listener1);
      reactiveCard.subscribe(listener2);
      
      expect(reactiveCard.listenerCount()).toBe(2);
      
      reactiveCard.clearListeners();
      
      expect(reactiveCard.listenerCount()).toBe(0);
      
      reactiveState.set('test', 2);
      
      expect(listener1).not.toHaveBeenCalled();
      expect(listener2).not.toHaveBeenCalled();
    });
  });

  describe('qualities setter with state binding', () => {
    test('should rebind to state when card is bound and notify on quality changes', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1'], reactiveState);
      const listener = jest.fn();
      reactiveCard.subscribe(listener);
      
      expect(reactiveCard.available).toBe(true);
      
      // Setting new qualities should trigger rebinding to state (lines 145-146)
      // This will call bindToState and push the qualityUnsubscribe to subscriptions
      reactiveCard.qualities = ['$missing == 1']; // This should be false since 'missing' key doesn't exist
      
      expect(reactiveCard.qualities.size()).toBe(1);
      expect(reactiveCard.qualities.has('$missing == 1')).toBe(true);
      
      // Now add the missing key to make the quality true
      reactiveState.set('missing', 1);
      
      expect(reactiveCard.available).toBe(true);
      expect(listener).toHaveBeenCalledWith(true);
    });

    test('should handle qualities setter without state', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1']);
      
      reactiveCard.qualities = ['$test == 2', '$level > 3'];
      
      expect(reactiveCard.qualities.size()).toBe(2);
      expect(reactiveCard.qualities.has('$test == 2')).toBe(true);
      expect(reactiveCard.qualities.has('$level > 3')).toBe(true);
    });

    test('should properly dispose and rebind qualities when state exists', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1'], reactiveState);
      
      // Ensure the card starts with the right availability
      expect(reactiveCard.available).toBe(true);
      
      // Setting qualities should dispose old ones and create new subscriptions (lines 145-146)
      reactiveCard.qualities = ['$nonexistent == 1']; // Use non-existent key
      
      // The new qualities should be properly bound
      expect(reactiveCard.qualities.size()).toBe(1);
      
      // Add the key to make it available
      reactiveState.set('nonexistent', 1);
      expect(reactiveCard.available).toBe(true);
    });
  });

  describe('toCard()', () => {
    test('should create regular Card from ReactiveCard', () => {
      reactiveCard = new ReactiveCard('Test Content', ['$test == 1']);
      
      const regularCard = reactiveCard.toCard();
      
      expect(regularCard).toBeDefined();
      expect(regularCard.content).toBe('Test Content');
      expect(typeof regularCard.addQuality).toBe('function');
    });

    test('should create Card with empty qualities array', () => {
      reactiveCard = new ReactiveCard('Test Content');
      
      const regularCard = reactiveCard.toCard();
      
      expect(regularCard).toBeDefined();
      expect(regularCard.content).toBe('Test Content');
    });
  });

  describe('dispose()', () => {
    test('should clean up all subscriptions and listeners', () => {
      reactiveCard = new ReactiveCard('Test', ['$test == 1'], reactiveState);
      const listener = jest.fn();
      reactiveCard.subscribe(listener);
      
      expect(reactiveCard.listenerCount()).toBe(1);
      
      reactiveCard.dispose();
      
      expect(reactiveCard.listenerCount()).toBe(0);
      
      // Should not throw when accessing available after dispose
      expect(() => reactiveCard.available).toThrow('ReactiveCard must be bound to a state');
    });
  });
});