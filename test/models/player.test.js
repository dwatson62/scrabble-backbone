var Scrabble = Scrabble || {};

describe('Player', function() {
  var player = new Scrabble.Player('Bob');
  var letter = Scrabble.LetterFactory.create('a');

  describe('#pickUpLetter()', function() {
    it('the selectedLetter gets updated', function() {
      player.pickUpLetter(letter);

      expect(player.selectedLetter).to.eql(letter);
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
    it('the selectedLetter gets erased', function() {
      player.pickUpLetter(letter);

      player.replaceLetter(letter);
      expect(player.selectedLetter).to.eql(undefined);
    });
  });

  describe('#activate()', function() {
    it('sets active to true', function() {
      player.activate();
      expect(player.get('active')).to.be(true);
    });
  });

  describe('#deactivate()', function() {
    it('sets active to false', function() {
      player.activate();
      player.deactivate();

      expect(player.get('active')).to.be(false);
    });
  });
});
