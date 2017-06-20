var Scrabble = Scrabble || {};

Scrabble.Player = Backbone.Model.extend({
  defaults: {
    'active': false,
    'score': 0
  },

  initialize: function(name) {
    this.set('name', name);
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
