---
layout: page
title: Expressions and QualitySet
permalink: /expressions
---

# Expressions and QualitySet

## Qualities as Expressions

While both the [sculptural](./sculpturalmodel.md) and [QBN](./qbn.md) models define their own terms of how sections of a story might become available (constraints and qualities, respectively), neither explain how to *express* these.

### Grams Format

Working with the story format SugarCube in Twine 2, the library TinyQBN by Grams (2019) solves this issue through using the tags of passages. Based on the requirements of not containing spaces, Grams (2019) introduced a shorthand for writing qualities using hyphens between the operators (what is being compared) and the operation (how to compare values): `operator-operation-operator`.

This format created an easy way to include prerequisites in Twine using tags in passages, but comes with some issues:

* *Operators have to be converted into and out of String values*. Tags in Twine 2 are stored as the values of attributes within [its HTML](https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md). These tags are assumed to be String values. Any use of other primative data types in JavaScript such as Numbers and Booleans must be converted out of their String representation.
* *Only one comparison can be used at a time*. Complex comparisons are not possible in the format because of its internal parsing. Additional tags can be added, but each is only one comparison between a single variable and value.

### Working with Quis Expression Language

Starting with version 1.4, SimpleQBN began to use the MongoDB Query Language for expressions. As of version 1.4.2, SimpleQBN started using the [Quis](https://www.npmjs.com/package/quis) NPM package. **As of version 1.5.0, SimpleQBN exclusively uses Quis syntax for all expressions**, removing MongoDB query language support to reduce dependencies and code size.

Quis expressions support:

* Comparison operators: `==`, `!=`, `>`, `>=`, `<`, `<=`  
* Boolean operators: `&&` (AND), `||` (OR), `!` (NOT)
* Parentheses for grouping: `($health > 50 && $level >= 5) || $emergency == true`
* Variable access: `$variableName` for simple values

Examples:

* Simple: `$health > 50`
* Complex: `$user_role == "admin" && $user_active == true`
* Grouped: `($score >= 80 || $bonus_points > 10) && $attempts <= 3`

For full Quis syntax documentation, see the [Quis documentation](https://github.com/videlais/quis).

## Expression Class API

The **Expression** class wraps a single Quis expression string and evaluates it against a **State**.

| Method / Property | Description |
|---|---|
| `Expression(expression)` | Constructor — accepts a Quis expression string. |
| `expression` | Read-only getter — returns the internal expression string. |
| `change(s)` | Replaces the internal expression with a new string. |
| `check(state)` | Evaluates the expression against a **State**; returns `boolean`. |

```javascript
import Expression from 'simple-qbn/Expression';
import State from 'simple-qbn/State';

const expr = new Expression('$health > 50');
const s = new State();
s.set('health', 80);

expr.check(s);       // true
expr.expression;     // '$health > 50'
expr.change('$health < 30');
expr.check(s);       // false
```

## QualitySet Class API

A **QualitySet** is an ordered collection of **Expression** objects. A quality set is valid when *all* of its expressions are valid (logical AND).

| Method | Description |
|---|---|
| `QualitySet()` | Constructor — creates an empty set. |
| `add(expression)` | Adds a Quis expression string (no duplicates). |
| `has(s)` | Returns `true` if the expression string is already in the set. |
| `remove(s)` | Removes an expression string from the set. |
| `check(state)` | Returns `true` if **every** expression is valid against the given **State**. |
| `size()` | Returns the number of expressions in the set. |

```javascript
import QualitySet from 'simple-qbn/QualitySet';
import State from 'simple-qbn/State';

const qs = new QualitySet();
qs.add('$level >= 5');
qs.add('$hasKey == true');

const s = new State();
s.set('level', 10);
s.set('hasKey', true);

qs.check(s);   // true
qs.size();     // 2
qs.has('$level >= 5');  // true
qs.remove('$hasKey == true');
qs.size();     // 1
```

---

## Reactive Expression and Reactive QualitySet

The reactive architecture provides **ReactiveExpression** and **ReactiveQualitySet**, which automatically re-evaluate when the bound **ReactiveState** changes.

### ReactiveExpression API

| Method / Property | Description |
|---|---|
| `ReactiveExpression(expression, state?)` | Constructor — Quis string and optional `ReactiveState`. |
| `expressionString` | Read-only getter — the internal expression string. |
| `result` | Getter — current evaluation result (requires bound state). |
| `check(state)` | Evaluates against a given `ReactiveState`. |
| `change(newExpression)` | Replaces the expression and notifies listeners. |
| `subscribe(listener)` | Subscribes to result changes; returns unsubscribe function. |
| `bindToState(state)` | Binds to a `ReactiveState`. |
| `unbind()` | Unbinds from the current state. |
| `dispose()` | Cleans up all subscriptions and listeners. |
| `listenerCount()` | Number of active listeners. |
| `clearListeners()` | Removes all listeners. |

```javascript
import ReactiveExpression from 'simple-qbn/reactive/Expression';
import ReactiveState from 'simple-qbn/reactive/State';

const state = new ReactiveState();
state.set('score', 10);

const expr = new ReactiveExpression('$score > 50', state);
expr.result;  // false

expr.subscribe((result) => {
  console.log('Expression is now:', result);
});

state.set('score', 75);  // logs: "Expression is now: true"

expr.dispose();  // clean up when done
```

### ReactiveQualitySet API

| Method / Property | Description |
|---|---|
| `ReactiveQualitySet(state?)` | Constructor — optional `ReactiveState`. |
| `result` | Getter — `true` if all expressions pass (requires bound state). |
| `add(expression)` | Adds a Quis expression string. |
| `has(s)` | Returns `true` if expression exists in the set. |
| `remove(s)` | Removes an expression and disposes it. |
| `check(state)` | Evaluates all expressions against a given `ReactiveState`. |
| `size()` | Number of expressions in the set. |
| `subscribe(listener)` | Subscribes to result changes; returns unsubscribe function. |
| `bindToState(state)` | Binds to a `ReactiveState`. |
| `unbind()` | Unbinds from the current state. |
| `dispose()` | Cleans up all internal expressions, subscriptions, and listeners. |
| `listenerCount()` | Number of active listeners. |
| `clearListeners()` | Removes all listeners. |

### Historical: Previous use of Mingo (MongoDB Query Support)

> **Note**: MongoDB query language support was removed in version 1.5.0. This section is preserved for historical reference only. Current versions use only Quis syntax.

In versions 1.4.0 through 1.4.x, SimpleQBN supported MongoDB query language through the Mingo library.

For example, an **Expression** to test if the **State** value *score* was greater than 15 would be written as the following:

```JavaScript
{score: {$gt: 15}}
```

The use of the MongoDB query language also introduces much more complex queries as well. To test if the **State** value *score* was greater than 15, **State** value *act1* was `true`, and **State** value *reputation* was less than `3.5`, it would be the following:

```JavaScript
{score: {$gt: 15}, act1: true, reputation: {$lt: 3.5}}
```

## References

Grams, J. (2019). Tiny-QBN. GitHub. Retrieved from `https://github.com/JoshuaGrams/tiny-qbn`
