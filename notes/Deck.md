# Deck

The term "deck-based" is often used in connection to QBN structures. As this is a useful metaphor for describing how storylets are selected, TinyQBN uses this term and SimpleQBN has followed.

A **Deck** is an array of [**Cards**](./Card.md). They are added through expressing an object containing the properties *content* (its **String** text) and *qualities*, an array of String values written as [**Expressions**](./Expression.md). Internally, the **Expressions** are added to the [**QualitySet**](./QualitySet.md) of the [**Card**](./Card.md).

Card Example:

```JSON
{
  "content": "Some content!",
  "qualities': ['test-eq-1']
}
```

A **Deck** must be created with access to [**State**](./State.md) in order to pass the reference to its **Cards** when they are created and accessed.
