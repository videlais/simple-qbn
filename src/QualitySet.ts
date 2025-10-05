import Expression from './Expression.js';
import State from './State.js';

/**
 * @class QualitySet
 * @module QualitySet
 */
export default class QualitySet {
  private _set: Expression[];

  /**
   * Create a QualitySet.
   *
   * @class
   */
  constructor() {
    // Set the internal set to an array.
    this._set = [];
  }

  /**
   * Add Expression to QualitySet.
   *
   * @function add
   * @param {string} expression - Quis expression string to add to set.
   */
  add(expression: string): void {
    // Runtime type check for safety (JavaScript consumers, external data)
    if (typeof expression !== 'string') {
      throw new Error('Qualities must be strings!');
    }
    if (!this.has(expression)) {
      const e = new Expression(expression);
      this._set.push(e);
    }
  }

  /**
   * If set has an Expression or not.
   *
   * @function has
   * @param {string} s - Expression to find.
   * @returns {boolean} If Expression is in set or not.
   */
  has(s: string): boolean {
    // Runtime type check for safety (JavaScript consumers, external data)
    if (typeof s !== 'string') {
      throw new Error('Can only check string values!');
    }
    return this._set.some((e) => e.expression === s);
  }

  /**
   * Remove expression from set.
   *
   * @function remove
   * @param {string} s - Expression to remove.
   */
  remove(s: string): void {
    // Runtime type check for safety (JavaScript consumers, external data)
    if (typeof s !== 'string') {
      throw new Error('Must pass string values to remove!');
    }
    this._set = this._set.filter((e) => e.expression !== s);
  }

  /**
   * Check (validate) the entire set against a State.
   *
   * @function check
   * @param {State} s - the state used to check qualities.
   * @returns {boolean} If set is valid.
   */
  check(s: State): boolean {
    if (s instanceof State) {
      return this._set.every((e) => e.check(s));
    } else {
      throw new Error('Must have State to check() against!');
    }
  }

  /**
   * Size
   *
   * @function size
   * @returns {number} Size of internal array.
   */
  size(): number {
    return this._set.length;
  }
}