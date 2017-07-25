var Scrabble = Scrabble || {};

Scrabble.LettersBagFactory = Scrabble.LettersBag.extend({
  initialize: function(collection) {
    collection = collection || [Scrabble.LetterFactory.create({ 'value': 'a' }),
                                Scrabble.LetterFactory.create({ 'value': 'b' })];

    this.reset(collection);
  }
});
