var Scrabble = Scrabble || {};

Scrabble.BoardView = Backbone.View.extend({
  el: '#scrabble-board',
  events: {
    'click .board-tile': 'tileClicked'
  },

  initialize: function(context) {
    this.collection = context.boardTiles;
    this.players = context.players;
    this.tileViews = {};
    this.render();
  },

  render: function() {
    var self = this;
    _.each(self.collection, function(tile) {
      self.renderTile(tile);
    });
    return this;
  },

  renderTile: function(tile) {
    var tileId = 'tile_' + tile.tileId;
    var tileView = new Scrabble.TileView({ el: $('#' + tileId) });
    this.tileViews[tileId] = tileView;
    this.$el.find('#' + tileId + ' img').prop('src', tile.tileSrc);
  },

  currentPlayer: function() {
    return this.players[0];
  },

  tileClicked: function(event) {
    var letter = this.currentPlayer().selectedLetter;
    if (letter) {
      var id = event.currentTarget.dataset.tileId;
      this.tileViews[id].placeLetter(letter);
    }
  }
});
