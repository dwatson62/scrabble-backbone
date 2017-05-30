var Scrabble = Scrabble || {};

Scrabble.ScrabbleView = Backbone.View.extend({
  el: '#scrabble-app',

  events: {
    'click .cancel-btn': 'cancelButtonClicked',
    'click .player-letter.unselected': 'letterClicked',
    'click .player-letter.selected': 'selectedLetterClicked',
    'click .play-word-btn': 'playWordButtonClicked'
  },

  initialize: function(context) {
    this.context = context;
    this.boardView = this.context.boardView;
    this.playerDashboardView = this.context.playerDashboardView;
    this.playedWordsView = this.context.playedWordsView;
  },

  cancelButtonClicked: function() {
    var tiles = this.findAllPlacedTiles();
    _.each(tiles, function(tile) {
      tile.letter.unselect();
      tile.returnLetter();
    });
    this.clearPlacedLettersCollection();
    this.boardView.highlightAllTiles();
  },

  findAllPlacedTiles: function() {
    return this.boardView.boardTilesCollection.filter(function(tile) {
      return tile.get('status') === 'placed';
    });
  },

  clearPlacedLettersCollection: function() {
    this.boardView.placedLettersCollection.reset();
  },

  letterClicked: function(event) {
    this.boardView.unhighlightAllTiles();
    this.boardView.highlightUsedTiles();
    this.boardView.highlightAvailableTiles();
    this.playerDashboardView.letterClicked(event);
  },

  selectedLetterClicked: function(event) {
    this.boardView.highlightAllTiles();
    this.playerDashboardView.selectedLetterClicked(event);
  },

  playWordButtonClicked: function() {
    var word = this.boardView.placedLettersCollection.assembleWord();
    var config = { params: { 'word': word } };
    var self = this;

    $.get('/word', config)
      .done(function(response) {
        if (response.length === 0) {
          console.log(word + ' is not a word!');
        } else {
          self.playWord(response);
        }
      });
  },

  playWord: function(response) {
    var points = this.boardView.placedLettersCollection.calculatePoints();
    this.playedWordsView.playWord(response, points);
    this.boardView.placedLettersCollection.reset();
  }
});
