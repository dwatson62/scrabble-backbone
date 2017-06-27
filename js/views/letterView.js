var Scrabble = Scrabble || {};
var letterSelection = letterSelection;

Scrabble.LetterView = Backbone.View
  .extend(letterSelection)
  .extend({
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

    this.listenTo(this.player, 'change:active', this.updateEventDelegation);

    this.updateEventDelegation(this.player);
  },

  updateEventDelegation: function(player) {
    if (player.get('active')) {
      this.delegateEvents();
    } else {
      this.undelegateEvents();
    }
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
    letterSelection.pickup(this.model);

    Backbone.trigger('board:letterClicked');
  },

  selectedLetterClicked: function() {
    this.model.unselect();
    letterSelection.putdown();

    Backbone.trigger('board:highlightAllTiles');
  }
});
