var Scrabble = Scrabble || {};

Scrabble.PlayedWords = Backbone.Collection.extend({
  sort_key: 'value',

  comparator: function(word) {
    return word.get(this.sort_key);
  }
});
