var Scrabble = Scrabble || {};

Scrabble.LettersBag = Backbone.Collection.extend({
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

  initialize: function() {
    var letters = _.keys(this.letterValues);
    var self = this;
    var count = 1;

    for (var letter in letters) {
      for (var i = 0; i < this.letterValues[letters[letter]].tiles; i ++) {
        var newLetter = new Scrabble.Letter({
          points: this.letterValues[letters[letter]].points,
          uid: count,
          value: letters[letter]
        });
        self.add(newLetter);
        count += 1;
      }
    }

    this.reset(this.shuffle(), { silent: true });
  },

  retrieve: function(number) {
    var retrieved = [];
    var self = this;
    _.times(number, function() {
      retrieved.push(self.pop());
    });
    return retrieved;
  },
});
