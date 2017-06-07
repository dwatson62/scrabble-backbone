describe('BoardTiles Collection', function() {
  var collection = new Scrabble.BoardTiles();
  var letter = new Scrabble.Letter({ value: 'a', uid: 1, tileId: 'tile_7_7' });

  describe('#createBoard', function() {
    it('creates a large collection of Tiles', function() {
      expect(collection.models.length).to.eql(225);
      expect(collection.models[0]).to.be.a(Scrabble.Tile);
    });
  });

  describe('#fetchTile', function() {
    it('finds the tile from a collection when passed a tileId', function() {
      var tile = collection.fetchTile('tile_7_7');
      expect(tile.get('tileId')).to.eql('tile_7_7');
    });
  });

  describe('#allPlacedTiles', function() {
    it('returns all tiles that have a letter placed on it', function() {
      collection.findWhere({ tileId: 'tile_7_7' }).receiveLetter(letter);

      expect(collection.allPlacedTiles().length).to.eql(1);
    });
  });

  describe('#findAndHighlight', function() {
    it('highlights given tile', function() {
      var tile = collection.findWhere({ tileId: 'tile_7_8' });
      tile.unhighlight();

      collection.findAndHighlight(tile);
      expect(tile.get('highlight')).to.eql('highlight');
    });
  });

  describe('#highlightCentreTile', function() {
    it('highlights the centre tile', function() {
      var tile = collection.centreTile;
      tile.unhighlight();

      collection.highlightCentreTile();
      expect(tile.get('highlight')).to.eql('highlight');
    });
  });

  describe('#highlightAllPlacedTiles', function() {
    it('highlights all placed tiles', function() {
      var placedTile = collection.findWhere({ tileId: 'tile_7_7' });
      placedTile.receiveLetter(letter);

      collection.highlightAllPlacedTiles()
      expect(placedTile.get('highlight')).to.eql('highlight');
    });
  });

  describe('#highlightUsedTiles', function() {
    it('highlights all placed tiles', function() {
      var placedTile = collection.findWhere({ tileId: 'tile_7_7' });
      placedTile.receiveLetter(letter);

      collection.highlightAllPlacedTiles()
      expect(placedTile.get('highlight')).to.eql('highlight');
    });
  });

  describe('#highlightAllTiles', function() {
    it('calls highlight on all tiles', function() {
      collection.first().unhighlight();
      collection.highlightAllTiles();
      var allTiles = _.map(collection.models, function(tile) {
        return tile.get('highlight')
      });

      expect(_.every(allTiles, function(tile) {
        return tile == 'highlight';
      })).to.be(true);
    });
  });

  describe('#unhighlightAllTiles', function() {
    it('calls unhighlight on all tiles', function() {
      collection.unhighlightAllTiles();
      var allTiles = _.map(collection.models, function(tile) {
        return tile.get('highlight')
      });

      expect(_.every(allTiles, function(tile) {
        return tile == 'unhighlight';
      })).to.be(true);
    });
  });

  describe('#showNextAvailableTiles', function() {
    it('calls showHorizontalTiles when given direction of horizontal', function() {
      var collectionSpy = sinon.spy(collection, 'showHorizontalTiles');

      collection.showNextAvailableTiles('horizontal', 'tile_7_7', 'tile_7_7');
      expect(collectionSpy.calledOnce).to.be(true);
    });

    it('calls showVerticalTiles when given direction of vertical', function() {
      var collectionSpy = sinon.spy(collection, 'showVerticalTiles');

      collection.showNextAvailableTiles('vertical', 'tile_7_7', 'tile_7_7');
      expect(collectionSpy.calledOnce).to.be(true);
    });
  });

  describe('#showAllNeighbourTiles', function() {
    it('calls showHorizontalAndVertical with all given tiles', function() {
      var letter = new Scrabble.Letter({ value: 'a', uid: 1, tileId: 'tile_7_6' });
      collection.findWhere({ tileId: 'tile_7_6' }).receiveLetter(letter);
      var collectionSpy = sinon.spy(collection, 'showHorizontalAndVertical');

      collection.showAllNeighbourTiles();
      expect(collectionSpy.calledTwice).to.be(true);
    });
  });

  describe('#_firstTileNotPlaced', function() {
    it('returns the first tile that is not already placed going left', function() {
      var letter = new Scrabble.Letter({ value: 'a', uid: 1, tileId: 'tile_7_6' });
      collection.findWhere({ tileId: 'tile_7_6' }).receiveLetter(letter);
      letter = new Scrabble.Letter({ value: 'a', uid: 1, tileId: 'tile_7_5' });
      collection.findWhere({ tileId: 'tile_7_5' }).receiveLetter(letter);

      expect(collection._firstTileNotPlaced('tile_7_7', 'oneTileToLeft')).to.eql('tile_7_4')
    });

    it('returns the first tile that is not already placed going right', function() {
      var letter = new Scrabble.Letter({ value: 'a', uid: 1, tileId: 'tile_7_8' });
      collection.findWhere({ tileId: 'tile_7_8' }).receiveLetter(letter);
      letter = new Scrabble.Letter({ value: 'a', uid: 1, tileId: 'tile_7_9' });
      collection.findWhere({ tileId: 'tile_7_9' }).receiveLetter(letter);

      expect(collection._firstTileNotPlaced('tile_7_7', 'oneTileToRight')).to.eql('tile_7_10')
    });
  });
});
