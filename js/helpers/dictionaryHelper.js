var Scrabble = Scrabble || {};

var dictionaryHelper = {
  wordSubmissions: [],
  succesfulWords: [],
  failedWords: [],

  prepareWordsForSubmission: function() {
    var mainWord = this.prepareMainWord();
    this.wordSubmissions.push(mainWord);

    this._submitAllWords(this.wordSubmissions.pop());
  },

  prepareMainWord: function() {
    var letterSet = this.placedLettersCollection;
    var surroundingLetters = this.addSurroundingLettersToMainWord();
    letterSet.add(surroundingLetters);

    var newWord = letterSet.assembleWord();
    return newWord;
  },

  addSurroundingLettersToMainWord: function() {
    var firstLetter = this.placedLettersCollection.firstTileId();
    var direction = this.placedLettersCollection.determineDirection();
    var letters = this.boardTilesCollection.allSurroundingLetters(firstLetter, direction);

    return letters;
  },

  fetchNewLettersFromBag: function() {
    var letterCount = this.placedLettersCollection.fetchPlaced().length;
    Backbone.trigger('playerDashboard:replaceLetters', letterCount);
  },

  _currentPlayer: function() {
    return this.players.currentPlayer();
  },

  _submitAllWords: function(word) {
    if (word) {

      var self = this;
      var config = { params: { 'word': word } };

      $.get('/word', config)
        .done(function(response) {
          if (response.length === 0) {
            self.failedWords.push(word);
          } else {
            response[0].placedLetters = self.placedLettersCollection.valueWithBonus();
            response[0].player = self._currentPlayer();
            self.succesfulWords.push(response[0]);
          }
          self._submitAllWords(self.wordSubmissions.pop());
        });
    } else {
      this._completeTurn();
    }
  },

  _completeTurn: function() {
    if (this.failedWords.length) {
      this._failedTurn();
    } else {
      this._successfulTurn();
    }

    this._endTurn();
  },

  _successfulTurn: function() {
    this.fetchNewLettersFromBag();
    this.placedLettersCollection.confirmAndClear();
    Backbone.trigger('playedWords:addWord', this.succesfulWords);
  },

  _failedTurn: function() {
    console.log(this.failedWords + ' is not a word!');
    this.placedLettersCollection.resetStateAndClear();
  },

  _endTurn: function() {
    this.wordSubmissions = [];
    this.succesfulWords = [];
    this.failedWords = [];
    this.boardTilesCollection.confirmAllPlacedTiles();
    this.players.nextPlayerTurn();
  }
};
