var Scrabble = Scrabble || {};

Scrabble.BlankLetterView = Scrabble.BaseModalView.extend({
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
    this.model = letter;
    this.render(this.template());
  },

  updateClicked: function() {
    var value = this.$el.find('#update-blank-value').val();
    this.updateBlankLetter(value);
  },

  updateBlankLetter: function(value) {
    this.model.updateValue(value);
    this.model.updateImageSrc();
    this.hideModal();

    this.model.trigger('letter:placeLetter');
  }
});
