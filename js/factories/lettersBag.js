define([
  'underscore',
  'backbone',
  'scrabble',
], function (_, Backbone, Scrabble) {

  Scrabble.LettersBagFactory = Scrabble.LettersBag.extend({
    initialize: function(collection) {
      collection = collection || [Scrabble.LetterFactory.create({ 'value': 'a' }),
                                  Scrabble.LetterFactory.create({ 'value': 'b' })];

      this.reset(collection);
    }
  });

  return Scrabble.LettersBagFactory;
});
