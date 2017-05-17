var Scrabble = Scrabble || {};

Scrabble.Letter = Backbone.Model.extend({
  initialize: function(value) {
    this.value = value;
  }
});
