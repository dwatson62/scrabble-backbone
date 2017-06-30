var Scrabble = Scrabble || {};

Scrabble.LetterFactory = Backbone.Model.extend(_, {
  create: function(context) {
    context = context || {};

    return new Scrabble.Letter({
      bonusMultiplier: context.bonusMultiplier,
      points: context.points || 1,
      tileNumber: context.tileNumber || 112,
      value: context.value || 'a'
    });
  }
});
