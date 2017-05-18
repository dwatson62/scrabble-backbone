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
    var context = {
      imageSrc: this.model.imageSrc,
      uid: this.model.uid
    }
    this.$el.html(this.template(context));
    return this;
  },

  onPlaceChange: function(model, placed) {
    if (placed === true) {
      this.placeLetter();
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
    this.$el.find('.player-letter').addClass('placed');
    this.$el.find('.player-letter').removeClass('unplaced');
  }
});
