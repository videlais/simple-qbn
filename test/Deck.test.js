import Deck from '../src/Deck.js';
import State from '../src/State.js';

describe('State', () => {
  test('set state - updated state', () => {
    const d = new Deck();
    const s = new State();
    s.add('discard', 0);
    d.state = s;
    d.add({
      content: 'Some content!',
      qualities: ['discard-eq-0']
    });
    const c = d.getCard(0);
    expect(c.available).toBe(true);
  });

  test('set state - Throw error when trying to update state with non-State object', () => {
    const d = new Deck();
    expect(() => {
      d.state = 1;
    }).toThrow();
  });
});

describe('add()', () => {
  test('add() - add card by valid object', () => {
    const d = new Deck();
    d.add({
      content: 'Some content!',
      qualities: ['test-eq-1', 'example-neq-2']
    });

    const c = d.getCard(0);
    expect(c.content).toBe('Some content!');
  });

  test('add() - add card by invalid object, throw content error', () => {
    const d = new Deck();
    expect(() => {
      d.add({
        content: null,
        qualities: ['test-eq-1', 'example-neq-2']
      });
    }).toThrow();
  });

  test('add() - add card by invalid object, throw qualities error', () => {
    const d = new Deck();
    expect(() => {
      d.add({
        content: 'String value!',
        qualities: null
      });
    }).toThrow();
  });
});

describe('remove()', () => {
  test('remove() - remove by card', () => {
    const d = new Deck();
    d.add({
      content: 'Some content!',
      qualities: ['test-eq-1', 'example-neq-2']
    });

    const c = d.getCard(0);
    d.remove(c);

    expect(d.size()).toBe(0);
  });
});

describe('getCard()', () => {
  test('getCard() - get card based on position', () => {
    const d = new Deck();
    d.add({
      content: 'Content!',
      qualities: []
    });

    const c = d.getCard(0);
    expect(c.content).toBe('Content!');
  });

  test('getCard() - get null if index invalid', () => {
    const d = new Deck();
    const c = d.getCard(0);
    expect(c).toBe(null);
  });

  test('getCard() - get null if index greater than length', () => {
    const d = new Deck();

    d.add({
      content: 'Content!',
      qualities: []
    });

    d.add({
      content: 'Content!',
      qualities: []
    });

    const c = d.getCard(4);
    expect(c).toBe(null);
  });
});

describe('draw()', () => {
  test('draw() - draw one card', () => {
    const s = new State();
    s.add('test', 1);
    s.add('example', 1);
    const d = new Deck();
    d.state = s;
    d.add({
      content: 'Some content!',
      qualities: ['test-eq-1', 'example-neq-2']
    });

    const c = d.draw(1);
    expect(c).toHaveLength(1);
  });

  test('draw() - draw two cards', () => {
    const s = new State();
    s.add('test', 1);
    const d = new Deck();
    d.state = s;
    d.add({
      content: 'Some content!',
      qualities: ['test-eq-1']
    });
    d.add({
      content: 'Some content!',
      qualities: ['test-neq-1']
    });
    d.add({
      content: 'Some content!',
      qualities: ['test-neq-3']
    });

    const c = d.draw(2);
    expect(c).toHaveLength(2);
  });

  test('draw() - draw, update, add, and draw again', () => {
    const s = new State();
    s.add('test', 1);
    const d = new Deck();
    d.state = s;

    d.add({
      content: 'Some content!',
      qualities: ['test-eq-1']
    });

    const c = d.draw();
    // Hand should be one card
    expect(c).toHaveLength(1);

    // Add a new quality making it unavailable
    c[0].addQuality('discard-eq-1');

    // Update the card in the deck
    d.updateCard(c[0]);

    d.add({
      content: 'Some content!',
      qualities: ['test-eq-1']
    });

    // Draw one card
    const c2 = d.draw();

    // Hand should be one card
    expect(c2).toHaveLength(1);
  });
});

describe('shuffle()', () => {
  test('shuffle() - randomly sorts cards in Deck', () => {
    const s = new State();
    s.add('test', 1);

    const d = new Deck();
    d.state = s;

    d.add({
      content: 'First!',
      qualities: ['test-eq-1']
    });

    d.add({
      content: 'Second!',
      qualities: ['test-eq-1']
    });

    d.add({
      content: 'Third!',
      qualities: ['test-eq-1']
    });

    d.add({
      content: 'Fourth!',
      qualities: ['test-eq-1']
    });

    d.add({
      content: 'Fifth!',
      qualities: ['test-eq-1']
    });

    // Draw cards in order added
    const hand = d.draw(d.size());

    // Shuffle cards
    d.shuffle();

    // Order is now different
    expect(hand).not.toStrictEqual(d.cards);
  });
});

describe('updateCard()', () => {
  test('Should update card based on hash', () => {
    const s = new State();
    s.add('test', 1);

    const d = new Deck();
    d.state = s;

    d.add({
      content: 'First!',
      qualities: []
    });

    // Get first card
    const c = d.draw(1)[0];
    // Add a quality
    c.addQuality('test-eq-2');

    // Update the card in the overall deck
    d.updateCard(c);

    // Should not have any cards
    const c2 = d.draw(1);

    // Should have length of 0
    expect(c2).toHaveLength(0);
  });

  test('Should throw error if given non-Card', () => {
    const s = new State();
    s.add('test', 1);

    const d = new Deck();
    d.state = s;

    expect(() => {
      d.updateCard(1);
    }).toThrow();
  });
});
