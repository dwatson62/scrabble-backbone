describe('BoardView', function() {
  var player;
  var boardTiles;
  var playedWordsView;
  var boardView;
  var placedLetters;
  var letter;

  beforeEach(function() {
    player = new Scrabble.Player('Daryl');
    boardTiles = new Scrabble.BoardTiles();
    playedWordsView = new Scrabble.PlayedWordsView();

    boardView = new Scrabble.BoardView({
      boardTiles: boardTiles,
      placedLettersCollection: new Scrabble.PlacedLetters(),
      playedWordsView: playedWordsView,
      players: [player],
    });

    letter = new Scrabble.Letter({ tileId: 'tile_7_7' });
  });

  describe('#currentPlayer', function() {
    it('returns the current player', function() {
      expect(boardView.currentPlayer()).to.eql(player);
    });
  });

  describe('#highlightAvailableTiles', function() {
    it('calls highlightCentreTile when no letters have been placed', function() {
      var boardSpy = sinon.spy(boardView, 'highlightCentreTile');
      boardView.highlightAvailableTiles();

      expect(boardSpy.calledOnce).to.be(true);
      boardSpy.restore();
    });

    it('calls showHorizontalAndVertical when 1 letter has been placed', function() {
      boardView.placedLettersCollection.add(letter);

      var boardSpy = sinon.spy(boardView, 'showHorizontalAndVertical');
      boardView.highlightAvailableTiles();

      expect(boardSpy.calledOnce).to.be(true);
      boardSpy.restore();
    });

    it('calls showNextAvailableTiles when more than 1 letter has been placed', function() {
      var secondLetter = new Scrabble.Letter({ tileId: 'tile_7_7' });
      boardView.placedLettersCollection.add(letter);
      boardView.placedLettersCollection.add(secondLetter);

      var boardSpy = sinon.spy(boardView, 'showNextAvailableTiles');
      boardView.highlightAvailableTiles();

      expect(boardSpy.calledOnce).to.be(true);
      boardSpy.restore();
    });
  });

  describe('#highlightCentreTile', function() {
    it('calls highlight on the centre tile', function() {
      var highlightSpy = sinon.spy(boardTiles.centreTile, 'highlight');
      boardView.highlightCentreTile();

      expect(highlightSpy.calledOnce).to.be(true);
      highlightSpy.restore();
    });
  });

  describe('#showHorizontalAndVertical', function() {
    it('calls highlight on tiles within one square', function() {
      boardView.placedLettersCollection.add(letter);

      var tileIds = ['tile_7_6', 'tile_7_8', 'tile_6_7', 'tile_8_7'];
      var spies = tileIds.map(function(id) {
        var tile = boardTiles.findWhere({ tileId: id });
        return sinon.spy(tile, 'highlight');
      });

      boardView.showHorizontalAndVertical();

      _.each(spies, function(spy) {
        expect(spy.calledOnce).to.be(true);
        spy.restore();
      });
    });
  });

  describe('#_nothingPlayed', function() {
    it('returns true when no letters or words have been played', function() {
      // debugger
      expect(boardView._nothingPlayed()).to.be(true);
    });
  });
});
