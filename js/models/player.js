var Scrabble = Scrabble || {};

Scrabble.Player = Backbone.Model.extend({
  defaults: {
    'score': 0
  },

  initialize: function(name) {
    this.attributes.name = name;
    this.selectedLetter;
  }
});
