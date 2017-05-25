describe('ScrabbleView', function() {
  var letters = [
    new Scrabble.Letter({
      value: 'c',
      tileId: 'tile_7_7',
      points: 3
    }),

    new Scrabble.Letter({
      value: 'a',
      tileId: 'tile_7_8',
      points: 1
    }),

    new Scrabble.Letter({
      value: 't',
      tileId: 'tile_7_9',
      points: 1
    })
  ]

  var placedLettersCollection = new Scrabble.PlacedLetters();
  _.each(letters, function(letter) {
    placedLettersCollection.add(letter);
  });

  var scrabbleView = new Scrabble.ScrabbleView({
    placedLettersCollection: placedLettersCollection,
    playedWordsCollection: new Scrabble.PlayedWords()
  });

  describe('#playWord', function() {
    it('creates a Word instance and adds to playedWordsCollection', function() {
      scrabbleView.playWord(placedLettersCollection);

      expect(scrabbleView.playedWordsCollection.length).to.eql(1)
      var word = scrabbleView.playedWordsCollection.at(0)
      expect(word.get('value')).to.eql('cat');
      expect(word.get('points')).to.eql(5);
    });
  });
});
