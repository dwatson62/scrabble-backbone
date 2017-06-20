var Scrabble = Scrabble || {};

Scrabble.TileFactory = Backbone.Model.extend(_, {
  create: function(context) {
    var context = context || {};

    return new Scrabble.Tile({
      x: context.x || 0,
      y: context.y || 0
    });
  }
});
