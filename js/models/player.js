var Scrabble = Scrabble || {};

Scrabble.Player = Backbone.Model.extend({
  defaults: {
    'score': 0
  },

  initialize: function(name) {
    this.attributes.name = name;
    this.selectedLetter;
  },

  pickUpLetter: function(letterView) {
    this.selectedLetterView = letterView;
    this.selectedLetter = letterView.model;
  },

  putDownLetter: function() {
    this.selectedLetterView = undefined;
    this.selectedLetter = undefined;
  }
});
