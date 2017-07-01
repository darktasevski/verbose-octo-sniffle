class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on('click', 'li', (event => {
      const $cell = $(event.currentTarget);
      this.makeMove($cell);
    }));
  }

  makeMove($cell) {
    const currentPlayer = this.game.currentPlayer;
    const position = $cell.data('pos');

    try {
      this.game.playMove(position);
    } catch (e) {
      alert(`${e.msg}`);
      return;
    }

    $cell.addClass(currentPlayer);
    const winner = this.game.winner();
    const $figcaption = $('<figcaption>');

    if (this.game.isOver()) {

      this.$el.off('click');

      if (winner) {
        this.$el.addClass(`winner-${winner}`);
        $figcaption.html(`You win, ${winner}`);
      } else {
        $figcaption.html('It is a draw!');
      }
    }


    this.$el.append($figcaption);

  }

  setupBoard() {
    const $board = $("<ul>");
    $board.addClass("group");

    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        let $cell = $("<li>");
        $cell.data("pos", [rowIdx, colIdx]);
        // $.data($cell, 'pos', [rowIdx, colIdx]);
        $board.append($cell);
      }
    }

    this.$el.append($board);
  }
}
module.exports = View;
