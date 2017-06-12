var Scrabble = Scrabble || {};

Scrabble.LetterHelper = Backbone.Helper.extend({
  letterValues: {
    "a": { "points":  1, "tiles":  9 },
    "b": { "points":  3, "tiles":  2 },
    "c": { "points":  3, "tiles":  2 },
    "d": { "points":  2, "tiles":  4 },
    "e": { "points":  1, "tiles": 12 },
    "f": { "points":  4, "tiles":  2 },
    "g": { "points":  2, "tiles":  3 },
    "h": { "points":  4, "tiles":  2 },
    "i": { "points":  1, "tiles":  9 },
    "j": { "points":  8, "tiles":  1 },
    "k": { "points":  5, "tiles":  1 },
    "l": { "points":  1, "tiles":  4 },
    "m": { "points":  3, "tiles":  2 },
    "n": { "points":  1, "tiles":  6 },
    "o": { "points":  1, "tiles":  8 },
    "p": { "points":  3, "tiles":  2 },
    "q": { "points": 10, "tiles":  1 },
    "r": { "points":  1, "tiles":  6 },
    "s": { "points":  1, "tiles":  4 },
    "t": { "points":  1, "tiles":  6 },
    "u": { "points":  1, "tiles":  4 },
    "v": { "points":  4, "tiles":  2 },
    "w": { "points":  4, "tiles":  2 },
    "x": { "points":  8, "tiles":  1 },
    "y": { "points":  4, "tiles":  2 },
    "z": { "points": 10, "tiles":  1 },
    "blank": { "points": 0, "tiles": 2}
  },

  letterBonuses: {
    'doubleletter': 2,
    'tripleletter': 3
  },

  wordBonuses: {
    'doubleword': 2,
    'tripleword': 3
  },

  bingoBonus: 50,

  calculatePoints: function(letters) {
    var subtotal = _.reduce(this._convertToPoints(letters), function(memo, num) {
      return memo + num;
    }, 0) * this._wordBonus(letters);
    return subtotal + this._bingoBonus(letters);
  },

  _bingoBonus: function(letters) {
    if (letters.length === 7) {
      return this.bingoBonus;
    } else {
      return 0;
    }
  },

  _convertToPoints: function(letters) {
    var self = this;
    return _.map(letters, function(letter) {
      var bonus = self.letterBonuses[letter.bonus] || 1;
      return self.letterValues[letter.value].points * bonus;
    });
  },

  _wordBonus: function(letters) {
    var bonus = _.intersection(_.keys(this.wordBonuses), _.pluck(letters, 'bonus')).join();
    return this.wordBonuses[bonus] || 1;
  }
});
