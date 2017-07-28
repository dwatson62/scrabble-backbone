define([
  'underscore',
  'backbone',
  'scrabble',
  'letterSelection',
], function (_, Backbone, Scrabble, letterSelection) {

  describe('Player Dashboard View', function() {
    var bag;
    var collection;
    var letter1;
    var letter2;
    var player1;
    var player2;
    var playerCollection;
    var view;

    beforeEach(function() {
      letterSelection.reset();
      letter1 = Scrabble.LetterFactory.create({ 'value': 'a' });
      letter2 = Scrabble.LetterFactory.create({ 'value': 'b' });
      bag = new Scrabble.LettersBagFactory([letter1, letter2]);
      collection = new Scrabble.PlayerLetters([letter1]);

      player1 = Scrabble.PlayerFactory.create();
      player2 = Scrabble.PlayerFactory.create({ 'name': 'Bob' });

      playerCollection = new Scrabble.Players([player1, player2]);

      view = new Scrabble.PlayerDashboardView({
        bag: bag,
        collection: collection,
        model: player1
      });
    });

    describe('#playWordButtonClicked', function() {
      it('returns false if no letters have been placed', function() {
        expect(view.playWordButtonClicked()).to.be(false);
      });

      it('triggers event if letters have been placed', function() {
        var tile = Scrabble.TileFactory.create();
        letter1.place(tile);

        var viewSpy = sinon.stub(Backbone, 'trigger');
        view.playWordButtonClicked();

        expect(viewSpy.calledOnce).to.be(true);
      });
    });

    describe('#switchLetterButtonClicked', function() {
      it('replaces the currently selected letter and ends players turn', function() {
        letterSelection.pickup(letter1);
        view.switchLetterButtonClicked();

        expect(collection.first()).to.eql(letter2);
        expect(player1.get('active')).to.eql(false);
        expect(player2.get('active')).to.eql(true);
      });

      it('cannot switch a letter if nothing is selected', function() {
        view.switchLetterButtonClicked();

        expect(collection.first()).to.eql(letter1);
        expect(player1.get('active')).to.eql(true);
      });

      it('cannot switch if any letters have been placed', function() {
        letterSelection.pickup(letter2);
        var tile = Scrabble.TileFactory.create();
        letter1.place(tile);
        view.switchLetterButtonClicked();

        expect(player1.get('active')).to.eql(true);
      });
    });
  });
});
