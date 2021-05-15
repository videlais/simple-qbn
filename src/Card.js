import QualitySet from './QualitySet.js'
import { v4 as uuidv4 } from 'uuid'
import State from './State.js'
/**
 * @class Card
 * @module Card
 * @see QualitySet
 */
export default class Card {
  /**
   * @function Card
   * @class
   * @param {string} content - Text content of card.
   * @param {Array} qualities - Array of qualities.
   */
  constructor (content = '', qualities = []) {
    // Update internal content.
    this.content = content

    // Update internal qualities.
    this.qualities = qualities

    // Each card must have a unique value.
    this._hash = uuidv4()
  }

  /**
   * Text content of Card.
   *
   * @type {string}
   */
  get content () {
    return this._content
  }

  set content (s) {
    // Do we have a string?
    if (typeof s === 'string') {
      this._content = s
    } else {
      throw new Error('Content must be expressed as a string!')
    }
  }

  /**
   * QualitySet of qualities.
   *
   * @type {QualitySet}
   */
  get qualities () {
    return this._qualities
  }

  set qualities (q) {
    // Is this an array?
    if (!Array.isArray(q)) {
      throw new Error('Qualities must be expressed as an array!')
    }

    // Cards have qualities (set of qualities).
    this._qualities = new QualitySet(this.state)

    // Add all the qualities to the card.
    q.forEach(element => this.addQuality(element))
  }

  /**
   * Internal UUID Hash of Card.
   *
   * @type {string}
   */
  get hash () {
    return this._hash
  }

  /**
   * Check if card is available.
   *
   * @function isAvailable
   * @param {State} s - State to check against.
   * @returns {boolean} If card is available.
   */
  isAvailable (s) {
    if (s instanceof State) {
      return this._qualities.check(s)
    } else {
      throw new Error('Must be passed State to check if available')
    }
  };

  /**
   * Add a quality to the Card.
   *
   * @function addQuality
   * @param {object} s - The quality to add.
   */
  addQuality (s) {
    this._qualities.add(s)
  }

  /**
   * Remove a quality from the Card.
   *
   * @function removeQuality
   * @param {object} s - The quality to remove.
   */
  removeQuality (s) {
    this._qualities.remove(s)
  }
}
