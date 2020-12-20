import QualitySet from './QualitySet.js';
import State from './State.js';
import crypto from 'crypto';
/**
 * @class Card
 * @module Card
 */
class Card {
  // Private hash
  #_hash = null;

  /**
   * Create a Card
   *
   * @param {State} state - Instance of global state
   * @param {object} obj - Object literal for building Card
   */
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

    // Each card must have a unique value
    // Use current time + content to prevent future collisions
    this.#_hash = crypto
      .createHash('sha256')
      .update(Date.now().toString() + this.content, 'binary')
      .digest('hex');

    // Cards have qualities (set of qualities)
    this.qualities = new QualitySet(this.state);

    // Add all the qualities to the card
    obj.qualities.forEach(element => {
      this.addQuality(element);
    });
  }

  // Hash is access-only
  // Once set, cannot change
  get hash () {
    return this.#_hash;
  }

  // A card is available if and only if all of its qualities are currently true
  get available () {
    return this.qualities.check();
  };

  /**
   * Add a quality to the Card
   *
   * @function addQuality
   * @param {string} s - The quality to add
   */
  addQuality (s = '') {
    // Add a quality to the Card
    this.qualities.add(s);
  }

  /**
   * Remove a quality from the Card
   *
   * @function removeQuality
   * @param {string} s - The quality to remove
   */
  removeQuality (s = '') {
    this.qualities.remove(s);
  }

  /**
   * Show all the qualities of the Card
   *
   * @function showQualities
   */
  showQualities () {
    console.log(this.qualities.print());
  }
}

export default Card;
