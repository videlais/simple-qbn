# Story Gating

Emily Short (2016, 2019), among others, have discussed different moments in narratives models as "gates." These happen when one set of narrative units (usually storylets) are available and then another collection are added or become dominant once certain conditions are met.

In SimpleQBN, one way to conceive of story gates is through using the key-value pairs within **State** with the *qualities* of **Cards**.

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

## References

Short, E. (2016). Beyond Branching: Quality-Based, Salience-Based, and Waypoint Narrative Structures. Emily Short’s Interactive Storytelling. Retrieved from `https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/`

Short, E. (2019). Storylets: You Want Them. Emily Short’s Interactive Storytelling. Retrieved from `https://emshort.blog/2019/11/29/storylets-you-want-them/`
