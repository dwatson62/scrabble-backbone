var Scrabble = Scrabble || {};

Scrabble.BlankLetterView = Backbone.View.extend({
  el: '#blank-letter-modal',
  template: _.template($('#blank-letter-modal-template').html()),

  events: {
    'hidden': 'teardown'
  },

  initialize: function(context) {
    this.$el.html(this.template());
    this.$el.modal({ show: false });

    this.listenTo(Backbone, 'blanks:displayModal', this.render);
  },

  render: function() {
    this.$el.modal('show');
  },

  teardown: function() {
    this.$el.data('modal', null);
    this.remove();
  }
});
