define([
  'underscore',
  'backbone',
  'scrabble',
  'tileHelper'
], function (_, Backbone, Scrabble, tileHelper) {

  Scrabble.InvalidWordView = Scrabble.BaseModalView.extend({
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
      this.render(template);
    }
  });

  return Scrabble.InvalidWordView;
});
