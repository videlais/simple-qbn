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
    // Create a new card and pass it the current state
    const c = new Card(this.state, obj);

    // Add a card to the existing deck
    this.cards.push(c);
  }

  remove (c) {
    this.cards = this.cards.filter((entry) => {
      return entry !== c;
    });
  }

  shuffle () {
    // Fisher-Yates shuffle
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap positions using destructuring assignment
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
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
