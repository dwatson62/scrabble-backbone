var Game = Game;

_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

$(document).ready(function() {
  var game = new Game();
  game.create();
});
