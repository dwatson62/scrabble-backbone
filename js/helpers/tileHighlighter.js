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
      var tileNumber = tile.get('tileNumber');
      self.boardTilesCollection.showHorizontalAndVertical(tileNumber);
    });
  },

  showHorizontalAndVertical: function() {
    var firstTileNumber = this.placedLettersCollection.firstTileNumber();
    this.boardTilesCollection.showHorizontalAndVertical(firstTileNumber);
  },

  showNextAvailableTiles: function() {
    var firstTileNumber = this.placedLettersCollection.firstTileNumber();
    var lastTileNumber = this.placedLettersCollection.lastTileNumber();
    var direction = this.placedLettersCollection.direction;

    this.boardTilesCollection.showNextAvailableTiles(direction, firstTileNumber, lastTileNumber);
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
