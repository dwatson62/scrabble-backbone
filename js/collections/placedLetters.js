var Scrabble = Scrabble || {};

Scrabble.PlacedLetters = Backbone.Collection.extend({
  comparator: 'tileNumber',

  firstTileId: function() {
    return this.first().get('tileId');
  },

  lastTileId: function() {
    return _.last(this.models).get('tileId');
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
    this.determineDirection();
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
