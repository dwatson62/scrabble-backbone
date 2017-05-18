var Scrabble = Scrabble || {};

Scrabble.Letter = Backbone.Model.extend({
  defaults: {
    placed: false
  },

  initialize: function(value, uid) {
    this.value = value;
    this.uid = uid;
    this.imageSrc = '/images/tiles/letter-' + this.value + '.png';
  },

  place: function() {
    this.placed = true;
  }
});
