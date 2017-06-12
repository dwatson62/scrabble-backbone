var Scrabble = Scrabble || {};

Scrabble.PlayedWordsView = Backbone.View.extend({
  el: '#played-words-list',

  initialize: function(context) {
    this.collection = new Scrabble.PlayedWords();
    this.render();

    this.listenTo(Backbone, 'playedWords:addWord', function(data) {
      this.addWord(data);
    }, this);
  },

  addWord: function(data) {
    var newWord = this.collection.createWord(data);
    this.renderWord(newWord);
  },

  renderWord: function(newWord) {
    var wordView = new Scrabble.WordView({
      model: newWord
    });

    this.$el.append(wordView.render().el);
  }
});
