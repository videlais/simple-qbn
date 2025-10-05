import ReactiveDeck from '../../dist/src/reactive/ReactiveDeck.js';
import ReactiveCard from '../../dist/src/reactive/ReactiveCard.js';
import ReactiveState from '../../dist/src/reactive/ReactiveState.js';

describe('ReactiveDeck', () => {
  let reactiveState;
  let reactiveDeck;

  beforeEach(() => {
    reactiveState = new ReactiveState();
    reactiveState.set('test', 1);
    reactiveState.set('level', 5);
    reactiveState.set('gold', 100);
  });

  afterEach(() => {
    if (reactiveDeck) {
      reactiveDeck.dispose();
    }
  });

  describe('constructor()', () => {
    test('should create empty ReactiveDeck', () => {
      reactiveDeck = new ReactiveDeck();
      
      expect(reactiveDeck.size()).toBe(0);
      expect(reactiveDeck.cards).toEqual([]);
    });

    test('should create ReactiveDeck with cards', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      const card2 = new ReactiveCard('Card 2', ['$level > 3']);
      
      reactiveDeck = new ReactiveDeck([card1, card2]);
      
      expect(reactiveDeck.size()).toBe(2);
      expect(reactiveDeck.cards).toContain(card1);
      expect(reactiveDeck.cards).toContain(card2);
      
      card1.dispose();
      card2.dispose();
    });

    test('should create ReactiveDeck with cards and state', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1], reactiveState);
      
      expect(reactiveDeck.size()).toBe(1);
      expect(reactiveDeck.availableCards.length).toBe(1);
      
      card1.dispose();
    });
  });

  describe('cards', () => {
    test('should set cards array', () => {
      const card1 = new ReactiveCard('Card 1');
      const card2 = new ReactiveCard('Card 2');
      
      reactiveDeck = new ReactiveDeck();
      reactiveDeck.cards = [card1, card2];
      
      expect(reactiveDeck.size()).toBe(2);
      expect(reactiveDeck.cards).toContain(card1);
      expect(reactiveDeck.cards).toContain(card2);
      
      card1.dispose();
      card2.dispose();
    });

    test('should replace existing cards when set', () => {
      const card1 = new ReactiveCard('Card 1');
      const card2 = new ReactiveCard('Card 2');
      const card3 = new ReactiveCard('Card 3');
      
      reactiveDeck = new ReactiveDeck([card1]);
      
      expect(reactiveDeck.size()).toBe(1);
      
      reactiveDeck.cards = [card2, card3];
      
      expect(reactiveDeck.size()).toBe(2);
      expect(reactiveDeck.cards).not.toContain(card1);
      expect(reactiveDeck.cards).toContain(card2);
      expect(reactiveDeck.cards).toContain(card3);
      
      card1.dispose();
      card2.dispose();
      card3.dispose();
    });

    test('should bind cards to state when deck is bound', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([], reactiveState);
      reactiveDeck.cards = [card1];
      
      expect(card1.available).toBe(true);
      
      card1.dispose();
    });
  });

  describe('availableCards', () => {
    test('should return cards that are available', () => {
      const card1 = new ReactiveCard('Available', ['$test == 1']);
      const card2 = new ReactiveCard('Not Available', ['$test == 2']);
      
      reactiveDeck = new ReactiveDeck([card1, card2], reactiveState);
      
      const available = reactiveDeck.availableCards;
      
      expect(available.length).toBe(1);
      expect(available).toContain(card1);
      expect(available).not.toContain(card2);
      
      card1.dispose();
      card2.dispose();
    });

    test('should update when state changes', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      const card2 = new ReactiveCard('Card 2', ['$test == 2']);
      
      reactiveDeck = new ReactiveDeck([card1, card2], reactiveState);
      
      expect(reactiveDeck.availableCards.length).toBe(1);
      expect(reactiveDeck.availableCards).toContain(card1);
      
      reactiveState.set('test', 2);
      
      expect(reactiveDeck.availableCards.length).toBe(1);
      expect(reactiveDeck.availableCards).toContain(card2);
      
      card1.dispose();
      card2.dispose();
    });

    test('should throw when not bound to state', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1]);
      
      expect(() => reactiveDeck.availableCards).toThrow('ReactiveDeck must be bound to a state');
      
      card1.dispose();
    });

    test('should return empty array when no cards available', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 2']);
      
      reactiveDeck = new ReactiveDeck([card1], reactiveState);
      
      expect(reactiveDeck.availableCards).toEqual([]);
      
      card1.dispose();
    });
  });

  describe('bindToState()', () => {
    test('should bind deck and all cards to state', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      const card2 = new ReactiveCard('Card 2', ['$level > 3']);
      
      reactiveDeck = new ReactiveDeck([card1, card2]);
      
      reactiveDeck.bindToState(reactiveState);
      
      expect(reactiveDeck.availableCards.length).toBe(2);
      expect(card1.available).toBe(true);
      expect(card2.available).toBe(true);
      
      card1.dispose();
      card2.dispose();
    });

    test('should rebind to different state', () => {
      const state2 = new ReactiveState();
      state2.set('test', 2);
      
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      const card2 = new ReactiveCard('Card 2', ['$test == 2']);
      
      reactiveDeck = new ReactiveDeck([card1, card2], reactiveState);
      
      expect(reactiveDeck.availableCards.length).toBe(1);
      expect(reactiveDeck.availableCards).toContain(card1);
      
      reactiveDeck.bindToState(state2);
      
      expect(reactiveDeck.availableCards.length).toBe(1);
      expect(reactiveDeck.availableCards).toContain(card2);
      
      card1.dispose();
      card2.dispose();
      state2.clearListeners();
    });

    test('should notify listeners when available cards change', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1], reactiveState);
      const listener = jest.fn();
      reactiveDeck.subscribe(listener);
      
      reactiveState.set('test', 2);
      
      expect(listener).toHaveBeenCalledWith([]);
      
      card1.dispose();
    });
  });

  describe('unbind()', () => {
    test('should unbind deck and all cards from state', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1], reactiveState);
      const listener = jest.fn();
      reactiveDeck.subscribe(listener);
      
      reactiveDeck.unbind();
      
      reactiveState.set('test', 2);
      
      expect(listener).not.toHaveBeenCalled();
      expect(() => reactiveDeck.availableCards).toThrow('ReactiveDeck must be bound to a state');
      
      card1.dispose();
    });
  });

  describe('addCard()', () => {
    test('should add card to deck', () => {
      const card1 = new ReactiveCard('Card 1');
      
      reactiveDeck = new ReactiveDeck();
      
      reactiveDeck.addCard(card1);
      
      expect(reactiveDeck.size()).toBe(1);
      expect(reactiveDeck.cards).toContain(card1);
      
      card1.dispose();
    });

    test('should bind card to state if deck is bound', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([], reactiveState);
      
      reactiveDeck.addCard(card1);
      
      expect(card1.available).toBe(true);
      
      card1.dispose();
    });

    test('should notify listeners when available cards change', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([], reactiveState);
      const listener = jest.fn();
      reactiveDeck.subscribe(listener);
      
      reactiveDeck.addCard(card1);
      
      expect(listener).toHaveBeenCalledWith([card1]);
      
      card1.dispose();
    });

    test('should throw error with non-ReactiveCard', () => {
      reactiveDeck = new ReactiveDeck();
      
      expect(() => {
        reactiveDeck.addCard({});
      }).toThrow('Must be passed ReactiveCard to add to deck');
    });
  });

  describe('removeCard()', () => {
    test('should remove card from deck', () => {
      const card1 = new ReactiveCard('Card 1');
      
      reactiveDeck = new ReactiveDeck([card1]);
      
      expect(reactiveDeck.size()).toBe(1);
      
      reactiveDeck.removeCard(card1);
      
      expect(reactiveDeck.size()).toBe(0);
      expect(reactiveDeck.cards).not.toContain(card1);
      
      card1.dispose();
    });

    test('should unbind card from state', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1], reactiveState);
      
      expect(card1.available).toBe(true);
      
      reactiveDeck.removeCard(card1);
      
      expect(() => card1.available).toThrow('ReactiveCard must be bound to a state');
      
      card1.dispose();
    });

    test('should notify listeners when available cards change', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1], reactiveState);
      const listener = jest.fn();
      reactiveDeck.subscribe(listener);
      
      reactiveDeck.removeCard(card1);
      
      expect(listener).toHaveBeenCalledWith([]);
      
      card1.dispose();
    });

    test('should do nothing if card not in deck', () => {
      const card1 = new ReactiveCard('Card 1');
      const card2 = new ReactiveCard('Card 2');
      
      reactiveDeck = new ReactiveDeck([card1]);
      
      expect(reactiveDeck.size()).toBe(1);
      
      reactiveDeck.removeCard(card2);
      
      expect(reactiveDeck.size()).toBe(1);
      expect(reactiveDeck.cards).toContain(card1);
      
      card1.dispose();
      card2.dispose();
    });
  });

  describe('getAvailableCards()', () => {
    test('should check availability against given state', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      const card2 = new ReactiveCard('Card 2', ['$test == 2']);
      
      reactiveDeck = new ReactiveDeck([card1, card2]);
      
      const available = reactiveDeck.getAvailableCards(reactiveState);
      
      expect(available.length).toBe(1);
      expect(available).toContain(card1);
      
      card1.dispose();
      card2.dispose();
    });

    test('should work with different state', () => {
      const otherState = new ReactiveState();
      otherState.set('test', 2);
      
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      const card2 = new ReactiveCard('Card 2', ['$test == 2']);
      
      reactiveDeck = new ReactiveDeck([card1, card2]);
      
      const available = reactiveDeck.getAvailableCards(otherState);
      
      expect(available.length).toBe(1);
      expect(available).toContain(card2);
      
      card1.dispose();
      card2.dispose();
      otherState.clearListeners();
    });

    test('should throw with non-ReactiveState', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1]);
      
      expect(() => {
        reactiveDeck.getAvailableCards({});
      }).toThrow('Must be passed ReactiveState to check available cards');
      
      card1.dispose();
    });
  });

  describe('draw()', () => {
    test('should return random available card', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      const card2 = new ReactiveCard('Card 2', ['$level > 3']);
      
      reactiveDeck = new ReactiveDeck([card1, card2], reactiveState);
      
      const drawn = reactiveDeck.draw();
      
      expect([card1, card2]).toContain(drawn);
      
      card1.dispose();
      card2.dispose();
    });

    test('should return null when no cards available', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 2']);
      
      reactiveDeck = new ReactiveDeck([card1], reactiveState);
      
      const drawn = reactiveDeck.draw();
      
      expect(drawn).toBe(null);
      
      card1.dispose();
    });

    test('should throw when not bound to state', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1]);
      
      expect(() => reactiveDeck.draw()).toThrow('ReactiveDeck must be bound to a state');
      
      card1.dispose();
    });
  });

  describe('drawFromState()', () => {
    test('should return random available card from given state', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1]);
      
      const drawn = reactiveDeck.drawFromState(reactiveState);
      
      expect(drawn).toBe(card1);
      
      card1.dispose();
    });

    test('should return null when no cards available in state', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 2']);
      
      reactiveDeck = new ReactiveDeck([card1]);
      
      const drawn = reactiveDeck.drawFromState(reactiveState);
      
      expect(drawn).toBe(null);
      
      card1.dispose();
    });
  });

  describe('subscribe()', () => {
    test('should add listener and return unsubscribe function', () => {
      reactiveDeck = new ReactiveDeck([], reactiveState);
      const listener = jest.fn();
      
      const unsubscribe = reactiveDeck.subscribe(listener);
      
      expect(reactiveDeck.listenerCount()).toBe(1);
      expect(typeof unsubscribe).toBe('function');
      
      unsubscribe();
      expect(reactiveDeck.listenerCount()).toBe(0);
    });

    test('should notify listeners when available cards change', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1], reactiveState);
      const listener = jest.fn();
      reactiveDeck.subscribe(listener);
      
      reactiveState.set('test', 2);
      
      expect(listener).toHaveBeenCalledWith([]);
      
      card1.dispose();
    });

    test('should handle listener errors gracefully', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1], reactiveState);
      
      const errorListener = jest.fn(() => {
        throw new Error('Listener error');
      });
      const goodListener = jest.fn();
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      reactiveDeck.subscribe(errorListener);
      reactiveDeck.subscribe(goodListener);
      
      reactiveState.set('test', 2);
      
      expect(consoleSpy).toHaveBeenCalledWith('Error in ReactiveDeck listener:', expect.any(Error));
      expect(goodListener).toHaveBeenCalledWith([]);
      
      consoleSpy.mockRestore();
      
      card1.dispose();
    });
  });

  describe('size()', () => {
    test('should return number of cards in deck', () => {
      const card1 = new ReactiveCard('Card 1');
      const card2 = new ReactiveCard('Card 2');
      
      reactiveDeck = new ReactiveDeck();
      
      expect(reactiveDeck.size()).toBe(0);
      
      reactiveDeck.addCard(card1);
      expect(reactiveDeck.size()).toBe(1);
      
      reactiveDeck.addCard(card2);
      expect(reactiveDeck.size()).toBe(2);
      
      card1.dispose();
      card2.dispose();
    });
  });

  describe('clearListeners()', () => {
    test('should remove all listeners', () => {
      reactiveDeck = new ReactiveDeck([], reactiveState);
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      
      reactiveDeck.subscribe(listener1);
      reactiveDeck.subscribe(listener2);
      
      expect(reactiveDeck.listenerCount()).toBe(2);
      
      reactiveDeck.clearListeners();
      
      expect(reactiveDeck.listenerCount()).toBe(0);
      
      const card = new ReactiveCard('Card', ['$test == 1']);
      reactiveDeck.addCard(card);
      
      expect(listener1).not.toHaveBeenCalled();
      expect(listener2).not.toHaveBeenCalled();
      
      card.dispose();
    });
  });

  describe('state', () => {
    test('should get state when bound', () => {
      reactiveDeck = new ReactiveDeck([], reactiveState);
      
      expect(reactiveDeck.state).toBe(reactiveState);
    });

    test('should throw error when getting state if not bound', () => {
      reactiveDeck = new ReactiveDeck();
      
      expect(() => reactiveDeck.state).toThrow('ReactiveDeck must be bound to a state');
    });

    test('should set state when valid ReactiveState', () => {
      const newState = new ReactiveState();
      newState.set('test', 2);
      
      reactiveDeck = new ReactiveDeck([], reactiveState);
      const listener = jest.fn();
      reactiveDeck.subscribe(listener);
      
      reactiveDeck.state = newState;
      
      expect(reactiveDeck.state).toBe(newState);
      expect(listener).toHaveBeenCalled();
      
      newState.clearListeners();
    });

    test('should throw error when setting invalid state', () => {
      reactiveDeck = new ReactiveDeck([], reactiveState);
      
      expect(() => {
        reactiveDeck.state = {};
      }).toThrow('Passed value is not an instance of ReactiveState');
    });
  });

  describe('getCard()', () => {
    test('should return card at valid index', () => {
      const card1 = new ReactiveCard('Card 1');
      const card2 = new ReactiveCard('Card 2');
      
      reactiveDeck = new ReactiveDeck([card1, card2]);
      
      expect(reactiveDeck.getCard(0)).toBe(card1);
      expect(reactiveDeck.getCard(1)).toBe(card2);
      
      card1.dispose();
      card2.dispose();
    });

    test('should return null for invalid index', () => {
      const card1 = new ReactiveCard('Card 1');
      
      reactiveDeck = new ReactiveDeck([card1]);
      
      expect(reactiveDeck.getCard(-1)).toBe(null);
      expect(reactiveDeck.getCard(1)).toBe(null);
      expect(reactiveDeck.getCard(10)).toBe(null);
      
      card1.dispose();
    });

    test('should return null for empty deck', () => {
      reactiveDeck = new ReactiveDeck();
      
      expect(reactiveDeck.getCard(0)).toBe(null);
    });
  });

  describe('updateCard()', () => {
    test('should update card by hash', () => {
      const card1 = new ReactiveCard('Original Content', ['$test == 1']);
      const updatedCard = new ReactiveCard('Updated Content', ['$test == 1']);
      
      // Set the same hash to simulate updating the same card
      updatedCard._hash = card1.hash;
      
      reactiveDeck = new ReactiveDeck([card1], reactiveState);
      const listener = jest.fn();
      reactiveDeck.subscribe(listener);
      
      // Temporarily mock the hash for testing
      Object.defineProperty(updatedCard, 'hash', {
        get: () => card1.hash,
        configurable: true
      });
      
      reactiveDeck.updateCard(updatedCard);
      
      expect(reactiveDeck.cards[0]).toBe(updatedCard);
      expect(reactiveDeck.cards[0].content).toBe('Updated Content');
      expect(listener).toHaveBeenCalled();
      
      updatedCard.dispose();
    });

    test('should bind updated card to state if deck is bound', () => {
      const card1 = new ReactiveCard('Original Content', ['$test == 1']);
      const updatedCard = new ReactiveCard('Updated Content', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1], reactiveState);
      
      // Temporarily mock the hash for testing
      Object.defineProperty(updatedCard, 'hash', {
        get: () => card1.hash,
        configurable: true
      });
      
      reactiveDeck.updateCard(updatedCard);
      
      expect(updatedCard.available).toBe(true);
      
      updatedCard.dispose();
    });

    test('should throw error with non-ReactiveCard', () => {
      const card1 = new ReactiveCard('Card 1');
      
      reactiveDeck = new ReactiveDeck([card1]);
      
      expect(() => {
        reactiveDeck.updateCard({});
      }).toThrow('Updated card must be ReactiveCard!');
      
      card1.dispose();
    });

    test('should do nothing if card hash not found', () => {
      const card1 = new ReactiveCard('Card 1');
      const card2 = new ReactiveCard('Card 2');
      
      reactiveDeck = new ReactiveDeck([card1]);
      const listener = jest.fn();
      reactiveDeck.subscribe(listener);
      
      reactiveDeck.updateCard(card2);
      
      expect(reactiveDeck.cards[0]).toBe(card1);
      expect(listener).not.toHaveBeenCalled();
      
      card1.dispose();
      card2.dispose();
    });
  });

  describe('isCardAvailable()', () => {
    test('should check if card is available with bound state', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      const card2 = new ReactiveCard('Card 2', ['$test == 2']);
      
      reactiveDeck = new ReactiveDeck([card1, card2], reactiveState);
      
      expect(reactiveDeck.isCardAvailable(card1)).toBe(true);
      expect(reactiveDeck.isCardAvailable(card2)).toBe(false);
      
      card1.dispose();
      card2.dispose();
    });

    test('should throw when deck not bound to state', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1]);
      
      expect(() => reactiveDeck.isCardAvailable(card1)).toThrow('ReactiveDeck must be bound to a state');
      
      card1.dispose();
    });
  });

  describe('shuffle()', () => {
    test('should shuffle deck and notify listeners', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      const card2 = new ReactiveCard('Card 2', ['$test == 1']);
      const card3 = new ReactiveCard('Card 3', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1, card2, card3], reactiveState);
      const listener = jest.fn();
      reactiveDeck.subscribe(listener);
      
      reactiveDeck.shuffle();
      
      // Should notify listeners with available cards (lines 234-239)
      expect(listener).toHaveBeenCalled();
      const calledWith = listener.mock.calls[0][0];
      expect(calledWith).toHaveLength(3);
      expect(calledWith).toEqual(expect.arrayContaining([card1, card2, card3]));
      expect(reactiveDeck.size()).toBe(3);
      
      card1.dispose();
      card2.dispose();
      card3.dispose();
    });

    test('should shuffle empty deck without errors', () => {
      reactiveDeck = new ReactiveDeck([], reactiveState);
      const listener = jest.fn();
      reactiveDeck.subscribe(listener);
      
      reactiveDeck.shuffle();
      
      expect(listener).toHaveBeenCalledWith([]);
      expect(reactiveDeck.size()).toBe(0);
    });

    test('should shuffle deck without state bound', () => {
      const card1 = new ReactiveCard('Card 1');
      const card2 = new ReactiveCard('Card 2');
      
      reactiveDeck = new ReactiveDeck([card1, card2]);
      const listener = jest.fn();
      reactiveDeck.subscribe(listener);
      
      reactiveDeck.shuffle();
      
      // Should not call listeners when no state bound (notifyListeners checks for state)
      expect(reactiveDeck.size()).toBe(2);
      
      card1.dispose();
      card2.dispose();
    });
  });

  describe('toDeck()', () => {
    test('should create regular Deck from ReactiveDeck', () => {
      const card1 = new ReactiveCard('Card 1');
      
      reactiveDeck = new ReactiveDeck([card1], reactiveState);
      
      const regularDeck = reactiveDeck.toDeck();
      
      expect(regularDeck).toBeDefined();
      expect(typeof regularDeck.size).toBe('function');
      
      card1.dispose();
    });
  });

  describe('dispose()', () => {
    test('should clean up all subscriptions and listeners', () => {
      const card1 = new ReactiveCard('Card 1', ['$test == 1']);
      
      reactiveDeck = new ReactiveDeck([card1], reactiveState);
      const listener = jest.fn();
      reactiveDeck.subscribe(listener);
      
      expect(reactiveDeck.listenerCount()).toBe(1);
      
      reactiveDeck.dispose();
      
      expect(reactiveDeck.listenerCount()).toBe(0);
      
      // Should not throw when accessing availableCards after dispose
      expect(() => reactiveDeck.availableCards).toThrow('ReactiveDeck must be bound to a state');
      
      card1.dispose();
    });
  });
});