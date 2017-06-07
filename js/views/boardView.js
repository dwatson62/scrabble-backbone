var Scrabble = Scrabble || {};

Scrabble.BoardView = Backbone.View.extend({
  el: '#scrabble-board',

  events: {
    'click .board-tile.empty.highlight': 'emptyTileClicked'
  },

  initialize: function(context) {
    this.boardTilesCollection = context.boardTiles;
    this.placedLettersCollection = context.placedLettersCollection;
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

  currentPlayer: function() {
    return this.players[0];
  },

  emptyTileClicked: function(event) {
    var letter = this.currentPlayer().selectedLetter;

    if (letter) {
      var tileId = event.currentTarget.dataset.tileId;
      this.boardTilesCollection.fetchTile(tileId).receiveLetter(letter)
      this.currentPlayer().putDownLetter(tileId);
      this.placedLettersCollection.add(letter);
      this.highlightAllTiles();
    }
  },

  highlightUsedTiles: function() {
    var self = this;
    _.each(this.placedLettersCollection.models, function(tile) {
      self.boardTilesCollection.findAndHighlight(tile);
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
    this.boardTilesCollection.highlightAllPlacedTiles();
  },

  showAllNeighbourTiles: function() {
    var self = this;
    _.each(this.boardTilesCollection.allPlacedTiles(), function(tile) {
      var tileId = tile.get('tileId');
      self.boardTilesCollection.showHorizontalAndVertical(tileId);
    });
  },

  showHorizontalAndVertical: function() {
    var firstTileId = this.placedLettersCollection.firstTileId();
    this.boardTilesCollection.showHorizontalAndVertical(firstTileId);
  },

  showNextAvailableTiles: function() {
    var firstTileId = this.placedLettersCollection.firstTileId();
    var lastTileId = this.placedLettersCollection.lastTileId();
    var direction = this.placedLettersCollection.determineDirection();

    this.boardTilesCollection.showNextAvailableTiles(direction, firstTileId, lastTileId);
  },

  highlightCentreTile: function() {
    this.boardTilesCollection.highlightCentreTile();
  },

  highlightAllTiles: function() {
    this.boardTilesCollection.highlightAllTiles();
  },

  unhighlightAllTiles: function() {
    this.boardTilesCollection.unhighlightAllTiles();
  },

  _nothingPlayed: function() {
    return this.playedWordsView.playedWordsCollection.length === 0 &&
      this.placedLettersCollection.length === 0;
  }
});
