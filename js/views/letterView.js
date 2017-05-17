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

  toggleSelected: function() {
    this.$el.find('.player-letter').toggleClass('selected');
  }
});
