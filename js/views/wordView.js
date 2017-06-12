var Scrabble = Scrabble || {};

Scrabble.WordView = Backbone.View.extend({
  template: _.template($('#word-template').html()),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
