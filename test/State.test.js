import State from '../src/State.js';

// Global s for all tests
let s = null;

// Before each test, reset s to a new State()
beforeAll(() => {
  s = new State();
});

test('constructor() - create empty Map', () => {
  expect(s.size()).toBe(0);
});

test('add() - adds value, size adjusts', () => {
  s.add(1, 2);
  expect(s.size()).toBe(1);
});

test('remove() - removes value, size adjusts', () => {
  s.add(1, 2);
  s.remove(1);
  expect(s.size()).toBe(0);
});

test('update() - updates values', () => {
  s.add(1, 2);
  s.update(1, 3);
  expect(s.get(1)).toBe(3);
});

test('has() - inclusion', () => {
  s.add(1, 2);
  expect(s.has(1)).toBe(true);
});

test('#get() - returns value', () => {
  s.add(1, 2);
  expect(s.get(1)).toBe(2);
});

test('size() - returns size', () => {
  const s = new State();
  s.add(1, 2);
  expect(s.size()).toBe(1);
});

test('remove() - remove key-value by key', () => {
  s.add('test', 2);
  const result = s.remove('test');
  expect(result).toBe(2);
});

test('remove() - return null if key not found', () => {
  const result = s.remove('test');
  expect(result).toBe(null);
});
