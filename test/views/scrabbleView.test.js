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
  ];

  var placedLettersCollection;
  var playerDashboardView;
  var boardView;
  var scrabbleView;

  beforeEach(function() {
    placedLettersCollection = new Scrabble.PlacedLetters();
    placedLettersCollection.add(letters);

    playerDashboardView = new Scrabble.PlayerDashboardView({
      collection: new Scrabble.PlayerLetters()
    });

    boardView = new Scrabble.BoardView({
      boardTiles: new Scrabble.BoardTiles(),
      placedLettersCollection: placedLettersCollection,
      playedWordsView: new Scrabble.PlayedWordsView()
    });

    scrabbleView = new Scrabble.ScrabbleView({
      bag: new Scrabble.LettersBag(),
      boardView: boardView,
      playerDashboardView: playerDashboardView
    });
  });

  describe('#playWord', function() {
    it('creates a Word instance and adds to playedWordsCollection', function() {
      var response = [{
        text: 'House pet',
        word: 'cat'
      }];
      scrabbleView.playWord(response);

      expect(scrabbleView.playedWordsView.playedWordsCollection.length).to.eql(1)

      var word = scrabbleView.playedWordsView.playedWordsCollection.first();
      expect(word.get('meaning')).to.eql(response[0].text);
      expect(word.get('points')).to.eql(5);
      expect(word.get('value')).to.eql(response[0].word);
    });
  });
});
