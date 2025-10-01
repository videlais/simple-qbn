import pkg from 'quis';
const { parse } = pkg;

export default class Expression {
  /**
   * Create an Expression.
   *
   * @class
   * @param {string} expression - Quis expression string.
   */
  constructor (expression) {
    // Create internal expression string.
    this._expression = '';
    // Create the internal expression.
    this.change(expression);
  }

  /**
   * Get internal expression.
   *
   * @readonly
   * @type {string}
   */
  get expression () {
    return this._expression;
  }

  /**
   * Allow for changing the internal expression.
   *
   * @function change
   * @param {string} o - Quis expression string
   */
  change (o) {
    if (typeof o === 'string') {
      this._expression = o;
    } else {
      throw new Error('Expressions must be strings!');
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
    if (!s || !s.keys) {
      return false;
    }

    try {
      // Create a values callback function for quis
      const values = (name) => {
        return s.keys[name];
      };

      // Use quis to evaluate the expression directly
      return parse(this._expression, { values: values });
    } catch (error) {
      console.warn('Expression check failed:', error);
      return false;
    }
  }


}
