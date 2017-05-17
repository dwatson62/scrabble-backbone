var Scrabble = Scrabble || {};

_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

$(document).ready(function() {
  var scrabbleView = new Scrabble.ScrabbleView();

  var board = new Scrabble.BoardTiles();
  var boardView = new Scrabble.BoardView(board.models);

  var bag = new Scrabble.LettersBag();
  var firstSeven = bag.models.slice(0, 7);
  var playerLettersView = new Scrabble.PlayerLettersView(firstSeven);
});
