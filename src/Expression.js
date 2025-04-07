import mingo from 'mingo';

export default class Expression {
  /**
   * Create an Expression.
   *
   * @class
   * @param {object} expression - Mingo Object.
   */
  constructor (expression) {
    // Create internal object.
    this._expression = {};
    // Create the internal expression.
    this.change(expression);
  }

  /**
   * Get internal expression.
   *
   * @readonly
   * @type {object}
   */
  get expression () {
    return this._expression;
  }

  /**
   * Allow for changing the internal expression.
   *
   * @function change
   * @param {object} o - Expression to change
   */
  change (o) {
    if (typeof o === 'object' && o !== null) {
      this._expression = o;
    } else {
      throw new Error('Expressions can only be objects!');
    }
  }

  /**
   * Check if expression is valid, given a state.
   *
   * @function check
   * @param {State} s - State to used to check expressions
   * @returns {boolean} If the expression is valid or not
   */
  check (s) {
    let result = false;
    let query = null;

    try {
      query = new mingo.Query(this._expression);
      result = query.test(s.keys);
    } catch (error) {
      console.warn('Expression check failed:', error);
      result = false;
    }

    return result;
  }
}
