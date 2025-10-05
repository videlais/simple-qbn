import ReactiveExpression from './ReactiveExpression';
import ReactiveState from './ReactiveState';

/**
 * @class ReactiveQualitySet
 * @module ReactiveQualitySet
 */
export default class ReactiveQualitySet {
  private _set: ReactiveExpression[] = [];
  private cachedResult: boolean | null = null;
  private subscriptions: (() => void)[] = [];
  private listeners: Set<(result: boolean) => void> = new Set();

  /**
   * Create a ReactiveQualitySet.
   *
   * @class
   * @param {ReactiveState} state - Optional reactive state to bind to.
   */
  constructor(private state?: ReactiveState) {
    if (this.state) {
      this.bindToState(this.state);
    }
  }

  /**
   * Bind this quality set to a reactive state.
   *
   * @function bindToState
   * @param {ReactiveState} state - The reactive state to bind to
   */
  bindToState(state: ReactiveState): void {
    this.unbind();
    this.state = state;
    
    // Bind all existing expressions to the new state
    this._set.forEach(expr => expr.bindToState(state));
    
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
    
    // Unbind all expressions
    this._set.forEach(expr => expr.unbind());
    
    this.state = undefined;
    this.cachedResult = null;
  }

  /**
   * Subscribe to quality set result changes.
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
   * Add Expression to ReactiveQualitySet.
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
      const reactiveExpr = new ReactiveExpression(expression, this.state);
      
      // Subscribe to individual expression changes
      reactiveExpr.subscribe(() => {
        this.invalidateCache();
        this.notifyListeners();
      });
      
      this._set.push(reactiveExpr);
      this.invalidateCache();
      this.notifyListeners();
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
    return this._set.some((e) => e.expressionString === s);
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
    
    const originalLength = this._set.length;
    const exprToRemove = this._set.find(e => e.expressionString === s);
    
    if (exprToRemove) {
      exprToRemove.dispose();
      this._set = this._set.filter((e) => e.expressionString !== s);
      
      if (this._set.length !== originalLength) {
        this.invalidateCache();
        this.notifyListeners();
      }
    }
  }

  /**
   * Get the current result of checking all qualities.
   *
   * @function result
   * @returns {boolean} Current result of all expressions
   */
  get result(): boolean {
    if (!this.state) {
      throw new Error('ReactiveQualitySet must be bound to a state');
    }

    if (this.cachedResult === null) {
      this.cachedResult = this._set.every((e) => e.result);
    }

    return this.cachedResult;
  }

  /**
   * Check (validate) the entire set against a State (delegates to base QualitySet).
   *
   * @function check
   * @param {ReactiveState} s - the state used to check qualities.
   * @returns {boolean} If set is valid.
   */
  check(s: ReactiveState): boolean {
    if (s instanceof ReactiveState) {
      return this._set.every((e) => e.check(s));
    } else {
      throw new Error('Must have ReactiveState to check() against!');
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
    this._set.forEach(expr => expr.dispose());
    this._set = [];
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
        console.error('Error in ReactiveQualitySet listener:', error);
      }
    });
  }
}