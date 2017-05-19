var Scrabble = Scrabble || {};

Scrabble.Player = Backbone.Model.extend({
  defaults: {
    'score': 0
  },

  initialize: function(name) {
    this.set('name', name);
  },

  pickUpLetter: function(letter) {
    this.selectedLetter = letter;
  },

  putDownLetter: function() {
    this.selectedLetter = undefined;
  }
});
