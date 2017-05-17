var Scrabble = Scrabble || {};

_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

$(document).ready(function() {

  var scrabbleView = new Scrabble.ScrabbleView();
  var boardView = new Scrabble.BoardView();

  var bag = new Scrabble.LettersBag();
  var firstSeven = bag.models.slice(0, 7);
  var playerLettersView = new Scrabble.PlayerLettersView(firstSeven);
});
