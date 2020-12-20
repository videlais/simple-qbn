import Card from './Card.js';
import State from './State.js';

/**
 * @class Deck
 * @module Deck
 */
class Deck {
  // Private array of cards
  #cards = [];

  // Private state
  #_state = new State();

  // Get current state
  get state () {
    return this.#_state;
  }

  // Prevent internal state from being anything but State
  set state (s) {
    if (s instanceof State) {
      this.#_state = s;
    } else {
      throw new Error('Passed value is not an instance of State');
    }
  }

  /**
   * Get a card based on position
   *
   * @function getCard
   * @param {number} index - Position of card within deck
   * @returns {Card|null} Returns Card or null
   */
  getCard (index = -1) {
    // Set a default
    let card = null;

    // If index is less than cards.length
    if (index >= 0 && index < this.#cards.length) {
      card = this.#cards[index];
    }

    // Return Card or null
    return card;
  }

  /**
   * Update card based on its internal hash
   *
   * @function updateCard
   * @param {Card|null} c - Card to update in deck
   */
  updateCard (c) {
    if (c instanceof Card) {
      this.#cards.forEach((card) => {
        if (card.hash === c.hash) {
          card = c;
        }
      });
    } else {
      throw new Error('Updated card must be Card!');
    }
  }

  /**
   * Size of Deck
   *
   * @function size
   * @returns {number} Returns number of cards
   */
  size () {
    return this.#cards.length;
  }

  /**
   * Add a Card to the Deck
   *
   * @function add
   * @param {object} obj - Card to add to deck
   */
  add (obj = {}) {
    // Create a new card and pass it the current state
    const c = new Card(this.#_state, obj);

    // Add a card to the existing deck
    this.#cards.push(c);
  }

  /**
   * Remove a Card from the Deck
   *
   * @function remove
   * @param {object} c - Card to remove from deck
   */
  remove (c) {
    this.#cards = this.#cards.filter((entry) => {
      return entry !== c;
    });
  }

  /**
   * Shuffle cards in Deck
   *
   * @function shuffle
   */
  shuffle () {
    // Fisher-Yates shuffle
    for (let i = this.#cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap positions using destructuring assignment
      [this.#cards[i], this.#cards[j]] = [this.#cards[j], this.#cards[i]];
    }
  }

  /**
   * Draw card from Deck
   *
   * @function draw
   * @param {number} size - Size of hand to draw from Deck
   * @returns {Array} Hand of cards
   */
  draw (size = 1) {
    // Create a hand
    let hand = [];

    // Find all available cards
    hand = this.#cards.filter((card) => {
      return card.available;
    });

    // Slice a hand from all those available
    if (size <= this.size() && size >= 0) {
      hand = hand.slice(0, size);
    } else {
      // If size was invalid, reset hand
      hand = [];
    }

    return hand;
  }
}

export default Deck;
