# Storylet

## History and Background

The term *storylet* was coined by the studio Failbetter Games. In a design blog post explaining the narrative structure for the game later to become *Fallen London* (2009), the term "storylet" appears with the definition as "discrete chunks of narrative" (Failbetter, 2010; para. 3). Later, in another post two years later, the developers at Failbetter Games clarified storylets as "pieces of story like mosaic tiles, not pipes or complex machinery. Put them together. Build something wonderful" (Failbetter Games, 2012: para. 11).

In working with Failbetter Games and other, related projects, Emily Short (2019) has expanded on this term and refined its definition into three parts:

>"[1] there is a piece of content. It might be a line or a whole section of dialogue, it might be narration, it might be an animation or scrap of film
>
> [2] there are prerequisites that determine when the content can play
>
> [3] there are effects on the world state that result after the content has played"
>
> STORYLETS: YOU WANT THEM. SHORT (2019)

While the term storylet is not used in descriptions of its design, *Reigns* (2016) has been described by both Short (2016b) and Kreminski and Wardrip-Fruin (2018) as an example using the concept. In *Reigns* (2016), the player is presented with some text and two choices. Depending on the choice, one or more attributes (values) will be affected. If any of these values are decreased or increased beyond a set range as a result of choices made, the game ends. Play progresses as the player is presented with storylets based on current attribute ranges, specific sequenced previously unlocked, and random choices from the total possible storylets in the game. Each choice counts as a year in the game, with the goal to "reign" as as long as possible before starting with the next king in line and beginning again.

*King of Dragon Pass* (1999) has been cited by Failbetter Games (2011) as an inspiration for *Fallen London* (2009). Failbetter Games (2011) writes:

> Every other turn or so, you are confronted by an event like this: a slice of story and a set of responses, like an Echo Bazaar storylet. The art is beautiful. The text is clean and urgent, deftly distilling conflict into a single gripping decision. Each choice has its consequences and can trigger follow-up events, with some stories unfolding over decades of play.
>
>ECHO BAZAAR INSPIRATIONS: KING OF DRAGON PASS. FAILBETTER GAMES (2011). PARA. 4.

Presented as tribal leadership governed by advisors in *King of Dragon Pass* (1999), the player navigates a series of seasons for their people within a year with random events occurring between each. These random events are chosen based on previous decisions and the current resources of the tribe. During one, the player is presented with a short amount of text and choices whose outcome may affect their current resources or standing with other tribes and peoples in the game. While the game has a fixed narrative path, a pool of hundreds of random events creates different play-through experiences each time.

A Sharp, the company behind *King of Dragon Pass* (1999), created a scripting language, Opal Scripting Language (OSL), for its development. As shown as part of a "sample" posted on their website, OSL compares resources and uses conditions for influencing narrative presentation (OSL Sample, 2020).

```text
text: <he/she> gives away clan wealth to those fiendish talking lizards.
[n AND dragonAttitude= 'positive] text: Despite <his/her> assurance, <he/she> has done little to help our case with the dragonewts.
[n AND dragonAttitude= 'neutral] text: <he/she> wastes time thinking about talking lizards, instead of clan concerns.
[a] text: <he/she> sends our weaponthanes into the woods on pointless hunts for the plant-folk.
```

Dunham (2011) has also written about *King of Dragon Pass*‘ (1999) development using the authoring tool mTropolis. The engine keeps track of the game’s state and values in such a way that scenes can access and react in different ways, creating a narrative experience based on scenes shown to the user based their previous choices and values of the game’s current state.

## Usage in SimpleQBN

Storylets are represented as [Card](./Card.md)s. They have the following properties:

* *content* (String): text of the storylet
* *qualities* (QualitySet): a [QualitySet](./QualitySet.md) (set of [Expression](./Expression.md)s)
* *hash* (access only; String): a unique (sha256) hash created from current time in nanoseconds concatenated with content of card.
* *available* (access only; Boolean): if all [Expression](./Expression.md)s within the *qualities* are currently valid

## References

Dunham, D. (2011). An Architecture Overview. King of Dragon Pass. Retrieved from `https://kingofdragonpass.blogspot.com/2011/02/architecture-overview.html`

Failbetter Games. (2010). Echo Bazaar Narrative Structures, part two. Retrieved from `http://www.failbettergames.com/echo-bazaar-narrative-structures-part-two/`

Failbetter Games. (2011). Echo Bazaar Inspirations: King of Dragon Pass. Retrieved from `https://www.failbettergames.com/echo-bazaar-inspirations-king-of-dragon-pass/`

Failbetter Games. (2012). StoryNexus Developer Diary #2: fewer spreadsheets, less swearing. Retrieved from `https://www.failbettergames.com/storynexus-developer-diary-2-fewer-spreadsheets-less-swearing/`

King of Dragon Pass (1999). A Sharp.

Kreminski, M., & Wardrip-Fruin, N. (2018). Sketching a Map of the Storylets Design Space. In R. Rouse, H. Koenitz, & M. Haahr (Eds.), Interactive Storytelling (Vol. 11318, pp. 160–164). Springer International Publishing. `https://doi.org/10.1007/978-3-030-04028-4_14`

OSL Sample. (2020). A Sharp. Retrieved from `http://a-sharp.com/kodp/osl.html`

Reigns. (2016). Nerial.

Short, E. (2016a). Beyond Branching: Quality-Based, Salience-Based, and Waypoint Narrative Structures. Emily Short’s Interactive Storytelling. Retrieved from `https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/`

Short, E. (2016b). Reigns. Retrieved from `https://emshort.blog/2016/08/20/reigns/`

Short, E. (2019). Storylets: You Want Them. Emily Short’s Interactive Storytelling. Retrieved from `https://emshort.blog/2019/11/29/storylets-you-want-them/`
