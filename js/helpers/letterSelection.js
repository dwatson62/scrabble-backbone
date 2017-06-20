var Scrabble = Scrabble || {};

var letterSelection = {
  letters: [],

  pickup: function(letter) {
    this.letters.push(letter);
  },

  putdown: function() {
    return this.letters.pop();
  },

  reset: function() {
    this.letters = [];
  }
};
