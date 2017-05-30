var Scrabble = Scrabble || {};

Scrabble.PlacedLetters = Backbone.Collection.extend({
  sort_key: 'tileId',

  comparator: function(letter1, letter2) {
    var a = letter1.get(this.sort_key);
    var b = letter2.get(this.sort_key);
    return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])));
  },

  direction: function() {
    this.direction = this.determineDirection();
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

  _splitIds: function() {
    return this.pluck('tileId').map(function(tileId) {
      return tileId.split('_');
    });
  }
});
