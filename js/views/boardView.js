var Scrabble = Scrabble || {};

Scrabble.BoardView = Backbone.View.extend({
  el: '#scrabble-board',
  events: {},

  letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'P', 'Q'],

  board: {
    'A1': 'tripleword', 'A4': 'doubleletter', 'A8': 'tripleword', 'A12': 'doubleletter', 'A15': 'tripleword',
    'B2': 'doubleword', 'B6': 'tripleletter', 'B10': 'tripleletter', 'B14': 'doubleword',
    'C3': 'doubleword', 'C7': 'doubleletter', 'C9': 'doubleletter', 'C13': 'doubleword',
    'D1': 'doubleletter', 'D4': 'doubleword', 'D8': 'doubleletter', 'D12': 'doubleword', 'D15': 'doubleletter',
    'E5': 'doubleword', 'E11': 'doubleword',
    'F2': 'tripleletter', 'F6': 'tripleletter', 'F10': 'tripleletter', 'F14': 'tripleletter',
    'G3': 'doubleletter', 'G7': 'doubleletter', 'G9': 'doubleletter', 'G13': 'doubleletter',
    'H1': 'tripleword', 'H4': 'doubleletter', 'H8': 'star', 'H12': 'doubleletter', 'H15': 'tripleword',
    'I3': 'doubleletter', 'I7': 'doubleletter', 'I9': 'doubleletter', 'I13': 'doubleletter',
    'J2': 'tripleletter', 'J6': 'tripleletter', 'J10': 'tripleletter', 'J14': 'tripleletter',
    'K5': 'doubleword', 'K11': 'doubleword',

    'M1': 'doubleletter', 'M4': 'doubleword', 'M8': 'doubleletter', 'M12': 'doubleword', 'M15': 'doubleletter',
    'N3': 'doubleword', 'N7': 'doubleletter', 'N9': 'doubleletter', 'N13': 'doubleword',
    'O2': 'doubleword', 'O6': 'tripleletter', 'O10': 'tripleletter', 'O14': 'doubleword',
    'P1': 'tripleword', 'P4': 'doubleletter', 'P8': 'tripleword', 'P12': 'doubleletter', 'P15': 'tripleword',
    'Q1': 'tripleword', 'Q4': 'doubleletter', 'Q8': 'tripleword', 'Q12': 'doubleletter', 'Q15': 'tripleword'
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    var baseSrc = '/images/tiles/';
    for (var x = 0; x < 15; x ++) {
      for (var y = 0; y < 15; y ++) {
        var tileId = x.toString() + '_' + y.toString();
        var tileSrc = baseSrc + this.setTile(x, y) + '.png';

        this.$el.find('#tile_' + tileId + ' img').prop('src', tileSrc);
      }
    }
  },

  setTile: function(x, y) {
    var tile = this.board[this.convert(x, y)];
    if (tile === null) { return; }
    if (tile === undefined) { return 'empty'; }
    if (tile.length === 1 || tile === 'blank') { return 'letter-' + tile; }
    return tile;
  },

  convert: function(x, y) {
    return this.letters[x] + String(y + 1);
  }
});
