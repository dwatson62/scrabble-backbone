var Scrabble = Scrabble || {};

Scrabble.LetterView = Backbone.View.extend({
  tagName: 'div',
  className: 'letter-container',

  template: _.template($('#letter-template').html()),

  events: {},

  initialize: function() {
    this.listenTo(this.model, 'change:placed', this.onPlaceChange);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  onPlaceChange: function(model, placed) {
    if (placed === true) {
      this.placeLetter();
      this.render();
    }
  },

  selectLetter: function() {
    this.$el.find('.player-letter').addClass('selected');
  },

  unselectLetter: function() {
    this.$el.find('.player-letter').removeClass('selected');
  },

  placeLetter: function() {
    this.unselectLetter();
    this.model.place();
  }
});
