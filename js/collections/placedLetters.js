var Scrabble = Scrabble || {};

Scrabble.PlacedLetters = Backbone.Collection.extend({
  comparator: 'tileNumber',

  oppositeDirections: {
    'vertical': 'horizontal',
    'horizontal': 'vertical'
  },

  firstTileId: function() {
    return this.first().get('tileId');
  },

  lastTileId: function() {
    return _.last(this.models).get('tileId');
  },

  nextTileId: function(current) {
    var currentIndex = _.map(this.models, function(model) {
                         return model.get('tileId');
                       }).indexOf(current);

    if (currentIndex === this.length - 1) {
      return;
    } else {
      return this.at(currentIndex + 1).get('tileId');
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

    var ids = this._splitIds();

    if (parseInt(ids[0][2]) !== parseInt(ids[1][2])) {
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
  },

  _splitIds: function() {
    return this.pluck('tileId').map(function(tileId) {
      return tileId.split('_');
    });
  }
});
