var Scrabble = Scrabble || {};

Scrabble.BoardTiles = Backbone.Collection
  .extend(tileHelper)
  .extend({

  initialize: function() {
    this.reset(this.createBoard());
    this.centreTile = this.findWhere({ tileNumber: 112 });
  },

  createBoard: function() {
    var board = [];
    for (var x = 0; x < 15; x ++) {
      for (var y = 0; y < 15; y ++) {
        board.push(new Scrabble.Tile({
          x: x,
          y: y
        }));
      }
    }
    return board;
  },

  fetchTile: function(tileNumber) {
    return this.findWhere({ tileNumber: tileNumber });
  },

  fetchLetter: function(tileId) {
    return this.fetchTile(tileId).letter;
  },

  allPlacedTiles: function() {
    return this.where({ status: 'placed' });
  },

  allConfirmedTiles: function() {
    return this.where({ status: 'confirmed' });
  },

  returnAllPlacedTiles: function() {
    _.each(this.allPlacedTiles(), function(tile) {
      tile.letter.unselect();
      tile.returnLetter();
    });
  },

  confirmAllPlacedTiles: function() {
    _.each(this.allPlacedTiles(), function(tile) {
      tile.confirm();
    });
  },

  highlightAllPlacedTiles: function() {
    return _.each(this.allPlacedTiles(), function(tile) {
      tile.highlight();
    });
  },

  highlightAllConfirmedTiles: function() {
    return _.each(this.allConfirmedTiles(), function(tile) {
      tile.highlight();
    });
  },

  findAndHighlight: function(tile) {
    this.findWhere({ tileId: tile.get('tileId') }).highlight();
  },

  highlightCentreTile: function() {
    this.centreTile.highlight();
  },

  highlightAllTiles: function() {
    _.each(this.models, function(tile) {
      tile.highlight();
    });
  },

  unhighlightAllTiles: function() {
    _.each(this.models, function(tile) {
      tile.unhighlight();
    });
  },

  showNextAvailableTiles: function(direction, firstTile, lastTile) {
    if (direction === 'horizontal') {
      this.showHorizontalTiles(firstTile, lastTile);
    } else {
      this.showVerticalTiles(firstTile, lastTile);
    }
  },

  showAllNeighbourTiles: function() {
    var self = this;
    _.each(this.allPlacedTiles(), function(tile) {
      var tileNumber = tile.get('tileNumber');
      self.showHorizontalAndVertical(tileNumber);
    });
  },

  showHorizontalTiles: function(firstTile, lastTile) {
    var tileIds = [
      this._firstAvailableTile(firstTile, 'oneTileToLeft'),
      this._firstAvailableTile(lastTile, 'oneTileToRight')
    ];

    this.highlightTiles(tileIds);
  },

  showVerticalTiles: function(firstTile, lastTile) {
    var tileIds = [
      this._firstAvailableTile(firstTile, 'oneTileAbove'),
      this._firstAvailableTile(lastTile, 'oneTileBelow')
    ];

    this.highlightTiles(tileIds);
  },

  highlightTiles: function(tileNumbers) {
    var self = this;
    _.each(tileNumbers, function(tileNumber) {
      self.findWhere({ tileNumber: tileNumber }).highlight();
    });
  },

  showHorizontalAndVertical: function(firstTile) {
    var leftTile = this._firstAvailableTile(firstTile, 'oneTileToLeft');
    var rightTile = this._firstAvailableTile(firstTile, 'oneTileToRight');
    var aboveTile = this._firstAvailableTile(firstTile, 'oneTileAbove');
    var belowTile = this._firstAvailableTile(firstTile, 'oneTileBelow');

    this.highlightTiles([leftTile, rightTile, aboveTile, belowTile]);
  },

  allSurroundingLetters: function(tileNumber, direction) {
    var surroundingTileNumbers = this._allSurroundingTiles(tileNumber, direction);
    return this._mapTileIdsToLetter(surroundingTileNumbers);
  },

  _mapTileIdsToLetter: function(surroundingTileNumbers) {
    return _.map(surroundingTileNumbers, function(tile) {
      return this.fetchLetter(tile);
    }, this);
  },

  _allSurroundingTiles: function(tileId, direction) {
    var setOne;
    var setTwo;

    if (direction === 'horizontal') {
      setOne = this._yieldHorizontally(tileId);
    } else if (direction === 'vertical') {
      setOne = this._yieldVertically(tileId);
    } else {
      setOne = this._yieldHorizontally(tileId);
      setTwo = this._yieldVertically(tileId);
    }

    return _.flatten(_.union([tileId], setOne, setTwo));
  },

  _firstAvailableTile: function(tileNumber, fn) {
    var tile = this[fn](tileNumber);
    if (this.findWhere({ tileNumber: tile }).isUnavailable()) {
      return this._firstAvailableTile(tile, fn);
    } else {
      return tile;
    }
  },

  _yieldHorizontally: function(tileId) {
    return [
      this._yieldLetter([], tileId, 'oneTileToLeft'),
      this._yieldLetter([], tileId, 'oneTileToRight')
    ];
  },

  _yieldVertically: function(tileId) {
    return [
      this._yieldLetter([], tileId, 'oneTileAbove'),
      this._yieldLetter([], tileId, 'oneTileBelow')
    ];
  },

  _yieldLetter: function(tiles, tileId, fn) {
    var nextTileId = this[fn](tileId);
    var nextTile = this.fetchTile(nextTileId);
    if (nextTile.isUnavailable()) {
      tiles.push(nextTileId);
      return this._yieldLetter(tiles, nextTileId, fn);
    } else {
      return tiles;
    }
  },
});
