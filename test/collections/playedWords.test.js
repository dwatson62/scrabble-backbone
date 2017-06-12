var Scrabble = Scrabble || {};

describe('Played Words Collection', function() {
  var collection;
  var centreLetter;

  beforeEach(function() {
    collection = new Scrabble.PlayedWords();
  });

  describe('#createWord', function() {
    it('creates a new Word instance and adds to the collection', function() {
      var data = [{
        placedLetters: [{ value: 'c' },
                        { value: 'a' },
                        { value: 't' }],
        text: 'House pet',
        word: 'cat'
      }];
      var newWord = collection.createWord(data);

      expect(collection.length).to.eql(1);
      expect(newWord.get('meaning')).to.eql('House pet');
      expect(newWord.get('points')).to.eql(5);
      expect(newWord.get('value')).to.eql('cat');
    });
  });
});
