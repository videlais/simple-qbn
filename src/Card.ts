import QualitySet from './QualitySet.js';
import { v4 as uuidv4 } from 'uuid';
import State from './State.js';

/**
 * @class Card
 * @module Card
 * @see QualitySet
 */
export default class Card {
  private _content: string;
  private _qualities: QualitySet;
  private _hash: string;

  /**
   * @function Card
   * @class
   * @param {string} content - Text content of card.
   * @param {Array} qualities - Array of qualities.
   */
  constructor(content: string = '', qualities: string[] = []) {
    // Initialize content first
    this._content = '';
    
    // Initialize qualities
    this._qualities = new QualitySet();
    
    // Update internal content.
    this.content = content;

    // Update internal qualities.
    this.qualities = qualities;

    // Each card must have a unique value.
    this._hash = uuidv4();
  }

  /**
   * Text content of Card.
   *
   * @type {string}
   */
  get content(): string {
    return this._content;
  }

  set content(s: string) {
    // Runtime type check for safety (JavaScript consumers, external data)
    if (typeof s !== 'string') {
      throw new Error('Content must be expressed as a string!');
    }
    this._content = s;
  }

  /**
   * QualitySet of qualities.
   *
   * @type {QualitySet}
   */
  get qualities(): QualitySet {
    return this._qualities;
  }

  set qualities(q: string[]) {
    // Cards have qualities (set of qualities).
    this._qualities = new QualitySet();

    // Add all the qualities to the card.
    q.forEach(element => this.addQuality(element));
  }

  /**
   * Internal UUID Hash of Card.
   *
   * @type {string}
   */
  get hash(): string {
    return this._hash;
  }

  /**
   * Check if card is available.
   *
   * @function isAvailable
   * @param {State} s - State to check against.
   * @returns {boolean} If card is available.
   */
  isAvailable(s: State): boolean {
    if (s instanceof State) {
      return this._qualities.check(s);
    } else {
      throw new Error('Must be passed State to check if available');
    }
  }

  /**
   * Add a quality to the Card.
   *
   * @function addQuality
   * @param {string} s - The quality to add.
   */
  addQuality(s: string): void {
    this._qualities.add(s);
  }

  /**
   * Remove a quality from the Card.
   *
   * @function removeQuality
   * @param {string} s - The quality to remove.
   */
  removeQuality(s: string): void {
    this._qualities.remove(s);
  }
}