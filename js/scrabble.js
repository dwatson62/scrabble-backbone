var Scrabble = Scrabble || {};

_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

var setupPlayer = function(name, bag) {
  var player = new Scrabble.Player(name);

  var playerLetters = new Scrabble.PlayerLetters();
  playerLetters.add(bag.retrieve(7));

  return new Scrabble.PlayerDashboardView({
    bag: bag,
    collection: playerLetters,
    model: player
  });
};

$(document).ready(function() {
  var board = new Scrabble.BoardTiles();
  var bag = new Scrabble.LettersBag();
  var playedWordsView = new Scrabble.PlayedWordsView();

  var players = new Scrabble.Players();
  players.add(setupPlayer('Daryl', bag).player);
  players.add(setupPlayer('Brian', bag).player);

  var boardView = new Scrabble.BoardView({
    boardTiles: board,
    placedLettersCollection: new Scrabble.PlacedLetters(),
    players: players
  });
});
