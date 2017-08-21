const View = require('./ttt-view')
const Game = require('../../TTT\ node\ solution/game');

$( () => {
  const rootEl = $('.ttt');
  const game = new Game();
  new View(game, rootEl);
});
