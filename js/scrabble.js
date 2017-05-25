var Scrabble = Scrabble || {};

_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

$(document).ready(function() {
  var placedLetters = new Scrabble.PlacedLetters();
  var playedWords = new Scrabble.PlayedWords();
  var board = new Scrabble.BoardTiles();
  var bag = new Scrabble.LettersBag();

  var player = new Scrabble.Player('Daryl')

  var playerContext = {
    letters: bag.models.slice(0, 7),
    player: player
  };

  var boardContext = {
    players: [player],
    boardTiles: board,
    placedLetters: placedLetters
  }

  var boardView = new Scrabble.BoardView(boardContext);
  var playerDashboardView = new Scrabble.PlayerDashboardView(playerContext);

  var scrabbleView = new Scrabble.ScrabbleView({
    bag: bag,
    boardView: boardView,
    playerDashboardView: playerDashboardView,
    playedWordsCollection: playedWords
  });
});
