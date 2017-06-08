var Scrabble = Scrabble || {};

Scrabble.PlacedLetters = Backbone.Collection.extend({
  comparator: 'tileNumber',

  firstTileId: function() {
    return this.first().get('tileId');
  },

  lastTileId: function() {
    return _.last(this.models).get('tileId');
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

  calculatePoints: function() {
    return _.reduce(this.pluck('points'), function(memo, num) {
      return memo + num;
    }, 0);
  },

  confirmAndClear: function() {
    _.each(this.models, function(model) {
      model.confirm();
    });
    this.reset();
  },

  _splitIds: function() {
    return this.pluck('tileId').map(function(tileId) {
      return tileId.split('_');
    });
  }
});
