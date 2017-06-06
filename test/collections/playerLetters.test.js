describe('PlayerLetters Collection', function() {
  var bag = new Scrabble.LettersBag();
  var collection = new Scrabble.PlayerLetters();
  collection.add(bag.retrieve(7))

  describe('#removeUsed', function() {
    it('removes all letters that have been placed', function() {
      _.each(collection.first(2), function(letter) {
        letter.place();
      });

      collection.removeUsed()
      expect(collection.length).to.eql(5);
    });
  });
});
