Front End
==

## Airbnb

- Create an autocomplete widget - Given an input and an endpoint which returns a JSON list, as a result, extend it to autocomplete on change, handle key navigation through the results
- Star rating widget - Given a star widget embedded in a form write the code to select the stars and submit the correct value through a normal form action. Make reusable for multiple star widgets.

## Facebook

- Write an emitter class:
  - `emitter = new Emitter();`
  - Support subscribing to events: `sub = emitter.subscribe('event_name', callback); sub2 = emitter.subscribe('event_name', callback2);`
  - Support emitting events. This particular example should lead to the `callback` above being invoked with `foo` and `bar` as parameters: `emitter.emit('event_name', foo, bar);`
  - Support unsubscribing existing subscriptions by releasing them: `sub.release();`. `sub` is the reference returned by `subscribe` above.
- Given 2 identical DOM trees (but not equal) and one element of the first DOM tree, how would you find this element in the second DOM tree?
  - https://kuzzmi.com/blog/searching-for-a-symmetric-node
- Come up with HTML and CSS code given a picture.
  - Given a picture, how would you hide/show a child picture on hovering on this parent?
  - How would you ensure clicking on this picture would go to a specific link?
  - How would you ensure the child is positioned in the top right of the parent picture?
- If you were building a search tool and wanted search results to pop up as you typed but the server call was taxing, write a function that gets called on every key down but calls the server when the user stops typing for 400ms.
- How many times would `document.addEventListener('scroll', handleScroll);` run as the user looks at their News Feed? And what would be user experience if the `handleScroll` function takes 100ms to execute. How could you implement debouncing? Say you wanted the `handleScroll` function to be called only after 200ms has passed between scroll events.
- Pretty print JSON object.

## Google

- Write a function to find the nearest link on a webpage given the mouse x,y coordinates. If your algorithm just iterates through all the links, give an idea of how to make it faster.
