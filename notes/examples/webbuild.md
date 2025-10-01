# Bundled for Web

The `build` folder contains the file `simpleqbn.bundle.js`. This is a build for use in browsers where the `window` global object exists. It binds all major classes (**Deck**, **Card**, **QualitySet**, **Expression**, and **State**) to `window` such that they can be created by their name.

For testing purposes, GitCDN.link can be used to pull the build from GitHub like in the following example:

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
            // Create a new Deck
            const d = new Deck();
            
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
