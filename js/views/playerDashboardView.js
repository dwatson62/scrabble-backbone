var Scrabble = Scrabble || {};
var letterSelection = letterSelection;

Scrabble.PlayerDashboardView = Backbone.View.extend({
  template: _.template($('#player-template').html()),

  events: {
    'click .play-word-btn': 'playWordButtonClicked',
    'click .cancel-btn': 'cancelButtonClicked',
    'click .switch-letter-btn': 'switchLetterButtonClicked',
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
    this.listenTo(this.model, 'change:active', this.render);
    this.listenTo(this.model, 'change:score', this.render);
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
    Backbone.trigger('board:playWordClicked');
  },

  cancelButtonClicked: function() {
    this.collection.resetAllStates();
    Backbone.trigger('board:cancelPlacedLetters');
  },

  switchLetterButtonClicked: function() {
    var selected = letterSelection.putdown();
    this.collection.remove(selected);
    this.replaceLetters(1);
    this.model.collection.nextPlayerTurn();

    Backbone.trigger('board:highlightAllTiles');
  },

  replaceLetters: function(letterCount) {
    if (this.model.get('active')) {
      var newLetters = this.bag.retrieve(letterCount);
      this.collection.replaceWithNewLetters(newLetters);
    }
  }
});
