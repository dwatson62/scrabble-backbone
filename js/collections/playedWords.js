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
    var player = data[0].player;
    var word = new Scrabble.Word({
      meaning: data[0].text,
      player: player.get('name'),
      points: points,
      value: data[0].word
    });
    this.add(word);
    player.updateScore(points);

    return word;
  }
});
