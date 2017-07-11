var Scrabble = Scrabble || {};

_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

$(document).ready(function() {
  var board = new Scrabble.BoardTiles();
  var bag = new Scrabble.LettersBag();
  var playedWordsView = new Scrabble.PlayedWordsView();
  var blankLetterView = new Scrabble.BlankLetterView();
  var invalidWordView = new Scrabble.InvalidWordView();

  var players = new Scrabble.Players([
    new Scrabble.Player('Daryl'),
    new Scrabble.Player('Brian')
  ]);

  players.each(function(player) {
    var playerLetters = new Scrabble.PlayerLetters();
    playerLetters.add(bag.retrieve(7));
    new Scrabble.PlayerDashboardView({
      el: $('#player-dashboard-' + this.indexOf(player)),
      bag: bag,
      collection: playerLetters,
      model: player
    });
  }, players);

  var boardView = new Scrabble.BoardView({
    boardTiles: board,
    placedLettersCollection: new Scrabble.PlacedLetters(),
    players: players
  });
});
