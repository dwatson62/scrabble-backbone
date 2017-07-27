var Scrabble = Scrabble || {};

describe('Player Turn Helper', function() {
  var boardTiles;
  var boardView;
  var placedLetters;
  var players;

  beforeEach(function() {
    boardView = Scrabble.BoardViewFactory.create();
    boardTiles = boardView.boardTilesCollection;
    placedLetters = boardView.placedLettersCollection;
    players = boardView.players;
  });

  describe('#completeTurn', function() {
    it('calls #failedTurn if there are any words that failed', function() {
      boardView.failedWords = ['asdfg'];
      var boardSpy = sinon.spy(boardView, 'failedTurn');

      boardView.completeTurn();

      expect(boardSpy.calledOnce).to.be(true);
      boardSpy.restore();
    });

    it('calls #successfulTurn if there are no words that failed', function() {
      boardView.failedWords = [];
      var boardSpy = sinon.spy(boardView, 'successfulTurn');

      boardView.completeTurn();

      expect(boardSpy.calledOnce).to.be(true);
      boardSpy.restore();
    });
  });

  describe('#endTurn', function() {
    it('clears all word submissions, highlights all tiles and ends players turn', function() {
      var currentPlayer = boardView.players.currentPlayer();
      boardView.endTurn();

      expect(boardView.wordSubmissions).to.eql([]);
      expect(boardView.succesfulWords).to.eql([]);
      expect(boardView.failedWords).to.eql([]);
      expect(boardView.players.currentPlayer()).not.to.eql(currentPlayer);
    });
  });
});
