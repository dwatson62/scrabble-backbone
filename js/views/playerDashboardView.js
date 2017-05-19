var Scrabble = Scrabble || {};

Scrabble.PlayerDashboardView = Backbone.View.extend({
  el: '#player-dashboard',

  events: {
    'click .player-letter.unselected': 'letterClicked',
    'click .player-letter.selected': 'selectedLetterClicked'
  },

  initialize: function(context) {
    this.collection = context.letters;
    this.player = context.player;
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
    var letter = this.letterModel(uid);
    letter.choose();
    this.player.pickUpLetter(letter);
  },

  selectedLetterClicked: function(event) {
    var uid = event.currentTarget.dataset.uid;
    var letter = this.letterModel(uid);

    if (letter === this.player.selectedLetter) {
      letter.unselect();
      this.player.putDownLetter();
    }
  }
});
