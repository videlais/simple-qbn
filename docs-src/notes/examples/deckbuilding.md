---
layout: page
title: Deck Building
permalink: /examples/deckbuilding
---

# Deck Building

## Using manual, State-based API

One of the most common first tasks with QBN projects is building a deck of cards. In SimpleQBN, this starts with the **Deck** class.

> **Note**: The examples on this page assume usage in Node.js with either importing all classes or the ones specified in the examples.

```JavaScript
const d = new Deck();
```

Creating a **Deck** also creates an internal **State** as its *state* property. The **State** API has the methods *set()*, *get()*, *exists()*,and *remove()*, which it uses to manipulate data stored as key-value pairs. Commonly, a String key is paired with a numeric value.

```javascript
// Create a new Deck
const d = new Deck();
// Add a key-value pair
d.state.add('test', 1);
```

The method *addCard()* of **Deck** accepts a String (*content*) and array (*qualities*) of a new **Card**. Internally, a **Card** will also create a unique *hash* as well.

```javascript
// Create a new Deck
const d = new Deck();
// Add a key-value pair
d.state.set('test', 1);
// Create a card
d.addCard("Content", ['$test == 1']);
```

In quality-based narratives, a *quality* defines if content can be accessed. They are written as conditional statements. In SimpleQBN 1.5.0, these are created using Quis syntax.

Qualities can be passed as either an array when using *addCard()* (of **Deck**) or with the **Card** method *addQuality()*. In either usage, qualities are expressed as string values using Quis syntax. These then become part of a collection called a **QualitySet** internally in a **Card**.

```JavaScript
// Create a new Deck
const d = new Deck();
// Add a key-value pair
d.state.set('test', 1);
// Create a card
// content - "Content"  
// qualities - ['$test == 1']
d.addCard("Content", ['$test == 1']);
```

Cards are selected through the metaphor of *drawing*. A **Card** is drawn when it is available; a **Card** is available when all of the **Expressions** within its **QualitySet** are valid. The **State** of the **Deck** is used to determine this validity. For example, if the **State** contains a key-value pair of `'test': 1`, then any **Cards** with the quality `'$test == 1'` are potentially valid.

The method *draw()* of **Deck** returns an array of results matching an argument up to the *size* passed to it. However, only a **Card** that is available can be drawn.

```javascript
// Create a new Deck
const d = new Deck();
// Add a key-value pair
d.state.set('test', 1);
// Create a card
// content - "Content"
// qualities - ['$test == 1']
d.addCard("Content", ['$test == 1']);
// Draw the card from the deck
const hand = d.draw(1);
// Show the content of the first (and only) drawn card
console.log(hand[0].content);
```

## Adding, Shuffling, and Re-Drawing Cards

Once a **Deck** is created, any number of additional **Cards** can be added. Based on their qualities, a **Card** can initially be available or become it through altering the **State** of the **Deck**. Alternatively, once a **Card** is drawn from a **Deck**, it can be updated in the **Deck** using the method *updateCard()* (passing the **Card** to the method). Additional qualities can be added to a **Card** and then updated in the deck in this way.

```javascript
// Create a new Deck
const d = new Deck();
// Add a key-value pair
d.state.set('test', 1);
// Create a card
d.addCard("Content", ['$test == 1']);
// Create another
d.addCard("More Content", ['$test == 1']);
// Create a third
d.addCard("Even More Content", ['$test == 1']);
```

The method *shuffle()* randomly distributes existing cards within the **Deck**. Because all **Cards** are added in sequence, this method can be used to re-sort the **Cards** in the **Deck**.

```javascript
// Create a new Deck
const d = new Deck();
// Add a key-value pair
d.state.set('test', 1);
// Create a card
d.addCard("Content", ['$test == 1']);
// Create another
d.addCard("More Content", ['$test == 1']);
// Create a third
d.addCard("Even More Content", ['$test == 1']);
// Shuffle the cards
d.shuffle();
```

The method *draw()* creates a new array. It does not alter the original **Deck** and its **Cards**. This means **Cards** can be drawn, manipulated, and then re-drawn again (assuming their qualities allow it).

```javascript
// Create a new Deck
const d = new Deck();
// Add a key-value pair
d.state.set('test', 1);
// Create a card
d.addCard("Content", ['$test == 1']);
// Create another
d.addCard("More Content", ['$test == 1']);
// Create a third
d.addCard("Even More Content", ['$test == 1']);
// Shuffle the cards
d.shuffle();
// Draw all cards
const hand = d.draw(3);
// Get the first card in the drawn array
const c = hand[0];
// Add a new quality
c.addQuality('$example == 1');
// Update the deck
d.updateCard(c);
// Draw another array
// (However, only two cards will be available now.)
const anotherHand = d.draw(3);
```

In the above code, the method *addQuality()* is used to add another quality to a card. As only the **Card** in the drawn collection would be updated, the **Deck** method *updateCard()* is also used. Through passing the **Card** to this method, it will update the internal **Card** where the unique *hash* of each match.

## Using automatic, Reactive State-based API

The reactive architecture provides the same deck building functionality with automatic updates and event-driven state management. Instead of manual state passing, reactive components automatically synchronize when state changes occur.

> **Note**: The examples below use the new nested import structure available in SimpleQBN 1.5.0+. These reactive classes are incompatible with the original State-based classes shown above.

