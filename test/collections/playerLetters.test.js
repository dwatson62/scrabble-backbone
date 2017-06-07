describe('PlayerLetters Collection', function() {
  var bag;
  var collection;

  beforeEach(function() {
    bag = new Scrabble.LettersBag();
    collection = new Scrabble.PlayerLetters();
    collection.add(bag.retrieve(7))
  });

  describe('#fetchLetter', function() {
    it('fetches letter from collection using uid', function() {
      var letter = collection.first();
      expect(collection.fetchLetter(letter.get('uid'))).to.eql(letter);
    });
  });

  describe('#unselectAll', function() {
    it('unselects all letters', function() {
      collection.first().choose();
      collection.unselectAll();

      var allLetters = _.map(collection.models, function(letter) {
        return letter.get('status')
      });

      expect(_.every(allLetters, function(letter) {
        return letter == 'unselected';
      })).to.be(true);
    });
  });

  describe('#removeUsed', function() {
    it('removes all letters that have been placed', function() {
      _.each(collection.first(2), function(letter) {
        letter.place();
      });

      collection.removeUsed()
      expect(collection.length).to.eql(5);
    });
  });

  describe('#replaceWithNewLetters', function() {
    it('replaces used letters with new ones', function() {
      collection.first().place();
      var newLetter = bag.retrieve(1);
      collection.replaceWithNewLetters(newLetter);

      expect(collection.length).to.eql(7);
      expect(_.first(newLetter).collection).to.eql(collection);
    });
  });
});
