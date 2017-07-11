var Scrabble = Scrabble || {};

Scrabble.BlankLetterView = Scrabble.BaseModalView.extend({
  template: _.template($('#blank-letter-modal-template').html()),

  events: {
    'click #update-blank-letter': 'updateClicked',
    'keyup #update-blank-value': 'toggleSubmit'
  },

  initialize: function(context) {
    this.listenTo(Backbone, 'blanks:displayModal',  function(letter) {
      this.displayModal(letter);
    }, this);
  },

  displayModal: function(letter) {
    this.model = letter;
    this.render(this.template());
  },

  updateClicked: function() {
    var value = this.$el.find('#update-blank-value').val();
    this.updateBlankLetter(value);
  },

  valid: function(input) {
    return /^[a-zA-Z]+$/.test(input);
  },

  updateBlankLetter: function(value) {
    this.model.updateValue(value);
    this.model.updateImageSrc();
    this.hideModal();

    this.model.trigger('letter:placeLetter');
  },

  toggleSubmit: function(event) {
    var value = $(event.currentTarget).val();
    if (value.length > 0 && this.valid(value)) {
      this.enableButton();
    } else {
      this.disableButton();
    }
  },

  enableButton: function() {
    $('#update-blank-letter').attr('disabled', false);
  },

  disableButton: function() {
    $('#update-blank-letter').attr('disabled', true);
  }
});
