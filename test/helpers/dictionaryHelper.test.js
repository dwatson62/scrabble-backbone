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
      var c = Scrabble.LetterFactory.create({ value: 'a', tileId: 'tile_7_7', tileNumber: 112 });
      placeLetter(c);
      var a = Scrabble.LetterFactory.create({ value: 'c', tileId: 'tile_7_6', tileNumber: 111 });
      placeLetter(a);
      var t = Scrabble.LetterFactory.create({ value: 't', tileId: 'tile_7_8', tileNumber: 113 });
      placeLetter(t);

      expect(boardView.prepareMainWord()).to.eql('cat');
    });

    it('assembles placed letters with surrounding letters', function() {
      var c = Scrabble.LetterFactory.create({ value: 'a', tileId: 'tile_7_7', tileNumber: 112 });
      placeLetter(c);
      var a = Scrabble.LetterFactory.create({ value: 'c', tileId: 'tile_7_6', tileNumber: 111 });
      placeLetter(a);
      var t = Scrabble.LetterFactory.create({ value: 't', tileId: 'tile_7_8', tileNumber: 113 });
      placeLetter(t);

      var s = Scrabble.LetterFactory.create({ value: 's', tileId: 'tile_7_9', tileNumber: 114 });
      placeLetter(s);
      confirmLetter(s);

      var o = Scrabble.LetterFactory.create({ value: 'o', tileId: 'tile_7_5', tileNumber: 110 });
      placeLetter(o);
      confirmLetter(o);

      expect(boardView.prepareMainWord()).to.eql('ocats');
    });

    var placeLetter = function(letter) {
      var tile = boardTiles.fetchTile(letter.get('tileId'));
      letter.place(tile);
      tile.receiveLetter(letter);
      placedLetters.add(letter);
    };

    var confirmLetter = function(letter) {
      var tile = boardTiles.fetchTile('tile_7_9');
      tile.confirm();
      letter.confirm();
    };
  });
});
