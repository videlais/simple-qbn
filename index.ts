// Import all objects for NPM
import Card from './src/Card.js';
import Deck from './src/Deck.js';
import Expression from './src/Expression.js';
import QualitySet from './src/QualitySet.js';
import State from './src/State.js';
import ReactiveCard from './src/reactive/ReactiveCard.js';
import ReactiveDeck from './src/reactive/ReactiveDeck.js';
import ReactiveExpression from './src/reactive/ReactiveExpression.js';
import ReactiveQualitySet from './src/reactive/ReactiveQualitySet.js';
import ReactiveState from './src/reactive/ReactiveState.js';

// Export all packages
const SimpleQBN = {
    Card: Card,
    Deck: Deck,
    Expression: Expression,
    QualitySet: QualitySet,
    State: State,
    ReactiveCard: ReactiveCard,
    ReactiveDeck: ReactiveDeck,
    ReactiveExpression: ReactiveExpression,
    ReactiveQualitySet: ReactiveQualitySet,
    ReactiveState: ReactiveState
} as const;

// Freeze the properties
export default Object.freeze(SimpleQBN);