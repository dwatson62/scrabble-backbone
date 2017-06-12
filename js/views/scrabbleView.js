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
    response.letters = this.boardView.placedLettersCollection.pluckPlacedValues();

    this.fetchNewLettersFromBag();
    this.boardView.placedLettersCollection.confirmAndClear();

    Backbone.trigger('playedWords:addWord', response);
  },

  invalidWord: function(word) {
    console.log(word + ' is not a word!');
  },

  fetchNewLettersFromBag: function() {
    var letterCount = this.boardView.placedLettersCollection.fetchPlaced().length;
    var newLetters = this.bag.retrieve(letterCount);

    this.playerDashboardView.collection.replaceWithNewLetters(newLetters);
  }
});
