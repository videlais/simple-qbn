---
layout: page
title: Simulation and Goals (1977)
permalink: /talespin
---

# Simulation and Goals (1977)

## Term

One of the earliest computational models of story production was *TALE-SPIN*, created by James Meehan (1977) as part of doctoral research at Yale University under Roger Schank. Rather than writing branches in advance, *TALE-SPIN* generated short fables by simulating characters who pursued *goals* within a small world of values. Each character had relationships, needs, and knowledge, and the program tried to satisfy their goals through a chain of plausible actions.

The story emerged from the interaction between a *world state* and a set of preconditions. As Meehan (1977) described it, an action could only be taken if its conditions were met, and taking it changed the values that other actions depended on:

> A character does something for a reason. The reasons are goals. To satisfy a goal, the character makes a plan, and the plan is a series of actions, each of which depends on the state of the world.
>
> \- Meehan (1977)

In pulling from this model, there are several major concepts that anticipate later quality-based narratives:

* **World state**: collection of values describing characters and their relationships.
* **Goals**: conditions a character is trying to make true.
* **Preconditions**: requirements that must be met before an action can occur.
* **Effects**: changes to the world state once an action is taken.

The pattern of "preconditions → content → effects on state" used by *TALE-SPIN* (1977) is the same three-part structure later formalized for storylets. While *TALE-SPIN* produced text procedurally rather than selecting authored chunks, it established the idea that available content should be gated by a shared, mutable state.

## References

Meehan, J. R. (1977). TALE-SPIN, An Interactive Program that Writes Stories. Proceedings of the Fifth International Joint Conference on Artificial Intelligence, 91–98. Retrieved from `https://www.ijcai.org/Proceedings/77-1/Papers/013.pdf`

Schank, R. C., & Abelson, R. P. (1977). Scripts, Plans, Goals and Understanding: An Inquiry into Human Knowledge Structures. Lawrence Erlbaum Associates. `https://doi.org/10.4324/9780203781036`
