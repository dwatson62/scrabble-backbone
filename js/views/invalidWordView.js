var Scrabble = Scrabble || {};

Scrabble.InvalidWordView = Backbone.View.extend({

  el: '#modal',
  template: _.template($('#invalid-word-modal-template').html()),

  events: {
    'click #ok-button': 'hideModal'
  },

  initialize: function(context) {
    this.listenTo(Backbone, 'invalid:displayModal',  function(words) {
      this.displayModal(words);
    }, this);
  },

  displayModal: function(words) {
    var context = {
      words: words.join(', '),
      wordLength: words.length
    };

    var template = this.template(context);
    this.$el.html(template);
    this.render();
  },

  render: function() {
    this.$el.modal({ backdrop: 'static' });
    this.$el.modal('show');
  },

  hideModal: function() {
    this.$el.modal('hide');
  }
});
