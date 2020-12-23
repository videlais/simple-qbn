# State Management

The [sculptural model](./sculpturalmodel.md) defines a "context" cards can access and manipulate. The QBN model also describes qualities as conditional statements testing against some values. In SimpleQBN, this is explicitly called **State**.

Creating a **Deck** also creates an internal **State** as a property called *state*. As the [**QualitySet**](./expressions.md) of each **Card** needs access, this is passed to the **Card** method *isAvailable()* (which passes it internally to the *check()* method of **QualitySet** and finally to each **Expression's** own *check()* method) whenever the method *draw()* is called on a **Deck**. In other words, this checks all **Cards** against the current values of the **State** to see if they are available and can thus be drawn.

The **State** stores key-value pairs. These can be changed through the methods *add()*, *update()*, *has()*, *remove()*, *get()*, and *size()*. Commonly, however, the methods *add()* and *update()* can be used to add key-value pairs and then update a value based on its key. (Technically, the method *update()* can be used for both adding and updating.)

## Usage Patterns

It is common to create a new **Deck** and then immediately change its state to add values before adding any **Cards**. While, technically, **Cards** can be added first and then **State** updated, if any **Cards** have *qualities*, there must be some values in the **State** to test against before the method *draw()* is used.
