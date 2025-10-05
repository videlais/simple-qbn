import ReactiveCard from './ReactiveCard';
import ReactiveState from './ReactiveState';
import Deck from '../Deck';

/**
 * @class ReactiveDeck
 * @module ReactiveDeck
 * @see ReactiveState
 */
export default class ReactiveDeck {
  private _cards: ReactiveCard[] = [];

  /**
   * Get all cards in deck.
   */
  get cards(): ReactiveCard[] {
    return this._cards;
  }

  /**
   * Set cards in deck, binding/unbinding as needed.
   */
  set cards(newCards: ReactiveCard[]) {
    // Unbind old cards
    this._cards.forEach(card => card.unbind());
    
    // Set new cards
    this._cards = newCards;
    
    // Bind new cards to our state if we have one
    if (this._state) {
      this._cards.forEach(card => card.bindToState(this._state!));
    }
    
    this.notifyListeners();
  }
  private _state?: ReactiveState;
  private subscriptions: (() => void)[] = [];
  private listeners: Set<(cards: ReactiveCard[]) => void> = new Set();

  /**
   * @class
   * @param {ReactiveCard[]} cards - Optional initial cards
   * @param {ReactiveState} state - Optional initial reactive state
   */
  constructor(cards: ReactiveCard[] = [], state?: ReactiveState) {
    // Set the internal cards to provided cards or empty array
    this._cards = cards;

    // Only bind to state if provided
    if (state) {
      this._state = state;
      this.bindToState(state);
    }
  }

  /**
   * Bind this deck to a reactive state.
   *
   * @function bindToState
   * @param {ReactiveState} state - The reactive state to bind to
   */
  bindToState(state: ReactiveState): void {
    this.unbind();
    this._state = state;
    
    // Bind all existing cards to the new state
    this._cards.forEach(card => card.bindToState(state));
    
    // Subscribe to state changes
    const stateUnsubscribe = state.subscribe(() => {
      this.notifyListeners();
    });
    
    this.subscriptions.push(stateUnsubscribe);
  }

  /**
   * Unbind from current reactive state.
   *
   * @function unbind
   */
  unbind(): void {
    this.subscriptions.forEach(unsubscribe => unsubscribe());
    this.subscriptions = [];
    
    // Unbind all cards
    this._cards.forEach(card => card.unbind());
    
    // Clear state reference
    this._state = undefined!;
  }

