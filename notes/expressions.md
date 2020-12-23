# Expressions and QualitySet

## Qualities as **Expressions**

While both the [sculptural](./sculpturalmodel.md) and [QBN](./qbn.md) models define their own terms of how sections of a story might be available (constraints and qualities, respectively), neither explain how to *express* these.

Working with the story format SugarCube in Twine 2, the library TinyQBN by Grams (2019) solves this issue through using the tags of passages. Based on the requirements of not containing spaces, Grams (2019) introduced a shorthand for writing qualities using hyphens between the operators (what is being compared) and the operation (how to compare values).

| Shorthand | Comparison Operation  |
|-----------|-----------------------|
| eq        | variable === value    |
| neq       | variable !== value    |
| lt        | variable < value      |
| gt        | variable > value      |
| lte       | variable <= value     |
| gte       | variable >= value     |
| eqvar     | variable === variable |
| neqvar    | variable !== variable |
| ltvar     | variable < variable   |
| gtvar     | variable > variable   |
| ltevar    | variable <= variable  |
| gtevar    | variable >= variable  |

SimpleQBN builds on this shorthand and expects qualities to be written in a format of `operator-operation-operator`. However, internally, the String value becomes an **Expression**, a special class accepting the string shorthand, parsing it, and then providing a Boolean response if the **Expression** is `true` or not.

## **QualitySet**

Each **Card** in SimpleQBN has an internal property called *qualities*. This is an instance of a class called **QualitySet** holding multiple **Expressions**. It provides the method *check()* for reviewing each of its internal **Expressions**. A **QualitySet** is `true` if *every* **Expression** returns `true`.

In order to check if an **Expression** (and the larger **QualitySet**) is `true`, it needs access to the global [**State**](./state.md).

## References

Grams, J. (2019). Tiny-QBN. GitHub. Retrieved from `https://github.com/JoshuaGrams/tiny-qbn`
