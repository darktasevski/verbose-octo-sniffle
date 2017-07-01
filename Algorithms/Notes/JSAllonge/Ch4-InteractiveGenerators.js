/**
 * Chapter 4, section 4: Interactive Generators
**/

// Modeling tic-tac-toe, using an array (with a stateless function)
// Stateless here means we encode each position of the board in some fashion, and then we build a dictionary from positions to move
// Example array:
[
  'o', 'x', 'o',
  'x', ' ', ' ',
  'o', ' ', ' '
]
// Use a POJO (plain old javascript object) to make a map from positions to move. Assuming best possible move!
// Using the `[]` notation for keys, as it allows any expression as a key:
var moveLookUpTable = {
  [[
    ' ', ' ', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' '
  ]]: 0,
  [[
    'o', 'x', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' '
  ]]: 6,
  [[
    'o', 'x', ' ',
    'x', ' ', ' ',
    'o', ' ', ' '
  ]]: 8
  // ...
}
// Turns into:
// {
//   "o,x, , , , , , , ": 6,
//   "o,x,x, , , ,o, , ": 3,
//   "o,x, ,x, , ,o, , ": 8,
// }

// To look up a move:
moveLookUpTable[[
  'o', 'x', ' ',
  ' ', ' ', ' ',
  'o', 'x', ' '
]]; // 3

// To represent a stateless function:
statelessNaughtsAndCrosses([
  'o', 'x', ' ',
  ' ', ' ', ' ',
  'o', 'x', ' '
]); // 3

// Representing tic-tac-toe as a stateful function!:
// 1. New game = call a function that returns a game function
// 2. Call game function repeatedly passing our moves, and get opponent's moves from it
// Build out of stateless function:
var statefulNaughtsAndCrosses = () => {
  const state = [
    ' ', ' ', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' '
  ];
  return (x = false) => {
    if (x) {
      if (state[x] === ' ') {
        state[x] = 'x';
      }
      else throw 'occupied!'
    }
    let o = moveLookUpTable[state];
    state[o] = 'o';
    return o;
  }
};
const aNaughtsAndCrossesGame = statefulNaughtsAndCrosses();
// Our opponent makes the first move:
aNaughtsAndCrossesGame(); // 0
// Then we move, and get its next move back:
aNaughtsAndCrossesGame(1); // 6
// Then we move again and get its next move back
aNaughtsAndCrossesGame(4); // 3

// Browser based, using decision tree instead of lookup table:
function browserNaughtsAndCrosses() {
  const x1 = parseInt(prompt('o plays 0, where does x play?'));
  switch (x1) {

    case 1:
      const x2 = parseInt(prompt('o plays 6, where doex x play?'));
      switch (x2) {
        case 2:
        case 4:
        case 5:
        case 7:
        case 8:
          alert('o plays 3');
          break;
        
        case 3:
          const x3 = parseInt(prompt('o plays 8, where does x play?'));
          // ...
      }
  }
}

// Interactive generators:
// Generator tic-tac-toe
function *generatorNaughtsAndCrosses() {
  const x1 = yield 0;
  switch(x1) {
    case 1:
      const x2 = yield 6;
      switch (x2) {
        case 2:
        case 4:
        case 5:
        case 7:
        case 8:
          yield 3;
          break;

        case 3:
          const x3 = yield 8;
          switch (x3) {
            case 2:
            case 5:
            case 7:
              yield 4;
              break;

            // ...
          }
      }
  }
}
// Get the first move by calling `.next()`, thereafter call `.next()` and pass in our moves. First `.next()` w/o any arguments to start generator:
aNaughtsAndCrossesGame.next().value; // 0
aNaughtsAndCrossesGame.next(1).value; // 6
aNaughtsAndCrossesGame.next(3).value; // 8
aNaughtsAndCrossesGame.next(7).value; // 4

// Generator function maintains state implicitly in its control flow, but returns an iterator that we call