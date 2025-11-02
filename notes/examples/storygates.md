# Story Gating

Emily Short (2016, 2019), among others, have discussed different moments in narratives models as "gates." These happen when one set of narrative units (usually storylets) are available and then another collection are added or become dominant once certain conditions are met.

In SimpleQBN, one way to conceive of story gates is through using the key-value pairs within **State** with the *qualities* of **Cards**.

## Using manual, State-based API

Consider the following code:

```javascript
// Create a new Deck
const d = new Deck();
// Add a key-value pair
d.state.set('example', 1);
// Create four cards
d.addCard("First", ['$example == 1']);
d.addCard("Second", ['$example == 1']);
d.addCard("Third", ['$example == 2']);
d.addCard("Fourth", ['$example == 2']);
// Pass a size of 4, but only two cards are available
const hand = d.draw(4);
```

When run, any calls to the method *draw()* in the **Deck** would only select available **Cards**. Currently, these are only **Cards** with the *content* of "First" and "Second".

These different qualities "gate" the other content from being used. However, these can be enabled through adjusting the values of the *state* (based on **State**) of the **Deck** using the method *set()* with the key-value pair to change.

```javascript
// Create a new Deck
const d = new Deck();
// Add a key-value pair
d.state.set('example', 1);
// Create four cards
d.addCard("First", ['$example == 1']);
d.addCard("Second", ['$example == 1']);
d.addCard("Third", ['$example == 2']);
d.addCard("Fourth", ['$example == 2']);
// Change the deck's state
d.state.set('example', 2);
// Pass a size of 4, but only two cards are available
const hand = d.draw(4);
```

In the new code, only the last two cards are available. These are cards with the *content* of "Third" and "Fourth".

```javascript
// Create a new Deck
const d = new Deck();
// Add a key-value pair
d.state.set('example', 1);
// Create four cards
d.addCard("First", ['$example == 1']);
d.addCard("Second", ['$example == 1']);
d.addCard("Third", ['$example == 2']);
d.addCard("Fourth", ['$example == 2']);
// Shuffle the cards
d.shuffle();
// Change the deck's state
d.state.set('example', 2);
// Pass a size of 4, but only two cards are available
const hand = d.draw(4);
```

The method *shuffle()* of **Deck** changes the order of **Cards**, not their availability. This allows for randomly sorting the cards, if wanted.

## Using automatic, Reactive State-based API

The reactive architecture provides the same story gating functionality with automatic updates and event-driven state management. Instead of manual state checking, reactive components automatically synchronize when gate conditions change.

> **Note**: The examples below use the new nested import structure available in SimpleQBN 1.5.0+. These reactive classes are incompatible with the original State-based classes shown above.

```javascript
import { State, Card, Deck } from 'simple-qbn/reactive';

// Create a reactive state and deck
const gameState = new State();
const d = new Deck([], gameState);
// Add a key-value pair
gameState.set('example', 1);
// Create four cards bound to the reactive state
const card1 = new Card("First", ['$example == 1']);
const card2 = new Card("Second", ['$example == 1']);
const card3 = new Card("Third", ['$example == 2']);
const card4 = new Card("Fourth", ['$example == 2']);
d.addCard(card1);
d.addCard(card2);
d.addCard(card3);
d.addCard(card4);
// Get available cards
const available = d.availableCards;
```

When run, any calls to the method *draw()* in the **ReactiveDeck** would only select available **ReactiveCards**. Currently, these are only **ReactiveCards** with the *content* of "First" and "Second". The reactive system automatically monitors state changes and updates card availability in real-time.

These different qualities "gate" the other content from being used. However, unlike the original architecture, reactive gates are automatically enforced through the subscription system. When gate conditions change, all connected components are notified automatically.

```javascript
import { State, Card, Deck } from 'simple-qbn/reactive';

// Create a reactive state and deck
const gameState = new State();
const d = new Deck([], gameState);
// Add a key-value pair
gameState.set('example', 1);
// Create four cards bound to the reactive state
const card1 = new Card("First", ['$example == 1']);
const card2 = new Card("Second", ['$example == 1']);
const card3 = new Card("Third", ['$example == 2']);
const card4 = new Card("Fourth", ['$example == 2']);
d.addCard(card1);
d.addCard(card2);
d.addCard(card3);
d.addCard(card4);

// Subscribe to automatic gate changes
d.subscribe((availableCards) => {
  console.log(`Gate changed: ${availableCards.length} cards now available`);
  availableCards.forEach(card => console.log(`- ${card.content}`));
});

// Change the reactive state (automatically triggers gate change)
gameState.set('example', 2);
// Get available cards
const available = d.availableCards;
```

In the new code, only the last two cards are available. These are cards with the *content* of "Third" and "Fourth". The reactive system automatically recalculated card availability when the state changed, and all subscribers were notified of the gate transition.

```javascript
import { State, Card, Deck } from 'simple-qbn/reactive';

// Create a reactive state and deck
const gameState = new State();
const d = new Deck([], gameState);
// Add a key-value pair
gameState.set('example', 1);
// Create four cards bound to the reactive state
const card1 = new Card("First", ['$example == 1']);
const card2 = new Card("Second", ['$example == 1']);
const card3 = new Card("Third", ['$example == 2']);
const card4 = new Card("Fourth", ['$example == 2']);
d.addCard(card1);
d.addCard(card2);
d.addCard(card3);
d.addCard(card4);

// Subscribe to all deck changes
d.subscribe((availableCards) => {
  console.log(`${availableCards.length} cards available after change`);
});

// Shuffle the cards (notifies subscribers)
d.shuffle();
// Change the reactive state (automatically triggers gate change)
gameState.set('example', 2);
// Get available cards
const available = d.availableCards;
```

The method *shuffle()* of **ReactiveDeck** changes the order of **ReactiveCards**, not their availability. This allows for randomly sorting the cards, if wanted. However, unlike the original architecture, the reactive system automatically notifies all subscribers when the shuffle occurs, enabling real-time updates to any connected UI or game logic.

The reactive architecture makes story gates particularly powerful by enabling automatic propagation of gate changes throughout the entire narrative system. When a story gate condition is met, all connected decks, cards, and UI elements can respond immediately without manual intervention.

## References

Short, E. (2016). Beyond Branching: Quality-Based, Salience-Based, and Waypoint Narrative Structures. Emily Short’s Interactive Storytelling. Retrieved from `https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/`

Short, E. (2019). Storylets: You Want Them. Emily Short’s Interactive Storytelling. Retrieved from `https://emshort.blog/2019/11/29/storylets-you-want-them/`
