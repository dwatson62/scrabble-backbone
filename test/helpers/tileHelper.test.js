var Scrabble = Scrabble || {};
var helper = tileHelper;

describe('Tile Helper', function() {
  describe('#oneTileBelow', function() {
    it('returns the tile immediately below the given tileId', function() {
      expect(helper.oneTileBelow('tile_7_7')).to.eql('tile_8_7');
    });
  });

  describe('#oneTileAbove', function() {
    it('returns the tile immediately above the given tileId', function() {
      expect(helper.oneTileAbove('tile_7_7')).to.eql('tile_6_7');
    });
  });

  describe('#oneTileToLeft', function() {
    it('returns the tile immediately above the given tileId', function() {
      expect(helper.oneTileToLeft('tile_7_7')).to.eql('tile_7_6');
    });
  });

  describe('#oneTileToRight', function() {
    it('returns the tile immediately above the given tileId', function() {
      expect(helper.oneTileToRight('tile_7_7')).to.eql('tile_7_8');
    });
  });
});
