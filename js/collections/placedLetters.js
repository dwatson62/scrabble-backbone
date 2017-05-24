var Scrabble = Scrabble || {};

Scrabble.PlacedLetters = Backbone.Collection.extend({
  sort_key: 'tileId',

  comparator: function(letter) {
    return letter.get(this.sort_key);
  },

  initialize: function() {}
});
