import State from './State.js';
/**
 * @class Expression
 * @module Expression
 */
class Expression {
  // Save the parsed expression's parts
  #quality1 = '';
  #operator = '';
  #quality2 = '';

  // Save all possible operations as a series of arrow functions
  #operators = {
    eq: (s, a, b) => { return s.get(a) === b; },
    neq: (s, a, b) => { return s.get(a) !== b; },
    lt: (s, a, b) => { return s.get(a) < b; },
    gt: (s, a, b) => { return s.get(a) > b; },
    lte: (s, a, b) => { return s.get(a) <= b; },
    gte: (s, a, b) => { return s.get(a) >= b; },
    eqvar: (s, a, b) => { return s.get(a) === s.get(b); },
    neqvar: (s, a, b) => { return s.get(a) !== s.get(b); },
    ltvar: (s, a, b) => { return s.get(a) < s.get(b); },
    gtvar: (s, a, b) => { return s.get(a) > s.get(b); },
    ltevar: (s, a, b) => { return s.get(a) <= s.get(b); },
    gtevar: (s, a, b) => { return s.get(a) >= s.get(b); }
  };

  // Private expression
  #_expression = '';

  /**
   * Parse the internal string expression into arguments and an operator
   *
   * @private
   * @function parseExpression
   * @returns {boolean} If the internal expression is valid or not
   */
  #parseExpression () {
    let regex = '';
    let match = null;
    let result = false;

    try {
      regex = /^(.*)-(eq|ne|lt|gt|le|ge|neq|lte|gte|eqvar|neqvar|ltvar|gtvar|ltevar|gtevar)-(.*)/g;
      match = regex.exec(this.#_expression);
    } catch (e) {
    }

    // Is the match null?
    if (match !== null) {
      // Save the arguments and operator
      this.#quality1 = match[1];
      this.#operator = match[2];
      this.#quality2 = match[3];

      // To prevent value coercion, we have to now test for numerics.
      // If the operation is not between two variables, test if numeric.
      // (This does not understand decimal values currently.)
      if (!this.#operator.includes('var')) {
        if (!isNaN(parseFloat(this.#quality2)) && isFinite(this.#quality2)) {
          this.#quality2 = parseInt(this.#quality2, 10);
        }
      }

      result = true;
    }

    return result;
  }

  // Internal validity
  #_valid = false;

  /**
   * If expression is valid or not
   *
   * @readonly
   * @type {boolean}
   */
  get valid () {
    return this.#_valid;
  }

  /**
   * String version of expression
   *
   * @readonly
   * @type {string}
   */
  get expression () {
    return this.#_expression;
  }

  set expression (e) {
    if (typeof e !== 'string') {
      throw new Error('Expressions must be string values!');
    } else {
      // Update internal expression
      this.#_expression = e;
      // Attempt to parse and set internal validity
      this.#_valid = this.#parseExpression(e);
    }
  }

  /**
   * Create an Expression
   *
   * @class
   * @param {string} expression - String
   */
  constructor (expression) {
    // Update internal expression
    this.expression = expression;
  }

  /**
   * Allow for changing the expression from a string
   *
   * @function change
   * @param {string} s - Expression to change
   */
  change (s) {
    // Test if value is string
    if (typeof s === 'string') {
      // Update internal expression
      this.expression = s;
    } else {
      throw new Error('Expressions must be string values!');
    }
  }

  /**
   * Check if expression is valid, given a state
   *
   * @function check
   * @param {State} s - State to used to check expressions
   * @returns {boolean} If the expression is valid or not
   */
  check (s) {
    if (s instanceof State) {
      return this.#operators[this.#operator](s, this.#quality1, this.#quality2);
    } else {
      throw new Error('Must be instance of State!');
    }
  }
}

export default Expression;
