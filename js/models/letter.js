var Scrabble = Scrabble || {};

Scrabble.Letter = Backbone.Model.extend({
  defaults: {
    status: 'unselected'
  },

  initialize: function(value, uid) {
    this.set('value', value);
    this.set('uid', uid);
    this.set('imageSrc', '/images/tiles/letter-' + this.get('value') + '.png');
  },

  choose: function() {
    this.set('status', 'selected');
  },

  unselect: function() {
    this.set('status', 'unselected');
  },

  place: function() {
    this.set('status', 'placed');
  }
});
