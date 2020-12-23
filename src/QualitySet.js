import Expression from './Expression.js';
import State from './State.js';

/**
 * @class QualitySet
 * @module QualitySet
 */
class QualitySet {
  // Create private Set
  #_set = null;

  /**
   * Create a QualitySet
   */
  constructor () {
    // Set the internal set to an array
    this.#_set = [];
  }

  // Access-only internal Set
  get set () {
    return this.#_set;
  }

  /**
   * Add Expression to QualitySet
   *
   * @function add
   * @param {string} expression - Expression to add to set
   */
  add (expression) {
    // There is no reason to add the same expression.
    // Make sure it is unique.
    if (!this.has(expression)) {
      // Based on a string, create a new Expression
      const e = new Expression(expression);
      // Add the new Expression to the internal set
      this.#_set.push(e);
    }
  }

  /**
   * If set has an Expression or not
   *
   * @function has
   * @param {string} s - Expression to find
   * @returns {boolean} If Expression is in set or not
   */
  has (s) {
    if (typeof s === 'string') {
      return this.#_set.some((e) => e.expression === s);
    } else {
      throw new Error('Can only check string values!');
    }
  }

  /**
   * Remove expression from set
   *
   * @function find
   * @param {string} s - Expression to remove
   */
  remove (s) {
    if (typeof s === 'string') {
      this.#_set = this.#_set.filter((e) => e.expression !== s);
    } else {
      throw new Error('Must pass string values to remove!');
    }
  }

  /**
   * Check (validate) the entire set against a State
   *
   * @function check
   * @param {State} s - the state used to check qualities
   * @returns {boolean} If set is valid
   */
  check (s) {
    if (s instanceof State) {
      return this.#_set.every((e) => e.check(s));
    } else {
      throw new Error('Must have State to check() against!');
    }
  }

  /**
   * Size
   *
   * @function size
   * @returns {number} Size of internal array
   */
  size () {
    return this.#_set.length;
  }
}

export default QualitySet;
