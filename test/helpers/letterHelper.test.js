var Scrabble = Scrabble || {};

describe('Letter Helper', function() {
  var helper = new Scrabble.LetterHelper();

  describe('#calculatePoints', function() {
    it('correctly calculates score of given letters', function() {
      var letters = ['c', 'a', 't'];
      expect(helper.calculatePoints(letters)).to.eql(5);
    });
  });
});
