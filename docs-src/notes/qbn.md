---
layout: page
title: Quality-Based Narrative (2010)
permalink: /qbn
---

# Quality-Based Narrative (2010)

## Term

In the same blog post defining [storylet](./storylet.md), Failbetter Games (2010) also describes the use of *qualities* as something that "tell storylets what to do" (para. 4; original emphasis). In this definition, *qualities* exist as a form of conditional statements. For example, the player may need 4 Jade and to be at a location named Edge City to access a storylet. The condition `>= 4 Jade AND location = ‘Edge City'` exists as a combination *quality* for a particular storylet.

A *quality-based narrative* (QBN) is one where storylet selection is based based on its *qualities* (prerequisites).

## Historical Usage

*King of Dragon Pass* (1999) has been cited by Failbetter Games (2011) as an inspiration for *Fallen London* (2009).

> Every other turn or so, you are confronted by an event like this: a slice of story and a set of responses, like an Echo Bazaar storylet. The art is beautiful. The text is clean and urgent, deftly distilling conflict into a single gripping decision. Each choice has its consequences and can trigger follow-up events, with some stories unfolding over decades of play.
>
> Echo Bazaar Inspirations: King of Dragon Pass. Failbetter Games (2011), Para 4.

In *King of Dragon Pass* (1999), play proceeds across different decision points. Presented as small vignettes, the player must pick from a small set of choices affecting different in-world plot events and the current resources of a tribe. These vignettes are selected based on a combination of three factors: previous decisions made by the player, the current resources of their tribe, and a degree of randomness. Within the game, there is a pool of hundreds of possible vignettes, making every trip through the game unique.

In developing *King of Dragon Pass* (1999), A Sharp, created a scripting language called Opal Scripting Language (OSL). In this language, different vignettes were locked behind certain conditions like `dragonAttitude='positive'` (OSL Sample, 2020). These act as its *qualities* as shown below:

```text
text: <he/she> gives away clan wealth to those fiendish talking lizards.
[n AND dragonAttitude= 'positive] text: Despite <his/her> assurance, <he/she> has done little to help our case with the dragonewts.
[n AND dragonAttitude= 'neutral] text: <he/she> wastes time thinking about talking lizards, instead of clan concerns.
[a] text: <he/she> sends our weaponthanes into the woods on pointless hunts for the plant-folk.
```

## Alternative Terms

While many people have embraced the term quality-based narrative based on Failbetter Games and Emily Short’s work, Kennedy (2017), co-creator of the term, has proposed "resource narratives" or resource-based narrative (RBN) as alternatives because of the issue around a potential misunderstanding of "quality" applying not to measurements of a storylet’s prerequisite but its content (para. 3). As the term "resource" is used in StoryNexus’ documentation to discuss qualities as currency, such a usage has gained some interest (Storychoices, 2012).

The term salience-based narrative (SBN) has also been proposed by Short (2016) to describe a system using a drama manager like used in *Façade* (2005) to use salience to limit the current options or choices of the player (Mateas and Stern, 2005). Kreminski and Wardrip-Fruin (2018) have also proposed weights for storylets or the use of a system to manage storylet tracking.

## References

Failbetter Games. (2010). Echo Bazaar Narrative Structures, part two. Retrieved from `http://www.failbettergames.com/echo-bazaar-narrative-structures-part-two/`

Failbetter Games. (2011). Echo Bazaar Inspirations: King of Dragon Pass. Retrieved from `https://www.failbettergames.com/echo-bazaar-inspirations-king-of-dragon-pass/`

Façade (2005). Procedural Arts.

Fallen London. (2009). Failbetter Games.

Kennedy, A. (2017). I’ve stopped talking about quality-based narrative, I’ve started talking about resource narrative. Weather Factory. Retrieved from `https://weatherfactory.biz/qbn-to-resource-narratives/`

King of Dragon Pass (1999). A Sharp.

Kreminski, M., & Wardrip-Fruin, N. (2018). Sketching a Map of the Storylets Design Space. In R. Rouse, H. Koenitz, & M. Haahr (Eds.), Interactive Storytelling (Vol. 11318, pp. 160–164). Springer International Publishing. `https://doi.org/10.1007/978-3-030-04028-4_14`

Mateas, M. & Stern, A. (2005). Structuring content in the Facade interactive drama architecture. Proceedings of the First AAAI Conference on Artificial Intelligence and Interactive Digital Entertainment. pp. 93-98.

OSL Sample. (2020). A Sharp. Retrieved from `http://a-sharp.com/kodp/osl.html`

Short, E. (2016). Beyond Branching: Quality-Based, Salience-Based, and Waypoint Narrative Structures. Emily Short’s Interactive Storytelling. Retrieved from `https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/`

Short, E. (2019). Storylets: You Want Them. Emily Short’s Interactive Storytelling. Retrieved from `https://emshort.blog/2019/11/29/storylets-you-want-them/`

Storychoices. (2012). Design before you write. Storychoices: Building stories with interactive narrative platforms. Retrieved from `http://wiki.failbettergames.com/wiki:design-before-you-write`
