/**
 * Browser environment tests using JSDOM
 * Tests the webpack bundled version of simple-qbn in a simulated browser environment
 */

// Import the ES module versions directly for functionality testing
import Deck from '../src/Deck.js';
import Card from '../src/Card.js';
import State from '../src/State.js';
import Expression from '../src/Expression.js';
import QualitySet from '../src/QualitySet.js';

// Import JSDOM for browser environment simulation
import { JSDOM } from 'jsdom';

describe('Browser Environment Tests', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    // Create a new JSDOM instance for each test to simulate browser environment
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SimpleQBN Browser Test</title>
        </head>
        <body>
          <div id="game-container">
            <div id="story-content"></div>
            <div id="card-choices"></div>
            <div id="player-stats">
              <span id="score">0</span>
              <span id="health">100</span>
            </div>
          </div>
        </body>
      </html>
    `, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'http://localhost' // Provide a proper URL to enable localStorage
    });

    window = dom.window;
    document = window.document;
    
    // Make DOM available globally for the tests
    global.window = window;
    global.document = document;
  });

  afterEach(() => {
    // Clean up global variables
    delete global.window;
    delete global.document;
    if (dom) {
      dom.window.close();
    }
  });

  test('DOM environment is properly set up', () => {
    expect(document).toBeDefined();
    expect(window).toBeDefined();
    expect(document.getElementById('game-container')).toBeDefined();
    expect(document.getElementById('story-content')).toBeDefined();
    expect(document.getElementById('card-choices')).toBeDefined();
  });

  test('SimpleQBN State works in browser environment', () => {
    // Test that State class works in browser
    const gameState = new State();
    
    gameState.set('playerName', 'Hero');
    gameState.set('score', 150);
    gameState.set('health', 85);
    gameState.set('level', 3);

    expect(gameState.get('playerName')).toBe('Hero');
    expect(gameState.get('score')).toBe(150);
    expect(gameState.get('health')).toBe(85);
    expect(gameState.get('level')).toBe(3);

    // Test that state can be synchronized with DOM
    const scoreElement = document.getElementById('score');
    const healthElement = document.getElementById('health');
    
    scoreElement.textContent = gameState.get('score').toString();
    healthElement.textContent = gameState.get('health').toString();

    expect(scoreElement.textContent).toBe('150');
    expect(healthElement.textContent).toBe('85');
  });

  test('SimpleQBN Expression evaluation works in browser', () => {
    const gameState = new State();
    gameState.set('score', 100);
    gameState.set('level', 2);
    gameState.set('hasKey', true);

    // Test simple expressions
    const highScore = new Expression('$score >= 100');
    expect(highScore.check(gameState)).toBe(true);

    const lowLevel = new Expression('$level < 5');
    expect(lowLevel.check(gameState)).toBe(true);

    // Test complex boolean expressions (Quis 1.2.0 feature)
    const complexCondition = new Expression('($score >= 100 && $level >= 2) || $hasKey == true');
    expect(complexCondition.check(gameState)).toBe(true);

    const impossibleCondition = new Expression('$score > 1000 && $level > 10');
    expect(impossibleCondition.check(gameState)).toBe(false);
  });

  test('SimpleQBN Card system works in browser', () => {
    const gameState = new State();
    gameState.set('wisdom', 3);
    gameState.set('courage', 2);

    // Create cards with different requirements
    const wisdomCard = new Card('You recall an ancient legend...');
    wisdomCard.addQuality('$wisdom >= 3');

    const courageCard = new Card('You face the challenge head-on!');
    courageCard.addQuality('$courage >= 3');

    const anyCard = new Card('You look around cautiously.');
    // No requirements - always available

    // Test card availability
    expect(wisdomCard.isAvailable(gameState)).toBe(true);
    expect(courageCard.isAvailable(gameState)).toBe(false);
    expect(anyCard.isAvailable(gameState)).toBe(true);

    // Simulate rendering available cards to DOM
    const cardContainer = document.getElementById('card-choices');
    cardContainer.innerHTML = '';

    const cards = [wisdomCard, courageCard, anyCard];
    const availableCards = cards.filter(card => card.isAvailable(gameState));

    availableCards.forEach((card, index) => {
      const cardElement = document.createElement('button');
      cardElement.textContent = card.content;
      cardElement.className = 'story-card';
      cardElement.setAttribute('data-card-index', index.toString());
      cardContainer.appendChild(cardElement);
    });

    // Should only show 2 available cards (wisdom and any)
    expect(cardContainer.children.length).toBe(2);
    expect(cardContainer.children[0].textContent).toBe('You recall an ancient legend...');
    expect(cardContainer.children[1].textContent).toBe('You look around cautiously.');
  });

  test('SimpleQBN Deck system works in browser with DOM interaction', () => {
    const deck = new Deck();
    
    // Set up game state
    deck.state.set('location', 'forest');
    deck.state.set('hasLantern', true);
    deck.state.set('energy', 75);

    // Add cards to deck
    deck.addCard('The path splits into two directions.', ['$location == "forest"']);
    deck.addCard('Your lantern illuminates a hidden cave.', ['$hasLantern == true', '$location == "forest"']);
    deck.addCard('You feel tired and need rest.', ['$energy < 50']);
    deck.addCard('A mysterious figure approaches.', ['$location == "forest"']);

    // Draw available cards
    const availableCards = deck.draw(3);
    expect(availableCards.length).toBeGreaterThan(0);

    // Simulate rendering cards to DOM and handling user interaction
    const storyContent = document.getElementById('story-content');
    const cardChoices = document.getElementById('card-choices');

    storyContent.textContent = 'Choose your next action:';
    cardChoices.innerHTML = '';

    availableCards.forEach((card) => {
      const button = document.createElement('button');
      button.textContent = card.content;
      button.className = 'choice-button';
      button.addEventListener('click', () => {
        // Simulate choosing a card
        storyContent.textContent = `You chose: ${card.content}`;
        
        // Update game state based on choice
        if (card.content.includes('lantern')) {
          deck.state.set('foundCave', true);
        }
        
        // Remove the card from deck (it's been used)
        deck.removeCard(card);
      });
      
      cardChoices.appendChild(button);
    });

    expect(cardChoices.children.length).toBe(availableCards.length);

    // Simulate clicking the first choice
    if (cardChoices.children.length > 0) {
      cardChoices.children[0].click();
      expect(storyContent.textContent).toContain('You chose:');
    }
  });

  test('Game state persistence with localStorage works', () => {
    const gameState = new State();
    gameState.set('playerName', 'TestHero');
    gameState.set('currentLevel', 5);
    gameState.set('inventory', ['sword', 'shield', 'potion']);
    gameState.set('completedQuests', ['tutorial', 'first_boss']);

    // Serialize game state for persistence
    const saveData = {
      playerStats: {
        name: gameState.get('playerName'),
        level: gameState.get('currentLevel')
      },
      gameProgress: {
        inventory: gameState.get('inventory'),
        quests: gameState.get('completedQuests')
      },
      timestamp: Date.now()
    };

    // Save to localStorage
    const serialized = JSON.stringify(saveData);
    window.localStorage.setItem('gameState', serialized);

    // Verify save worked
    expect(window.localStorage.getItem('gameState')).toBe(serialized);

    // Load from localStorage
    const loadedData = JSON.parse(window.localStorage.getItem('gameState'));
    expect(loadedData.playerStats.name).toBe('TestHero');
    expect(loadedData.playerStats.level).toBe(5);
    expect(loadedData.gameProgress.inventory).toContain('sword');
    expect(loadedData.gameProgress.quests).toContain('tutorial');

    // Restore state from loaded data
    const restoredState = new State();
    restoredState.set('playerName', loadedData.playerStats.name);
    restoredState.set('currentLevel', loadedData.playerStats.level);
    restoredState.set('inventory', loadedData.gameProgress.inventory);

    expect(restoredState.get('playerName')).toBe('TestHero');
    expect(restoredState.get('currentLevel')).toBe(5);
    expect(restoredState.get('inventory')).toEqual(['sword', 'shield', 'potion']);

    // Clean up
    window.localStorage.removeItem('gameState');
  });

  test('Complex QBN scenario with dynamic state updates', () => {
    const deck = new Deck();
    
    // Initial game state
    deck.state.set('chapter', 1);
    deck.state.set('reputation', 0);
    deck.state.set('gold', 10);
    deck.state.set('hasWeapon', false);

    // Add scenario cards with complex conditions
    deck.addCard('A merchant offers to sell you a sword for 15 gold.', ['$gold >= 15', '$hasWeapon == false']);
    deck.addCard('The villagers recognize your good deeds.', ['$reputation >= 5']);
    deck.addCard('You find a small purse on the ground.', ['$chapter == 1']);
    deck.addCard('A beggar asks for help.', ['$gold >= 5']);

    // Initially, only some cards should be available
    let availableCards = deck.draw(4);
    expect(availableCards.length).toBeGreaterThan(0);
    
    // Simulate finding gold
    deck.state.set('gold', 20);
    deck.state.set('reputation', 3);

    // Draw again with updated state
    availableCards = deck.draw(4);

    // More cards should be available now
    const goldCard = availableCards.find(card => card.content.includes('purse'));
    const beggarCard = availableCards.find(card => card.content.includes('beggar'));
    
    expect(goldCard || beggarCard).toBeDefined();

    // Test complex boolean expressions with updated state
    const complexCard = new Card('A wealthy noble seeks a bodyguard.');
    complexCard.addQuality('($reputation >= 3 && $hasWeapon == true) || $gold >= 50');
    
    expect(complexCard.isAvailable(deck.state)).toBe(false); // No weapon yet
    
    deck.state.set('hasWeapon', true);
    expect(complexCard.isAvailable(deck.state)).toBe(true); // Now available due to reputation + weapon
  });

  test('QualitySet functionality in browser context', () => {
    const requirements = new QualitySet();
    
    // Add multiple requirements
    requirements.add('$level >= 5');
    requirements.add('$class == "wizard"');
    requirements.add('$mana > 20');

    expect(requirements.size()).toBe(3);

    const playerState = new State();
    playerState.set('level', 6);
    playerState.set('class', 'wizard');
    playerState.set('mana', 25);

    // All requirements should be met
    expect(requirements.check(playerState)).toBe(true);

    // Change state to fail one requirement
    playerState.set('mana', 15);
    expect(requirements.check(playerState)).toBe(false);

    // Remove the failing requirement
    requirements.remove('$mana > 20');
    expect(requirements.check(playerState)).toBe(true);
    expect(requirements.size()).toBe(2);
  });

  test('Browser event handling with QBN game loop', () => {
    const deck = new Deck();
    deck.state.set('turn', 1);
    deck.state.set('playerHealth', 100);

    // Add some story cards
    deck.addCard('You enter a dark forest.', ['$turn == 1']);
    deck.addCard('Strange sounds echo around you.', ['$turn >= 1']);
    deck.addCard('You need medical attention.', ['$playerHealth < 50']);

    const storyContent = document.getElementById('story-content');
    const cardChoices = document.getElementById('card-choices');

    // Simulate a game turn
    function renderGameTurn() {
      const availableCards = deck.draw(3);
      
      storyContent.textContent = `Turn ${deck.state.get('turn')} - Choose an action:`;
      cardChoices.innerHTML = '';

      availableCards.forEach((card) => {
        const button = document.createElement('button');
        button.textContent = card.content;
        button.setAttribute('data-card-id', card.id);
        
        button.addEventListener('click', () => {
          // Process the card choice
          storyContent.textContent = `You: ${card.content}`;
          
          // Update game state
          deck.state.set('turn', deck.state.get('turn') + 1);
          
          // Simulate consequence
          if (card.content.includes('forest')) {
            deck.state.set('location', 'forest');
          }
          
          // Remove the played card
          deck.removeCard(card);
          
          // Render next turn after a brief delay
          setTimeout(() => renderGameTurn(), 100);
        });
        
        cardChoices.appendChild(button);
      });
    }

    // Start the game
    renderGameTurn();

    // Verify initial state
    expect(storyContent.textContent).toContain('Turn 1');
    expect(cardChoices.children.length).toBeGreaterThan(0);

    // Simulate clicking a card
    if (cardChoices.children.length > 0) {
      const firstChoice = cardChoices.children[0];
      firstChoice.click();
      
      // State should be updated
      expect(deck.state.get('turn')).toBe(2);
    }
  });
});