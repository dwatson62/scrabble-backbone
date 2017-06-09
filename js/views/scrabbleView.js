var Scrabble = Scrabble || {};

Scrabble.ScrabbleView = Backbone.View.extend({
  el: '#scrabble-app',

  events: {
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

  playWordButtonClicked: function() {
    this.addSurroundingLettersToWord();
    var word = this.boardView.placedLettersCollection.assembleWord();
    this.dictionary.playWord(word, this.validWord.bind(this), this.invalidWord);
  },

  addSurroundingLettersToWord: function() {
    var firstLetter = this.boardView.placedLettersCollection.firstTileId();
    var direction = this.boardView.placedLettersCollection.determineDirection();
    var letters = this.boardView.boardTilesCollection.allSurroundingLetters(firstLetter, direction);

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
