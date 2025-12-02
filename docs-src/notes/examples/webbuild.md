---
layout: page
title: Bundled for Web
permalink: /examples/webbuild
---

# Bundled for Web

The `build` folder contains two web builds for use in browsers where the `window` global object exists:

- **`simpleqbn.bundle.js`**: Contains the original State-based classes (State, Card, Deck, Expression, QualitySet)
- **`reactive-simpleqbn.bundle.js`**: Contains the reactive architecture classes (ReactiveState, ReactiveCard, etc.)

Both builds expose their classes under the `window.SimpleQBN` namespace for browser usage.

## Using the Original Architecture Build

For testing purposes, GitCDN.link can be used to pull the original build from GitHub like in the following example:

```html
<html>
    <head>
        <title>SimpleQBN Testing</title>
        <script src="https://gitcdn.link/repo/videlais/simple-qbn/v1.5.0/build/simpleqbn.bundle.js"></script>
    </head>
    <body>
        <div id="log">(Draw a card!)</div>
        <button id="loadCard">Draw a random card!</button>
        <script>
            // Create a new Deck using the SimpleQBN namespace
            const d = new SimpleQBN.Deck();
            
            // Create 52 new cards
            for(let i = 0; i < 52; i++) {
                // Add a new card
                // (For its content convert the index to a String.)
                d.addCard( i.toString() );
            }
         
            // Find the (only) button element
            const button = document.querySelector('button');

            // Add an event listener to the click event
            button.addEventListener('click', function() {
                // Shuffle cards
                d.shuffle();

                // Get an array of 1 cards
                const hand = d.draw(1);

                // Find the element with the 
                const el = document.querySelector('#log');

                // Change its innerHTML
                el.innerHTML = `Card: ${hand[0].content} `;
            });
        </script>
    </body>
</html>
```

## Using the Reactive Architecture Build

The reactive build provides automatic updates and event-driven state management. Here's the same example using reactive classes:

```html
<html>
    <head>
        <title>SimpleQBN Reactive Testing</title>
        <script src="https://gitcdn.link/repo/videlais/simple-qbn/v1.5.0/build/reactive-simpleqbn.bundle.js"></script>
    </head>
    <body>
        <div id="log">(Draw a card!)</div>
        <button id="loadCard">Draw a random card!</button>
        <script>
            // Create a reactive state and deck
            const gameState = new SimpleQBN.ReactiveState();
            const d = new SimpleQBN.ReactiveDeck([], gameState);
            
            // Create 52 new cards
            for(let i = 0; i < 52; i++) {
                // Add a new card with no conditions (always available)
                // (For its content convert the index to a String.)
                const card = new SimpleQBN.ReactiveCard(i.toString(), []);
                d.addCard(card);
            }

            // Subscribe to deck changes for automatic updates
            d.subscribe((availableCards) => {
                console.log(`${availableCards.length} cards available`);
            });
         
            // Find the (only) button element
            const button = document.querySelector('button');

            // Add an event listener to the click event
            button.addEventListener('click', function() {
                // Shuffle cards (automatically notifies subscribers)
                d.shuffle();

                // Draw a random available card
                const drawnCard = d.draw();

                // Find the element with the 
                const el = document.querySelector('#log');

                // Change its innerHTML
                if (drawnCard) {
                    el.innerHTML = `Card: ${drawnCard.content}`;
                } else {
                    el.innerHTML = 'No cards available!';
                }
            });
        </script>
    </body>
</html>
```

## Build Compatibility

> **Important**: The two builds are incompatible with each other. Do not mix original State-based classes with reactive classes in the same project. Choose one architecture based on your needs:
>
> - **Original Build**: Use when you need simple, direct control and don't require automatic updates
> - **Reactive Build**: Use when you want automatic state synchronization and event-driven updates
