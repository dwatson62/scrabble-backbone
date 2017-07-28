define([
  'underscore',
  'backbone',
  'scrabble',
  'tileHelper'
], function (_, Backbone, Scrabble, tileHelper) {

  Scrabble.PlacedLetters = Backbone.Collection.extend({
    comparator: 'tileNumber',

    oppositeDirections: {
      'vertical': 'horizontal',
      'horizontal': 'vertical'
    },

    initialize: function() {
      this.on('add', this.determineDirection);
    },

    firstTileNumber: function() {
      return this.first().get('tileNumber');
    },

    lastTileNumber: function() {
      return _.last(this.models).get('tileNumber');
    },

    nextPlacedTileNumber: function(current) {
      var currentIndex = this._currentIndex(current);

      if (currentIndex === this.fetchPlaced().length - 1) {
        return;
      } else {
        return this.fetchPlaced()[currentIndex + 1].get('tileNumber');
      }
    },

    fetchPlaced: function() {
      return this.where({ status: 'placed' });
    },

    valueWithBonus: function() {
      return _.map(this.models, function(letter) {
        return { value: letter.get('value'), bonus: letter.get('bonusMultiplier') };
      });
    },

    oppositeDirection: function() {
      return this.oppositeDirections[this.direction];
    },

    determineDirection: function() {
      if (this.length === 2) {
        var tileNumbers = this.pluck('tileNumber');
        if ((tileNumbers[0] + 1) === tileNumbers[1]) {
          this.direction = 'horizontal';
        } else {
          this.direction = 'vertical';
        }
      }
    },

    assembleWord: function() {
      return this.pluck('value').join('');
    },

    pluckPlacedValues: function() {
      return _.map(this.fetchPlaced(), function(letter) {
        return letter.get('value');
      });
    },

    confirmAndClear: function() {
      _.each(this.models, function(model) {
        model.confirm();
      });
      this.reset();
    },

    resetStateAndClear: function() {
      _.each(this.models, function(model) {
        model.resetState();
      });
      this.reset();
    },

    _currentIndex: function(current) {
      return _.map(this.fetchPlaced(), function(model) {
        return model.get('tileNumber');
      }).indexOf(current);
    }
  });

  return Scrabble.PlacedLetters;
});
