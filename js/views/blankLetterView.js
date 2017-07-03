var Scrabble = Scrabble || {};

Scrabble.BlankLetterView = Backbone.View
  .extend(letterSelection)
  .extend({

  el: '#blank-letter-modal',
  template: _.template($('#blank-letter-modal-template').html()),

  events: {
    'click #update-blank-letter': 'updateBlankLetter'
  },

  initialize: function(context) {
    this.$el.html(this.template());
    this.$el.modal({ backdrop: 'static', show: false });
    this.$input = this.$el.find('#update-blank-value');

    this.listenTo(Backbone, 'blanks:displayModal',  function(letter) {
      this.displayModal(letter);
    }, this);
  },

  displayModal: function(letter) {
    this.model = letter;
    this.render();
  },

  render: function() {
    this.$el.modal('show');
    this.$input.focus();
  },

  hideModal: function() {
    this.$el.modal('hide');
  },

  updateBlankLetter: function() {
    var value = this.$input.val();
    this.updateValue(value);
    this.hideModal();

    this.model.trigger('letter:placeLetter');
  }
});
