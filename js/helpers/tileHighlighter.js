var Scrabble = Scrabble || {};

var tileHighlighter = {
  highlightAvailableTiles: function() {
    this.highlightAllPlacedAndConfirmedTiles();
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

  highlightAllPlacedAndConfirmedTiles: function() {
    this.boardTilesCollection.highlightAllPlacedTiles();
    this.boardTilesCollection.highlightAllConfirmedTiles();
  },

  showAllNeighbourTiles: function() {
    var self = this;
    _.each(this.boardTilesCollection.allConfirmedTiles(), function(tile) {
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
    return _.every(this.boardTilesCollection.models, function(model) {
      return model.get('status') === 'empty';
    });
  }
};
