---
layout: page
title: State Management
permalink: /State
---

# State Management

The [sculptural model](./sculpturalmodel.md) defines a *context* cards can access and manipulate. The QBN model also describes *qualities* as conditional statements testing against some values. In SimpleQBN, this is explicitly called **State**.

SimpleQBN provides two distinct state management architectures that serve different use cases:

## Original State Architecture

The **State** class stores key-value pairs and provides methods for manipulation: *set()*, *exists()*, *delete()*, *get()*, and *size()*. This architecture requires explicit state passing and manual availability checking.

### Original State Characteristics

- **Manual state passing**: You must explicitly pass the state to methods that need it
- **Synchronous operations**: All state checks happen when you call them
- **Explicit control**: You decide when and how to check card availability
- **Lightweight**: Minimal overhead and memory usage

### Original State Usage Patterns

It is common to create a new **Deck** and then immediately change its state to add values before adding any **Cards**. While, technically, **Cards** can be added first and then **State** updated, if any **Cards** have *qualities*, there must be some values in the **State** to test against before the method *draw()* is used.

```javascript
import State from 'simple-qbn/State';
import Card from 'simple-qbn/Card';
import Deck from 'simple-qbn/Deck';

// Create and populate state
const gameState = new State();
gameState.set('health', 100);
gameState.set('level', 5);
gameState.set('hasKey', false);

// Create cards with quality requirements
const healCard = new Card('Use healing potion', ['$health < 50']);
const levelCard = new Card('Advanced training', ['$level >= 5']);
const doorCard = new Card('Open locked door', ['$hasKey == true']);

// Create deck and add cards
const deck = new Deck();
deck.addCard(healCard.content, healCard.qualities);
deck.addCard(levelCard.content, levelCard.qualities);
deck.addCard(doorCard.content, doorCard.qualities);

// Set the deck's internal state
deck.state = gameState;

// Draw available cards (uses deck's internal state)
const availableCards = deck.draw(10);
console.log(`Available: ${availableCards.length} cards`);

// Update state and check again
gameState.set('health', 30);
gameState.set('hasKey', true);
const newAvailable = deck.draw(10);
console.log(`Now available: ${newAvailable.length} cards`);
```

## Reactive State Architecture

The **ReactiveState** class extends the original State functionality with event-driven, automatic updates. When paired with reactive components, it provides real-time state synchronization.

### Reactive State Usage Patterns

State changes immediately trigger all connected components to recalculate their availability.

```javascript
import ReactiveState from 'simple-qbn/reactive/State';
import ReactiveCard from 'simple-qbn/reactive/Card';
import ReactiveDeck from 'simple-qbn/reactive/Deck';

// Create and populate reactive state
const gameState = new ReactiveState();
gameState.set('health', 100);
gameState.set('level', 5);
gameState.set('hasKey', false);

// Create reactive cards
const healCard = new ReactiveCard('Use healing potion', ['$health < 50']);
const levelCard = new ReactiveCard('Advanced training', ['$level >= 5']);
const doorCard = new ReactiveCard('Open locked door', ['$hasKey == true']);

// Create reactive deck bound to state
const deck = new ReactiveDeck([healCard, levelCard, doorCard], gameState);

// Subscribe to automatic availability updates
deck.subscribe((availableCards) => {
  console.log(`Available: ${availableCards.length} cards`);
});

// Subscribe to individual card changes
healCard.subscribe((isAvailable) => {
  console.log(`Heal card available: ${isAvailable}`);
});

// State changes trigger all subscriptions automatically
gameState.set('health', 30);    // Triggers heal card and deck updates
gameState.set('hasKey', true);  // Triggers door card and deck updates

// Batch updates for multiple changes
gameState.batch(() => {
  gameState.set('level', 10);
  gameState.set('health', 20);
}); // All changes trigger together after batch completes

// Clean up when done
deck.dispose();
healCard.dispose();
levelCard.dispose();
doorCard.dispose();
```

## Architecture Compatibility

**Important**: These two architectures are mutually exclusive:

- Original classes (`State`, `Card`, `Deck`) cannot be used with reactive classes
- Reactive classes (`ReactiveState`, `ReactiveCard`, `ReactiveDeck`) cannot be used with original classes
- Choose one architecture for your entire application

Both architectures use the same [Expression Language](./expressions.md) for defining quality requirements, ensuring consistent condition syntax regardless of which state management approach you choose.

## Reactive Best Practices

### Batching State Changes

When making multiple state changes at once, use `batch()` to group them into a single notification. Without batching, each call to `set()` or `delete()` triggers all subscribers individually, which can cause unnecessary re-renders and redundant work.

```javascript
// Without batch — triggers 3 separate notifications
gameState.set('health', 100);
gameState.set('level', 5);
gameState.set('gold', 200);

// With batch — triggers only 1 notification after all changes
gameState.batch(() => {
  gameState.set('health', 100);
  gameState.set('level', 5);
  gameState.set('gold', 200);
});
```

Nested batches are safe — the inner batch executes immediately and notifications are deferred until the outermost batch completes. If the batch function throws an error, any changes made before the error are kept and listeners are still notified.

### The dispose() Lifecycle

All reactive classes (`ReactiveCard`, `ReactiveDeck`, `ReactiveExpression`, `ReactiveQualitySet`) maintain internal subscriptions to track state changes. When a reactive object is no longer needed, you **must** call `dispose()` to clean up these subscriptions and prevent memory leaks.

```javascript
const state = new ReactiveState();
const card = new ReactiveCard('Quest', ['$level >= 5'], state);
const deck = new ReactiveDeck([card], state);

deck.subscribe((available) => { /* ... */ });

// When done, dispose in order: deck first, then cards
deck.dispose();   // unbinds all cards, clears listeners
card.dispose();   // clears any remaining subscriptions
```

**What `dispose()` does:**

| Class | Behavior |
|---|---|
| `ReactiveCard` | Unbinds from state, disposes internal `ReactiveQualitySet`, clears listeners. |
| `ReactiveDeck` | Unbinds from state, disposes all child cards, clears listener list. |
| `ReactiveExpression` | Unbinds from state, clears listeners. |
| `ReactiveQualitySet` | Unbinds from state, disposes all child expressions, clears listeners. |

**Rules of thumb:**

- Always dispose decks before their individual cards (the deck's `dispose()` also disposes its cards).
- After `dispose()`, the object should not be reused — create a new instance instead.
- Use `unbind()` instead of `dispose()` if you intend to rebind the object to a different state later.
