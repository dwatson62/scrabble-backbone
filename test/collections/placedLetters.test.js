describe('PlacedLetters Collection', function() {
  var collection = new Scrabble.PlacedLetters();
  var centreLetter = new Scrabble.Letter({ value: 'a', uid: 1, tileId: 'tile_7_7' });

  describe('#determineDirection', function() {
    it('returns null if less than two letters have been played', function() {
      expect(collection.determineDirection()).to.eql(null);
    });

    it('can calculate when tiles are placed horizontally', function() {
      var letter = new Scrabble.Letter({ value: 'b', uid: 2, tileId: 'tile_7_8' });

      collection.add(centreLetter);
      collection.add(letter);

      expect(collection.determineDirection()).to.eql('horizontal');
      collection.reset();
    });

    it('can calculate when tiles are placed vertically', function() {
      var letter = new Scrabble.Letter({ value: 'b', uid: 2, tileId: 'tile_6_7' });

      collection.add(centreLetter);
      collection.add(letter);

      expect(collection.determineDirection()).to.eql('vertical');
      collection.reset();
    });
  });

  describe('#comparator', function() {
    it('correctly sorts based on tileId', function() {
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_7' }));
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_10' }));
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_11' }));

      expect(collection.pluck('tileId')).to.eql(['tile_6_7', 'tile_6_10', 'tile_6_11'])
      collection.reset();
    });
  });

  describe('#assembleWord', function() {
    it('correctly assembles the word', function() {
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_7', value: 'c' }));
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_10', value: 'a' }));
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_11', value: 't' }));

      expect(collection.assembleWord()).to.eql('cat')
      collection.reset();
    });
  });

  describe('#calculateScore', function() {
    it('correctly calculates score of letters placed', function() {
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_7', points: 1 }));
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_10', points: 2 }));
      collection.add(new Scrabble.Letter({ tileId: 'tile_6_11', points: 3 }));

      expect(collection.calculateScore()).to.eql(6)
      collection.reset();
    });
  });
});
