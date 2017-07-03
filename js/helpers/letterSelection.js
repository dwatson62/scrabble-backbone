var Scrabble = Scrabble || {};

var letterSelection = {
  letters: [],

  currentLetter: function() {
    return this.letters[0];
  },

  pickup: function(letter) {
    this.letters.push(letter);
  },

  putdown: function() {
    return this.letters.pop();
  },

  reset: function() {
    this.letters = [];
  },

  updateValue: function(value) {
    if (this.currentLetter()) {
      this.currentLetter().updateValue(value);
      this.currentLetter().updateImageSrc();
    }
  }
};
