define([
  'underscore',
  'backbone',
  'scrabble',
], function (_, Backbone, Scrabble) {

  Scrabble.PlayerLetters = Backbone.Collection.extend({
    unselectAll: function() {
      _.each(this.where({ status: 'selected' }), function(letter) {
        letter.unselect();
      });
    },

    nothingPlaced: function() {
      return this.where({ status: 'placed'}).length === 0;
    },

    removeUsed: function() {
      this.remove(this.where({ status: 'placed' }));
    },

    resetAllStates: function() {
      _.each(this.models, function(letter) {
        letter.resetState();
      });
    },

    replaceWithNewLetters: function(newLetters) {
      this.removeUsed();
      this.add(newLetters);
    }
  });

  return Scrabble.PlayerLetters;
});
