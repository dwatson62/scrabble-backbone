var Scrabble = Scrabble || {};

describe('PlacedLetters Collection', function() {
  var collection;
  var centreLetter;

  beforeEach(function() {
    collection = new Scrabble.PlacedLetters();
    centreLetter = new Scrabble.Letter({ value: 'a', uid: 1, tileId: 'tile_7_7' });
  });

  describe('First and Last tileids', function() {
    beforeEach(function() {
      var letter = new Scrabble.Letter({ value: 'b', uid: 2, tileId: 'tile_7_8' });

      collection.add(centreLetter);
      collection.add(letter);
    });

    it('#firstTileId returns tileId of first letter', function() {
      expect(collection.firstTileId()).to.eql('tile_7_7');
    });

    it('#lastTileId returns tileId of last letter', function() {
      expect(collection.lastTileId()).to.eql('tile_7_8');
    });
  });

  describe('#determineDirection', function() {
    it('returns null if less than two letters have been played', function() {
      expect(collection.determineDirection()).to.eql(null);
    });

    it('can calculate when tiles are placed horizontally', function() {
      var letter = new Scrabble.Letter({ value: 'b', uid: 2, tileId: 'tile_7_8' });

      collection.add(centreLetter);
      collection.add(letter);

      expect(collection.determineDirection()).to.eql('horizontal');
    });

    it('can calculate when tiles are placed vertically', function() {
      var letter = new Scrabble.Letter({ value: 'b', uid: 2, tileId: 'tile_6_7' });

      collection.add(centreLetter);
      collection.add(letter);

      expect(collection.determineDirection()).to.eql('vertical');
    });
  });

  describe('#comparator', function() {
    it('correctly sorts based on tileNumber', function() {
      collection.add(new Scrabble.Letter({ tileNumber: 49 }));
      collection.add(new Scrabble.Letter({ tileNumber: 48 }));
      collection.add(new Scrabble.Letter({ tileNumber: 50 }));

      expect(collection.pluck('tileNumber')).to.eql([48, 49, 50]);
      collection.reset();
    });
  });

  describe('#assembleWord', function() {
    it('correctly assembles the word', function() {
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_9', value: 'c' }));
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_10', value: 'a' }));
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_11', value: 't' }));

      expect(collection.assembleWord()).to.eql('cat');
    });
  });

  describe('#valueWithBonus', function() {
    it('converts to object with value and bonus', function() {
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_9', value: 'c' }));
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_10', value: 'a' }));
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_11', value: 't', bonusMultiplier: 'doubleletter' }));

      expect(collection.valueWithBonus()).to.eql([
        { value: 'c', bonus: undefined },
        { value: 'a', bonus: undefined },
        { value: 't', bonus: 'doubleletter' }
      ]);
    });
  });
});
