define([
  'underscore',
  'backbone',
  'scrabble',
], function (_, Backbone, Scrabble) {
  describe('Dictionary Helper', function() {
    var boardTiles;
    var boardView;
    var placedLetters;

    beforeEach(function() {
      boardView = Scrabble.BoardViewFactory.create();
      boardTiles = boardView.boardTilesCollection;
      placedLetters = boardView.placedLettersCollection;
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
        var a = Scrabble.LetterFactory.create({ value: 'a' });
        placeLetter(a, 112);
        var c = Scrabble.LetterFactory.create({ value: 'c' });
        placeLetter(c, 111);
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

    describe('Hook words', function() {
      it('does not look up from letters that are already confirmed', function() {
        var a = Scrabble.LetterFactory.create({ value: 'a' });
        placeLetter(a, 112);
        confirmLetter(a);
        var c = Scrabble.LetterFactory.create({ value: 'c' });
        placeLetter(c, 111);
        confirmLetter(c);
        var t = Scrabble.LetterFactory.create({ value: 't' });
        placeLetter(t, 113);
        confirmLetter(t);

        boardView.placedLettersCollection.confirmAndClear();
        boardView.endTurn();

        expect(boardView.placedLettersCollection.length).to.eql(0);

        var p = Scrabble.LetterFactory.create({ value: 'p' });
        placeLetter(p, 97);
        var l = Scrabble.LetterFactory.create({ value: 'l' });
        placeLetter(l, 127);

        boardView.prepareMainWord();
        boardView.prepareHookWords();
        expect(boardView.wordSubmissions).to.eql(['pal']);
      });
    });
  });
});
