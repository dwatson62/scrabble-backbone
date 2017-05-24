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
    });

    it('can calculate when tiles are placed vertically', function() {
      var letter = new Scrabble.Letter({ value: 'b', uid: 2, tileId: 'tile_6_7' });

      collection.add(centreLetter);
      collection.add(letter);

      expect(collection.determineDirection()).to.eql('vertical');
    });
  });
});
