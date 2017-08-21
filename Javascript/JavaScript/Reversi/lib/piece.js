// jshint esversion: 6


/**
 * Initializes the Piece with its color.
 */
function Piece (color) {
  this.color = color;
}

/**
 * Returns the color opposite the current piece.
 */
Piece.prototype.oppColor = function () {
  return (this.color === "white") ? "black" : "white";

};

/**
 * Changes the piece's colore to the opposite color.
 */
Piece.prototype.flip = function () {
  this.color = this.oppColor();

};

/**
 * Returns a string representation of the string
 * based on its color.
 */
Piece.prototype.toString = function () {
 return (this.color === "white") ? 'W' : 'B';
};

module.exports = Piece;
