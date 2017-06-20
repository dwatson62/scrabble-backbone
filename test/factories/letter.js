var Scrabble = Scrabble || {};

Scrabble.LetterFactory = Backbone.Model.extend(_, {
  create: function(context) {
    var context = context || {};

    return new Scrabble.Letter({
      points: context.points || 1,
      value: context.value || 'a'
    });
  }
});
