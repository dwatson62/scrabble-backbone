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
    var domId = '#' + tile.get('tileId');
    var tileView = new Scrabble.TileView({
      el: $(domId),
      model: tile
    });
    this.$el.find(domId).append(tileView.render().el);
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
      tile.receiveLetter(letter)
      tileView.placeLetter(letter);
      this.currentPlayer().putDownLetter();
    }
  }
});
