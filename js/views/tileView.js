var Scrabble = Scrabble || {};

Scrabble.TileView = Backbone.View.extend({
  template: _.template($('#tile-template').html()),
  events: {},

  initialize: function(context) {
    this.listenTo(this.model, 'change:tileSrc', this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
