---
layout: page
title: Decks and Cards
permalink: /cards
---

# Deck and Cards

Both [sculptural](./sculpturalmodel.md) and [QBN](./qbn.md) models have used the terms "deck-based" and "card-based". Building from the metaphors used in TinyQBN by Grams (2019), SimpleQBN makes these explicit.

In order to use SimpleQBN, a **Deck** must be created. (Internally, upon creation, each **Deck** has its own [**State**](./state.md)).

The **Deck** class has the methods *addCard()* (accepting content and array of qualities), *updateCard()* (accepting **Card** to update in deck), and *removeCard()* (accepting **Card** to remove). As **Cards** are added in sequence, the method *shuffle()* randomly sorts all **Cards** in the **Deck**.

## Drawing **Cards**

Because a **Deck** may have potentially hundreds or even thousands of **Cards**, it is often useful to *draw* a sub-set based on those currently available. The method *draw()* accept an argument *size* (defaulting to 1). This returns an array whose length matches the size passed to it of all **Cards** currently available based on the **State** within the **Deck**.

As *draw()* creates and returns a new array, **Cards** within the **Deck** are not affected. However, the method *updateCard()* can be used to update an individual **Card** once drawn from the **Deck**.

If the position of **Cards** within the **Deck** is important, the method *getCard()* can be passed a specific position and will return the **Card** matching it, if it exists. (If the method *shuffle()* is used, the internal ordering of all **Cards** will be changed.)

### Additional Deck and Card Methods

| Method | Description |
|--------|-------------|
| `Deck.size()` | Returns the number of cards in the deck. |
| `Deck.state` | Getter/setter for the deck's internal **State**. |
| `Card.hash` | Read-only UUID identifying the card. |
| `Card.removeQuality(s)` | Removes a quality from the card's **QualitySet**. |

---

## Reactive Deck and Cards

The reactive architecture provides **ReactiveDeck** and **ReactiveCard** classes that automatically update when state changes. These classes are bound to a **ReactiveState** and notify subscribers when card availability changes.

> **Important:** Reactive classes (`ReactiveCard`, `ReactiveDeck`) work only with `ReactiveState` and cannot be mixed with original classes.

### Creating a Reactive Deck

Unlike the original **Deck**, a **ReactiveDeck** accepts an array of **ReactiveCard** instances and an optional **ReactiveState** at construction:

```javascript
import ReactiveState from 'simple-qbn/reactive/State';
import ReactiveCard from 'simple-qbn/reactive/Card';
import ReactiveDeck from 'simple-qbn/reactive/Deck';

const state = new ReactiveState();
state.set('health', 80);

const card = new ReactiveCard('Heal', ['$health < 100']);
const deck = new ReactiveDeck([card], state);
```

### Drawing Cards (Reactive)

The reactive *draw()* method differs from the original: it returns **a single random available card** (or `null` if none are available), rather than an array of a given size.

| Original `Deck.draw(size)` | Reactive `ReactiveDeck.draw()` |
|---|---|
| Returns `Card[]` sliced to *size* | Returns `ReactiveCard \| null` (random pick) |
| Uses internal `this.state` | Uses bound `ReactiveState` |

To get all available cards at once, use the `availableCards` getter:

```javascript
const all = deck.availableCards;   // ReactiveCard[]
const one = deck.draw();           // ReactiveCard | null
```

For checking availability against a different state, use `getAvailableCards(state)` or `drawFromState(state)`.

### Subscribing to Changes

Reactive cards and decks support the **subscribe** pattern. Subscribers are called automatically whenever the bound state changes:

```javascript
// Subscribe to the deck — called with available cards on every state change
deck.subscribe((availableCards) => {
  console.log(`${availableCards.length} cards available`);
});

// Subscribe to an individual card — called with its availability boolean
card.subscribe((isAvailable) => {
  console.log(`Heal card available: ${isAvailable}`);
});

// Trigger updates by changing state
state.set('health', 50);
```

### Reactive Deck and Card API Summary

#### ReactiveDeck

| Method / Property | Description |
|---|---|
| `ReactiveDeck(cards, state)` | Constructor — accepts `ReactiveCard[]` and optional `ReactiveState`. |
| `addCard(card)` | Adds a `ReactiveCard` (auto-binds to deck's state). |
| `removeCard(card)` | Removes and unbinds a card. |
| `updateCard(card)` | Replaces a card by matching `hash`. |
| `getCard(index)` | Returns the card at a position, or `null`. |
| `size()` | Returns the number of cards. |
| `shuffle()` | Fisher-Yates shuffle of all cards. |
| `draw()` | Returns one random available card, or `null`. |
| `availableCards` | Getter — returns all currently available cards. |
| `getAvailableCards(state)` | Returns available cards checked against a given state. |
| `drawFromState(state)` | Draws one random card using a given state. |
| `isCardAvailable(card)` | Checks if a specific card is available. |
| `subscribe(listener)` | Subscribes to changes; returns an unsubscribe function. |
| `bindToState(state)` | Binds (or rebinds) the deck to a `ReactiveState`. |
| `unbind()` | Unbinds from the current state. |
| `dispose()` | Cleans up all subscriptions, listeners, and child cards. |
| `toDeck()` | Converts to a regular `Deck`. |
| `listenerCount()` | Returns the number of active listeners. |
| `clearListeners()` | Removes all listeners. |

#### ReactiveCard

| Method / Property | Description |
|---|---|
| `ReactiveCard(content, qualities, state)` | Constructor — content string, qualities array, optional state. |
| `content` | Getter/setter for the card's text content. |
| `qualities` | Getter for the card's `ReactiveQualitySet`; setter accepts `string[]`. |
| `hash` | Read-only UUID. |
| `available` | Getter — current availability (requires bound state). |
| `isAvailable(state)` | Checks availability against a given `ReactiveState`. |
| `addQuality(s)` | Adds a quality expression. |
| `removeQuality(s)` | Removes a quality expression. |
| `subscribe(listener)` | Subscribes to availability changes; returns unsubscribe. |
| `bindToState(state)` | Binds to a `ReactiveState`. |
| `unbind()` | Unbinds from the current state. |
| `dispose()` | Cleans up all subscriptions and listeners. |
| `toCard()` | Converts to a regular `Card`. |
| `listenerCount()` | Number of active listeners. |
| `clearListeners()` | Removes all listeners. |

## References

Grams, J. (2019). Tiny-QBN. GitHub. Retrieved from `https://github.com/JoshuaGrams/tiny-qbn`
