var Scrabble = Scrabble || {};

Scrabble.PlayerLetters = Backbone.Collection.extend({
  removeUsed: function() {
    this.remove(this.where({ status: 'placed' }));
  }
});
