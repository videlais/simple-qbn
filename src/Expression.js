import State from './State.js';

/*
  An expression is a string in form of either
  - variable-op-value
    -- eq
    -- neq
    -- lt
    -- gt
    -- lte
    -- gte
  - variable-op-variable
    -- eqvar
    -- neqvar
    -- ltvar
    -- gtvar
    -- ltevar
    -- gtevar
*/

/**
 * @class Expression
 * @module Expression
 */
class Expression {
  // Save the parsed expression's parts
  #quality1 = '';
  #operator = '';
  #quality2 = '';

  // Is this a valid expression?
  valid = false;

  // Save all possible operations as a series of arrow functions
  #operators = {
    eq: (a, b) => { return this.state.get(a) === b; },
    neq: (a, b) => { return this.state.get(a) !== b; },
    lt: (a, b) => { return this.state.get(a) < b; },
    gt: (a, b) => { return this.state.get(a) > b; },
    lte: (a, b) => { return this.state.get(a) <= b; },
    gte: (a, b) => { return this.state.get(a) >= b; },
    eqvar: (a, b) => { return this.state.get(a) === this.state.get(b); },
    neqvar: (a, b) => { return this.state.get(a) !== this.state.get(b); },
    ltvar: (a, b) => { return this.state.get(a) < this.state.get(b); },
    gtvar: (a, b) => { return this.state.get(a) > this.state.get(b); },
    ltevar: (a, b) => { return this.state.get(a) <= this.state.get(b); },
    gtevar: (a, b) => { return this.state.get(a) >= this.state.get(b); }
  };

  /**
   * Parse the string expression into arguments and an operator
   *
   * @function parseExpression
   * @param {string} e - Expression to parse
   */
  #parseExpression (e = '') {
    let regex = '';
    let match = null;

    try {
      regex = /^(.*)-(eq|ne|lt|gt|le|ge|neq|lte|gte|eqvar|neqvar|ltvar|gtvar|ltevar|gtevar)-(.*)/g;
      match = regex.exec(e);
    } catch (e) {
      // Only accept valid expressions!
      this.valid = false;
    }

    // Is the match null?
    if (match == null) {
      // Only accept valid expressions!
      this.valid = false;
    } else {
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

      // Reset validity
      this.valid = true;
    }
  }

  /**
   * Create a Deck
   *
   * @param {State} state - Instance of global state
   * @param {string} expression - String
   */
  constructor (state = new State(), expression = '') {
    // Check that state is a State
    if (!(state instanceof State)) {
      throw new Error('state must be an instance of State!');
    }

    this.state = state;
    this.expression = expression;

    // Parse the expression into parts
    this.#parseExpression(this.expression);

    // Do an initial check on the expression
    this.value = this.check();
  }

  /**
   * Allow for changing the expression from a string
   *
   * @function change
   * @param {string} s - Expression to change
   */
  change (s = '') {
    this.expression = s;

    // Parse the expression into parts
    this.#parseExpression(this.expression);

    // Do a check on the expression
    this.value = this.check();
  }

  /**
   * Check if expression is valid
   *
   * @function check
   * @returns {boolean} If the expression is valid or not
   */
  check () {
    // Only check valid expressions
    if (this.valid) {
      // Using the parsed arguments and operator,
      //  consult the possible operators and update the internal value
      this.value = this.#operators[this.#operator](this.#quality1, this.#quality2);
    } else {
      // If this is not a valid expression, return false (the value of this.#valid)
      this.value = this.valid;
    }

    // Return the saved internal value
    return this.value;
  }
}

export default Expression;
