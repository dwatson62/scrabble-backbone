var Scrabble = Scrabble || {};

Scrabble.Tile = Backbone.Model.extend({
  baseSrc: '/images/tiles/',
  boardSize: 15,

  board: {
    '0': 'tripleword', '3': 'doubleletter', '7': 'tripleword', '11': 'doubleletter', '14': 'tripleword',
    '16': 'doubleword', '20': 'tripleletter', '24': 'tripleletter', '28': 'doubleword',
    '32': 'doubleword', '36': 'doubleletter', '38': 'doubleletter', '42': 'doubleword',
    '45': 'doubleletter', '48': 'doubleword', '52': 'doubleletter', '56': 'doubleword', '59': 'doubleletter',
    '64': 'doubleword', '70': 'doubleword',
    '76': 'tripleletter', '80': 'tripleletter', '84': 'tripleletter', '88': 'tripleletter',
    '92': 'doubleletter', '96': 'doubleletter', '98': 'doubleletter', '102': 'doubleletter',
    '105': 'tripleword', '108': 'doubleletter', '112': 'star', '116': 'doubleletter', '119': 'tripleword',
    '122': 'doubleletter', '126': 'doubleletter', '128': 'doubleletter', '132': 'doubleletter',
    '136': 'tripleletter', '140': 'tripleletter', '144': 'tripleletter', '148': 'tripleletter',
    '154': 'doubleword', '160': 'doubleword',
    '165': 'doubleletter', '168': 'doubleword', '172': 'doubleletter', '176': 'doubleword', '179': 'doubleletter',
    '182': 'doubleword', '186': 'doubleletter', '188': 'doubleletter', '192': 'doubleword',
    '196': 'doubleword', '200': 'tripleletter', '204': 'tripleletter', '208': 'doubleword',
    '210': 'tripleword', '213': 'doubleletter', '217': 'tripleword', '221': 'doubleletter', '224': 'tripleword'
  },

  defaults: {
    highlight: 'highlight',
    status: 'empty'
  },

  initialize: function(options) {
    this.options = options;
    this.set('tileId', this._generateTileId());
    this.set('tileNumber', this._generateTileNumber());
    this.set('defaultTileSrc', this.baseSrc + this._fetchTile() + '.png');
    this.set('tileSrc', this.get('defaultTileSrc'));
    this.set('bonusMultiplier', this._fetchTile());
  },

  receiveLetter: function(letter) {
    this.letter = letter;
    this.set('status', 'placed');
    this.set('tileSrc', letter.get('imageSrc'));
  },

  returnLetter: function() {
    this.letter = undefined;
    this.set('status', 'empty');
    this.set('tileSrc', this.get('defaultTileSrc'));
  },

  highlight: function() {
    this.set('highlight', 'highlight');
  },

  unhighlight: function() {
    this.set('highlight', 'unhighlight');
  },

  confirm: function() {
    this.set('status', 'confirmed');
  },

  isPlaced: function() {
    return this.get('status') === 'placed';
  },

  isConfirmed: function() {
    return this.get('status') === 'confirmed';
  },

  isUnavailable: function() {
    return this.isPlaced() || this.isConfirmed();
  },

  _fetchTile: function() {
    var tile = this.board[this.get('tileNumber')];
    if (tile === null) { return; }
    if (tile === undefined) { return 'empty'; }
    if (tile.length === 1 || tile === 'blank') { return 'letter-' + tile; }
    return tile;
  },

  _generateTileNumber: function() {
    return (this.boardSize * this.options.x) + this.options.y;
  },

  _generateTileId: function() {
    return 'tile_' + this.options.x.toString() + '_' + this.options.y.toString();
  }
});
