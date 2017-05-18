var Scrabble = Scrabble || {};

Scrabble.TileView = Backbone.View.extend({
  events: {},

  placeLetter: function(letter) {
    this.$el.find('img').prop('src', letter.imageSrc);
  }
});
