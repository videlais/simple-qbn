# Sculptural Hypertext Model (2001)

## Term

In a paper called *Card Shark and Thespis: Exotic Tools for Hypertext*, Mark Bernstein (2001) introduced an *exotic* model for hypertext projects. Instead of creating links, they could be *sculpted* away during play. Every part of the story started as potentially connected to every other, but these were slowly removed over time.

Labeling this model *sculptural*, Bernstein (2001) described it as card-based system where each *card* (section of the story) had three parts:

* **Constraints**: preconditions to be met before card can be used.
* **Text**: content shown to user.
* **Assertions**: changes to values when a card is seen.

To prepare a story in the sculptural model, different *constraints* are needed. These might be expressed as plot events such as "princess has her sword" or "aliens have attacked." They could also be more complex comparisons such as "money greater than 10" or "rubies less than 0."

Next, the story needs to be divided into parts. These might be plot events, moments of conflict, or enemy encounters. Content of some kind should be associated with each, becoming the *text* of the card.

If a card needs to change values, it can also include *assertions*. These "assert" (change) different values in some context and affect the future *constraints* of other cards. If, for example, a card asserts the "princess no longer has her sword," any cards with the constraint of "princess has her sword" would no longer be available, as their preconditions (*constraints*) are no longer met as part of the story.

## Refinement of Context

In a paper the next year, Bernstein et al. (2002) refined the sculptural model with an additional term: *context*. While mentioned in the original paper, Bernstein et al. (2002) focused on how cards existed within a *context* (set of values) during play. The *assertions* of a card manipulated this larger *context*, connecting to the programming terminology of a global state for the story.

This established a fourth part of the sculptural hypertext model:

* **Constraints**: preconditions for a card to be available.
* **Assertions**: changes to values when a card is seen.
* **Text**: content shown to user.
* **Context**: global state of the story containing values mutated by assertions.

## References

Bernstein, M. (2001). Card Shark and Thespis: Exotic Tools for Hypertext Narrative. Proceedings of the 12th ACM Conference on Hypertext and Hypermedia, 41–50. `https://doi.org/10.1145/504216.504233`

Bernstein, M., Millard, D. E., & Weal, M. J. (2002). On Writing Sculptural Hypertext. Proceedings of the Thirteenth ACM Conference on Hypertext and Hypermedia, 65–66. `https://doi.org/10.1145/513338.513355`
