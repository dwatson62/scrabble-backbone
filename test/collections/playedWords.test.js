define([
  'scrabble'
], function (Scrabble) {

  describe('Played Words Collection', function() {
    var collection;
    var centreLetter;
    var player;

    beforeEach(function() {
      collection = new Scrabble.PlayedWords();
      player = new Scrabble.Player('Bob');
    });

    describe('#createWord', function() {
      it('creates a new Word instance and adds to the collection', function() {
        var data = {
          player: player,
          placedLetters: [{ value: 'c' },
                          { value: 'a' },
                          { value: 't' }],
          text: 'House pet',
          word: 'cat'
        };
        var newWord = collection.createWord(data);

        expect(collection.length).to.eql(1);
        expect(newWord.get('meaning')).to.eql('House pet');
        expect(newWord.get('points')).to.eql(5);
        expect(newWord.get('value')).to.eql('cat');
      });
    });
  });
});
