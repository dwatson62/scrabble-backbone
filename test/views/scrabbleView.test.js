describe('ScrabbleView', function() {
  var scrabbleView = new Scrabble.ScrabbleView({
    playedWordsCollection: new Scrabble.PlayedWords()
  });

  describe('#playWord', function() {
    it('creates a Word instance and adds to playedWordsCollection', function() {
      scrabbleView.playWord('coffee');

      expect(scrabbleView.playedWordsCollection.length).to.eql(1)
      var word = scrabbleView.playedWordsCollection.at(0)
      expect(word.get('value')).to.eql('coffee');
    });
  });
});
