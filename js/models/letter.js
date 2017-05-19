var Scrabble = Scrabble || {};

Scrabble.Letter = Backbone.Model.extend({
  defaults: {
    placed: false,
    status: 'unplaced'
  },

  initialize: function(value, uid) {
    this.set('value', value);
    this.set('uid', uid);
    this.set('imageSrc', '/images/tiles/letter-' + this.get('value') + '.png');
  },

  place: function() {
    this.set('placed', true);
    this.set('status', 'placed');
  }
});
