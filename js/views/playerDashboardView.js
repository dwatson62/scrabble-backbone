var Scrabble = Scrabble || {};

Scrabble.PlayerDashboardView = Backbone.View.extend({
  el: '#player-dashboard',

  events: {
    'click .player-letter.unselected': 'letterClicked'
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
    this.letterViews[letter.get('uid')] = letterView;
  },

  letterView: function(uid) {
    return this.letterViews[uid];
  },

  letterModel: function(uid) {
    return this.collection.find(function(model) {
      return model.get('uid') === parseInt(uid);
    });
  },

  letterClicked: function(event) {
    _.each(this.collection, function(letter) {
      if (letter.get('status') === 'selected') {
        letter.unselect();
      }
    });

    var uid = event.currentTarget.dataset.uid;

    if (this.letterModel(uid) === this.player.selectedLetter) {
      this.putDownLetter();
    } else {
      this.letterModel(uid).choose();
      var letterView = this.letterView(uid);
      this.pickUpLetter(letterView);
    }
  },

  pickUpLetter: function(letterView) {
    this.player.pickUpLetter(letterView);
  },

  putDownLetter: function() {
    this.player.putDownLetter();
  }
});
