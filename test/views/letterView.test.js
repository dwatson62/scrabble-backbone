var Scrabble = Scrabble || {};

describe('Letter View', function() {
  var letter;
  var collection;
  var player;
  var view;

  beforeEach(function() {
    letter = Scrabble.LetterFactory.create();
    collection = new Scrabble.PlayerLetters();
    collection.add(letter);
    player = new Scrabble.Player();
    view = new Scrabble.LetterView({
      model: letter,
      player: player
    });
  });

  describe('#letterClicked', function() {
    it('selects letter and player picks up letter', function() {
      view.letterClicked();

      expect(letter.get('status')).to.eql('selected');
      expect(player.selectedLetter).to.eql(letter);
    });
  });

  describe('#selectedLetterClicked', function() {
    it('unselects letter and player replaces letter', function() {
      view.letterClicked();
      view.selectedLetterClicked();

      expect(letter.get('status')).to.eql('unselected');
      expect(player.selectedLetter).to.be(undefined);
    });
  });
});
