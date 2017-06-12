var Scrabble = Scrabble || {};

Scrabble.PlayerDashboardView = Backbone.View.extend({
  el: '#player-dashboard',

  events: {
    'click .play-word-btn': 'playWordButtonClicked',
    'click .cancel-btn': 'cancelButtonClicked'
  },

  initialize: function(context) {
    this.bag = context.bag;
    this.collection = context.collection;
    this.player = context.player;
    this.render();

    this.collection.bind('add', this.renderLetter, this);
    this.listenTo(Backbone, 'playerDashboard:replaceLetters', function(letterCount) {
      this.replaceLetters(letterCount);
    }, this);
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
      model: letter,
      player: this.player
    });
    this.$el.find('#player-letters').append(letterView.render().el);
  },

  playWordButtonClicked: function() {
    Backbone.trigger('board:playWord');
  },

  cancelButtonClicked: function() {
    this.collection.reset();
    Backbone.trigger('board:cancelPlacedLetters');
  },

  replaceLetters: function(letterCount) {
    var newLetters = this.bag.retrieve(letterCount);
    this.collection.replaceWithNewLetters(newLetters);
  }
});
