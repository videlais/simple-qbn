# Expression

The QBN structure depends on using *qualities*. These are the ways in which the availability determined of storylets are determined.

The metaphor of *expression* is used by this framework to express a measurement of a quality.

**Expressions** are written in the format of "variable-op-value" or "variable-op-variable". This borrows from [TinyQBN](https://github.com/JoshuaGrams/tiny-qbn/blob/master/doc/quick-reference.md), which borrows from the [story format SugarCube](https://www.motoslave.net/sugarcube/2/docs/#macros-macro-if) for Twine 2.

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

Expressed as string values, each **Expression** keeps track of the arguments and operator. Each object provides a method called **check()** that will evaluate the expression given the current [**State**](./State.md).
