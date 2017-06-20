var Scrabble = Scrabble || {};

describe('Player', function() {
  var player = new Scrabble.Player('Bob');
  var letter = Scrabble.LetterFactory.create();

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

  describe('#updateScore()', function() {
    it('updates the players score', function() {
      player.updateScore(5);

      expect(player.get('score')).to.eql(5);
    });
  });
});
