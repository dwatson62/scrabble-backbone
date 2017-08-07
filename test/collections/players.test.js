define([
  'underscore',
  'scrabble'
], function (_, Scrabble) {

  describe('Players Collection', function() {
    var collection;
    var player1;
    var player2;

    beforeEach(function() {
      player1 = new Scrabble.Player('Daryl');
      player2 = new Scrabble.Player('Brian');
      collection = new Scrabble.Players([player1, player2]);
    });

    describe('#initialize', function() {
      it('activates the first player', function() {
        expect(_.first(collection.models).get('active')).to.be(true);
      });
    });

    describe('#currentPlayer', function() {
      it('returns the currently active player', function() {
        expect(collection.currentPlayer()).to.eql(player1);
      });
    });

    describe('#nextPlayerTurn', function() {
      it('next player in the collection becomes the currentPlayer', function() {
        collection.nextPlayerTurn();
        expect(collection.currentPlayer()).to.eql(player2);
      });

      it('returns to first player in list when all others have had their turn', function() {
        collection.nextPlayerTurn();
        collection.nextPlayerTurn();
        expect(collection.currentPlayer()).to.eql(player1);
      });
    });
  });
});
