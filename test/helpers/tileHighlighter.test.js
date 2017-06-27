var Scrabble = Scrabble || {};

describe('Tile Highlighter Helper', function() {
  var boardTiles;
  var boardView;
  var letter;

  beforeEach(function() {
    boardTiles = new Scrabble.BoardTiles();

    boardView = new Scrabble.BoardView({
      boardTiles: boardTiles,
      placedLettersCollection: new Scrabble.PlacedLetters()
    });

    letter = new Scrabble.Letter({ tileId: 'tile_7_7' });
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
      boardTiles.findWhere({ tileId: 'tile_7_7' }).receiveLetter(letter);

      var boardSpy = sinon.spy(boardView, 'showHorizontalAndVertical');
      boardView.highlightAvailableTiles();

      expect(boardSpy.calledOnce).to.be(true);
      boardSpy.restore();
    });

    it('calls showNextAvailableTiles when more than 1 letter has been placed', function() {
      boardView.placedLettersCollection.add(letter);
      boardTiles.findWhere({ tileId: 'tile_7_7' }).receiveLetter(letter);

      var secondLetter = new Scrabble.Letter({ tileId: 'tile_7_8' });
      boardView.placedLettersCollection.add(secondLetter);
      boardTiles.findWhere({ tileId: 'tile_7_8' }).receiveLetter(secondLetter);

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

  describe('#cancelPlacedLetters', function() {
    it('resets placedLettersCollection, returns all placedTiles and highlights the board', function() {
      var boardTilesSpy = sinon.spy(boardTiles, 'returnAllPlacedTiles');
      var boardViewSpy = sinon.spy(boardView, 'highlightAllTiles');

      boardView.cancelPlacedLetters();

      expect(boardView.placedLettersCollection.length).to.eql(0);
      expect(boardTilesSpy.calledOnce).to.be(true);
      expect(boardViewSpy.calledOnce).to.be(true);

      boardTilesSpy.restore();
      boardViewSpy.restore();
    });
  });

  describe('#_nothingPlayed', function() {
    it('returns true when no letters or words have been played', function() {
      expect(boardView._nothingPlayed()).to.be(true);
    });

    it('returns false if a tile has a letter placed', function() {
      boardTiles.findWhere({ tileId: 'tile_7_7' }).receiveLetter(letter);
      expect(boardView._nothingPlayed()).to.be(false);
    });

    it('returns false if a tile has a letter confirmed', function() {
      boardTiles.findWhere({ tileId: 'tile_7_7' }).confirm();
      expect(boardView._nothingPlayed()).to.be(false);
    });
  });
});
