var Scrabble = Scrabble || {};

Scrabble.TileView = Backbone.View
  .extend(letterSelection)
  .extend({
  template: _.template($('#tile-template').html()),
  events: {
    'click .empty.highlight': 'emptyTileClicked'
  },

  initialize: function(context) {
    this.parentView = context.parentView;

    this.listenTo(this.model, 'change:tileSrc', this.render);
    this.listenTo(this.model, 'change:highlight', this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  emptyTileClicked: function() {
    var letter = letterSelection.putdown();

    if (letter) {
      this.model.receiveLetter(letter);
      letter.place(this.model);
      this.parentView.placedLettersCollection.add(letter);
      this.parentView.highlightAllTiles();
    }
  }
});
