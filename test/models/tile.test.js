define([
  'underscore',
  'backbone',
  'scrabble',
  'mocha'
], function (_, Backbone, Scrabble) {

  describe('Tile', function() {
    var tile = Scrabble.TileFactory.create();
    var letter = Scrabble.LetterFactory.create();

    describe('#_generateTileId()', function() {
      it('generates the correct tile id based on array indices', function() {
        var tile = Scrabble.TileFactory.create({ x: 1, y: 2 });
        expect(tile._generateTileId()).to.eql('tile_1_2');
      });
    });

    describe('#_generateTileNumber()', function() {
      it('generates the correct tile id based on array indices', function() {
        var tile = Scrabble.TileFactory.create({ x: 1, y: 2 });
        expect(tile._generateTileNumber()).to.eql(17);
      });
    });

    describe('#_fetchTile()', function() {
      it('returns no bonus', function() {
        var tile = Scrabble.TileFactory.create({ y: 1 });
        expect(tile._fetchTile()).to.eql('empty');
      });

      it('returns correct tripleword bonus', function() {
        var tile = Scrabble.TileFactory.create();
        expect(tile._fetchTile()).to.eql('tripleword');
      });

      it('returns correct doubleletter bonus', function() {
        var tile = Scrabble.TileFactory.create({ y: 3 });
        expect(tile._fetchTile()).to.eql('doubleletter');
      });
    });

    describe('#receiveLetter()', function() {
      it('stores the letter and updates attributes', function() {
        tile.receiveLetter(letter);

        expect(tile.letter).to.eql(letter);
        expect(tile.get('status')).to.eql('placed');
        expect(tile.get('tileSrc')).to.eql(letter.get('imageSrc'));
      });
    });

    describe('#returnLetter()', function() {
      it('returns the letter and updates attributes', function() {
        tile.returnLetter(letter);

        expect(tile.letter).to.eql(undefined);
        expect(tile.get('status')).to.eql('empty');
        expect(tile.get('tileSrc')).to.eql(tile.get('defaultTileSrc'));
      });
    });

    describe('#highlight()', function() {
      it('sets highlight attribute', function() {

        tile.highlight();
        expect(tile.get('highlight')).to.eql('highlight');
      });
    });

    describe('#unhighlight()', function() {
      it('sets unhighlight attribute', function() {

        tile.unhighlight();
        expect(tile.get('highlight')).to.eql('unhighlight');
      });
    });

    describe('#confirm()', function() {
      it('sets status as confirmed', function() {
        tile.confirm();
        expect(tile.get('status')).to.eql('confirmed');
      });
    });

    describe('#isPlaced()', function() {
      it('returns true if tile is placed', function() {
        tile.receiveLetter(letter);
        expect(tile.isPlaced()).to.be(true);
      });

      it('returns false if tile is not placed', function() {
        tile.receiveLetter(letter);
        expect(tile.isPlaced()).to.be(true);
      });
    });
  });
});
