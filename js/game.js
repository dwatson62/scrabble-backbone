define([
  'underscore', 'scrabble'
], function (_, Scrabble) {

  var Game = function() {
    this.bag = new Scrabble.LettersBag();
    this.blankLetterView = new Scrabble.BlankLetterView();
    this.boardTiles = new Scrabble.BoardTiles();
    this.invalidWordView = new Scrabble.InvalidWordView();
    this.placedLettersCollection = new Scrabble.PlacedLetters();
    this.playedWordsView = new Scrabble.PlayedWordsView();
  };

  Game.prototype.create = function() {
    var players = this._createPlayers();

    var self = this;
    players.each(function(player) {
      self._createPlayerDashboard(player, this.indexOf(player));
    }, players);

    this._createBoard(players);

    return this;
  };

  Game.prototype._assignLetters = function() {
    var playerLetters = new Scrabble.PlayerLetters();
    playerLetters.add(this.bag.retrieve(7));
    return playerLetters;
  };

  Game.prototype._createBoard = function(players) {
    return new Scrabble.BoardView({
      boardTiles: this.boardTiles,
      placedLettersCollection: this.placedLettersCollection,
      players: players
    });
  };

  Game.prototype._createPlayers = function() {
    return new Scrabble.Players([
      new Scrabble.Player({ name: 'Daryl' }),
      new Scrabble.Player({ name: 'Brian' })
    ]);
  };

  Game.prototype._createPlayerDashboard = function(player, index) {
    var playerLetters = this._assignLetters();

    return new Scrabble.PlayerDashboardView({
      el: $('#player-dashboard-' + index),
      bag: this.bag,
      collection: playerLetters,
      model: player
    });
  };

  return Game;
});
