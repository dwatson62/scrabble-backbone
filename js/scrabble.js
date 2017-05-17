var Scrabble = Scrabble || {};

_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

$(document).ready(function() {
  var scrabbleView = new Scrabble.ScrabbleView();

  var board = new Scrabble.BoardTiles();
  var boardView = new Scrabble.BoardView(board.models);

  var bag = new Scrabble.LettersBag();

  var player_context = {
    letters: bag.models.slice(0, 7),
    player: new Scrabble.Player('Daryl')
  };

  var playerLettersView = new Scrabble.PlayerLettersView(player_context);
});
