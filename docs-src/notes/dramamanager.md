---
layout: page
title: Drama Manager and Beats (1992)
permalink: /dramamanager
---

# Drama Manager and Beats (1992)

## Term

The Oz Project at Carnegie Mellon University, led by Joseph Bates (1992), introduced the *drama manager*: a component that watches the world *state* and selects what should happen next so the experience stays dramatically coherent. Rather than authoring fixed paths, designers wrote small units of content that the drama manager could choose between based on current values.

Weyhrauch (1997) formalized this as *search-based drama management*, treating story as a sequence of selectable units evaluated against the current situation. Mateas and Stern (2005) later refined the unit into a *beat*, used in *Façade* (2005): each beat carried preconditions for selection and effects on the world state, with the drama manager choosing among available beats to manage tension.

There are several major concepts that connect directly to quality-based narratives:

* **Beat**: a small unit of authored interaction (the precursor to a storylet).
* **Preconditions**: state values that must hold before a beat can be selected.
* **Drama manager**: selector that monitors state and chooses among available beats.
* **Selection score / salience**: weighting used to pick the most appropriate available beat.

This idea of monitoring values and selecting only currently *available* content is the same mechanism described elsewhere as [storylet]({{ '/storylet' | relative_url }}) prerequisites. The drama manager's scoring of available beats is the direct origin of the salience-based narrative (SBN) approach later proposed by Short (2016) as a sibling to quality-based narrative.

## References

Bates, J. (1992). Virtual Reality, Art, and Entertainment. Presence: Teleoperators and Virtual Environments, 1(1), 133–138. `https://doi.org/10.1162/pres.1992.1.1.133`

Mateas, M., & Stern, A. (2005). Structuring Content in the Façade Interactive Drama Architecture. Proceedings of the First AAAI Conference on Artificial Intelligence and Interactive Digital Entertainment, 93–98. Retrieved from `https://cdn.aaai.org/AIIDE/2005/AIIDE05-016.pdf`

Short, E. (2016). Beyond Branching: Quality-Based, Salience-Based, and Waypoint Narrative Structures. Emily Short's Interactive Storytelling. Retrieved from `https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/`

Weyhrauch, P. (1997). Guiding Interactive Drama. PhD dissertation, Carnegie Mellon University. Technical Report CMU-CS-97-109.
