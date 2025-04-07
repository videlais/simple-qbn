import Expression from './Expression.js';
import State from './State.js';

/**
 * @class QualitySet
 * @module QualitySet
 */
export default class QualitySet {
  /**
   * Create a QualitySet.
   *
   * @class
   */
  constructor () {
    // Set the internal set to an array.
    this._set = [];
  }

  /**
   * Add Expression to QualitySet.
   *
   * @function add
   * @param {object} expression - Expression to add to set.
   */
  add (expression) {
    // Test if object.
    if (typeof expression === 'object' && expression !== null) {
      // There is no reason to add the same expression.
      // Make sure it is unique.
      if (!this.has(expression)) {
        // Based on an object, create a new Expression.
        const e = new Expression(expression);
        // Add the new Expression to the internal set.
        this._set.push(e);
      }
    } else {
      throw new Error('Qualities must be objects!');
    }
  }

  /**
   * If set has an Expression or not.
   *
   * @function has
   * @param {object} s - Expression to find.
   * @returns {boolean} If Expression is in set or not.
   */
  has (s) {
    if (typeof s === 'object' && s !== null) {
      return this._set.some((e) => JSON.stringify(e.expression) === JSON.stringify(s));
    } else {
      throw new Error('Can only check object values!');
    }
  }

  /**
   * Remove expression from set.
   *
   * @function remove
   * @param {object} s - Expression to remove.
   */
  remove (s) {
    if (typeof s === 'object' && s !== null) {
      this._set = this._set.filter((e) => JSON.stringify(e.expression) !== JSON.stringify(s));
    } else {
      throw new Error('Must pass object values to remove!');
    }
  }

  /**
   * Check (validate) the entire set against a State.
   *
   * @function check
   * @param {State} s - the state used to check qualities.
   * @returns {boolean} If set is valid.
   */
  check (s) {
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
  size () {
    return this._set.length;
  }
}
