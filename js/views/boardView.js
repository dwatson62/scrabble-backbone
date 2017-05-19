var Scrabble = Scrabble || {};

Scrabble.BoardView = Backbone.View.extend({
  el: '#scrabble-board',

  events: {
    'click .board-tile.empty': 'emptyTileClicked'
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
    var tileView = new Scrabble.TileView({
      el: $('#' + tileId),
      tileSrc: tile.tileSrc
    });
    this.tileViews[tileId] = tileView;
    this.$el.find('#' + tileId + ' img').prop('src', tile.tileSrc);
  },

  currentPlayer: function() {
    return this.players[0];
  },

  emptyTileClicked: function(event) {
    var letter = this.currentPlayer().selectedLetter;
    var id = event.currentTarget.dataset.tileId;
    var tileView = this.tileViews[id];

    if (letter) {
      letter.place();
      tileView.placeLetter(letter);
      this.currentPlayer().putDownLetter();
    }
  }
});
