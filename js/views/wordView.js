define([
  'underscore',
  'backbone',
  'scrabble'
], function (_, Backbone, Scrabble) {

  Scrabble.WordView = Backbone.View.extend({
    template: _.template($('#word-template').html()),

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  return Scrabble.WordView;
});
