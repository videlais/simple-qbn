# Expressions and QualitySet

## Qualities as Expressions

While both the [sculptural](./sculpturalmodel.md) and [QBN](./qbn.md) models define their own terms of how sections of a story might become available (constraints and qualities, respectively), neither explain how to *express* these.

### Grams Format

Working with the story format SugarCube in Twine 2, the library TinyQBN by Grams (2019) solves this issue through using the tags of passages. Based on the requirements of not containing spaces, Grams (2019) introduced a shorthand for writing qualities using hyphens between the operators (what is being compared) and the operation (how to compare values): `operator-operation-operator`.

This format created an easy way to include prerequisites in Twine using tags in passages, but comes with some issues:

* *Operators have to be converted into and out of String values*. Tags in Twine 2 are stored as the values of attributes within [its HTML](https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md). These tags are assumed to be String values. Any use of other primative data types in JavaScript such as Numbers and Booleans must be converted out of their String representation.
* *Only one comparison can be used at a time*. Complex comparisons are not possible in the format because of its internal parsing. Additional tags can be added, but each is only one comparison between a single variable and value.

### Working with MongoDB Query Language (via Mingo)

Starting with version 1.4, SimpleQBN began to use the MongoDB Query Language via the [Mingo](https://www.npmjs.com/package/mingo) NPM package. Because SimpleQBN is not limited by usage with Twine, the query language developed for MongoDB allows for using objects instead of string values. This overcomes the two major limitations of the Grams format through allowing comparisons to be expressed as objects.

For example, an **Expression** to test if the **State** value *score* was greater than 15 would be written as the following:

```JavaScript
{score: {$gt: 15}}
```

The use of the MongoDB query language also introduces much more complex queries as well. To test if the **State** value *score* was greater than 15, **State** value *act1* was `true`, and **State** value *reputation* was less than `3.5`, it would be the following:

```JavaScript
{score: {$gt: 15}, act1: true, reputation: {$lt: 3.5}}
```

## **QualitySet**

Each **Card** in SimpleQBN has an internal property called *qualities*. This is an instance of a class called **QualitySet** holding multiple **Expressions**. It provides the method *check()* for reviewing each of its internal **Expressions**. A **QualitySet** is `true` if *every* **Expression** returns `true`.

In order to check if an **Expression** (and the larger **QualitySet**) is `true`, it needs access to [**State**](./state.md).

## References

Grams, J. (2019). Tiny-QBN. GitHub. Retrieved from `https://github.com/JoshuaGrams/tiny-qbn`
