describe('Letter', function() {
  var letter = new Scrabble.Letter({ value: 'a', uid: 1 });

  describe('#choose()', function() {
    it('updates status to selected', function() {
      letter.choose(letter);
      expect(letter.get('status')).to.eql('selected');
    });
  });

  describe('#unselect()', function() {
    it('updates status to unselected', function() {
      letter.unselect(letter);
      expect(letter.get('status')).to.eql('unselected');
    });
  });

  describe('#place()', function() {
    it('updates status to placed', function() {
      letter.place(letter);
      expect(letter.get('status')).to.eql('placed');
    });
  });
});
