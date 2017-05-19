var Scrabble = Scrabble || {};

Scrabble.BoardView = Backbone.View.extend({
  el: '#scrabble-board',

  events: {
    'click .board-tile.empty': 'emptyTileClicked'
  },

  initialize: function(context) {
    this.collection = context.boardTiles;
    this.players = context.players;
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

  tileModel: function(tileId) {
    return this.collection.find(function(model) {
      return model.get('tileId') === tileId;
    });
  },

  currentPlayer: function() {
    return this.players[0];
  },

  emptyTileClicked: function(event) {
    var letter = this.currentPlayer().selectedLetter;

    if (letter) {
      letter.place();
      var tileId = event.currentTarget.dataset.tileId;
      this.tileModel(tileId).receiveLetter(letter)
      this.currentPlayer().putDownLetter();
    }
  }
});
