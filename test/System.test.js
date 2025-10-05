import Deck from '../dist/src/Deck.js';

test('Adding and updating', () => {
  // Create a deck
  const d = new Deck();
  // Update the deck's state
  d.state.set('test', 1);
  d.state.set('discard', 0);

  // Add a card
  d.addCard('Content!', ['$test == 1']);

  // Add a card
  d.addCard('Content!', ['$test == 1']);

  // Draw a card (array) and take first entry
  const card = d.draw(1)[0];

  // Test availability
  expect(card.isAvailable(d.state)).toBe(true);

  // Add a discard quality
  card.addQuality('$discard == 1');

  // Should no longer be available
  expect(card.isAvailable(d.state)).toBe(false);

  // Update the card
  d.updateCard(card);

  // Draw other card
  const card2 = d.draw(1)[0];
  // Add a discard quality
  card2.addQuality('$discard == 1');
  // Discard it
  d.updateCard(card2);

  // Attempt another draw
  const cards = d.draw(1);

  // No more cards are available, so the length should be 0
  expect(cards).toHaveLength(0);

  // Add a new card to the deck
  d.addCard('Third!', ['$test == 1']);

  // Test for size()
  expect(d.size()).toBe(3);

  // Draw one card from deck
  const cs = d.draw();

  // Test length of hand (which should be 1)
  expect(cs).toHaveLength(1);

  // Test the content of the last card
  expect(cs[0].content).toBe('Third!');
});

test('Adding and removing', () => {
  // Create a deck
  const d = new Deck();
  // Update the deck's state
  d.state.set('test', 1);

  // Add a card
  d.addCard('Content!', ['$test == 1']);

  // Add a card
  d.addCard('Content!', ['$test == 1']);

  // Draw a card (array) and take first entry
  const card = d.draw(1)[0];

  // Test size of deck
  expect(d.size()).toBe(2);

  // Remove card from the deck
  d.removeCard(card);

  // Test size of deck
  expect(d.size()).toBe(1);

  // Add a card
  d.addCard('Content!', ['$test == 1']);

  // Test size of deck
  expect(d.size()).toBe(2);
});
