var Scrabble = Scrabble || {};

Scrabble.LetterView = Backbone.View.extend({
  tagName: 'div',
  className: 'letter-container',

  template: _.template($('#letter-template').html()),

  events: {},

  render: function() {
    this.$el.html(this.template({ imageSrc: this.model.imageSrc }));
    return this;
  }
});
