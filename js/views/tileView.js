var Scrabble = Scrabble || {};

Scrabble.TileView = Backbone.View.extend({
  template: _.template($('#tile-template').html()),
  events: {},

  initialize: function(context) {
    this.listenTo(this.model, 'change:status', this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  placeLetter: function(letter) {
    this.$el.find('img').prop('src', letter.get('imageSrc'));
    this.$el.find('img').removeClass('empty');
    this.$el.find('img').addClass('placed');

    this.letter = letter;
  }
});
