var Scrabble = Scrabble || {};

Scrabble.LettersBag = Backbone.Collection.extend({
  initialize: function() {
    var helper = new Scrabble.LetterHelper();
    var letters = _.keys(helper.letterValues);
    var self = this;

    for (var letter in letters) {
      for (var i = 0; i < helper.letterValues[letters[letter]].tiles; i ++) {
        var newLetter = new Scrabble.Letter({
          points: helper.letterValues[letters[letter]].points,
          value: letters[letter]
        });
        self.add(newLetter);
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
