var Scrabble = Scrabble || {};

Scrabble.Letter = Backbone.Model.extend({
  defaults: {
    blank: false,
    tileNumber: 0,
    status: 'unselected'
  },

  initialize: function(context) {
    this.set('value', context.value);
    this.set('imageSrc', this._imageSrc());
    this.set('points', context.points);
    this.set('blank', context.value === 'blank');
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

    if (this.get('blank') === true) {
      this.set('value', 'blank');
      this.updateImageSrc();
    }
  },

  updateValue: function(value) {
    this.set('value', value);
  },

  updateImageSrc: function() {
    this.set('imageSrc', this._imageSrc());
  },

  _imageSrc: function() {
    return '/images/tiles/letter-' + this.get('value') + '.png';
  }
});
