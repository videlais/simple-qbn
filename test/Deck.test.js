import Deck from '../src/Deck.js';
import State from '../src/State.js';
import Card from '../src/Card';

describe('State', () => {
  test('set state - updated state', () => {
    // Create a new state.
    const s = new State();

    // Add a new key-value.
    s.set('discard', 0);

    // Create a new deck.
    const d = new Deck();

    // Update the state with the new state.
    d.state = s;

    // Add a new card.
    d.addCard('Some content!', ['$discard == 0']);

    // Get the first card.
    const c = d.getCard(0);

    // With the updated state, it should be available.
    expect(c.isAvailable(d.state)).toBe(true);
  });

  test('set state - Throw error when trying to update state with non-State object', () => {
    const d = new Deck();
    expect(() => {
      d.state = 1;
    }).toThrow();
  });

  test('get state - returns state', () => {
    const d = new Deck();
    expect(d.state instanceof State).toBe(true);
  });
});

describe('addCard()', () => {
  test('addCard() - add card by valid object', () => {
    const d = new Deck();
    d.addCard('Some content!', ['$test == 10']);

    const c = d.getCard(0);
    expect(c.content).toBe('Some content!');
  });

  test('addCard() - throw error if content is not String', () => {
    const d = new Deck();
    expect(() => {
      d.addCard(null, []);
    }).toThrow();
  });

  test('addCard() - throw error if qualities is not array', () => {
    const d = new Deck();
    expect(() => {
      d.addCard('String value!', null);
    }).toThrow();
  });
});

describe('removeCard()', () => {
  test('removeCard() - remove by card', () => {
    const d = new Deck();
    d.addCard('Some content!', ['$test == 10']);
    const c = d.getCard(0);
    d.removeCard(c);
    expect(d.size()).toBe(0);
  });
});

describe('getCard()', () => {
  test('getCard() - get card based on position', () => {
    const d = new Deck();
    d.addCard('Content!');
    const c = d.getCard(0);
    expect(c.content).toBe('Content!');
  });

  test('getCard() - get null if index invalid', () => {
    const d = new Deck();
    const c = d.getCard(0);
    expect(c).toBe(null);
  });

  test('getCard() - return null if no index given', () => {
    const d = new Deck();
    const c = d.getCard();
    expect(c).toBe(null);
  });

  test('getCard() - get null if index greater than length', () => {
    const d = new Deck();
    d.addCard('Content!');
    d.addCard('Content!');
    const c = d.getCard(4);
    expect(c).toBe(null);
  });
});

describe('draw()', () => {
  test('draw() - draw one card', () => {
    const d = new Deck();
    d.state.set('test', 1);
    d.state.set('example', 1);
    d.addCard('Some content!', ['$test == 1', '$example == 1']);
    const c = d.draw(1);
    expect(c).toHaveLength(1);
  });

  test('draw() - return empty array if index invalid', () => {
    const d = new Deck();
    const h = d.draw(-1);
    expect(h).toHaveLength(0);
  });

  test('draw() - draw two cards', () => {
    const d = new Deck();
    d.state.set('test', 1);
    d.addCard('Some content!', ['$test == 1']);
    d.addCard('Some content!', ['$test == 1']);
    d.addCard('Some content!', ['$test == 1']);

    const c = d.draw(2);
    expect(c).toHaveLength(2);
  });

  test('draw() - draw, update, add, and draw again', () => {
    const d = new Deck();
    d.state.set('test', 1);

    d.addCard('Some content!', ['$test == 1']);

    const c = d.draw();
    // Hand should be one card.
    expect(c).toHaveLength(1);

    // Add a new quality making it unavailable.
    c[0].addQuality('$f == 10');

    // Update the card in the deck.
    d.updateCard(c[0]);

    // Add a card.
    d.addCard('Some content!', ['$test == 1']);

    // Draw one card.
    const c2 = d.draw();

    // Hand should be one card.
    expect(c2).toHaveLength(1);
  });
});

describe('shuffle()', () => {
  test('shuffle() - randomly sorts cards in Deck', () => {
    const d = new Deck();
    d.state.set('test', 1);

    // Add multiple cards.
    d.addCard('First!', ['$test == 1']);
    d.addCard('Second!', ['$test == 1']);
    d.addCard('Third!', ['$test == 1']);
    d.addCard('Fourth!', ['$test == 1']);
    d.addCard('Fifth!', ['$test == 1']);

    // Draw cards in order added.
    const hand = d.draw(d.size());

    // Shuffle cards.
    d.shuffle();

    // Order is now different.
    expect(hand).not.toStrictEqual(d.cards);
  });
});

describe('updateCard()', () => {
  test('Should update card based on hash', () => {
    // Create Deck.
    const d = new Deck();
    // Add quality.
    d.state.set('test', 1);

    // Add a card
    d.addCard('First!');

    // Get first card
    const c = d.draw(1)[0];
    // Add quality
    c.addQuality('$test == 1');

    // Update the card in the overall deck
    d.updateCard(c);

    // Should not have any cards
    const c2 = d.draw(1)[0];

    // Hashes should be the same
    expect(c.hash).toBe(c2.hash);

    // Test if re-drawn card has expression or not
    expect(c2.qualities.has('$test == 1')).toBe(true);
  });

  test('Should throw error if given non-Card', () => {
    const d = new Deck();

    expect(() => {
      d.updateCard(1);
    }).toThrow();
  });

  test('Nothing should happen if Card does not match existing one', () => {
    // Create a deck
    const d = new Deck();

    // Add a key-value to the state
    d.state.set('e', 1);

    // Add a card
    d.addCard('Test', ['$e == 1']);

    // Get card
    const c = d.getCard(0);

    // Create a new card
    const c2 = new Card('Test');

    // Add a quality
    c2.addQuality('$e == 2');
    // Add another
    c2.addQuality('$e == 3');

    // Verify that the hashes are not equal
    expect(c.hash).not.toBe(c2.hash);

    // Attempt to update
    d.updateCard(c2);

    // Get card
    const c3 = d.getCard(0);

    // Test that card has not changed number of qualities
    expect(c3.qualities.size()).toBe(1);
  });
});
