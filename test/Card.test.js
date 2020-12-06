import Card from '../src/Card.js';
import State from '../src/State.js';

describe('constructor()', () => {

  test('constructor() - has a State', () => {
    const s = new State();
    const c = new Card(s, {
      "content": '',
      "qualities": []
    });
    expect(c.state instanceof State).toBe(true);
  });

});

describe('addQuality()', () => {

  test('addQuality() - increases size of qualities by one', () => {
    const s = new State();
    const c = new Card(s, {
      "content": '',
      "qualities": []
    });
    c.addQuality('variable-op-value');
    expect(c.qualities.set.size).toBe(1);
  });

});

describe('removeQuality()', () => {

  test('removeQuality() - decreases size of qualities by one', () => {
    const s = new State();
    const c = new Card(s, {
      "content": '',
      "qualities": []
    });
    c.addQuality('variable-op-value');
    c.removeQuality('variable-op-value');
    expect(c.qualities.set.size).toBe(0);
  });

});

describe('available', () => {

  test('available - is true if single Expression is true', () => {
    const s = new State();
    s.add('test', 1);
    const c = new Card(s, {
      "content": '',
      "qualities": []
    });
    c.addQuality('test-eq-1');
    expect(c.available).toBe(true);
  });

});
