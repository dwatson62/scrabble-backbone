describe('BoardTiles Collection', function() {
  var collection = new Scrabble.BoardTiles();
  var tile = new Scrabble.Tile({ x: 0, y: 0 });
  var centreLetter = new Scrabble.Letter({ value: 'a', uid: 1, tileId: 'tile_7_7' });

  describe('#createBoard', function() {
    it('creates a large collection of Tiles', function() {
      expect(collection.models.length).to.eql(225)
      expect(collection.models[0]).to.be.a(Scrabble.Tile)
    });
  });

  describe('#oneTileBelow', function() {
    it('returns the tile immediately below the given tileId', function() {
      expect(collection.oneTileBelow('tile_7_7')).to.eql('tile_8_7')
    });
  });

  describe('#oneTileAbove', function() {
    it('returns the tile immediately above the given tileId', function() {
      expect(collection.oneTileAbove('tile_7_7')).to.eql('tile_6_7')
    });
  });

  describe('#oneTileToLeft', function() {
    it('returns the tile immediately above the given tileId', function() {
      expect(collection.oneTileToLeft('tile_7_7')).to.eql('tile_7_6')
    });
  });

  describe('#oneTileToRight', function() {
    it('returns the tile immediately above the given tileId', function() {
      expect(collection.oneTileToRight('tile_7_7')).to.eql('tile_7_8')
    });
  });

  describe('#showNextAvailableTiles', function() {
    it('calls showHorizontalTiles when given direction of horizontal', function() {
      var collectionSpy = sinon.spy(collection, 'showHorizontalTiles');

      collection.showNextAvailableTiles('horizontal', 'tile_7_7', 'tile_7_7')
      expect(collectionSpy.calledOnce).to.be(true);
    });

    it('calls showVerticalTiles when given direction of vertical', function() {
      var collectionSpy = sinon.spy(collection, 'showVerticalTiles');

      collection.showNextAvailableTiles('vertical', 'tile_7_7', 'tile_7_7')
      expect(collectionSpy.calledOnce).to.be(true);
    });
  });
});
