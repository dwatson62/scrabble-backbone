define([
  'underscore',
  'Scrabble'
], function (_, Scrabble) {

  var dictionaryHelper = {
    wordSubmissions: [],

    prepareWordsForSubmission: function() {
      this.prepareMainWord();

      this.prepareHookWords();

      return this.wordSubmissions;
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

        var nextLetter = this.placedLettersCollection.nextPlacedTileNumber(currentTile);
        this.checkSurroundingTilesForHookWord(nextLetter, direction);
      }
    },

    addSurroundingLettersToMainWord: function() {
      var firstLetter = this.placedLettersCollection.firstTileNumber();
      var direction = this.placedLettersCollection.direction;
      var letters = this.boardTilesCollection.allSurroundingLetters(firstLetter, direction);

      return letters;
    }
  };

  return dictionaryHelper;
});