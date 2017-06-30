var Scrabble = Scrabble || {};

Scrabble.PlacedLetters = Backbone.Collection.extend({
  comparator: 'tileNumber',

  oppositeDirections: {
    'vertical': 'horizontal',
    'horizontal': 'vertical'
  },

  firstTileNumber: function() {
    return this.first().get('tileNumber');
  },

  lastTileNumber: function() {
    return _.last(this.models).get('tileNumber');
  },

  nextTileNumber: function(current) {
    var currentIndex = _.map(this.models, function(model) {
                         return model.get('tileNumber');
                       }).indexOf(current);

    if (currentIndex === this.length - 1) {
      return;
    } else {
      return this.at(currentIndex + 1).get('tileNumber');
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

  direction: function() {
    return this.determineDirection();
  },

  oppositeDirection: function() {
    return this.oppositeDirections[this.direction()];
  },

  determineDirection: function() {
    if (this.length < 2) {
      return null;
    }

    var tileNumbers = this.pluck('tileNumber');
    if ((tileNumbers[0] + 1) === tileNumbers[1]) {
      return 'horizontal';
    } else {
      return 'vertical';
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
  }
});
