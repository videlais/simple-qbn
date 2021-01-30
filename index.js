// Import all objects for NPM
import Card from './src/Card.js';
import Deck from './src/Deck.js';
import Expression from './src/Expression.js';
import QualitySet from './src/QualitySet.js';
import State from './src/State.js';

// Export all packages
const SimpleQBN = {
    Card: Card,
    Deck: Deck,
    Expression: Expression,
    QualitySet: QualitySet,
    State: State
};

// Freeze the properties
export default Object.freeze(SimpleQBN);
