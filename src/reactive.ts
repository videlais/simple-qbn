/**
 * SimpleQBN Reactive Architecture Entry Point
 * 
 * This build contains only the reactive State-based classes.
 * These classes provide automatic updates and event-driven state management.
 * 
 * Compatible classes: ReactiveState, ReactiveCard, ReactiveDeck, ReactiveExpression, ReactiveQualitySet
 */

import ReactiveCard from './reactive/ReactiveCard';
import ReactiveDeck from './reactive/ReactiveDeck';
import ReactiveExpression from './reactive/ReactiveExpression';
import ReactiveQualitySet from './reactive/ReactiveQualitySet';
import ReactiveState from './reactive/ReactiveState';

// Create global objects for browser usage
declare global {
  interface Window {
    ReactiveSimpleQBN: {
      ReactiveCard: typeof ReactiveCard;
      ReactiveDeck: typeof ReactiveDeck;
      ReactiveExpression: typeof ReactiveExpression;
      ReactiveQualitySet: typeof ReactiveQualitySet;
      ReactiveState: typeof ReactiveState;
    };
  }
}

if (typeof window !== 'undefined') {
  window.ReactiveSimpleQBN = {
    ReactiveCard,
    ReactiveDeck,
    ReactiveExpression,
    ReactiveQualitySet,
    ReactiveState
  };
}

// Export for module usage
export {
  ReactiveCard,
  ReactiveDeck,
  ReactiveExpression,
  ReactiveQualitySet,
  ReactiveState
};

export default {
  ReactiveCard,
  ReactiveDeck,
  ReactiveExpression,
  ReactiveQualitySet,
  ReactiveState
};