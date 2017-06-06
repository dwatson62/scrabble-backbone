describe('BoardView', function() {
  var player = new Scrabble.Player('Daryl');
  var boardTiles = new Scrabble.BoardTiles()
  var playedWordsView = new Scrabble.PlayedWordsView();

  var boardView = new Scrabble.BoardView({
    boardTiles: boardTiles,
    playedWordsView: playedWordsView,
    players: [player],
  });

  var placedLetters = new Scrabble.PlacedLetters();
  var letter = new Scrabble.Letter({ tileId: 'tile_7_7' });

  var clearUp = function() {
    boardView.placedLettersCollection.reset();
  };

  describe('#tileModel', function() {
    it('finds the tile from a collection when passed a tileId', function() {
      var tile = boardView.tileModel('tile_7_7');
      expect(tile.get('tileId')).to.eql('tile_7_7');
    });
  });

  describe('#currentPlayer', function() {
    it('returns the current player', function() {
      expect(boardView.currentPlayer()).to.eql(player);
    });
  });

  describe('#highlightAvailableTiles', function() {
    it('calls highlightCentreTile when no letters have been placed', function() {
      boardView.placedLettersCollection = placedLetters;
      var boardSpy = sinon.spy(boardView, 'highlightCentreTile');
      boardView.highlightAvailableTiles();

      expect(boardSpy.calledOnce).to.be(true)
      boardSpy.restore();
      clearUp();
    });

    it('calls showHorizontalAndVertical when 1 letter has been placed', function() {
      placedLetters.add(letter);
      boardView.placedLettersCollection = placedLetters;

      var boardSpy = sinon.spy(boardView, 'showHorizontalAndVertical');
      boardView.highlightAvailableTiles();

      expect(boardSpy.calledOnce).to.be(true)
      boardSpy.restore();
      clearUp();
    });

    it('calls showNextAvailableTiles when more than 1 letter has been placed', function() {
      placedLetters.add(letter);
      var secondLetter = new Scrabble.Letter({ tileId: 'tile_7_7' });
      placedLetters.add(secondLetter);
      boardView.placedLettersCollection = placedLetters;

      var boardSpy = sinon.spy(boardView, 'showNextAvailableTiles');
      boardView.highlightAvailableTiles();

      expect(boardSpy.calledOnce).to.be(true)
      boardSpy.restore();
      clearUp();
    });
  });

  describe('#highlightCentreTile', function() {
    it('calls highlight on the centre tile', function() {
      var highlightSpy = sinon.spy(boardTiles.centreTile, 'highlight');
      boardView.highlightCentreTile();

      expect(highlightSpy.calledOnce).to.be(true)
      highlightSpy.restore();
    });
  });

  describe('#showHorizontalAndVertical', function() {
    it('calls highlight on tiles within one square', function() {
      placedLetters.add(letter);

      boardView.placedLettersCollection = placedLetters;

      var tileIds = ['tile_7_6', 'tile_7_8', 'tile_6_7', 'tile_8_7']
      var spies = tileIds.map(function(id) {
        var tile = boardTiles.findWhere({ tileId: id });
        return sinon.spy(tile, 'highlight');
      });

      boardView.showHorizontalAndVertical();

      _.each(spies, function(spy) {
        expect(spy.calledOnce).to.be(true);
        spy.restore();
      });
      clearUp();
    });
  });

  describe('#_nothingPlayed', function() {
    it('returns true when no letters or words have been played', function() {
      expect(boardView._nothingPlayed()).to.be(true);
    });
  });
});
