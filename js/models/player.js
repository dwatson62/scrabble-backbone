define([
  'underscore',
  'backbone',
  'scrabble',
], function (_, Backbone, Scrabble) {

  Scrabble.Player = Backbone.Model.extend({
    defaults: {
      'active': false,
      'score': 0
    },

    initialize: function(context) {
      this.set('name', context.name);
    },

    activate: function() {
      this.set('active', true);
    },

    deactivate: function() {
      this.set('active', false);
    },

    updateScore: function(points) {
      var currentPoints = this.get('score');
      this.set('score', currentPoints += points);
    }
  });

  return Scrabble.Player;
});
