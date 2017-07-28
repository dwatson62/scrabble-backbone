define([
  'underscore',
  'backbone',
  'scrabble'
], function (_, Backbone, Scrabble) {

  Scrabble.BaseModalView = Backbone.View.extend({
    el: '#modal',

    render: function(template) {
      this.$el.html(template);
      this.$el.modal({ backdrop: 'static' });
      this.$el.modal('show');
    },

    hideModal: function() {
      this.$el.modal('hide');
    }
  });

  return Scrabble.BaseModalView;
});
