var Scrabble = Scrabble || {};

Scrabble.LetterView = Backbone.View.extend({
  tagName: 'div',
  className: 'letter-container',

  template: _.template($('#letter-template').html()),

  events: {},

  initialize: function() {
    this.listenTo(this.model, 'change:status', this.render);
    this.model.bind('remove', this.removeView, this);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  removeView: function() {
    this.unbind();
    this.remove();
  }
});
