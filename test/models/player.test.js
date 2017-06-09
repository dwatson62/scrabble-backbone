var Scrabble = Scrabble || {};

describe('Player', function() {
  var player = new Scrabble.Player('Bob');
  var letter = new Scrabble.Letter({ value: 'a', uid: 1 });

  describe('#pickUpLetter()', function() {
    it('the selectedLetter gets updated and letter gets chosen', function() {
      player.pickUpLetter(letter);

      expect(player.selectedLetter).to.eql(letter);
      expect(letter.get('status')).to.eql('selected');
    });
  });

  describe('#putDownLetter()', function() {
    it('the letters gets placed and selectedLetter gets erased', function() {
      player.pickUpLetter(letter);

      player.putDownLetter(letter);
      expect(player.selectedLetter).to.eql(undefined);
      expect(letter.get('status')).to.eql('placed');
    });
  });

  describe('#replaceLetter()', function() {
    it('the letters gets replaced and selectedLetter gets erased', function() {
      player.pickUpLetter(letter);

      player.replaceLetter(letter);
      expect(player.selectedLetter).to.eql(undefined);
      expect(letter.get('status')).to.eql('unselected');
    });
  });
});
