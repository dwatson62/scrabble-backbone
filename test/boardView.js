describe('BoardView', function() {
  var boardView = new Scrabble.BoardView();

  describe('#convert()', function() {
    it('returns array indices to correct coordinates', function() {
      expect(boardView.convert(0, 0)).to.eql('A1');
      expect(boardView.convert(10, 12)).to.eql('K13');
    });
  });

  describe('#setTile()', function() {
    it('returns correct tile bonus', function() {
      expect(boardView.setTile(0, 0)).to.eql('tripleword');
      expect(boardView.setTile(0, 1)).to.eql('empty');
      expect(boardView.setTile(0, 3)).to.eql('doubleletter');
    });
  });
});
