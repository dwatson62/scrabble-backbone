var Scrabble = Scrabble || {};

Scrabble.PlayedWordsView = Backbone.View.extend({
  el: '#played-words-list',

  events: {},

  initialize: function(context) {
    this.playedWordsCollection = new Scrabble.PlayedWords();
    this.render();
  },

  playWord: function(response, points) {
    var newWord = new Scrabble.Word({
      meaning: response[0].text,
      points: points,
      value: response[0].word
    });

    var wordView = new Scrabble.WordView({
      model: newWord
    });

    this.$el.append(wordView.render().el);

    this.playedWordsCollection.add(newWord);
  }
});
