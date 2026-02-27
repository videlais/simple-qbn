---
layout: page
title: Migration Guide
permalink: /examples/migration
---

# Migration Guide: Mingo to Quis Expressions

Version 1.5.0 of SimpleQBN replaced MongoDB query language support (via the Mingo library) with pure [Quis](https://github.com/videlais/quis) string expressions. This guide shows how to convert existing expressions.

## Why the Change?

- **Smaller bundle size**: Removing the Mingo dependency significantly reduces the library footprint.
- **Simpler syntax**: Quis expressions are plain strings that read naturally as conditional statements.
- **Consistent format**: All expressions now use the same `$variable operator value` syntax.

## Expression Conversion Reference

### Simple Comparisons

| MongoDB/Mingo (v1.4.x) | Quis (v1.5.0+) |
|---|---|
| `{score: {$gt: 15}}` | `$score > 15` |
| `{score: {$gte: 15}}` | `$score >= 15` |
| `{score: {$lt: 10}}` | `$score < 10` |
| `{score: {$lte: 10}}` | `$score <= 10` |
| `{score: {$eq: 5}}` | `$score == 5` |
| `{score: {$ne: 0}}` | `$score != 0` |

### Equality with Non-Numeric Types

| MongoDB/Mingo (v1.4.x) | Quis (v1.5.0+) |
|---|---|
| `{active: true}` | `$active == true` |
| `{active: false}` | `$active == false` |
| `{role: "admin"}` | `$role == "admin"` |

### Multiple Conditions (AND)

In Mingo, multiple conditions in the same object were combined with AND logic. In Quis, use the `&&` operator:

**Before (v1.4.x):**

```javascript
// All conditions must be true (implicit AND)
const card = new Card('content', [{score: {$gt: 15}, act1: true, reputation: {$lt: 3.5}}]);
```

**After (v1.5.0+):**

```javascript
// Combine with && operator
const card = new Card('content', ['$score > 15 && $act1 == true && $reputation < 3.5']);
```

Alternatively, pass multiple separate expressions in the qualities array — they are combined with AND logic in a **QualitySet** automatically:

```javascript
// Each string in the array is AND-ed together
const card = new Card('content', [
  '$score > 15',
  '$act1 == true',
  '$reputation < 3.5'
]);
```

### OR Conditions

Mingo's `$or` operator maps to the `||` operator in Quis:

**Before (v1.4.x):**

```javascript
const card = new Card('content', [{$or: [{score: {$gt: 50}}, {bonus: true}]}]);
```

**After (v1.5.0+):**

```javascript
const card = new Card('content', ['$score > 50 || $bonus == true']);
```

### Grouped Conditions

Parentheses allow complex grouping in Quis:

```javascript
// (high score OR has bonus) AND has not finished
const card = new Card('content', [
  '($score >= 80 || $bonus_points > 10) && $finished == false'
]);
```

### NOT Conditions

Mingo's `$not` maps to the `!` prefix in Quis:

**Before (v1.4.x):**

```javascript
const card = new Card('content', [{active: {$not: {$eq: true}}}]);
```

**After (v1.5.0+):**

```javascript
const card = new Card('content', ['!($active == true)']);
// or equivalently:
const card2 = new Card('content', ['$active != true']);
```

## Full Example: Before and After

### Before (v1.4.x — Mingo)

```javascript
import State from 'simple-qbn/State';
import Card from 'simple-qbn/Card';
import Deck from 'simple-qbn/Deck';

const d = new Deck();
d.state.set('health', 80);
d.state.set('hasKey', false);
d.state.set('level', 3);

// Mingo-style object expressions
d.addCard('Heal', [{health: {$lt: 50}}]);
d.addCard('Open Door', [{hasKey: true}]);
d.addCard('Boss Fight', [{level: {$gte: 5}, health: {$gt: 30}}]);

const hand = d.draw(3);
```

### After (v1.5.0+ — Quis)

```javascript
import State from 'simple-qbn/State';
import Card from 'simple-qbn/Card';
import Deck from 'simple-qbn/Deck';

const d = new Deck();
d.state.set('health', 80);
d.state.set('hasKey', false);
d.state.set('level', 3);

// Quis string expressions
d.addCard('Heal', ['$health < 50']);
d.addCard('Open Door', ['$hasKey == true']);
d.addCard('Boss Fight', ['$level >= 5 && $health > 30']);

const hand = d.draw(3);
```

## Quick Reference: Mingo Operators → Quis

| Mingo Operator | Quis Equivalent |
|---|---|
| `$gt` | `>` |
| `$gte` | `>=` |
| `$lt` | `<` |
| `$lte` | `<=` |
| `$eq` | `==` |
| `$ne` | `!=` |
| `$and` / implicit | `&&` |
| `$or` | `\|\|` |
| `$not` | `!()` |

For full Quis syntax documentation, see the [Quis package](https://github.com/videlais/quis).
