var Scrabble = Scrabble || {};
var letterSelection = letterSelection;

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

  describe('#switchLetterButtonClicked', function() {
    it('replaces the currently selected letter and ends players turn', function() {
      letterSelection.pickup(letter1);
      view.switchLetterButtonClicked();

      expect(collection.first()).to.eql(letter2);
      expect(player1.get('active')).to.eql(false);
      expect(player2.get('active')).to.eql(true);
    });
  });
});
