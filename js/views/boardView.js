var Scrabble = Scrabble || {};

Scrabble.BoardView = Backbone.View.extend({
  el: '#scrabble-board',

  events: {
    'click .board-tile.empty.highlight': 'emptyTileClicked'
  },

  initialize: function(context) {
    this.boardTilesCollection = context.boardTiles;
    this.placedLettersCollection = context.placedLetters;
    this.players = context.players;
    this.render();
  },

  render: function() {
    var self = this;
    _.each(self.boardTilesCollection.models, function(tile) {
      self.renderTile(tile);
    });
    return this;
  },

  renderTile: function(tile) {
    var domId = '#' + tile.get('tileId');
    var tileView = new Scrabble.TileView({
      el: $(domId),
      model: tile
    });
    this.$el.find(domId).append(tileView.render().el);
  },

  tileModel: function(tileId) {
    return this.boardTilesCollection.models.find(function(model) {
      return model.get('tileId') === tileId;
    });
  },

  currentPlayer: function() {
    return this.players[0];
  },

  emptyTileClicked: function(event) {
    var letter = this.currentPlayer().selectedLetter;

    if (letter) {
      var tileId = event.currentTarget.dataset.tileId;
      letter.place(tileId);
      this.placedLettersCollection.add(letter);
      this.tileModel(tileId).receiveLetter(letter)
      this.currentPlayer().putDownLetter();
      this.highlightAllTiles();
    }
  },

  highlightAvailableTiles: function() {
    if (this.placedLettersCollection.length === 0) {
      this.highlightCentreTile();
    } else if (this.placedLettersCollection.length === 1) {
      this.highlightHorizontalAndVertical();
    } else {
      var direction = this.determineDirection();

      if (direction === 'horizontal') {
        this.showHorizontalTiles();
      } else {
        this.showVerticalTiles();
      }
    }
  },

  determineDirection: function() {
    var ids = this.placedLettersCollection.pluck('tileId').map(function(tileId) {
      return tileId.split('_')
    });

    if (parseInt(ids[0][2]) != parseInt(ids[1][2])) {
      return 'horizontal';
    } else {
      return 'vertical';
    }
  },

  showHorizontalTiles: function() {
    var firstTileId = this.placedLettersCollection.at(0).get('tileId');
    var lastTileId = this.placedLettersCollection.at(-1).get('tileId');
    var tileIds = [
      this.oneTileToLeft(firstTileId),
      this.oneTileToRight(lastTileId)
    ];

    var self = this;
    _.each(tileIds, function(id) {
      self.boardTilesCollection.findWhere({ tileId: id }).highlight();
    });
  },

  showVerticalTiles: function() {
    var firstTileId = this.placedLettersCollection.at(0).get('tileId');
    var lastTileId = this.placedLettersCollection.at(-1).get('tileId');
    var tileIds = [
      this.oneTileAbove(firstTileId),
      this.oneTileBelow(lastTileId)
    ];

    var self = this;
    _.each(tileIds, function(id) {
      self.boardTilesCollection.findWhere({ tileId: id }).highlight();
    });
  },

  highlightHorizontalAndVertical: function() {
    var firstTileId = this.placedLettersCollection.at(0).get('tileId');

    var tileIds = [
      firstTileId,
      this.oneTileBelow(firstTileId),
      this.oneTileAbove(firstTileId),
      this.oneTileToLeft(firstTileId),
      this.oneTileToRight(firstTileId)
    ];

    var self = this;
    _.each(tileIds, function(id) {
      self.boardTilesCollection.findWhere({ tileId: id }).highlight();
    });
  },

  oneTileBelow: function(firstTileId) {
    var splitId = firstTileId.split('_');
    splitId[1] = String(parseInt(splitId[1]) + 1);
    return splitId.join('_');
  },

  oneTileAbove: function(firstTileId) {
    var splitId = firstTileId.split('_');
    splitId[1] = String(parseInt(splitId[1]) - 1);
    return splitId.join('_');
  },

  oneTileToLeft: function(firstTileId) {
    var splitId = firstTileId.split('_');
    splitId[2] = String(parseInt(splitId[2]) - 1);
    return splitId.join('_');
  },

  oneTileToRight: function(firstTileId) {
    var splitId = firstTileId.split('_');
    splitId[2] = String(parseInt(splitId[2]) + 1);
    return splitId.join('_');
  },

  highlightCentreTile: function() {
    this.boardTilesCollection.findWhere('centre').highlight();
  },

  highlightAllTiles: function() {
    _.each(this.boardTilesCollection.models, function(tile) {
      tile.highlight();
    });
  },

  unhighlightAllTiles: function() {
    _.each(this.boardTilesCollection.models, function(tile) {
      tile.unhighlight();
    });
  }
});
