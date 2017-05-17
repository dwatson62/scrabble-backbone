var Scrabble = Scrabble || {};

Scrabble.PlayerLettersView = Backbone.View.extend({
  el: '#player-letters',

  events: {
    'click .player-letter': 'letterClicked'
  },

  initialize: function(context) {
    this.collection = context.letters;
    this.player = context.player;
    this.letterViews = {};
    this.render();
  },

  render: function() {
    var self = this;
    _.each(self.collection, function(letter) {
      self.renderLetter(letter);
    });
    return this;
  },

  renderLetter: function(letter) {
    var letterView = new Scrabble.LetterView({
      model: letter
    });
    this.$el.append(letterView.render().el);
    this.letterViews[letter.uid] = letterView;
  },

  letterView: function(uid) {
    return this.letterViews[uid];
  },

  letterClicked: function(event) {
    this.$el.find('.player-letter').removeClass('selected');

    var uid = event.currentTarget.dataset.uid;
    this.letterView(uid).toggleSelected();
  }
});
