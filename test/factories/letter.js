var Scrabble = Scrabble || {};

Scrabble.LetterFactory = Backbone.Model.extend(_, {
  create: function(context) {
    context = context || {};

    return new Scrabble.Letter({
      points: context.points || 1,
      tileNumber: context.tileNumber || 112,
      tileId: context.tileId || 'tile_7_7',
      value: context.value || 'a'
    });
  }
});
