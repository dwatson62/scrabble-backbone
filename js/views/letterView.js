define([
  'underscore',
  'backbone',
  'scrabble',
  'letterSelection',
], function (_, Backbone, Scrabble, letterSelection) {

  Scrabble.LetterView = Backbone.View
    .extend(letterSelection)
    .extend({
    tagName: 'div',
    className: 'letter-container',

    template: _.template($('#letter-template').html()),

    events: {
      'click .unselected': 'letterClicked',
      'click .unselected.blank': 'blankLetterClicked',
      'click .selected': 'selectedLetterClicked'
    },

    initialize: function(context) {
      this.player = context.player;
      this.model.bind('remove', this.removeView, this);

      this.listenTo(this.model, 'change:status', this.render);
      this.listenTo(this.model, 'change:imageSrc', this.render);
      this.listenTo(this.model, 'letter:placeLetter', this.letterClicked);
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

    blankLetterClicked: function() {
      Backbone.trigger('blanks:displayModal', this.model);
    },

    selectedLetterClicked: function() {
      this.model.unselect();
      letterSelection.putdown();

      Backbone.trigger('board:highlightAllTiles');
    }
  });

  return Scrabble.LetterView;
});
