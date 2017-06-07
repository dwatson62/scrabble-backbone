var Scrabble = Scrabble || {};

_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

$(document).ready(function() {
  var placedLettersCollection = new Scrabble.PlacedLetters();
  var playedWords = new Scrabble.PlayedWords();
  var playedWordsView = new Scrabble.PlayedWordsView();

  var board = new Scrabble.BoardTiles();
  var bag = new Scrabble.LettersBag();
  var playerLetters = new Scrabble.PlayerLetters();
  playerLetters.add(bag.retrieve(7));

  var player = new Scrabble.Player('Daryl');

  var playerDashboardView = new Scrabble.PlayerDashboardView({
    collection: playerLetters,
    player: player
  });

  var boardView = new Scrabble.BoardView({
    players: [player],
    boardTiles: board,
    placedLettersCollection: placedLettersCollection,
    playedWordsView: playedWordsView
  });

  var scrabbleView = new Scrabble.ScrabbleView({
    bag: bag,
    boardView: boardView,
    playerDashboardView: playerDashboardView
  });
});
