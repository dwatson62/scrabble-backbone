define([
  'tileHelper',
  'mocha'
], function (tileHelper) {

  describe('Tile Helper', function() {
    var helper = tileHelper;

    describe('#oneTileBelow', function() {
      it('returns the tile immediately below the given tileNumber', function() {
        expect(helper.oneTileBelow(112)).to.eql(127);
      });

      it('returns undefined if out of bounds', function() {
        expect(helper.oneTileBelow(224)).to.be(undefined);
      });
    });

    describe('#oneTileAbove', function() {
      it('returns the tile immediately above the given tileNumber', function() {
        expect(helper.oneTileAbove(112)).to.eql(97);
      });

      it('returns undefined if out of bounds', function() {
        expect(helper.oneTileAbove(0)).to.be(undefined);
      });
    });

    describe('#oneTileToLeft', function() {
      it('returns the tile immediately above the given tileNumber', function() {
        expect(helper.oneTileToLeft(112)).to.eql(111);
      });

      it('returns undefined if out of bounds', function() {
        expect(helper.oneTileToLeft(0)).to.be(undefined);
      });
    });

    describe('#oneTileToRight', function() {
      it('returns the tile immediately above the given tileNumber', function() {
        expect(helper.oneTileToRight(111)).to.eql(112);
      });

      it('returns undefined if out of bounds', function() {
        expect(helper.oneTileToRight(14)).to.be(undefined);
      });
    });
  });
});
