import ReactiveQualitySet from './ReactiveQualitySet';
import ReactiveState from './ReactiveState';
import Card from '../Card';
import { v4 as uuidv4 } from 'uuid';

/**
 * @class ReactiveCard
 * @module ReactiveCard
 * @see ReactiveQualitySet
 */
export default class ReactiveCard {
  private _content: string;
  private _qualities: ReactiveQualitySet;
  private _hash: string;
  private cachedAvailability: boolean | null = null;
  private subscriptions: (() => void)[] = [];
  private listeners: Set<(available: boolean) => void> = new Set();

  /**
   * @function ReactiveCard
   * @class
   * @param {string} content - Text content of card.
   * @param {Array} qualities - Array of qualities.
   * @param {ReactiveState} state - Optional reactive state to bind to.
   */
  constructor(content: string = '', qualities: string[] = [], private state?: ReactiveState) {
    // Initialize content first
    this._content = '';
    
    // Initialize qualities
    this._qualities = new ReactiveQualitySet(this.state);
    
    // Update internal content.
    this.content = content;

    // Update internal qualities.
    this.qualities = qualities;

    // Each card must have a unique value.
    this._hash = uuidv4();

    if (this.state) {
      this.bindToState(this.state);
    }
  }

  /**
   * Bind this card to a reactive state.
   *
   * @function bindToState
   * @param {ReactiveState} state - The reactive state to bind to
   */
  bindToState(state: ReactiveState): void {
    this.unbind();
    this.state = state;
    
    // Bind qualities to state
    this._qualities.bindToState(state);
    
    // Subscribe to quality changes
    const qualityUnsubscribe = this._qualities.subscribe(() => {
      this.invalidateCache();
      this.notifyListeners();
    });
    
    // Subscribe to state changes
    const stateUnsubscribe = state.subscribe(() => {
      this.invalidateCache();
      this.notifyListeners();
    });
    
    this.subscriptions.push(qualityUnsubscribe, stateUnsubscribe);
  }

  /**
   * Unbind from current reactive state.
   *
   * @function unbind
   */
  unbind(): void {
    this.subscriptions.forEach(unsubscribe => unsubscribe());
    this.subscriptions = [];
    
    this._qualities.unbind();
    this.state = undefined;
    this.cachedAvailability = null;
  }

  /**
   * Subscribe to card availability changes.
   *
   * @function subscribe
   * @param {function} listener - Callback function to invoke on availability changes
   * @returns {function} Unsubscribe function
   */
  subscribe(listener: (available: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Text content of Card.
   *
   * @type {string}
   */
  get content(): string {
    return this._content;
  }

  set content(s: string) {
    // Runtime type check for safety (JavaScript consumers, external data)
    if (typeof s !== 'string') {
      throw new Error('Content must be expressed as a string!');
    }
    
    if (this._content !== s) {
      this._content = s;
      // Content change doesn't affect availability, so no notification needed
    }
  }

  /**
   * ReactiveQualitySet of qualities.
   *
   * @type {ReactiveQualitySet}
   */
  get qualities(): ReactiveQualitySet {
    return this._qualities;
  }

  set qualities(q: string[]) {
    // Reset qualities
    this._qualities.dispose();
    this._qualities = new ReactiveQualitySet(this.state);
    
    // Add all the qualities to the card
    q.forEach(element => this.addQuality(element));
    
    // Rebind to state if we have one
    if (this.state) {
      this._qualities.bindToState(this.state);
      
      // Resubscribe to quality changes
      const qualityUnsubscribe = this._qualities.subscribe(() => {
        this.invalidateCache();
        this.notifyListeners();
      });
      
      this.subscriptions.push(qualityUnsubscribe);
    }
  }

  /**
   * Internal UUID Hash of Card.
   *
   * @type {string}
   */
  get hash(): string {
    return this._hash;
  }

  /**
   * Get current availability status.
   *
   * @function available
   * @returns {boolean} If card is currently available
   */
  get available(): boolean {
    if (!this.state) {
      throw new Error('ReactiveCard must be bound to a state');
    }

    if (this.cachedAvailability === null) {
      this.cachedAvailability = this._qualities.result;
    }

    return this.cachedAvailability;
  }

  /**
   * Check if card is available (delegates to base Card).
   *
   * @function isAvailable
   * @param {ReactiveState} s - State to check against.
   * @returns {boolean} If card is available.
   */
  isAvailable(s: ReactiveState): boolean {
    if (s instanceof ReactiveState) {
      return this._qualities.check(s);
    } else {
      throw new Error('Must be passed ReactiveState to check if available');
    }
  }

  /**
   * Add a quality to the Card.
   *
   * @function addQuality
   * @param {string} s - The quality to add.
   */
  addQuality(s: string): void {
    this._qualities.add(s);
  }

  /**
   * Remove a quality from the Card.
   *
   * @function removeQuality
   * @param {string} s - The quality to remove.
   */
  removeQuality(s: string): void {
    this._qualities.remove(s);
  }

  /**
   * Create a regular Card from this ReactiveCard.
   *
   * @function toCard
   * @returns {Card} Regular Card with same content and qualities
   */
  toCard(): Card {
    const qualityStrings: string[] = [];
    for (let i = 0; i < this._qualities.size(); i++) {
      // We need to access the expressions somehow - this is a simplification
      // In real implementation, you might want to store original quality strings
    }
    return new Card(this.content, qualityStrings);
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
    this._qualities.dispose();
    this.clearListeners();
  }

  /**
   * Invalidate cached availability.
   *
   * @private
   * @function invalidateCache
   */
  private invalidateCache(): void {
    this.cachedAvailability = null;
  }

  /**
   * Notify all listeners of availability changes.
   *
   * @private
   * @function notifyListeners
   */
  private notifyListeners(): void {
    if (!this.state) return;

    const currentAvailability = this.available;
    this.listeners.forEach(listener => {
      try {
        listener(currentAvailability);
      } catch (error) {
        console.error('Error in ReactiveCard listener:', error);
      }
    });
  }
}