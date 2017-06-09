var Scrabble = Scrabble || {};

Scrabble.BoardView = Backbone.View.extend({
  el: '#scrabble-board',

  events: {
    'click .board-tile.empty.highlight': 'emptyTileClicked'
  },

  initialize: function(context) {
    this.boardTilesCollection = context.boardTiles;
    this.placedLettersCollection = context.placedLettersCollection;
    this.players = context.players;
    this.render();

    this.listenTo(Backbone, 'board:cancelPlacedLetters', this.cancelPlacedLetters);
    this.listenTo(Backbone, 'board:highlightAllTiles', this.highlightAllTiles);
    this.listenTo(Backbone, 'board:letterClicked', this.letterClicked);
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

  letterClicked: function() {
    this.unhighlightAllTiles();
    this.highlightAvailableTiles();
  },

  cancelPlacedLetters: function() {
    this.boardTilesCollection.returnAllPlacedTiles();
    this.highlightAllTiles();
  },

  currentPlayer: function() {
    return this.players[0];
  },

  emptyTileClicked: function(event) {
    var letter = this.currentPlayer().selectedLetter;

    if (letter) {
      var tileId = event.currentTarget.dataset.tileId;
      var tile = this.boardTilesCollection.fetchTile(tileId);
      tile.receiveLetter(letter);
      this.currentPlayer().putDownLetter(tile);
      this.placedLettersCollection.add(letter);
      this.highlightAllTiles();
    }
  },

  highlightAvailableTiles: function() {
    this.highlightAllPlacedAndConfirmedTiles();
    if (this._nothingPlayed()) {
      this.highlightCentreTile();
    } else if (this.placedLettersCollection.length === 0) {
      this.showAllNeighbourTiles();
    } else if (this.placedLettersCollection.length === 1) {
      this.showHorizontalAndVertical();
    } else {
      this.showNextAvailableTiles();
    }
  },

  highlightAllPlacedAndConfirmedTiles: function() {
    this.boardTilesCollection.highlightAllPlacedTiles();
    this.boardTilesCollection.highlightAllConfirmedTiles();
  },

  showAllNeighbourTiles: function() {
    var self = this;
    _.each(this.boardTilesCollection.allConfirmedTiles(), function(tile) {
      var tileId = tile.get('tileId');
      self.boardTilesCollection.showHorizontalAndVertical(tileId);
    });
  },

  showHorizontalAndVertical: function() {
    var firstTileId = this.placedLettersCollection.firstTileId();
    this.boardTilesCollection.showHorizontalAndVertical(firstTileId);
  },

  showNextAvailableTiles: function() {
    var firstTileId = this.placedLettersCollection.firstTileId();
    var lastTileId = this.placedLettersCollection.lastTileId();
    var direction = this.placedLettersCollection.determineDirection();

    this.boardTilesCollection.showNextAvailableTiles(direction, firstTileId, lastTileId);
  },

  highlightCentreTile: function() {
    this.boardTilesCollection.highlightCentreTile();
  },

  highlightAllTiles: function() {
    this.boardTilesCollection.highlightAllTiles();
  },

  unhighlightAllTiles: function() {
    this.boardTilesCollection.unhighlightAllTiles();
  },

  _nothingPlayed: function() {
    return _.every(this.boardTilesCollection.models, function(model) {
      return model.get('status') === 'empty';
    });
  }
});