  /**
   * Subscribe to deck changes.
   *
   * @function subscribe
   * @param {function} listener - Callback function to invoke on deck changes
   * @returns {function} Unsubscribe function
   */
  subscribe(listener: (cards: ReactiveCard[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * @type {ReactiveState}
   */
  get state(): ReactiveState {
    if (!this._state) {
      throw new Error('ReactiveDeck must be bound to a state');
    }
    return this._state;
  }

  set state(s: ReactiveState) {
    if (s instanceof ReactiveState) {
      this.bindToState(s);
      this.notifyListeners();
    } else {
      throw new Error('Passed value is not an instance of ReactiveState');
    }
  }

  /**
   * Get a card based on position.
   *
   * @function getCard
   * @param {number} index - Position of card within deck.
   * @returns {ReactiveCard|null} Returns ReactiveCard or null.
   * @memberof ReactiveDeck
   */
  getCard(index: number = -1): ReactiveCard | null {
    // Set a default.
    let card: ReactiveCard | null = null;

    // If index is less than cards.length.
    if (index >= 0 && index < this._cards.length) {
      card = this._cards[index];
    }

    // Return Card or null.
    return card;
  }

  /**
   * Update card based on its internal hash.
   *
   * @function updateCard
   * @param {ReactiveCard} c - Card to update in deck.
   */
  updateCard(c: ReactiveCard): void {
    if (c instanceof ReactiveCard) {
      this._cards.forEach((card, index) => {
        if (card.hash === c.hash) {
          // Dispose old card and replace
          this._cards[index].dispose();
          this._cards[index] = c;
          // Bind new card to our state if we have one
          if (this._state) {
            c.bindToState(this._state);
          }
          this.notifyListeners();
        }
      });
    } else {
      throw new Error('Updated card must be ReactiveCard!');
    }
  }

  /**
   * Size of Deck.
   *
   * @function size
   * @returns {number} Returns number of cards.
   */
  size(): number {
    return this._cards.length;
  }

  /**
   * Add a ReactiveCard to the Deck.
   *
   * @function addCard
   * @param {ReactiveCard} card - ReactiveCard to add to deck.
   */
  addCard(card: ReactiveCard): void {
    // Runtime type checks for safety (JavaScript consumers, external data)
    if (!(card instanceof ReactiveCard)) {
      throw new Error('Must be passed ReactiveCard to add to deck');
    }

    // Bind card to our state if we have one
    if (this._state) {
      card.bindToState(this._state);
    }

    // Add a card to the existing deck.
    this._cards.push(card);
    this.notifyListeners();
  }

  /**
   * Remove a Card from the Deck.
   *
   * @function removeCard
   * @param {ReactiveCard} c - Card to remove from deck.
   */
  removeCard(c: ReactiveCard): void {
    const originalLength = this._cards.length;
    
    // Dispose the card before removing
    const cardToRemove = this._cards.find(card => card === c);
    if (cardToRemove) {
      cardToRemove.unbind();
    }
    
    this._cards = this._cards.filter((entry) => {
      return entry !== c;
    });
    
    if (this._cards.length !== originalLength) {
      this.notifyListeners();
    }
  }

  /**
   * Shuffle cards in Deck.
   *
   * @function shuffle
   */
  shuffle(): void {
    // Fisher-Yates shuffle.
    for (let i = this._cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap positions using destructuring assignment.
      [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]];
    }
    this.notifyListeners();
  }

  /**
   * Get all currently available cards.
   *
   * @function availableCards
   * @returns {ReactiveCard[]} Array of currently available cards
   */
  get availableCards(): ReactiveCard[] {
    if (!this._state) {
      throw new Error('ReactiveDeck must be bound to a state');
    }
    return this._cards.filter((card) => {
      return card.available;
    });
  }

  /**
   * Draw random card from available cards.
   *
   * @function draw
   * @returns {ReactiveCard|null} Random available card or null if none available.
   */
  draw(): ReactiveCard | null {
    if (!this._state) {
      throw new Error('ReactiveDeck must be bound to a state');
    }
    
    const available = this.availableCards;
    
    if (available.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  }

  /**
   * Get available cards from a specific state.
   *
   * @function getAvailableCards
   * @param {ReactiveState} state - State to check against
   * @returns {ReactiveCard[]} Array of available cards
   */
  getAvailableCards(state: ReactiveState): ReactiveCard[] {
    if (!(state instanceof ReactiveState)) {
      throw new Error('Must be passed ReactiveState to check available cards');
    }
    
    return this._cards.filter((card) => {
      return card.isAvailable(state);
    });
  }

  /**
   * Draw random card from available cards using a specific state.
   *
   * @function drawFromState
   * @param {ReactiveState} state - State to check against
   * @returns {ReactiveCard|null} Random available card or null if none available.
   */
  drawFromState(state: ReactiveState): ReactiveCard | null {
    const available = this.getAvailableCards(state);
    
    if (available.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  }

  /**
   * Check if card is available (delegates to base Deck for compatibility).
   *
   * @function isCardAvailable
   * @param {ReactiveCard} card - Card to check
   * @returns {boolean} If card is available
   */
  isCardAvailable(card: ReactiveCard): boolean {
    if (!this._state) {
      throw new Error('ReactiveDeck must be bound to a state');
    }
    return card.isAvailable(this._state);
  }

  /**
   * Create a regular Deck from this ReactiveDeck.
   *
   * @function toDeck
   * @returns {Deck} Regular Deck with same cards and state
   */
  toDeck(): Deck {
    const deck = new Deck();
    // Note: This is a simplified conversion - in reality you'd need proper state and quality conversion
    return deck;
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
    this._cards.forEach(card => card.dispose());
    this._cards = [];
    this.clearListeners();
    this._state = undefined!; // Clear state reference
  }

  /**
   * Notify all listeners of deck changes.
   *
   * @private
   * @function notifyListeners
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        // Pass available cards to listeners
        if (this._state) {
          listener(this.availableCards);
        }
      } catch (error) {
        console.error('Error in ReactiveDeck listener:', error);
      }
    });
  }
}