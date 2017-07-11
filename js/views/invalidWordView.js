var Scrabble = Scrabble || {};

Scrabble.InvalidWordView = Backbone.View.extend({

  el: '#modal',
  template: _.template($('#blank-letter-modal-template').html()),

  events: {
    'click #update-blank-letter': 'updateClicked'
  },

  initialize: function(context) {
    this.listenTo(Backbone, 'blanks:displayModal',  function(letter) {
      this.displayModal(letter);
    }, this);
  },

  displayModal: function(letter) {
    this.$el.html(this.template());
    this.$input = this.$el.find('#update-blank-value');

    this.model = letter;
    this.render();
  },

  render: function() {
    this.$el.modal({ backdrop: 'static' });
    this.$el.modal('show');
    this.$input.focus();
  },

  hideModal: function() {
    this.$el.modal('hide');
  },

  updateClicked: function() {
    var value = this.$input.val();
    this.updateBlankLetter(value);
  },

  updateBlankLetter: function(value) {
    this.model.updateValue(value);
    this.model.updateImageSrc();
    this.hideModal();

    this.model.trigger('letter:placeLetter');
  }
});
