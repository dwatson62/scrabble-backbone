define([
  'underscore',
  'backbone',
  'scrabble',
], function (_, Backbone, Scrabble) {

  Scrabble.PlayedWords = Backbone.Collection.extend({
    sort_key: 'value',

    initialize: function() {
      this.helper = letterHelper;
    },

    comparator: function(word) {
      return word.get(this.sort_key);
    },

    createWord: function(data) {
      var points = this.helper.calculatePoints(data.placedLetters);
      var player = data.player;
      var word = new Scrabble.Word({
        meaning: data.text,
        player: player.get('name'),
        points: points,
        value: data.word
      });
      this.add(word);
      player.updateScore(points);

      return word;
    }
  });

  return Scrabble.PlayedWords;
});
