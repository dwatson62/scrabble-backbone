var Scrabble = Scrabble || {};

Scrabble.TileView = Backbone.View.extend({
  events: {},

  initialize: function(context) {
    this.imageSrc = context.tileSrc;
    this.status = 'empty';
  },

  placeLetter: function(letter) {
    this.$el.find('img').prop('src', letter.get('imageSrc'));
    this.$el.find('img').removeClass('empty');
    this.$el.find('img').addClass('placed');

    this.letter = letter;
    this.status = 'placed';
  }
});
