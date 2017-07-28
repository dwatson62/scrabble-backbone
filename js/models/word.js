define([
  'underscore',
  'backbone',
  'scrabble'
], function (_, Backbone, Scrabble) {

  Scrabble.Word = Backbone.Model.extend({
    defaults: {
      points: 0
    },

    initialize: function(context) {
      this.set('value', context.value);
      this.set('meaning', context.meaning);
      this.set('player', context.player);
    }
  });

  return Scrabble.Word;
});
