var Scrabble = Scrabble || {};

Scrabble.ScrabbleView = Backbone.View.extend({
  el: '#scrabble-app',

  events: {
    'click .cancel-btn': 'cancelButtonClicked',
    'click .player-letter.unselected': 'letterClicked',
    'click .player-letter.selected': 'selectedLetterClicked',
    'click .play-word-btn': 'playWordButtonClicked'
  },

  initialize: function(context) {
    this.context = context;
    this.bag = this.context.bag;
    this.boardView = this.context.boardView;
    this.dictionary = new Scrabble.DictionaryHelper();
    this.playerDashboardView = this.context.playerDashboardView;
    this.playedWordsView = this.boardView.playedWordsView;
  },

  cancelButtonClicked: function() {
    this.boardView.boardTilesCollection.returnAllPlacedTiles();
    this.clearPlacedLettersCollection();
    this.boardView.highlightAllTiles();
  },

  clearPlacedLettersCollection: function() {
    this.boardView.placedLettersCollection.reset();
  },

  letterClicked: function(event) {
    this.boardView.unhighlightAllTiles();
    this.boardView.highlightUsedTiles();
    this.boardView.highlightAvailableTiles();
    this.playerDashboardView.letterClicked(event);
  },

  selectedLetterClicked: function(event) {
    this.boardView.highlightAllTiles();
    this.playerDashboardView.selectedLetterClicked(event);
  },

  playWordButtonClicked: function() {
    this.addSurroundingLettersToWord();
    var word = this.boardView.placedLettersCollection.assembleWord();
    this.dictionary.playWord(word, this.validWord.bind(this), this.invalidWord);
  },

  addSurroundingLettersToWord: function() {
    var firstLetter = this.boardView.placedLettersCollection.first().get('tileId');
    var direction = this.boardView.placedLettersCollection.determineDirection();
    var tiles = this.boardView.boardTilesCollection.allSurroundingLetters(firstLetter, direction);

    var letters = _.map(tiles, function(tile){
      return this.boardView.boardTilesCollection.fetchTile(tile).letter
    }, this);

    this.boardView.placedLettersCollection.add(letters);
  },

  validWord: function(response) {
    this.boardView.boardTilesCollection.confirmAllPlacedTiles();
    var points = this.boardView.placedLettersCollection.calculatePoints();
    this.playedWordsView.playWord(response, points);

    this.fetchNewLettersFromBag();
    this.boardView.placedLettersCollection.confirmAndClear();
  },

  invalidWord: function(word) {
    console.log(word + ' is not a word!');
  },

  fetchNewLettersFromBag: function() {
    var letterCount = this.boardView.placedLettersCollection.where({ status: 'placed' }).length;
    var newLetters = this.bag.retrieve(letterCount);

    this.playerDashboardView.collection.replaceWithNewLetters(newLetters);
  }
});
