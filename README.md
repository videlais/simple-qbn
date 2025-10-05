# SimpleQBN

*Because nothing about quality-based narratives is actually simple.*

SimpleQBN is a quality-based narrative (QBN) generic JavaScript library for use in browsers or Node.js-based projects. It provides state management and resolves expressions for checking openness (availability) based on states changes.

This project is based on another project [Quis](https://github.com/videlais/quis), which it uses to resolve expressions.

## State and Reactive State

SimpleQBN provides two distinct architectures for managing game state:

* Manual, State-based, and;
* Automatic, Reactive State-based.

**These two systems are incompatible and cannot be mixed within the same application.**

### Original State Architecture

The original architecture uses the `State` class along with `Card`, `Deck`, `Expression`, and `QualitySet` classes. This architecture requires manual state passing and explicit availability checking.

**Key Classes:** `State`, `Card`, `Deck`, `Expression`, `QualitySet`

**Example:**

```javascript
import State from 'simple-qbn/State';
import Card from 'simple-qbn/Card';
import Deck from 'simple-qbn/Deck';

// Create game state
const gameState = new State();
gameState.set('health', 100);
gameState.set('hasKey', true);

// Create cards with quality requirements
const healingCard = new Card(
    'Drink a healing potion',
    ['$health < 80']);
const doorCard = new Card(
    'Open the locked door',
    ['$hasKey == true']);

// Create deck and add cards
const deck = new Deck();
deck.addCard(
    healingCard.content,
    healingCard.qualities);
deck.addCard(
    doorCard.content,
    doorCard.qualities);

// Check availability manually.
// Need to pass state each time.
const availableCards = deck.draw(gameState, 5);

console.log(`${availableCards.length} cards available`);
```

### Reactive Architecture

The reactive architecture uses `ReactiveState` with `ReactiveCard`, `ReactiveDeck`, `ReactiveExpression`, and `ReactiveQualitySet`. This architecture provides automatic updates and event-driven state management.

**Key Classes:** `ReactiveState`, `ReactiveCard`, `ReactiveDeck`, `ReactiveExpression`, `ReactiveQualitySet`

**Example:**

```javascript
import ReactiveState from 'simple-qbn/reactive/State';
import ReactiveCard from 'simple-qbn/reactive/Card';
import ReactiveDeck from 'simple-qbn/reactive/Deck';

// Create reactive game state.
const gameState = new ReactiveState();
gameState.set('health', 100);
gameState.set('hasKey', true);

// Create reactive cards.
const healingCard = new ReactiveCard(
    'Drink a healing potion',
    ['$health < 80']);
const doorCard = new ReactiveCard(
    'Open the locked door',
    ['$hasKey == true']);

// Create reactive deck and bind to state.
const deck = new ReactiveDeck(
    [healingCard, doorCard],
    gameState);

// Subscribe to automatic updates.
deck.subscribe((availableCards) => {
  console.log(`${availableCards.length} cards now available`);
});

// State changes trigger automatic updates.
gameState.set('health', 50);
```

### Architecture Compatibility

**Important:** The two architectures are mutually exclusive:

* **Original classes** (`Card`, `Deck`, etc.) work only with `State`
* **Reactive classes** (`ReactiveCard`, `ReactiveDeck`, etc.) work only with `ReactiveState`
* You cannot pass a `State` to reactive classes or a `ReactiveState` to original classes

**Choose one architecture for your entire application.**

## Expression Language

Starting with version 1.5.0, SimpleQBN uses [Quis](https://www.npmjs.com/package/quis) for expression evaluation with pure Quis syntax.

Previous versions used TinyQBN format and MongoDB query language compatibility, but as of 1.5.0, the library has been simplified to use only Quis string expressions to reduce dependencies and code size.

## History and Documentation

HonKit is used to create [a history and documentation of this project](https://videlais.github.io/simple-qbn/).
