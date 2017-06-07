var Scrabble = Scrabble || {};

Scrabble.BoardTiles = Backbone.Collection.extend({
  model: Scrabble.Tile,

  initialize: function() {
    this.models = this.createBoard();
    this.helper = new Scrabble.TileHelper();
    this.centreTile = this.findWhere({ tileId: 'tile_7_7' });
    this.direction = null
  },

  createBoard: function() {
    board = [];
    for (var x = 0; x < 15; x ++) {
      for (var y = 0; y < 15; y ++) {
        board.push(new Scrabble.Tile({ x: x, y: y }));
      }
    }
    return board;
  },

  fetchTile: function(tileId) {
    return this.findWhere({ tileId: tileId });
  },

  allPlacedTiles: function() {
    return this.where({ status: 'placed' });
  },

  returnAllPlacedTiles: function() {
    _.each(this.allPlacedTiles(), function(tile) {
      tile.letter.unselect();
      tile.returnLetter();
    });
  },

  highlightAllPlacedTiles: function() {
    return _.each(this.allPlacedTiles(), function(tile) {
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

  showNextAvailableTiles: function(direction, firstTileId, lastTileId) {
    if (direction === 'horizontal') {
      this.showHorizontalTiles(firstTileId, lastTileId);
    } else {
      this.showVerticalTiles(firstTileId, lastTileId);
    }
  },

  showAllNeighbourTiles: function() {
    var self = this;
    _.each(this.allPlacedTiles(), function(tile) {
      var tileId = tile.get('tileId');
      self.showHorizontalAndVertical(tileId);
    });
  },

  showHorizontalTiles: function(firstTileId, lastTileId) {
    var tileIds = [
      this._firstTileNotPlaced(firstTileId, 'oneTileToLeft'),
      this._firstTileNotPlaced(lastTileId, 'oneTileToRight')
    ];

    this.highlightTiles(tileIds);
  },

  showVerticalTiles: function(firstTileId, lastTileId) {
    var tileIds = [
      this._firstTileNotPlaced(firstTileId, 'oneTileAbove'),
      this._firstTileNotPlaced(lastTileId, 'oneTileBelow')
    ];

    this.highlightTiles(tileIds);
  },

  highlightTiles: function(tileIds) {
    var self = this;
    _.each(tileIds, function(id) {
      self.findWhere({ tileId: id }).highlight();
    });
  },

  showHorizontalAndVertical: function(firstTileId) {
    this.showHorizontalTiles(firstTileId, firstTileId);
    this.showVerticalTiles(firstTileId, firstTileId);
  },

  _firstTileNotPlaced: function(tileId, fn) {
    var tile = this.helper[fn](tileId);
    if (this.findWhere({ tileId: tile }).isPlaced()) {
      return this._firstTileNotPlaced(tile, fn);
    } else {
      return tile
    }
  }
});
