var Scrabble = Scrabble || {};

Scrabble.BoardView = Backbone.View.extend({
  el: '#scrabble-board',

  events: {
    'click .board-tile.empty.highlight': 'emptyTileClicked'
  },

  initialize: function(context) {
    this.boardTilesCollection = context.boardTiles;
    this.placedLettersCollection = context.placedLetters;
    this.players = context.players;
    this.render();
  },

  render: function() {
    var self = this;
    _.each(self.boardTilesCollection.models, function(tile) {
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
    return this.boardTilesCollection.models.find(function(model) {
      return model.get('tileId') === tileId;
    });
  },

  currentPlayer: function() {
    return this.players[0];
  },

  emptyTileClicked: function(event) {
    var letter = this.currentPlayer().selectedLetter;

    if (letter) {
      var tileId = event.currentTarget.dataset.tileId;
      letter.place(tileId);
      this.placedLettersCollection.add(letter);
      this.tileModel(tileId).receiveLetter(letter)
      this.currentPlayer().putDownLetter();
      this.highlightAllTiles();
    }
  },

  highlightAvailableTiles: function() {
    this.boardTilesCollection.findWhere('centre').highlight();
  },

  highlightAllTiles: function() {
    _.each(this.boardTilesCollection.models, function(tile) {
      tile.highlight();
    });
  },

  unhighlightAllTiles: function() {
    _.each(this.boardTilesCollection.models, function(tile) {
      tile.unhighlight();
    });
  }
});
