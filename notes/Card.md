# Card

## Introduction

The metaphor of a **Card** is used to represent a storylet in SimpleQBN.

## Properties

* *content* (String): text of the storylet
* *qualities* (QualitySet): a [QualitySet](./QualitySet.md) (set of [Expression](./Expression.md)s)
* *hash* (access only; String): a unique (sha256) hash created from current time in nanoseconds concatenated with content of card.
* *available* (access only; Boolean): if all [Expression](./Expression.md)s within the qualities are currently valid

## Methods

* *constructor(state, object)*: Accepts a *state* of type [**State**](./State.md) and object literal (with *content* and *qualities*) to build a new **Card**.
* *addQuality(s)*: Add a *s* (**String**) of the format of an [**Expression**](./Expression.md) to be added.
* *removeQuality(s)*: Remove a *s* (**String**) of the format of an [**Expression**](./Expression.md) to be removed.

## Example

**Cards** are rarely used outside of working with [**Deck**](./Deck.md)s and its **add()** method. When using this, pass in an object with the properties of *content* and *qualities* where the first should be the text value and the second an array of qualities. (Internally, the qualities will be mapped to a [**QualitySet**](./QualitySet.md)).

```javascript
const d = new Deck();

d.add({
    content: 'Some content!',
    qualities: ['test-eq-1']
});
```
