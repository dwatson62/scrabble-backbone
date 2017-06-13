var Scrabble = Scrabble || {};

Scrabble.Player = Backbone.Model.extend({
  defaults: {
    'active': false,
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
  },

  activate: function() {
    this.set('active', true);
  },

  deactivate: function() {
    this.set('active', false);
  }
});
