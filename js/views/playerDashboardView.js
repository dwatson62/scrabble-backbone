var Scrabble = Scrabble || {};

Scrabble.PlayerDashboardView = Backbone.View.extend({
  el: '#player-dashboard',

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
    this.$el.find('#player-letters').append(letterView.render().el);
    this.letterViews[letter.uid] = letterView;
  },

  letterView: function(uid) {
    return this.letterViews[uid];
  },

  letterModel: function(uid) {
    return this.letterView(uid).model;
  },

  letterClicked: function(event) {
    this.unselectAll();
    var uid = event.currentTarget.dataset.uid;

    if (this.letterModel(uid) === this.player.selectedLetter) {
      this.putDownLetter();
    } else {
      var letterView = this.letterView(uid);
      this.letterView(uid).selectLetter();
      this.pickUpLetter(letterView);
    }
  },

  unselectAll: function() {
    this.$el.find('.player-letter').removeClass('selected');
  },

  pickUpLetter: function(letterView) {
    this.player.pickUpLetter(letterView);
  },

  putDownLetter: function() {
    this.player.putDownLetter();
  }
});
