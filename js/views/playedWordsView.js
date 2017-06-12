var Scrabble = Scrabble || {};

Scrabble.PlayedWordsView = Backbone.View.extend({
  el: '#played-words-list',

  initialize: function(context) {
    this.collection = new Scrabble.PlayedWords();
    this.helper = new Scrabble.LetterHelper();
    this.render();
  },

  playWord: function(response) {
    var points = this.helper.calculatePoints(response.letters);

    var newWord = new Scrabble.Word({
      meaning: response[0].text,
      points: points,
      value: response[0].word
    });

    var wordView = new Scrabble.WordView({
      model: newWord
    });

    this.$el.append(wordView.render().el);

    this.collection.add(newWord);
  }
});
