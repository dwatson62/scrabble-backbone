define([
  'lettersBag',
  'mocha'
], function (LettersBag) {

  describe('Letters Bag Collection', function() {
    var collection = new LettersBag();

    describe('#retrieve', function() {
      it('removes given number of letters from collection', function() {
        var originalLength = collection.length;
        collection.retrieve(5);
        expect(collection.length).to.eql(originalLength - 5);
      });
    });
  });
});
