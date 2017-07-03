var Scrabble = Scrabble || {};

Scrabble.Letter = Backbone.Model.extend({
  defaults: {
    tileNumber: 0,
    status: 'unselected'
  },

  initialize: function(context) {
    this.set('value', context.value);
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
    this.set('bonusMultiplier', tile.get('bonusMultiplier'));
    this.set('status', 'placed');
    this.set('tileNumber', tile.get('tileNumber'));
  },

  confirm: function() {
    this.set('status', 'confirmed');
  },

  resetState: function() {
    this.unselect();
    this.set('bonusMultiplier', null);
    this.set('tileNumber', null);
  },

  isBlankTile: function() {
    return this.get('value') === 'blank';
  }
});
