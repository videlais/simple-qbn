# SimpleQBN

[![npm version](https://img.shields.io/npm/v/simple-qbn.svg)](https://www.npmjs.com/package/simple-qbn)
[![CI](https://github.com/videlais/simple-qbn/actions/workflows/ci.yml/badge.svg)](https://github.com/videlais/simple-qbn/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/videlais/simple-qbn/branch/main/graph/badge.svg)](https://codecov.io/gh/videlais/simple-qbn)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/simple-qbn.svg)](https://nodejs.org)

*Because nothing about quality-based narratives is actually simple.*

SimpleQBN is a quality-based narrative (QBN) generic JavaScript library for use in browsers or Node.js-based projects. It provides state management and resolves expressions for checking openness (availability) based on states changes.

This project is based on another project [Quis](https://github.com/videlais/quis), which it uses to resolve expressions.

## Installation

### For Use in Your Project

```bash
npm install simple-qbn
```

### For Development

```bash
git clone https://github.com/videlais/simple-qbn.git
cd simple-qbn
npm install
```

## Usage

### As an NPM Package

```javascript
// Original architecture
import State from 'simple-qbn/State';
import Card from 'simple-qbn/Card';
import Deck from 'simple-qbn/Deck';

// Or reactive architecture
import ReactiveState from 'simple-qbn/reactive/State';
import ReactiveCard from 'simple-qbn/reactive/Card';
import ReactiveDeck from 'simple-qbn/reactive/Deck';
```

### In the Browser

Download the pre-built bundles from the `build/` directory:
- `simpleqbn.bundle.js` - Original architecture (~20KB minified)
- `reactive-simpleqbn.bundle.js` - Reactive architecture (~29KB minified)

```html
<!-- Original architecture -->
<script src="simpleqbn.bundle.js"></script>
<script>
  const state = new SimpleQBN.State();
  const deck = new SimpleQBN.Deck();
</script>

<!-- OR Reactive architecture -->
<script src="reactive-simpleqbn.bundle.js"></script>
<script>
  const state = new ReactiveSimpleQBN.ReactiveState();
  const deck = new ReactiveSimpleQBN.ReactiveDeck([], state);
</script>
```

## State and Reactive State

SimpleQBN provides two distinct architectures for managing game state:

* Manual, State-based, and;
* Automatic, Reactive State-based.

**These two systems are incompatible and cannot be mixed within the same application.**

### Original State Architecture

The original architecture uses the `State` class along with `Card`, `Deck`, `Expression`, and `QualitySet` classes. This architecture requires manual state passing and explicit availability checking.

**Key Classes:** `State`, `Card`, `Deck`, `Expression`, `QualitySet`

**Example:**

```javascript
import State from 'simple-qbn/State';
import Card from 'simple-qbn/Card';
import Deck from 'simple-qbn/Deck';

// Create game state
const gameState = new State();
gameState.set('health', 100);
gameState.set('hasKey', true);

// Create cards with quality requirements
const healingCard = new Card(
    'Drink a healing potion',
    ['$health < 80']);
const doorCard = new Card(
    'Open the locked door',
    ['$hasKey == true']);

// Create deck and add cards
const deck = new Deck();
deck.addCard(
    healingCard.content,
    healingCard.qualities);
deck.addCard(
    doorCard.content,
    doorCard.qualities);

// Check availability manually.
// Need to pass state each time.
const availableCards = deck.draw(gameState, 5);

console.log(`${availableCards.length} cards available`);
```

### Reactive Architecture

The reactive architecture uses `ReactiveState` with `ReactiveCard`, `ReactiveDeck`, `ReactiveExpression`, and `ReactiveQualitySet`. This architecture provides automatic updates and event-driven state management.

**Key Classes:** `ReactiveState`, `ReactiveCard`, `ReactiveDeck`, `ReactiveExpression`, `ReactiveQualitySet`

**Example:**

```javascript
import ReactiveState from 'simple-qbn/reactive/State';
import ReactiveCard from 'simple-qbn/reactive/Card';
import ReactiveDeck from 'simple-qbn/reactive/Deck';

// Create reactive game state.
const gameState = new ReactiveState();
gameState.set('health', 100);
gameState.set('hasKey', true);

// Create reactive cards.
const healingCard = new ReactiveCard(
    'Drink a healing potion',
    ['$health < 80']);
const doorCard = new ReactiveCard(
    'Open the locked door',
    ['$hasKey == true']);

// Create reactive deck and bind to state.
const deck = new ReactiveDeck(
    [healingCard, doorCard],
    gameState);

// Subscribe to automatic updates.
deck.subscribe((availableCards) => {
  console.log(`${availableCards.length} cards now available`);
});

// State changes trigger automatic updates.
gameState.set('health', 50);
```

### Architecture Compatibility

**Important:** The two architectures are mutually exclusive:

* **Original classes** (`Card`, `Deck`, etc.) work only with `State`
* **Reactive classes** (`ReactiveCard`, `ReactiveDeck`, etc.) work only with `ReactiveState`
* You cannot pass a `State` to reactive classes or a `ReactiveState` to original classes

**Choose one architecture for your entire application.**

## Expression Language

Starting with version 1.5.0, SimpleQBN uses [Quis](https://www.npmjs.com/package/quis) 1.3.6+ for expression evaluation with pure Quis syntax.

Previous versions used TinyQBN format and MongoDB query language compatibility, but as of 1.5.0, the library has been simplified to use only Quis string expressions to reduce dependencies and code size.

For full Quis expression syntax documentation, see the [Quis documentation](https://github.com/videlais/quis).

## Development

### Available Scripts

- `npm run build` - Build the main bundle
- `npm run build:all` - Build both original and reactive architecture bundles
- `npm run build:original` - Build only the original architecture bundle
- `npm run build:reactive` - Build only the reactive architecture bundle
- `npm test` - Run all tests with coverage
- `npm run test:browser` - Run browser environment tests
- `npm run test:node` - Run Node.js tests only
- `npm run lint` - Lint and fix source code
- `npm run docs` - Build documentation
- `npm run all` - Run complete build pipeline (compile, lint, test, build, docs)

### Testing

The project includes comprehensive test coverage (99.54%) with both Node.js and browser environment tests:

- **Unit Tests**: Test individual classes and their functionality
- **Browser Tests**: Simulate browser environment using JSDOM to test DOM interaction, localStorage, and browser-specific features
- **Reactive Tests**: Test reactive state management and automatic updates

### Requirements

- Node.js 18+ recommended
- npm 9+ or compatible package manager

### Project Structure

```
src/                    # Source TypeScript files
  ├── Card.ts
  ├── Deck.ts
  ├── Expression.ts
  ├── QualitySet.ts
  ├── State.ts
  └── reactive/         # Reactive architecture
test/                   # Test files
  ├── Browser.test.js   # Browser environment tests
  └── reactive/         # Reactive architecture tests
build/                  # Compiled bundles
dist/                   # TypeScript compilation output
docs/                   # Generated documentation
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

- [Code of Conduct](CONTRIBUTING.md#code-of-conduct)
- [Development Setup](CONTRIBUTING.md#development-setup)
- [Pull Request Process](CONTRIBUTING.md#pull-requests)

## Security

For security vulnerabilities, please see our [Security Policy](SECURITY.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this project.

## History and Documentation

Jekyll is used to create [a history and documentation of this project](https://videlais.github.io/simple-qbn/).
