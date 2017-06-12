var Scrabble = Scrabble || {};

Scrabble.PlayedWords = Backbone.Collection.extend({
  sort_key: 'value',

  initialize: function() {
    this.helper = new Scrabble.LetterHelper();
  },

  comparator: function(word) {
    return word.get(this.sort_key);
  },

  createWord: function(response) {
    var points = this.helper.calculatePoints(response[0].letters);
    var word = new Scrabble.Word({
      meaning: response[0].text,
      points: points,
      value: response[0].word
    });
    this.add(word);
    return word;
  }
});
