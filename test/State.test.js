import State from '../dist/src/State.js';

// Global s for all tests
let s = null;

// Before each test, reset s to a new State()
beforeEach(() => {
  s = new State();
});

test('constructor() - create empty object', () => {
  expect(s.size()).toBe(0);
});

test('set() - adds value, size adjusts', () => {
  s.set('three', 2);
  expect(s.size()).toBe(1);
});

test('remove() - removes value, size adjusts', () => {
  s.set('one', 2);
  s.delete('one');
  expect(s.size()).toBe(0);
});

test('set() - updates values', () => {
  s.set('one', 2);
  s.set('one', 3);
  expect(s.get('one')).toBe(3);
});

test('exists() - inclusion', () => {
  s.set('one', 2);
  expect(s.exists('one')).toBe(true);
});

test('get() - returns value', () => {
  s.set('two', 2);
  expect(s.get('two')).toBe(2);
});

test('get() - return null if key does not exist', () => {
  expect(s.get('two')).toBe(null);
});

test('size() - returns size', () => {
  s.set('two', 2);
  expect(s.size()).toBe(1);
});

test('delete() - remove key-value by key', () => {
  s.set('test', 2);
  const result = s.delete('test');
  expect(result).toBe(2);
});

test('delete() - return null if key not found', () => {
  const result = s.delete('test');
  expect(result).toBe(null);
});
