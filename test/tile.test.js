describe('Tile', function() {
  var tile = new Scrabble.Tile({ x: 0, y:0 });

  describe('#convertToCoords()', function() {
    it('returns array indices to correct coordinates', function() {
      var tile = new Scrabble.Tile({ x: 10, y: 12 });
      expect(tile.convertToCoords()).to.eql('K13');
    });
  });

  describe('#fetchTile()', function() {
    it('returns no bonus', function() {
      var tile = new Scrabble.Tile({ x: 0, y: 1 });
      expect(tile.fetchTile()).to.eql('empty');
    });

    it('returns correct tripleword bonus', function() {
      var tile = new Scrabble.Tile({ x: 0, y: 0 });
      expect(tile.fetchTile()).to.eql('tripleword');
    });

    it('returns correct doubleletter bonus', function() {
      var tile = new Scrabble.Tile({ x: 0, y: 3 });
      expect(tile.fetchTile()).to.eql('doubleletter');
    });
  });
});
