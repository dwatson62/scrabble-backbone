var Scrabble = Scrabble || {};

Scrabble.BoardView = Backbone.View.extend({
  el: '#scrabble-board',
  events: {},

  initialize: function(board) {
    this.collection = board;
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
    var tileView = new Scrabble.TileView({});
    this.tileViews[tile.coords] = tileView;
    this.$el.find('#tile_' + tile.tileId + ' img').prop('src', tile.tileSrc);
  }
});
