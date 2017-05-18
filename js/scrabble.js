var Scrabble = Scrabble || {};

_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

$(document).ready(function() {
  var scrabbleView = new Scrabble.ScrabbleView();

  var board = new Scrabble.BoardTiles();
  var bag = new Scrabble.LettersBag();

  var player = new Scrabble.Player('Daryl')

  var playerContext = {
    letters: bag.models.slice(0, 7),
    player: player
  };

  var boardContext = {
    players: [player],
    boardTiles: board.models
  }

  var boardView = new Scrabble.BoardView(boardContext);
  var playerLettersView = new Scrabble.PlayerLettersView(playerContext);
});
