var Scrabble = Scrabble || {};

Scrabble.LetterView = Backbone.View.extend({
  tagName: 'div',
  className: 'letter-container',

  template: _.template($('#letter-template').html()),

  events: {
    'click .unselected': 'letterClicked',
    'click .selected': 'selectedLetterClicked'
  },

  initialize: function(context) {
    this.player = context.player;
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
  },

  letterClicked: function() {
    this.model.collection.unselectAll();
    this.model.choose();
    this.player.pickUpLetter(this.model);

    Backbone.trigger('board:letterClicked');
  },

  selectedLetterClicked: function() {
    this.model.unselect();
    this.player.replaceLetter();

    Backbone.trigger('board:highlightAllTiles');
  }
});
