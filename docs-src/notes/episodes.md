---
layout: page
title: Episodes and Sequences (1989)
permalink: /episodes
---

# Episodes and Sequences (1989)

## Term

In a blog post now only available from the Internet Archive, Doug Sharp (1989) describes the "battle" of interactive fiction from a GDC 1989 talk on the same topic. Within the post, Sharp (1989) mentions a project called *King of Chicago* (1989) and how it is an "honorable failure." Toward the end of the post, Sharp (1989) writes about a design of a "big bags with smaller bags inside which hold clips, which I called episodes." Each one of these *episodes* would:

> specif[y] things like who is to be onscreen, chooses background graphics, switches between close-ups and medium shots, drives the character’s animation and facial expression, and feeds dialog to them. The episode script reads a lot like a playscript or screenplay. A single episode might put Pinky and his girlfriend Lola in her bedroom, and have her badger Pinky about earning more money. This episode might take two minutes of screen time.
>
> \- Sharp (1989)

In the following paragraphs, Sharp (1989) relates the interface between the *state* (collection of values) and how it affects episode navigation. As Sharp (1989) writes it: "The episode selector looks at all the keys of available episodes and selects the one that most closely matches current game variables. Its method is to look for a least square fit."

In pulling from the model Sharp (1989) writes about, there are several major concepts:

* **Story**: Multiple episodes, each govern by character
* **Episode**: Selection of sequences influenced by player actions within rules of player interactions
* **Narrator**: decides episode order and when each ends
* **Sequences**: set of phases (act-like structure within an episode)
* **Actions**: player input

A *story* starts with an *episode*, composed of *sequences*. The player takes *actions*, which changes the values watched by the *Narrator*. This affects which *sequences* are chosen next, if the episode ends, and any future changes carried over into future episodes. When the episodes are exhausted, play ends.

## References

Sharp, D. (1989). Story vs. Game: The Battle of Interactive Fiction. Computer Game Developer's Convention 1989. Retrieved from `https://web.archive.org/web/20040404061317/http://www.channelzilch.com/doug/battle.htm`
