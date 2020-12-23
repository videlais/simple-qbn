# Deck Building

## Understanding the API

One of the most common first tasks with QBN projects is building a deck of cards. In SimpleQBN, this starts with the **Deck** class.

```javascript
const d = new Deck();
```

Creating a **Deck** also creates an internal **State** as its *state* property. The **State** API has the methods *add()*, *get()*, *has()*, *update()*, and *remove()*, which it uses to manipulate data stored as key-value pairs. Commonly, a String key is paired with a numeric value.

> **Note:** Because of how **Expressions** are currently handled, it is strongly recommended to only use numeric or String values as part of the **State**. Boolean values do not work well, and decimal numbers do not work at all.

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
d.state.add('test', 1);
// Create a card
d.addCard("Content");
```

In quality-based narratives, a *quality* defines if content can be accessed. They are written as conditional statements. In SimpleQBN, these are created using hyphens between operators (things being compared) and the operation (how the values should be compared).

For example, to test if a key, 'test', is equal to a numeric value, 1, it would be written as `test-eq-1`. These are known as **Expressions**.

Qualities can be passed as either an array when using *addCard()* (of **Deck**) or with the **Card** method *addQuality()*. In either usage, qualities are expressed as String values. These then become part of a collection called a **QualitySet** internally in a **Card**. (Qualities are converted into individual **Expressions** internally as part of a **QualitySet**.)

```javascript
// Create a new Deck
const d = new Deck();
// Add a key-value pair
d.state.add('test', 1);
// Create a card
// content - "Content"
// qualities - ['test-eq-1']
d.addCard("Content", ['test-eq-1']);
```

Cards are selected through the metaphor of *drawing*. A **Card** is drawn when it is available; a **Card** is available when all of the **Expressions** within its **QualitySet** are valid. The **State** of the **Deck** is used to determine this validity. For example, if the **State** contains a key-value pair of `'test':1`, then any **Cards** with the quality `test-eq-1` are potentially valid.

The method *draw()* of **Deck** returns an array of results matching an argument up to the *size* passed to it. However, only a **Card** that is available can be drawn.

```javascript
// Create a new Deck
const d = new Deck();
// Add a key-value pair
d.state.add('test', 1);
// Create a card
// content - "Content"
// qualities - ['test-eq-1']
d.addCard("Content", ['test-eq-1']);
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
d.state.add('test', 1);
// Create a card
d.addCard("Content", ['test-eq-1']);
// Create another
d.addCard("More Content", ['test-eq-1']);
// Create a third
d.addCard("Even More Content", ['test-eq-1']);
```

The method *shuffle()* randomly distributes existing cards within the **Deck**. Because all **Cards** are added in sequence, this method can be used to re-sort the **Cards** in the **Deck**.

```javascript
// Create a new Deck
const d = new Deck();
// Add a key-value pair
d.state.add('test', 1);
// Create a card
d.addCard("Content", ['test-eq-1']);
// Create another
d.addCard("More Content", ['test-eq-1']);
// Create a third
d.addCard("Even More Content", ['test-eq-1']);
// Shuffle the cards
d.shuffle();
```

The method *draw()* creates a new array. It does not alter the original **Deck** and its **Cards**. This means **Cards** can be drawn, manipulated, and then re-drawn again (assuming their qualities allow it).

```javascript
// Create a new Deck
const d = new Deck();
// Add a key-value pair
d.state.add('test', 1);
// Create a card
d.addCard("Content", ['test-eq-1']);
// Create another
d.addCard("More Content", ['test-eq-1']);
// Create a third
d.addCard("Even More Content", ['test-eq-1']);
// Shuffle the cards
d.shuffle();
// Draw all cards
const hand = draw(3);
// Get the first card in the drawn array
const c = hand[0];
// Add a new quality
c.addQuality('example-eq-1');
// Update the deck
d.updateCard(c);
// Draw another array
// (However, only two cards will be available now.)
const anotherHand = draw(3);
```

In the above code, the method *addQuality()* is used to add another quality to a card. As only the **Card** in the drawn collection would be updated, the **Deck** method *updateCard()* is also used. Through passing the **Card** to this method, it will update the internal **Card** where the unique *hash* of each match.
