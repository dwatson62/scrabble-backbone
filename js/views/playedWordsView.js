var Scrabble = Scrabble || {};

Scrabble.PlayedWordsView = Backbone.View.extend({
  el: '#played-words-list',

  initialize: function(context) {
    this.collection = new Scrabble.PlayedWords();
    this.render();

    this.listenTo(Backbone, 'playedWords:addWord', function(response) {
      this.addWord(response);
    }, this);
  },

  addWord: function(response) {
    var newWord = this.collection.createWord(response);
    this.renderWord(newWord);
  },

  renderWord: function(newWord) {
    var wordView = new Scrabble.WordView({
      model: newWord
    });

    this.$el.append(wordView.render().el);
  }
});
