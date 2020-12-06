import Deck from '../src/Deck.js';
import State from '../src/State.js';

describe('constructor()', () => {

  test('constructor() - has a State', () => {
    const d = new Deck();
    expect(d.state instanceof State).toBe(true);
  });

});

describe('add()', () => {

  test('add() - add card by valid object', () => {
    const d = new Deck();
    d.add({
      content: 'Some content!',
      qualities: ['test-eq-1', 'example-neq-2']
    });
    expect(d.cards[0].content).toBe('Some content!');
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

    let c = d.cards[0];

    d.remove(c);
    expect(d.cards).toHaveLength(0);
  });
});

describe('draw()', () => {
  test('draw() - draw one card', () => {
    const s = new State();
    s.add('test', 1);
    s.add('example', 1);
    const d = new Deck(s);
    d.add({
      content: 'Some content!',
      qualities: ['test-eq-1', 'example-neq-2']
    });

    let c = d.draw(1);
    expect(c).toHaveLength(1);
  });

  test('draw() - draw two cards', () => {
    const s = new State();
    s.add('test', 1);
    const d = new Deck(s);
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

    let c = d.draw(2);
    expect(c).toHaveLength(2);
  });
});

describe('shuffle()', () => {
  test('shuffle() - randomly sorts cards in Deck', () => {
    const s = new State();
    s.add('test', 1);
    
    const d = new Deck(s);
    
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
    const hand = d.draw(d.cards.length);

    // Shuffle cards
    d.shuffle();

    // Order is now different
    expect(hand).not.toStrictEqual(d.cards);
  });
});