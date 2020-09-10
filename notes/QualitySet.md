# QualitySet

Based on how Short (2019) has described storylets, each has "prerequisites that determine when the content can play." In SimpleQBN, these are a object called **QualitySet** that holds a Set -- literally **Set()** -- of [Expressions](./Expression.md). These can be added to, removed, or checked.

The method **check()** iterates over each Expression within the Set and tests, given the current [State](./State.md), if it is `true`. If all Expressions within the Set are `true`, the **QualitySet** itself is said to be `true`.

If the **QualitySet** of a [Card](./Card.md) is `true`, the Card is also available.

## References

Short, E. (2019). Storylets: You Want Them. Emily Short’s Interactive Storytelling. Retrieved from `https://emshort.blog/2019/11/29/storylets-you-want-them/`
