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

  putDownLetter: function(tile) {
    this.selectedLetter.place(tile);
    this.selectedLetter = undefined;
  },

  replaceLetter: function() {
    this.selectedLetter = undefined;
  }
});
