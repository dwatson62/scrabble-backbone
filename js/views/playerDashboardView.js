var Scrabble = Scrabble || {};

Scrabble.PlayerDashboardView = Backbone.View.extend({
  template: _.template($('#player-template').html()),

  events: {
    'click .play-word-btn': 'playWordButtonClicked',
    'click .cancel-btn': 'cancelButtonClicked'
  },

  initialize: function(context) {
    this.bag = context.bag;
    this.collection = context.collection;
    this.model = context.model;
    this.render();

    this.collection.bind('add', this.renderLetter, this);
    this.listenTo(Backbone, 'playerDashboard:replaceLetters', function(letterCount) {
      this.replaceLetters(letterCount);
    }, this);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));

    _.each(this.collection.models, function(letter) {
      this.renderLetter(letter);
    }, this);
    return this;
  },

  renderLetter: function(letter) {
    var letterView = new Scrabble.LetterView({
      model: letter,
      player: this.model
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
