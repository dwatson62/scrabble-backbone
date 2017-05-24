var Scrabble = Scrabble || {};

Scrabble.PlacedLetters = Backbone.Collection.extend({
  defaults: {
    'direction': null
  },

  sort_key: 'tileId',

  comparator: function(letter) {
    return letter.get(this.sort_key);
  },

  determineDirection: function() {
    var ids = this.pluck('tileId').map(function(tileId) {
      return tileId.split('_')
    });

    if (parseInt(ids[0][2]) != parseInt(ids[1][2])) {
      this.set('direction', 'horizontal');
    } else {
      this.set('direction', 'vertical');
    }
  },
});
