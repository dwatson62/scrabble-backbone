var Scrabble = Scrabble || {};

Scrabble.BoardTiles = Backbone.Collection.extend({
  model: Scrabble.Tile,

  initialize: function() {
    this.models = this.createBoard();
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

  showNextAvailableTiles: function(direction, firstTileId, lastTileId) {
    if (direction === 'horizontal') {
      this.showHorizontalTiles(firstTileId, lastTileId);
    } else {
      this.showVerticalTiles(firstTileId, lastTileId);
    }
  },

  showHorizontalTiles: function(firstTileId, lastTileId) {
    var tileIds = [
      this.oneTileToLeft(firstTileId),
      this.oneTileToRight(lastTileId)
    ];

    this.highlightTiles(tileIds);
  },

  showVerticalTiles: function(firstTileId, lastTileId) {
    var tileIds = [
      this.oneTileAbove(firstTileId),
      this.oneTileBelow(lastTileId)
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

  oneTileBelow: function(tileId) {
    var splitId = tileId.split('_');
    splitId[1] = String(parseInt(splitId[1]) + 1);
    return splitId.join('_');
  },

  oneTileAbove: function(tileId) {
    var splitId = tileId.split('_');
    splitId[1] = String(parseInt(splitId[1]) - 1);
    return splitId.join('_');
  },

  oneTileToLeft: function(tileId) {
    var splitId = tileId.split('_');
    splitId[2] = String(parseInt(splitId[2]) - 1);
    return splitId.join('_');
  },

  oneTileToRight: function(tileId) {
    var splitId = tileId.split('_');
    splitId[2] = String(parseInt(splitId[2]) + 1);
    return splitId.join('_');
  }
});
