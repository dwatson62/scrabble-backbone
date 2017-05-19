var Scrabble = Scrabble || {};

Scrabble.ScrabbleView = Backbone.View.extend({
  el: '#scrabble-app',
  events: {
    'click .cancel-btn': 'cancelButtonClicked'
  },

  initialize: function(context) {
    this.context = context;
  },

  cancelButtonClicked: function() {
    var tiles = this.findAllPlacedTiles();
    _.each(tiles, function(tile) {
      tile.letter.unselect();
      tile.replaceTile();
    });
  },

  findAllPlacedTiles: function() {
    return this.context.boardView.collection.filter(function(tile) {
      return tile.get('status') === 'placed';
    });
  }
});
