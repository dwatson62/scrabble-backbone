var Scrabble = Scrabble || {};

var tileHighlighter = {
  placedLetters: this.placedLettersCollection,
  tiles: this.boardTilesCollection,

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

  _nothingPlayed: function() {
    return _.every(this.boardTilesCollection.models, function(model) {
      return model.get('status') === 'empty';
    });
  }
};
