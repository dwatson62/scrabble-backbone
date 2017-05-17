var Scrabble = Scrabble || {};

Scrabble.Letter = Backbone.Model.extend({
  initialize: function(value, uid) {
    this.value = value;
    this.uid = uid;
    this.imageSrc = '/images/tiles/letter-' + this.value + '.png';
  }
});
