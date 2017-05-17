var Scrabble = Scrabble || {};

Scrabble.PlayerLettersView = Backbone.View.extend({
  el: '#player-letters',

  events: {
    'click .player-letter': 'letterClicked'
  },

  initialize: function(letters) {
    this.collection = letters;
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
  },

  letterClicked: function(event) {
    this.$el.find('.player-letter').removeClass('selected');
    $(event.currentTarget).toggleClass('selected');
  }
});