describe('Player', function() {
  var player = new Scrabble.Player('Bob');
  var letter = new Scrabble.Letter({ value: 'a', uid: 1 });

  describe('#pickUpLetter()', function() {
    it('the selectedLetter gets updated', function() {
      player.pickUpLetter(letter);
      expect(player.selectedLetter).to.eql(letter);
    });
  });
});
