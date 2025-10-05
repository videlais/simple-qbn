import Expression from '../Expression';
import ReactiveState from './ReactiveState';

/**
 * @class ReactiveExpression
 * @module ReactiveExpression
 */
export default class ReactiveExpression {
  private expression: Expression;
  private cachedResult: boolean | null = null;
  private subscriptions: (() => void)[] = [];
  private listeners: Set<(result: boolean) => void> = new Set();

  /**
   * Create a ReactiveExpression.
   *
   * @class
   * @param {string} expression - Quis expression string.
   * @param {ReactiveState} state - Reactive state to bind to.
   */
  constructor(expression: string, private state?: ReactiveState) {
    this.expression = new Expression(expression);
    
    if (this.state) {
      this.bindToState(this.state);
    }
  }

  /**
   * Get internal expression string.
   *
   * @readonly
   * @type {string}
   */
  get expressionString(): string {
    return this.expression.expression;
  }

  /**
   * Bind this expression to a reactive state.
   *
   * @function bindToState
   * @param {ReactiveState} state - The reactive state to bind to
   */
  bindToState(state: ReactiveState): void {
    this.unbind();
    this.state = state;
    
    const unsubscribe = state.subscribe(() => {
      this.invalidateCache();
      this.notifyListeners();
    });
    
    this.subscriptions.push(unsubscribe);
  }

  /**
   * Unbind from current reactive state.
   *
   * @function unbind
   */
  unbind(): void {
    this.subscriptions.forEach(unsubscribe => unsubscribe());
    this.subscriptions = [];
    this.state = undefined;
    this.cachedResult = null;
  }

  /**
   * Subscribe to expression result changes.
   *
   * @function subscribe
   * @param {function} listener - Callback function to invoke on result changes
   * @returns {function} Unsubscribe function
   */
  subscribe(listener: (result: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Get the current result of the expression.
   *
   * @function result
   * @returns {boolean} Current expression result
   */
  get result(): boolean {
    if (!this.state) {
      throw new Error('ReactiveExpression must be bound to a state');
    }

    if (this.cachedResult === null) {
      this.cachedResult = this.expression.check(this.state);
    }

    return this.cachedResult;
  }

  /**
   * Check if expression is valid, given a state (delegates to base Expression).
   *
   * @function check
   * @param {ReactiveState} s - State to used to check expressions
   * @returns {boolean} If the expression is valid or not
   */
  check(s: ReactiveState): boolean {
    return this.expression.check(s);
  }

  /**
   * Allow for changing the internal expression.
   *
   * @function change
   * @param {string} newExpression - New Quis expression string
   */
  change(newExpression: string): void {
    this.expression.change(newExpression);
    this.invalidateCache();
    this.notifyListeners();
  }

  /**
   * Get number of active listeners.
   *
   * @function listenerCount
   * @returns {number} Number of active listeners
   */
  listenerCount(): number {
    return this.listeners.size;
  }

  /**
   * Remove all listeners.
   *
   * @function clearListeners
   */
  clearListeners(): void {
    this.listeners.clear();
  }

  /**
   * Clean up all subscriptions and listeners.
   *
   * @function dispose
   */
  dispose(): void {
    this.unbind();
    this.clearListeners();
  }

  /**
   * Invalidate cached result.
   *
   * @private
   * @function invalidateCache
   */
  private invalidateCache(): void {
    this.cachedResult = null;
  }

  /**
   * Notify all listeners of result changes.
   *
   * @private
   * @function notifyListeners
   */
  private notifyListeners(): void {
    if (!this.state) return;

    const currentResult = this.result;
    this.listeners.forEach(listener => {
      try {
        listener(currentResult);
      } catch (error) {
        console.error('Error in ReactiveExpression listener:', error);
      }
    });
  }
}