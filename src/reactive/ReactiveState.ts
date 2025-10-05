import State from '../State';

/**
 * @class ReactiveState
 * @module ReactiveState
 * @extends State
 */
export default class ReactiveState extends State {
  private listeners: Set<(state: ReactiveState) => void>;
  private batchMode: boolean = false;
  private pendingNotifications: boolean = false;

  /**
   * @function constructor
   */
  constructor() {
    super();
    this.listeners = new Set();
  }

  /**
   * Subscribe to state changes.
   *
   * @function subscribe
   * @param {function} listener - Callback function to invoke on state changes
   * @returns {function} Unsubscribe function
   */
  subscribe(listener: (state: ReactiveState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Set a key, value pair with reactive notifications.
   *
   * @function set
   * @param {string} key - Key of pair
   * @param {any} value - Value of pair
   */
  set(key: string, value: any): void {
    const oldValue = this.get(key);
    super.set(key, value);
    
    // Only notify if value actually changed
    if (oldValue !== value) {
      this.notifyListeners();
    }
  }

  /**
   * Delete key from ReactiveState with notifications.
   *
   * @function delete
   * @param {string} key - Key to remove from State
   * @returns {any|null} Returns the removed key or null
   */
  delete(key: string): any {
    const result = super.delete(key);
    if (result !== null) {
      this.notifyListeners();
    }
    return result;
  }

  /**
   * Batch multiple state changes to prevent excessive notifications.
   *
   * @function batch
   * @param {function} fn - Function to execute in batch mode
   */
  batch(fn: () => void): void {
    if (this.batchMode) {
      // Already in batch mode, just execute
      fn();
      return;
    }

    this.batchMode = true;
    this.pendingNotifications = false;

    try {
      fn();
    } finally {
      this.batchMode = false;
      if (this.pendingNotifications) {
        this.notifyListeners();
      }
    }
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
   * Notify all listeners of state changes.
   *
   * @private
   * @function notifyListeners
   */
  private notifyListeners(): void {
    if (this.batchMode) {
      this.pendingNotifications = true;
      return;
    }

    this.listeners.forEach(listener => {
      try {
        listener(this);
      } catch (error) {
        console.error('Error in ReactiveState listener:', error);
      }
    });
  }
}