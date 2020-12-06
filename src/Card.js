import QualitySet from './QualitySet.js';
import State from './State.js';

/*
  Cards should have:
  - Content (String)
  - Availability (Boolean value)
  - Qualities (QualitySet)
*/

export default class Card {
  constructor (state = new State(), obj = {}) {
    // Check that state is a State
    if (!(state instanceof State)) {
      throw new Error('state must be an instance of State!');
    }

    // Update the internal state
    this.state = state;

    // Does the passed object have 'content'?
    if (!Object.prototype.hasOwnProperty.call(obj, 'content')) {
      throw new Error('Card must have content property!');
    }

    // Do we have a string?
    if (Object.prototype.toString.call(obj.content) !== '[object String]') {
      throw new Error('Content must be expressed as a string property!');
    }

    // Does the passed object have 'qualities'?
    if (!Object.prototype.hasOwnProperty.call(obj, 'qualities')) {
      throw new Error('Card must have qualities property!');
    }

    // Is this an array?
    if (!Array.isArray(obj.qualities)) {
      throw new Error('Qualities must be expressed as an array property!');
    }

    // String content for this card
    this.content = obj.content;

    // Cards have qualities (set of qualities)
    this.qualities = new QualitySet(this.state);

    // Add all the qualities to the card
    obj.qualities.forEach(element => {
      this.addQuality(element);
    });
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
