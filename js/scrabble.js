var Scrabble = Scrabble || {};

_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

$(document).ready(function() {
  var placedLetters = new Scrabble.PlacedLetters();
  var playedWords = new Scrabble.PlayedWords();
  var board = new Scrabble.BoardTiles();
  var bag = new Scrabble.LettersBag();
  var playerLetters = new Scrabble.PlayerLetters();
  playerLetters.add(bag.retrieve(7))

  var player = new Scrabble.Player('Daryl')

  var playerContext = {
    collection: playerLetters,
    player: player
  };

  var boardContext = {
    players: [player],
    boardTiles: board,
    placedLetters: placedLetters
  }

  var boardView = new Scrabble.BoardView(boardContext);
  var playerDashboardView = new Scrabble.PlayerDashboardView(playerContext);
  var playedWordsView = new Scrabble.PlayedWordsView();

  var scrabbleView = new Scrabble.ScrabbleView({
    bag: bag,
    boardView: boardView,
    playerDashboardView: playerDashboardView,
    playedWordsView: playedWordsView
  });
});
