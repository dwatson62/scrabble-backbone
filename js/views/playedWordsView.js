var Scrabble = Scrabble || {};

Scrabble.PlayedWordsView = Backbone.View.extend({
  el: '#played-words-list',

  events: {},

  initialize: function(context) {
    this.playedWordsCollection = new Scrabble.PlayedWords();
    this.render();
  },

  playWord: function(placedLetters) {
    var newWord = new Scrabble.Word({
      points: placedLetters.calculateScore(),
      value: placedLetters.assembleWord()
    });

    var wordView = new Scrabble.WordView({
      model: newWord
    });

    this.$el.append(wordView.render().el);

    this.playedWordsCollection.add(newWord);
    console.log(this.playedWordsCollection);
  }
});
