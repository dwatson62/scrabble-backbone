var Scrabble = Scrabble || {};

describe('Dictionary Helper', function() {
  var boardTiles;
  var boardView;
  var placedLetters;

  beforeEach(function() {
    boardTiles = new Scrabble.BoardTiles();
    placedLetters = new Scrabble.PlacedLetters();

    boardView = new Scrabble.BoardView({
      boardTiles: boardTiles,
      placedLettersCollection: placedLetters
    });
  });

  describe('#prepareMainWord', function() {
    it('assembles just the placed letters if there are no surrounding letters', function() {
      var c = Scrabble.LetterFactory.create({ value: 'a', tileNumber: 112 });
      placeLetter(c);
      var a = Scrabble.LetterFactory.create({ value: 'c', tileNumber: 111 });
      placeLetter(a);
      var t = Scrabble.LetterFactory.create({ value: 't', tileNumber: 113 });
      placeLetter(t);

      expect(boardView.prepareMainWord()).to.eql('cat');
    });

    it('assembles placed letters with surrounding letters', function() {
      var c = Scrabble.LetterFactory.create({ value: 'a', tileNumber: 112 });
      placeLetter(c);
      var a = Scrabble.LetterFactory.create({ value: 'c', tileNumber: 111 });
      placeLetter(a);
      var t = Scrabble.LetterFactory.create({ value: 't', tileNumber: 113 });
      placeLetter(t);

      var s = Scrabble.LetterFactory.create({ value: 's', tileNumber: 114 });
      placeLetter(s);
      confirmLetter(s);

      var o = Scrabble.LetterFactory.create({ value: 'o', tileNumber: 110 });
      placeLetter(o);
      confirmLetter(o);

      expect(boardView.prepareMainWord()).to.eql('ocats');
    });

    var placeLetter = function(letter) {
      var tile = boardTiles.fetchTile(letter.get('tileNumber'));
      letter.place(tile);
      tile.receiveLetter(letter);
      placedLetters.add(letter);
    };

    var confirmLetter = function(letter) {
      var tile = boardTiles.fetchTile(113);
      tile.confirm();
      letter.confirm();
    };
  });
});
