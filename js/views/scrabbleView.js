var Scrabble = Scrabble || {};

Scrabble.ScrabbleView = Backbone.View.extend({
  el: '#scrabble-app',

  events: {
    'click .cancel-btn': 'cancelButtonClicked',
    'click .player-letter.unselected': 'letterClicked',
    'click .player-letter.selected': 'selectedLetterClicked'
  },

  initialize: function(context) {
    this.context = context;
    this.boardView = this.context.boardView;
    this.playerDashboardView = this.context.playerDashboardView;
  },

  cancelButtonClicked: function() {
    var tiles = this.findAllPlacedTiles();
    _.each(tiles, function(tile) {
      tile.letter.unselect();
      tile.returnLetter();
    });
    this.boardView.highlightAllTiles();
  },

  findAllPlacedTiles: function() {
    return this.boardView.collection.filter(function(tile) {
      return tile.get('status') === 'placed';
    });
  },

  letterClicked: function(event) {
    this.boardView.unhighlightAllTiles();
    this.boardView.highlightAvailableTiles();
    this.playerDashboardView.letterClicked(event);
  },

  selectedLetterClicked: function(event) {
    this.boardView.highlightAllTiles();
    this.playerDashboardView.selectedLetterClicked(event);
  }
});
