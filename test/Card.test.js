import Card from '../src/Card.js';
import QualitySet from '../src/QualitySet.js';
import State from '../src/State.js';

describe('constructor()', () => {
  test('constructor() - passed string', () => {
    const c = new Card('e');
    expect(typeof c.content).toBe('string');
  });
});

describe('addQuality()', () => {
  test('addQuality() - increases size of qualities by one', () => {
    const c = new Card();
    c.addQuality({ test: { $eq: 10 } });
    expect(c.qualities.size()).toBe(1);
  });

  test('addQuality() - throw error if not string', () => {
    const c = new Card();
    expect(() => {
      c.addQuality(null);
    }).toThrow();
  });
});

describe('removeQuality()', () => {
  test('removeQuality() - decreases size of qualities by one', () => {
    const c = new Card();
    c.addQuality({ test: { $eq: 10 } });
    c.removeQuality({ test: { $eq: 10 } });
    expect(c.qualities.size()).toBe(0);
  });

  test('removeQuality() - throw error if given non-object', () => {
    const c = new Card();
    c.addQuality({ test: 1 });
    expect(() => {
      c.removeQuality(null);
    }).toThrow();
  });
});

describe('isAvailable()', () => {
  test('isAvailable() - is true if every Expression is true', () => {
    const s = new State();
    s.set('test', 1);
    const c = new Card();
    c.addQuality({ test: { $eq: 1 } });
    expect(c.isAvailable(s)).toBe(true);
  });

  test('isAvailable() - is false if any Expression is false', () => {
    const s = new State();
    s.set('test', 2);
    const c = new Card();
    c.addQuality({ test: { $eq: 10 } });
    expect(c.isAvailable(s)).toBe(false);
  });

  test('isAvailable() - throw error if not passed State', () => {
    const c = new Card();
    expect(() => {
      c.isAvailable(null);
    }).toThrow();
  });
});

describe('content', () => {
  test('content - updates with String content', () => {
    const c = new Card('Content');
    expect(c.content).toBe('Content');
  });

  test('content - throw error if String is not used', () => {
    const c = new Card('Content');
    expect(() => {
      c.content = null;
    }).toThrow();
  });
});

describe('qualities', () => {
  test('qualities - should be QualitySet', () => {
    const c = new Card();
    expect(c.qualities instanceof QualitySet).toBe(true);
  });

  test('qualities - should throw error if attempt to change', () => {
    const c = new Card();
    expect(() => {
      c.qualities = 1;
    }).toThrow();
  });
});

describe('hash', () => {
  test('Should be hash of content', () => {
    const c = new Card('Hello');
    expect(c.hash).not.toBe(null);
  });

  test('Should throw error when attempting to change', () => {
    const c = new Card('Hello');
    expect(() => {
      c.hash = 1;
    }).toThrow();
  });
});
