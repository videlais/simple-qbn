// Import all objects for packaging
import Card from './Card.js';
import Deck from './Deck.js';
import Expression from './Expression.js';
import QualitySet from './QualitySet.js';
import State from './State.js';
import ReactiveCard from './reactive/ReactiveCard.js';
import ReactiveDeck from './reactive/ReactiveDeck.js';
import ReactiveExpression from './reactive/ReactiveExpression.js';
import ReactiveQualitySet from './reactive/ReactiveQualitySet.js';
import ReactiveState from './reactive/ReactiveState.js';

// Browser usage - declare global types
declare global {
  interface Window {
    Card: typeof Card;
    Deck: typeof Deck;
    Expression: typeof Expression;
    QualitySet: typeof QualitySet;
    State: typeof State;
    ReactiveCard: typeof ReactiveCard;
    ReactiveDeck: typeof ReactiveDeck;
    ReactiveExpression: typeof ReactiveExpression;
    ReactiveQualitySet: typeof ReactiveQualitySet;
    ReactiveState: typeof ReactiveState;
  }
}

// Browser usage
if (typeof window !== 'undefined') {
  window.Card = Card;
  window.Deck = Deck;
  window.Expression = Expression;
  window.QualitySet = QualitySet;
  window.State = State;
  window.ReactiveCard = ReactiveCard;
  window.ReactiveDeck = ReactiveDeck;
  window.ReactiveExpression = ReactiveExpression;
  window.ReactiveQualitySet = ReactiveQualitySet;
  window.ReactiveState = ReactiveState;
}