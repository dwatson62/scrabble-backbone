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
    this.selectedLetter.choose();
  },

  putDownLetter: function(tileId) {
    this.selectedLetter.place(tileId);
    this.selectedLetter = undefined;
  },

  replaceLetter: function() {
    this.selectedLetter.unselect();
    this.selectedLetter = undefined;
  }
});
