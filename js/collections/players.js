define([
  'underscore',
  'backbone',
  'scrabble',
], function (_, Backbone, Scrabble) {

  Scrabble.Players = Backbone.Collection.extend({
    initialize: function(models, context) {
      this.reset(models);
      this.context = context;
      this._activateFirstPlayer();
    },

    currentPlayer: function() {
      return this.findWhere({ active: true });
    },

    nextPlayerTurn: function() {
      var nextPlayer = this.at(this._nextPlayerIndex());
      this.currentPlayer().deactivate();
      return nextPlayer.activate();
    },

    _activateFirstPlayer: function() {
      return _.first(this.models).activate();
    },

    _nextPlayerIndex: function() {
      var currentIndex = this.models.indexOf(this.currentPlayer());
      if (currentIndex === this.length - 1) {
        return 0;
      } else {
        return currentIndex + 1;
      }
    }
  });

  return Scrabble.Players;
});
