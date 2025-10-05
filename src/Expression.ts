import pkg from 'quis';
import type State from './State.js';

const { parse } = pkg;

export default class Expression {
  private _expression: string;

  /**
   * Create an Expression.
   *
   * @class
   * @param {string} expression - Quis expression string.
   */
  constructor(expression: string) {
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
  get expression(): string {
    return this._expression;
  }

  /**
   * Allow for changing the internal expression.
   *
   * @function change
   * @param {string} o - Quis expression string
   */
  change(o: string): void {
    // Runtime type check for safety (JavaScript consumers, external data)
    if (typeof o !== 'string') {
      throw new Error('Expressions must be strings!');
    }
    this._expression = o;
  }

  /**
   * Check if expression is valid, given a state.
   *
   * @function check
   * @param {State} s - State to used to check expressions
   * @returns {boolean} If the expression is valid or not
   */
  check(s: State): boolean {
    if (!s || !s.keys) {
      return false;
    }

    try {
      // Create a values callback function for quis
      const values = (name: string): any => {
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