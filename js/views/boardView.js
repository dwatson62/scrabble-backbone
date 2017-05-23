var Scrabble = Scrabble || {};

Scrabble.BoardView = Backbone.View.extend({
  el: '#scrabble-board',

  events: {
    'click .board-tile.empty.highlight': 'emptyTileClicked'
  },

  initialize: function(context) {
    this.collection = context.boardTiles;
    this.players = context.players;
    this.render();
  },

  render: function() {
    var self = this;
    _.each(self.collection.models, function(tile) {
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
    return this.collection.models.find(function(model) {
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
      this.highlightAllTiles();
    }
  },

  highlightAvailableTiles: function() {
    this.collection.findWhere('centre').highlight();
  },

  highlightAllTiles: function() {
    _.each(this.collection.models, function(tile) {
      tile.highlight();
    });
  },

  unhighlightAllTiles: function() {
    _.each(this.collection.models, function(tile) {
      tile.unhighlight();
    });
  }
});
