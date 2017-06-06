var Scrabble = Scrabble || {};

Scrabble.BoardView = Backbone.View.extend({
  el: '#scrabble-board',

  events: {
    'click .board-tile.empty.highlight': 'emptyTileClicked'
  },

  initialize: function(context) {
    this.boardTilesCollection = context.boardTiles;
    this.placedLettersCollection = context.placedLetters;
    this.playedWordsView = context.playedWordsView;
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
    return this.boardTilesCollection.findWhere(function(model) {
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

  highlightUsedTiles: function() {
    var self = this;
    _.each(this.placedLettersCollection.models, function(tile) {
      self.boardTilesCollection.findWhere({ tileId: tile.get('tileId') }).highlight();
    });
  },

  highlightAvailableTiles: function() {
    this.highlightAllPlacedTiles();
    if (this._nothingPlayed()) {
      this.highlightCentreTile();
    } else if (this.placedLettersCollection.length === 0) {
      this.showAllNeighbourTiles();
    } else if (this.placedLettersCollection.length === 1) {
      this.showHorizontalAndVertical();
    } else {
      this.showNextAvailableTiles();
    }
  },

  highlightAllPlacedTiles: function() {
    _.each(this.boardTilesCollection.allPlacedTiles(), function(tile) {
      tile.highlight();
    });
  },

  showAllNeighbourTiles: function() {
    var self = this;
    _.each(this.boardTilesCollection.allPlacedTiles(), function(tile) {
      var tileId = tile.get('tileId');
      self.boardTilesCollection.showHorizontalAndVertical(tileId);
    });
  },

  showHorizontalAndVertical: function() {
    var firstTileId = this.placedLettersCollection.at(0).get('tileId');
    this.boardTilesCollection.showHorizontalAndVertical(firstTileId);
  },

  showNextAvailableTiles: function() {
    var firstTileId = this.placedLettersCollection.at(0).get('tileId');
    var lastTileId = this.placedLettersCollection.at(-1).get('tileId');
    var direction = this.placedLettersCollection.determineDirection();

    this.boardTilesCollection.showNextAvailableTiles(direction, firstTileId, lastTileId);
  },

  highlightCentreTile: function() {
    this.boardTilesCollection.centreTile.highlight();
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
  },

  _nothingPlayed: function() {
    return this.playedWordsView.playedWordsCollection.length === 0 &&
      this.placedLettersCollection.length === 0;
  }
});
