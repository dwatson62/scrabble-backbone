var Scrabble = Scrabble || {};

Scrabble.Letter = Backbone.Model.extend({
  defaults: {
    tileNumber: 0,
    status: 'unselected'
  },

  initialize: function(context) {
    this.set('value', context.value);
    this.set('uid', context.uid);
    this.set('imageSrc', '/images/tiles/letter-' + this.get('value') + '.png');
    this.set('points', context.points);
  },

  choose: function() {
    this.set('status', 'selected');
  },

  unselect: function() {
    this.set('status', 'unselected');
  },

  place: function(tile) {
    this.set('status', 'placed');
    this.set('tileId', tile.get('tileId'));
    this.set('tileNumber', tile.get('tileNumber'));
  },

  confirm: function() {
    this.set('status', 'confirmed');
  }
});
