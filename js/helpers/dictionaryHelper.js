var Scrabble = Scrabble || {};

var dictionaryHelper = {
  wordSubmissions: [],
  succesfulWords: [],
  failedWords: [],

  prepareWordsForSubmission: function() {
    this.prepareMainWord();

    this.prepareHookWords();

    this._submitAllWords(this.wordSubmissions.pop());
  },

  prepareMainWord: function() {
    var letterSet = this.placedLettersCollection;
    var surroundingLetters = this.addSurroundingLettersToMainWord();
    letterSet.add(surroundingLetters);

    var newWord = letterSet.assembleWord();
    this.wordSubmissions.push(newWord);
    return newWord;
  },

  prepareHookWords: function() {
    var direction = this.placedLettersCollection.oppositeDirection();
    if (direction) {
      var firstTile = this.placedLettersCollection.firstTileNumber();
      this.checkSurroundingTilesForHookWord(firstTile, direction);
    }
  },

  checkSurroundingTilesForHookWord: function(currentTile, direction) {
    if (currentTile) {
      var letters = this.boardTilesCollection.allSurroundingLetters(currentTile, direction);
      if (letters.length > 1) {

        var newHook = _.flatten([this.boardTilesCollection.fetchLetter(currentTile), letters]);
        var newWord = new Scrabble.PlacedLetters();
        newWord.reset(newHook);
        this.wordSubmissions.push(newWord.assembleWord());
      }
      var nextLetter = this.placedLettersCollection.nextTileNumber(currentTile);
      this.checkSurroundingTilesForHookWord(nextLetter, direction);
    }
  },

  addSurroundingLettersToMainWord: function() {
    var firstLetter = this.placedLettersCollection.firstTileNumber();
    var direction = this.placedLettersCollection.direction;
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
    this.boardTilesCollection.returnAllPlacedTiles()
    this.placedLettersCollection.resetStateAndClear();

    Backbone.trigger('invalid:displayModal', this.failedWords);
  },

  _endTurn: function() {
    this.wordSubmissions = [];
    this.succesfulWords = [];
    this.failedWords = [];
    this.boardTilesCollection.confirmAllPlacedTiles();
    this.players.nextPlayerTurn();
  }
};
