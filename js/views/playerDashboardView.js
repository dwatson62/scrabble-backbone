var Scrabble = Scrabble || {};

Scrabble.PlayerDashboardView = Backbone.View.extend({
  el: '#player-dashboard',

  events: {
    'click .cancel-btn': 'cancelButtonClicked'
  },

  initialize: function(context) {
    this.collection = context.collection;
    this.player = context.player;
    this.render();

    this.collection.bind('add', this.renderLetter, this);
  },

  render: function() {
    var self = this;
    _.each(self.collection.models, function(letter) {
      self.renderLetter(letter);
    });
    return this;
  },

  renderLetter: function(letter) {
    var letterView = new Scrabble.LetterView({
      model: letter
    });
    this.$el.find('#player-letters').append(letterView.render().el);
  },

  cancelButtonClicked: function() {
    Backbone.trigger('board:cancelPlacedLetters');
  },

  letterClicked: function(event) {
    this.collection.unselectAll();

    var uid = event.currentTarget.dataset.uid;
    var letter = this.collection.fetchLetter(uid);
    this.player.pickUpLetter(letter);
  },

  selectedLetterClicked: function(event) {
    var uid = event.currentTarget.dataset.uid;
    var letter = this.collection.fetchLetter(uid);

    if (letter === this.player.selectedLetter) {
      this.player.replaceLetter();
    }
  }
});
