var Scrabble = Scrabble || {};

Scrabble.Word = Backbone.Model.extend({
  defaults: {
    points: 0
  },

  initialize: function(context) {
    this.set('value', context.value);
    this.set('meaning', context.meaning);
  }
});
