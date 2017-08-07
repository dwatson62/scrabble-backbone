define([
  'backbone'
], function (Backbone) {

  var playerTurnHelper = {
    wordSubmissions: [],
    succesfulWords: [],
    failedWords: [],

    playWords: function(wordSubmissions) {
      this.wordSubmissions = wordSubmissions;
      this.submitAllWords(wordSubmissions.pop());
    },

    submitAllWords: function(word) {
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
            self.submitAllWords(self.wordSubmissions.pop());
          });
      } else {
        this.completeTurn();
      }
    },

    completeTurn: function() {
      if (this.failedWords.length) {
        this.failedTurn();
      } else {
        this.successfulTurn();
      }

      this.endTurn();
    },

    successfulTurn: function() {
      this.fetchNewLettersFromBag();
      this.placedLettersCollection.confirmAndClear();
      Backbone.trigger('playedWords:addWord', this.succesfulWords);
    },

    failedTurn: function() {
      this.boardTilesCollection.returnAllPlacedTiles();
      this.placedLettersCollection.resetStateAndClear();

      Backbone.trigger('invalid:displayModal', this.failedWords);
    },

    endTurn: function() {
      this.wordSubmissions = [];
      this.succesfulWords = [];
      this.failedWords = [];
      this.boardTilesCollection.confirmAllPlacedTiles();
      this.players.nextPlayerTurn();
    },

    fetchNewLettersFromBag: function() {
      var letterCount = this.placedLettersCollection.fetchPlaced().length;
      Backbone.trigger('playerDashboard:replaceLetters', letterCount);
    },

    _currentPlayer: function() {
      return this.players.currentPlayer();
    }
  };

  return playerTurnHelper;
});
