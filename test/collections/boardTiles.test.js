define([
  'underscore',
  'scrabble',
  'mocha',
  'expect'
], function (_, Scrabble) {

  describe('BoardTiles Collection', function() {
    var collection;
    var letter = Scrabble.LetterFactory.create();

    beforeEach(function() {
      collection = new Scrabble.BoardTiles();
    });

    describe('#createBoard', function() {
      it('creates a large collection of Tiles', function() {
        expect(collection.models.length).to.eql(225);
        expect(collection.models[0]).to.be.a(Scrabble.Tile);
      });
    });

    describe('#fetchTile', function() {
      it('finds the tile from a collection when passed a tileNumber', function() {
        var tile = collection.fetchTile(112);
        expect(tile.get('tileNumber')).to.eql(112);
      });
    });

    describe('#fetchLetter', function() {
      it('finds the letter on a tile when passed a tileNumber', function() {
        var tile = collection.fetchTile(112);
        tile.receiveLetter(letter);

        expect(collection.fetchLetter(112)).to.eql(letter);
      });

      it('returns undefined when no tile is present', function() {
        expect(collection.fetchLetter(113)).to.be(undefined);
      });
    });

    describe('#allPlacedTiles', function() {
      it('returns all tiles that have a letter placed on it', function() {
        collection.findWhere({ tileNumber: 112 }).receiveLetter(letter);

        expect(collection.allPlacedTiles().length).to.eql(1);
      });
    });

    describe('#allConfirmedTiles', function() {
      it('returns all tiles that have a letter confirmed', function() {
        collection.findWhere({ tileNumber: 112 }).confirm();

        expect(collection.allConfirmedTiles().length).to.eql(1);
      });
    });

    describe('#returnAllPlacedTiles', function() {
      it('clears all tiles and replaces all letters that have been letter', function() {
        var tile = collection.findWhere({ tileNumber: 112 });
        tile.receiveLetter(letter);

        collection.returnAllPlacedTiles();
        expect(letter.get('status')).to.eql('unselected');
        expect(tile.get('status')).to.eql('empty');
        expect(tile.letter).to.be(undefined);
      });
    });

    describe('#confirmAllPlacedTiles', function() {
      it('confirms all tiles with a placed letter', function() {
        var tile = collection.findWhere({ tileNumber: 112 });
        tile.receiveLetter(letter);

        collection.confirmAllPlacedTiles();
        expect(tile.get('status')).to.eql('confirmed');
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
        var placedTile = collection.findWhere({ tileNumber: 112 });
        placedTile.receiveLetter(letter);

        collection.highlightAllPlacedTiles();
        expect(placedTile.get('highlight')).to.eql('highlight');
      });
    });

    describe('#highlightUsedTiles', function() {
      it('highlights all placed tiles', function() {
        var placedTile = collection.findWhere({ tileNumber: 112 });
        placedTile.receiveLetter(letter);

        collection.highlightAllPlacedTiles();
        expect(placedTile.get('highlight')).to.eql('highlight');
      });
    });

    describe('#highlightAllTiles', function() {
      it('calls highlight on all tiles', function() {
        collection.first().unhighlight();
        collection.highlightAllTiles();
        var allTiles = _.map(collection.models, function(tile) {
          return tile.get('highlight');
        });

        expect(_.every(allTiles, function(tile) {
          return tile === 'highlight';
        })).to.be(true);
      });
    });

    describe('#unhighlightAllTiles', function() {
      it('calls unhighlight on all tiles', function() {
        collection.unhighlightAllTiles();
        var allTiles = _.map(collection.models, function(tile) {
          return tile.get('highlight');
        });

        expect(_.every(allTiles, function(tile) {
          return tile === 'unhighlight';
        })).to.be(true);
      });
    });

    describe('#showNextAvailableTiles', function() {
      it('calls showHorizontalTiles when given direction of horizontal', function() {
        var collectionSpy = sinon.spy(collection, 'showHorizontalTiles');

        collection.showNextAvailableTiles('horizontal', 112, 113);
        expect(collectionSpy.calledOnce).to.be(true);
      });

      it('calls showVerticalTiles when given direction of vertical', function() {
        var collectionSpy = sinon.spy(collection, 'showVerticalTiles');

        collection.showNextAvailableTiles('vertical', 112, 127);
        expect(collectionSpy.calledOnce).to.be(true);
      });
    });

    describe('#showAllNeighbourTiles', function() {
      it('calls showHorizontalAndVertical on all placed tiles', function() {
        var tile = collection.centreTile;
        tile.receiveLetter(letter);
        var collectionSpy = sinon.spy(collection, 'showHorizontalAndVertical');

        collection.showAllNeighbourTiles();
        expect(collectionSpy.calledWith(tile.get('tileNumber'))).to.be(true);
      });
    });

    describe('#allSurroundingLetters', function() {
      it('returns all letters surrounding a tileNumber when direction is horizontal', function() {
        var firstTile = collection.fetchTile(112);
        firstTile.receiveLetter(letter);

        var secondTile = collection.fetchTile(113);
        var secondLetter = Scrabble.LetterFactory.create({ tileNumber: 113 });
        secondTile.receiveLetter(secondLetter);

        var letters = collection.allSurroundingLetters(112, 'horizontal');

        expect(letters).to.eql([letter, secondLetter]);
      });

      it('returns all letters surrounding a tileNumber when direction is vertical', function() {
        var firstTile = collection.fetchTile(112);
        firstTile.receiveLetter(letter);

        var secondTile = collection.fetchTile(127);
        var secondLetter = Scrabble.LetterFactory.create({ tileNumber: 127 });
        secondTile.receiveLetter(secondLetter);

        var letters = collection.allSurroundingLetters(112, 'vertical');

        expect(letters).to.eql([letter, secondLetter]);
      });
    });

    describe('#_mapTileIdsToLetter', function() {
      it('converts given tileNumbers to their associated letter', function() {
        var firstTile = collection.fetchTile(112);
        firstTile.receiveLetter(letter);

        var secondTile = collection.fetchTile(113);
        var secondLetter = Scrabble.LetterFactory.create({ tileNumber: 111 });
        secondTile.receiveLetter(secondLetter);

        collection._mapTileIdsToLetter([firstTile.get('tileNumber'), secondTile.get('tileNumber')]);
      });
    });

    describe('#_firstAvailableTile', function() {
      it('returns the first tile that is not unavailable going left', function() {
        var letter = Scrabble.LetterFactory.create({ tileNumber: 111 });
        collection.findWhere({ tileNumber: 111 }).receiveLetter(letter);
        letter = Scrabble.LetterFactory.create({ tileNumber: 110 });
        collection.findWhere({ tileNumber: 110 }).receiveLetter(letter);

        expect(collection._firstAvailableTile(112, 'oneTileToLeft')).to.eql(109);
      });

      it('returns the first tile that is not unavailable going right', function() {
        var letter = Scrabble.LetterFactory.create({ tileNumber: 113 });
        collection.findWhere({ tileNumber: 113 }).receiveLetter(letter);
        letter = Scrabble.LetterFactory.create({ tileNumber: 114 });
        collection.findWhere({ tileNumber: 114 }).receiveLetter(letter);

        expect(collection._firstAvailableTile(112, 'oneTileToRight')).to.eql(115);
      });
    });
  });
});
