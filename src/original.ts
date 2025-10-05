/**
 * SimpleQBN Original Architecture Entry Point
 * 
 * This build contains only the original State-based classes.
 * These classes require manual state passing and explicit availability checking.
 * 
 * Compatible classes: State, Card, Deck, Expression, QualitySet
 */

import Card from './Card';
import Deck from './Deck';
import Expression from './Expression';
import QualitySet from './QualitySet';
import State from './State';

// Create global objects for browser usage
declare global {
  interface Window {
    SimpleQBN: {
      Card: typeof Card;
      Deck: typeof Deck;
      Expression: typeof Expression;
      QualitySet: typeof QualitySet;
      State: typeof State;
    };
  }
}

if (typeof window !== 'undefined') {
  window.SimpleQBN = {
    Card,
    Deck,
    Expression,
    QualitySet,
    State
  };
}

// Export for module usage
export {
  Card,
  Deck,
  Expression,
  QualitySet,
  State
};

export default {
  Card,
  Deck,
  Expression,
  QualitySet,
  State
};