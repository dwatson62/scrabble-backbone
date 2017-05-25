var Scrabble = Scrabble || {};

Scrabble.WordView = Backbone.View.extend({
  template: _.template($('#word-template').html()),
  events: {},

  initialize: function(context) {},

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
