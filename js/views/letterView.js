var Scrabble = Scrabble || {};

Scrabble.LetterView = Backbone.View.extend({
  tagName: 'div',
  className: 'letter-container',

  template: _.template($('#letter-template').html()),

  events: {},

  render: function() {
    var context = {
      imageSrc: this.model.imageSrc,
      uid: this.model.uid
    }
    this.$el.html(this.template(context));
    return this;
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
