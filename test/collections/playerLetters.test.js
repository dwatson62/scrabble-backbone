describe('PlayerLetters Collection', function() {
  var bag;
  var collection;
  var tile;

  beforeEach(function() {
    bag = new Scrabble.LettersBag();
    collection = new Scrabble.PlayerLetters();
    collection.add(bag.retrieve(7))
    tile = new Scrabble.Tile({
            count: 0,
            x: 0,
            y: 0
          });
  });

  describe('#fetchLetter', function() {
    it('fetches letter from collection using uid', function() {
      var letter = collection.first();
      expect(collection.fetchLetter(letter.get('uid'))).to.eql(letter);
    });
  });

  describe('#unselectAll', function() {
    it('unselects all selected letters', function() {
      _.first(collection.models).choose();
      _.last(collection.models).place(tile);
      collection.unselectAll();

      expect(_.first(collection.models).get('status')).to.eql('unselected');
      expect(_.last(collection.models).get('status')).to.eql('placed');
    });
  });

  describe('#removeUsed', function() {
    it('removes all letters that have been placed', function() {
      _.each(collection.first(2), function(letter) {
        letter.place(tile);
      });

      collection.removeUsed()
      expect(collection.length).to.eql(5);
    });
  });

  describe('#replaceWithNewLetters', function() {
    it('replaces used letters with new ones', function() {
      collection.first().place(tile);
      var newLetter = bag.retrieve(1);
      collection.replaceWithNewLetters(newLetter);

      expect(collection.length).to.eql(7);
      expect(_.first(newLetter).collection).to.eql(collection);
    });
  });
});
