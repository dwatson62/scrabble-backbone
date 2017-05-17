var Scrabble = Scrabble || {};

Scrabble.BoardTiles = Backbone.Collection.extend({
  model: Scrabble.Tile,

  initialize: function() {
    this.models = this.createBoard();
  },

  createBoard: function() {
    board = [];
    for (var x = 0; x < 15; x ++) {
      for (var y = 0; y < 15; y ++) {
        board.push(new Scrabble.Tile({ x: x, y: y }));
      }
    }
    return board;
  }
});
