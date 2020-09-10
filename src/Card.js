import QualitySet from './QualitySet.js';
import State from './State.js';

/*
  Cards should have:
  - Content (String)
  - Availability (Boolean value)
  - Qualities (QualitySet)
*/

export default class Card {
  constructor (state = new State(), content = '') {
    // Check that state is a State
    if (!(state instanceof State)) {
      throw new Error('state must be an instance of State!');
    }

    this.state = state;

    // String content for this card
    this.content = content;

    // Cards have qualities (set of qualities)
    this.qualities = new QualitySet(this.state);
  }

  // A card is available if and only if all of its qualities are currently true
  get available () {
    return this.qualities.check();
  };

  // Add a quality (Expression) to the Set based on a string
  addQuality (s = '') {
    this.qualities.add(s);
  }

  // Remove a quality (Expression) from the Set based on a string
  removeQuality (s = '') {
    this.qualities.remove(s);
  }

  // Show all the qualities
  showQualities () {
    console.log(this.qualities.print());
  }
}
