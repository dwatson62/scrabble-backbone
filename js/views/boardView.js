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
    this.dictionary = new Scrabble.DictionaryHelper();
    this.render();

    this.listenTo(Backbone, 'board:cancelPlacedLetters', this.cancelPlacedLetters);
    this.listenTo(Backbone, 'board:playWord', this.playWord);
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

  playWord: function() {
    this.addSurroundingLettersToWord();
    var word = this.placedLettersCollection.assembleWord();
    this.dictionary.playWord(word, this.validWord.bind(this), this.invalidWord);
  },

  addSurroundingLettersToWord: function() {
    var firstLetter = this.placedLettersCollection.firstTileId();
    var direction = this.placedLettersCollection.determineDirection();
    var letters = this.boardTilesCollection.allSurroundingLetters(firstLetter, direction);

    this.placedLettersCollection.add(letters);
  },

  validWord: function(response) {
    response[0].placedLetters = _.map(this.placedLettersCollection.fetchPlaced(), function(letter) {
      return { value: letter.get('value'), bonus: letter.get('bonusMultiplier') };
    });

    this.boardTilesCollection.confirmAllPlacedTiles();

    this.fetchNewLettersFromBag();
    Backbone.trigger('playedWords:addWord', response);
  },

  invalidWord: function(word) {
    console.log(word + ' is not a word!');
  },

  fetchNewLettersFromBag: function() {
    var letterCount = this.placedLettersCollection.fetchPlaced().length;
    this.placedLettersCollection.confirmAndClear();
    Backbone.trigger('playerDashboard:replaceLetters', letterCount);
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
