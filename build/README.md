# SimpleQBN Web Builds

This folder contains two separate web builds for SimpleQBN, each targeting a different architecture. **These builds are incompatible and cannot be used together.**

## Build Files

### `simpleqbn.bundle.js` - Original Architecture
- **Size:** ~20.2 KB (minified)
- **Global Variable:** `SimpleQBN`
- **Classes Included:** `State`, `Card`, `Deck`, `Expression`, `QualitySet`
- **Usage Pattern:** Manual state passing, explicit availability checking

**Example Usage:**
```javascript
const gameState = new SimpleQBN.State();
const deck = new SimpleQBN.Deck();
const availableCards = deck.draw(gameState, 5); // Manual state passing
```

### `reactive-simpleqbn.bundle.js` - Reactive Architecture  
- **Size:** ~29.1 KB (minified)
- **Global Variable:** `ReactiveSimpleQBN`
- **Classes Included:** `ReactiveState`, `ReactiveCard`, `ReactiveDeck`, `ReactiveExpression`, `ReactiveQualitySet`
- **Usage Pattern:** Automatic updates, event-driven state management

**Example Usage:**
```javascript
const gameState = new ReactiveSimpleQBN.ReactiveState();
const deck = new ReactiveSimpleQBN.ReactiveDeck([], gameState);
deck.subscribe((availableCards) => {
  // Automatically triggered on state changes
});
```

## Architecture Compatibility

**⚠️ Important:** These two architectures are mutually exclusive:

- Original classes (`State`, `Card`, `Deck`) cannot work with reactive classes
- Reactive classes (`ReactiveState`, `ReactiveCard`, `ReactiveDeck`) cannot work with original classes  
- Choose **one** architecture for your entire application
- Do not include both bundle files in the same project

## Demo Files

- `demo-original.html` - Demonstrates the original architecture
- `demo-reactive.html` - Demonstrates the reactive architecture with live updates

## Build Commands

- `npm run build:original` - Build only the original architecture
- `npm run build:reactive` - Build only the reactive architecture  
- `npm run build:all` - Build both architectures
- `npm run build` - Build the combined development bundle (includes both, for module usage)

## When to Use Which Build

### Use Original Architecture (`simpleqbn.bundle.js`) When:
- Building simple, straightforward applications
- Need minimal bundle size and overhead
- Prefer explicit control over state management
- Integrating with existing non-reactive codebases

### Use Reactive Architecture (`reactive-simpleqbn.bundle.js`) When:
- Building dynamic, interactive applications
- Need real-time updates and synchronization
- Want automatic event-driven state management
- Prefer modern, declarative programming patterns