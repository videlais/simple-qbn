# Deck

A **Deck** is an collection of [**Card**](./Card.md)s. They are added through passing objects containing the properties *content* (its **String** text) and *qualities*, [**QualitySet**](./QualitySet.md).

A **Deck** **must** be created with access to [**State**](./State.md) in order to pass the reference to its **Cards** when they are created and accessed.

