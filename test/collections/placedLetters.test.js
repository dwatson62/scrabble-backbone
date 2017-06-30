var Scrabble = Scrabble || {};

describe('PlacedLetters Collection', function() {
  var collection;
  var centreLetter;

  beforeEach(function() {
    collection = new Scrabble.PlacedLetters();
    centreLetter = Scrabble.LetterFactory.create({ tileNumber: 112 });
  });

  describe('tileid getters', function() {
    var letter;

    beforeEach(function() {
      letter = Scrabble.LetterFactory.create({ tileNumber: 113 });

      collection.add(centreLetter);
      collection.add(letter);
    });

    it('#firstTileNumber returns tileNumber of first letter', function() {
      expect(collection.firstTileNumber()).to.eql(112);
    });

    it('#lastTileNumber returns tileNumber of last letter', function() {
      expect(collection.lastTileNumber()).to.eql(113);
    });

    it('#nextTileNumber returns tileNumber of next letter', function() {
      expect(collection.nextTileNumber(112)).to.eql(113);
    });

    it('#nextTileNumber returns undefined if at end of collection of next letter', function() {
      expect(collection.nextTileNumber(113)).to.be(undefined);
    });
  });

  describe('#determineDirection', function() {
    it('returns null if less than two letters have been played', function() {
      expect(collection.determineDirection()).to.eql(null);
    });

    it('can calculate when tiles are placed horizontally', function() {
      var letter = Scrabble.LetterFactory.create({ tileNumber: 113 });

      collection.add(centreLetter);
      collection.add(letter);

      expect(collection.determineDirection()).to.eql('horizontal');
    });

    it('can calculate when tiles are placed vertically', function() {
      var letter = Scrabble.LetterFactory.create({ tileNumber: 97 });

      collection.add(centreLetter);
      collection.add(letter);

      expect(collection.determineDirection()).to.eql('vertical');
    });
  });

  describe('#comparator', function() {
    it('correctly sorts based on tileNumber', function() {
      collection.add(Scrabble.LetterFactory.create({ tileNumber: 49 }));
      collection.add(Scrabble.LetterFactory.create({ tileNumber: 48 }));
      collection.add(Scrabble.LetterFactory.create({ tileNumber: 50 }));

      expect(collection.pluck('tileNumber')).to.eql([48, 49, 50]);
      collection.reset();
    });
  });

  describe('#assembleWord', function() {
    it('correctly assembles the word', function() {
      collection.add(Scrabble.LetterFactory.create({ tileNumber: 98, value: 'c' }));
      collection.add(Scrabble.LetterFactory.create({ tileNumber: 99, value: 'a' }));
      collection.add(Scrabble.LetterFactory.create({ tileNumber: 100, value: 't' }));

      expect(collection.assembleWord()).to.eql('cat');
    });
  });

  describe('#valueWithBonus', function() {
    it('converts to object with value and bonus', function() {
      collection.add(Scrabble.LetterFactory.create({ tileNumber: 98, value: 'c' }));
      collection.add(Scrabble.LetterFactory.create({ tileNumber: 99, value: 'a' }));
      collection.add(Scrabble.LetterFactory.create({ tileNumber: 100, value: 't', bonusMultiplier: 'doubleletter' }));

      expect(collection.valueWithBonus()).to.eql([
        { value: 'c', bonus: undefined },
        { value: 'a', bonus: undefined },
        { value: 't', bonus: 'doubleletter' }
      ]);
    });
  });
});