```JavaScript
import { Deck } from 'simple-qbn/reactive';
// Or: import ReactiveDeck from 'simple-qbn/reactive/Deck';

const d = new Deck();
```

Creating a **ReactiveDeck** requires binding it to a **ReactiveState**. Unlike the original architecture, the reactive state is passed explicitly during construction or binding, enabling automatic updates across all connected components.

```javascript
import { State, Deck } from 'simple-qbn/reactive';

// Create a reactive state
const gameState = new State();
// Add a key-value pair
gameState.set('test', 1);
// Create a deck bound to the state
const d = new Deck([], gameState);
```

The method *addCard()* of **ReactiveDeck** accepts a **ReactiveCard** instance. Unlike the original API, you create **ReactiveCard** objects explicitly and then add them to the deck.

```javascript
import { State, Card, Deck } from 'simple-qbn/reactive';

// Create a reactive state
const gameState = new State();
// Add a key-value pair
gameState.set('test', 1);
// Create a reactive card
const card = new Card("Content", ['$test == 1']);
// Create a deck and add the card
const d = new Deck([card], gameState);
```

In the reactive architecture, qualities work the same way as conditional statements using Quis syntax. However, reactive cards automatically recalculate their availability when the bound state changes, eliminating the need for manual availability checking.

Reactive cards maintain the same **QualitySet** concept internally, but with automatic cache invalidation when state changes occur.

```JavaScript
import { State, Card, Deck } from 'simple-qbn/reactive';

// Create a reactive state
const gameState = new State();
// Add a key-value pair
gameState.set('test', 1);
// Create a reactive card with qualities
const card = new Card("Content", ['$test == 1']);
// Create a deck bound to state
const d = new Deck([card], gameState);
```

Cards are accessed through the *availableCards* property, which automatically updates when state changes. A **ReactiveCard** is available when all **ReactiveExpressions** within its **ReactiveQualitySet** are valid against the current **ReactiveState**.

The *availableCards* getter returns an array of currently available cards, and this list automatically updates when the state changes through the reactive subscription system.

```javascript
import { State, Card, Deck } from 'simple-qbn/reactive';

// Create a reactive state
const gameState = new State();
// Add a key-value pair
gameState.set('test', 1);
// Create a reactive card
const card = new Card("Content", ['$test == 1']);
// Create a deck bound to state
const d = new Deck([card], gameState);

// Subscribe to automatic updates
d.subscribe((availableCards) => {
  console.log(`${availableCards.length} cards available`);
});

// Access available cards (triggers subscription)
const available = d.availableCards;
console.log(available[0].content);
```

## Adding, Shuffling, and Drawing Reactive Cards

Reactive decks support dynamic card management with automatic availability updates. When cards are added or removed, all subscribed listeners are notified automatically.

```javascript
import { State, Card, Deck } from 'simple-qbn/reactive';

// Create a reactive state and deck
const gameState = new State();
gameState.set('test', 1);
const d = new Deck([], gameState);

// Create and add multiple cards
const card1 = new Card("Content", ['$test == 1']);
const card2 = new Card("More Content", ['$test == 1']);  
const card3 = new Card("Even More Content", ['$test == 1']);

d.addCard(card1);
d.addCard(card2);
d.addCard(card3);
```

The method *shuffle()* works the same way as the original architecture, randomly redistributing cards within the **ReactiveDeck**. All subscribers are notified when the shuffle occurs.

```javascript
import { State, Card, Deck } from 'simple-qbn/reactive';

// Create a reactive state and deck
const gameState = new State();
gameState.set('test', 1);
const d = new Deck([], gameState);

// Add cards
const card1 = new Card("Content", ['$test == 1']);
const card2 = new Card("More Content", ['$test == 1']);
const card3 = new Card("Even More Content", ['$test == 1']);

d.addCard(card1);
d.addCard(card2);
d.addCard(card3);

// Shuffle the cards (notifies subscribers)
d.shuffle();
```

The *draw()* method returns a random available card (or null if none available), while *availableCards* provides the full list. Unlike the original architecture, reactive cards automatically update their availability as state changes, and all deck subscribers are notified in real-time.

```javascript
import { State, Card, Deck } from 'simple-qbn/reactive';

// Create a reactive state and deck
const gameState = new State();
gameState.set('test', 1);
const d = new Deck([], gameState);

// Add cards
const card1 = new Card("Content", ['$test == 1']);
const card2 = new Card("More Content", ['$test == 1']);
const card3 = new Card("Even More Content", ['$test == 1']);

d.addCard(card1);
d.addCard(card2);
d.addCard(card3);

// Subscribe to changes
d.subscribe((availableCards) => {
  console.log(`${availableCards.length} cards available`);
});

// Shuffle the cards
d.shuffle();

// Draw a random available card
const drawnCard = d.draw();
if (drawnCard) {
  console.log(`Drew: ${drawnCard.content}`);
}

// Add a new quality to the first card
card1.addQuality('$example == 1');
// The deck automatically updates - no updateCard() needed!

// State change automatically updates all cards
gameState.set('example', 1);
// All subscribers notified automatically

// Get currently available cards
const available = d.availableCards;
console.log(`Now ${available.length} cards available`);
```

In the reactive architecture, the method *addQuality()* automatically triggers updates to the card's availability and notifies all deck subscribers. There's no need for an *updateCard()* method since the reactive system handles synchronization automatically through the subscription system.
