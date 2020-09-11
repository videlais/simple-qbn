import Card from './Card.js';
import State from './State.js';

class Deck {
  constructor (state = new State()) {
    // Check that state is a State
    if (!(state instanceof State)) {
      throw new Error('state must be an instance of State!');
    }

    this.state = state;

    // Create an array for future cards
    this.cards = [];
  }

  add (obj = {}) {
    // Create empty object
    const cardObject = {};

    // Does the passed object have 'content'?
    if (Object.prototype.hasOwnProperty.call(obj, 'content')) {
      cardObject.content = obj.content;
    } else {
      cardObject.content = '';
    }

    // Do we have a string?
    if (Object.prototype.toString.call(cardObject.content) !== '[object String]') {
      throw new Error('Content must be expressed as a string property!');
    }

    // Does the passed object have 'qualities'?
    if (Object.prototype.hasOwnProperty.call(obj, 'qualities')) {
      cardObject.qualities = obj.qualities;
    } else {
      cardObject.qualities = [];
    }

    // Is this an array?
    if (!Array.isArray(cardObject.qualities)) {
      throw new Error('Qualities must be expressed as an array property!');
    }

    // Create a new card and pass it the current state
    const c = new Card(this.state);

    for (const quality of cardObject.qualities) {
      c.addQuality(quality);
    }

    // Add a card to the existing deck
    this.cards.push(c);
  }

  remove (c) {
    this.cards = this.cards.filter((entry) => {
      return entry !== c;
    });
  }

  draw (size = 1) {
    // Create a hand
    let hand = [];
    // Counter for loops
    let count = 0;

    // Create a hand based on:
    // - Size of the hand wanted
    // - If the card is available
    hand = this.cards.filter((card) => {
      // Default condition is false
      let condition = false;

      // Is the hand filled? AND Is the card available?
      if (count <= size && card.available) {
        // Card can be added
        condition = true;
      }

      // Increase count
      count++;
      // Return the condition
      return condition;
    });

    return hand;
  }
}

export default Deck;
