define([
  'underscore',
  'backbone',
  'scrabble',
], function (_, Backbone, Scrabble) {

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
      var self = this;
      _.each(data, function(newWordData) {
        var newWord = self.collection.createWord(newWordData);
        self.renderWord(newWord);
      });
    },

    renderWord: function(newWord) {
      var wordView = new Scrabble.WordView({
        model: newWord
      });

      this.$el.prepend(wordView.render().el);
    }
  });

  return Scrabble.PlayedWordsView;
});
