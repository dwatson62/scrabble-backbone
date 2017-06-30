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

  var placeLetter = function(letter, tileNumber) {
    var tile = boardTiles.fetchTile(tileNumber);
    letter.place(tile);
    tile.receiveLetter(letter);
    placedLetters.add(letter);
  };

  var confirmLetter = function(letter) {
    var tileNumber = letter.get('tileNumber');
    var tile = boardTiles.fetchTile(tileNumber);
    tile.confirm();
    letter.confirm();
  };

  describe('#prepareMainWord', function() {
    it('assembles just the placed letters if there are no surrounding letters', function() {
      var c = Scrabble.LetterFactory.create({ value: 'a' });
      placeLetter(c, 112);
      var a = Scrabble.LetterFactory.create({ value: 'c' });
      placeLetter(a, 111);
      var t = Scrabble.LetterFactory.create({ value: 't' });
      placeLetter(t, 113);

      expect(boardView.prepareMainWord()).to.eql('cat');
    });

    it('assembles placed letters with surrounding letters', function() {
      var c = Scrabble.LetterFactory.create({ value: 'a' });
      placeLetter(c, 112);
      var a = Scrabble.LetterFactory.create({ value: 'c' });
      placeLetter(a, 111);
      var t = Scrabble.LetterFactory.create({ value: 't' });
      placeLetter(t, 113);

      var s = Scrabble.LetterFactory.create({ value: 's' });
      placeLetter(s, 114);
      confirmLetter(s);

      var o = Scrabble.LetterFactory.create({ value: 'o' });
      placeLetter(o, 110);
      confirmLetter(o);

      expect(boardView.prepareMainWord()).to.eql('ocats');
    });
  });
});
