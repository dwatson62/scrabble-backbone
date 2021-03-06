define([
  'scrabble',
  'lettersBag',
], function (Scrabble, LettersBag) {

  Scrabble.LettersBagFactory = LettersBag.extend({
    initialize: function(collection) {
      collection = collection || [Scrabble.LetterFactory.create({ 'value': 'a' }),
                                  Scrabble.LetterFactory.create({ 'value': 'b' })];

      this.reset(collection);
    }
  });

  return Scrabble.LettersBagFactory;
});
