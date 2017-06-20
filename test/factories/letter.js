var Scrabble = Scrabble || {};

Scrabble.LetterFactory = Backbone.Model.extend(_, {
  create: function(value) {
    return new Scrabble.Letter({
      points: 1,
      value: value
    });
  }
});
