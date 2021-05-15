# Deck and Cards

Both [sculptural](./sculpturalmodel.md) and [QBN](./qbn.md) models have used the terms "deck-based" and "card-based". Building from the metaphors used in TinyQBN by Grams (2019), SimpleQBN makes these explicit.

In order to use SimpleQBN, a **Deck** must be created. (Internally, upon creation, each **Deck** has its own [**State**](./state.md)).

The **Deck** class has the methods *addCard()* (accepting content and array of qualities), *updateCard()* (accepting **Card** to update in deck), and *removeCard()* (accepting **Card** to remove). As **Cards** are added in sequence, the method *shuffle()* randomly sorts all **Cards** in the **Deck**.

## Drawing **Cards**

Because a **Deck** may have potentially hundreds or even thousands of **Cards**, it is often useful to *draw* a sub-set based on those currently available. The method *draw()* accept an argument *size* (defaulting to 1). This returns an array whose length matches the size passed to it of all **Cards** currently available based on the **State** within the **Deck**.

As *draw()* creates and returns a new array, **Cards** within the **Deck** are not affected. However, the method *updateCard()* can be used to update an individual **Card** once drawn from the **Deck**.

If the position of **Cards** within the **Deck** is important, the method *getCard()* can be passed a specific position and will return the **Card** matching it, if it exists. (If the method *shuffle()* is used, the internal ordering of all **Cards** will be changed.)

## References

Grams, J. (2019). Tiny-QBN. GitHub. Retrieved from `https://github.com/JoshuaGrams/tiny-qbn`
