# Browser Testing for SimpleQBN

This document explains the browser testing setup for SimpleQBN using Jest and JSDOM.

## Overview

The browser tests ensure that SimpleQBN functionality works correctly in web browser environments. The tests simulate DOM interactions, localStorage usage, and real-world game development scenarios.

## Test Setup

### Dependencies
- **jsdom**: Provides a DOM implementation for Node.js testing
- **jest**: Test runner with JSDOM integration
- All existing SimpleQBN classes imported directly as ES modules

### Configuration
- Jest configured with JSDOM environment for browser simulation
- localStorage enabled via proper JSDOM URL configuration
- DOM globals (`window`, `document`) made available to tests

## Test Coverage

The browser tests cover:

1. **DOM Environment Setup**
   - Proper DOM element creation and manipulation
   - Element querying and content updates

2. **SimpleQBN Core Functionality**
   - State management in browser context
   - Expression evaluation with Quis 1.2.0 complex boolean syntax
   - Card availability checking based on game state
   - Deck operations and card drawing

3. **Browser-Specific Features**
   - localStorage for game state persistence
   - DOM event handling (clicks, form submissions)
   - Dynamic content rendering

4. **Advanced Game Scenarios**
   - Complex QBN game flow with state updates
   - Interactive story progression
   - Real-time UI updates based on game state
   - Multi-turn game scenarios

5. **QualitySet Operations**
   - Expression requirement checking
   - Dynamic requirement modification
   - State validation against multiple criteria

## Test Scripts

### Available Commands

```bash
# Run all tests (including browser tests)
npm test

# Run only browser tests (verbose output)
npm run test:browser  

# Run only Node.js tests (excludes browser tests)
npm run test:node
```

### Test Structure

```javascript
// Browser tests import SimpleQBN modules directly
import Deck from '../src/Deck.js';
import Card from '../src/Card.js';
import State from '../src/State.js';
import Expression from '../src/Expression.js';
import QualitySet from '../src/QualitySet.js';
import { JSDOM } from 'jsdom';

// Each test creates a fresh JSDOM environment
beforeEach(() => {
  dom = new JSDOM(htmlTemplate, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost' // Enables localStorage
  });
});
```

## Real-World Usage Examples

The tests demonstrate several real-world patterns:

### Game State Management
```javascript
const gameState = new State();
gameState.set('playerName', 'Hero');
gameState.set('score', 150);

// Sync with DOM
document.getElementById('score').textContent = gameState.get('score');
```

### Interactive Story Cards
```javascript
const wisdomCard = new Card('You recall an ancient legend...');
wisdomCard.addQuality('$wisdom >= 3');

if (wisdomCard.isAvailable(gameState)) {
  // Render card as clickable button
  const button = document.createElement('button');
  button.textContent = card.content;
  button.addEventListener('click', () => handleCardChoice(card));
}
```

### Complex Game Logic
```javascript
// Using Quis 1.2.0 complex boolean expressions
const complexCondition = new Expression('($score >= 100 && $level >= 2) || $hasKey == true');
const isAvailable = complexCondition.check(gameState);
```

### Persistent Game State
```javascript
// Save game state to localStorage
const saveData = {
  playerStats: { name: gameState.get('playerName') },
  timestamp: Date.now()
};
localStorage.setItem('gameState', JSON.stringify(saveData));

// Load game state
const loadedData = JSON.parse(localStorage.getItem('gameState'));
```

## Demo Page

A demonstration HTML page (`demo.html`) shows how SimpleQBN would work in a real browser environment, including:
- Interactive story progression
- Dynamic UI updates
- Game state visualization
- User choice handling

## Benefits

This browser testing approach provides:

1. **Confidence**: Ensures SimpleQBN works in actual browser environments
2. **Integration Testing**: Tests DOM interactions and browser APIs
3. **Real-World Scenarios**: Validates common game development patterns
4. **Regression Prevention**: Catches browser-specific issues early
5. **Documentation**: Serves as usage examples for developers

## Test Results

All 9 browser tests pass, covering:
- ✓ DOM environment setup
- ✓ State management in browser
- ✓ Expression evaluation with complex boolean logic
- ✓ Card system with DOM rendering
- ✓ Deck operations with user interaction
- ✓ Game state persistence with localStorage
- ✓ Complex multi-turn game scenarios
- ✓ QualitySet requirement checking
- ✓ Event-driven game loop implementation

The tests maintain 100% code coverage while adding comprehensive browser environment validation.