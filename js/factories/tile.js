define([
  'underscore',
  'backbone',
  'scrabble',
], function (_, Backbone, Scrabble) {

  Scrabble.TileFactory = Backbone.Model.extend(_, {
    create: function(context) {
      context = context || {};

      return new Scrabble.Tile({
        x: context.x || 0,
        y: context.y || 0
      });
    }
  });

  return Scrabble.TileFactory;
});
