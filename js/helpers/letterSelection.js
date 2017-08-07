define([
  'underscore',
  'backbone',
  'scrabble'
], function (_, Backbone) {

  var letterSelection = {
    letters: [],

    notEmpty: function() {
      return this.letters.length > 0;
    },

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
    }
  };

  return letterSelection;
});
