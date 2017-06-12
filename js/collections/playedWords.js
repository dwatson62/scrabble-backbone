var Scrabble = Scrabble || {};

Scrabble.PlayedWords = Backbone.Collection.extend({
  sort_key: 'value',

  initialize: function() {
    this.helper = new Scrabble.LetterHelper();
  },

  comparator: function(word) {
    return word.get(this.sort_key);
  },

  createWord: function(data) {
    var points = this.helper.calculatePoints(data[0].placedLetters);
    var word = new Scrabble.Word({
      meaning: data[0].text,
      points: points,
      value: data[0].word
    });
    this.add(word);
    return word;
  }
});
