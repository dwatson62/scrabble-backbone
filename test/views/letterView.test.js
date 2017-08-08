define([
  'underscore',
  'backbone',
  'scrabble',
  'letterSelection',
  'mocha'
], function (_, Backbone, Scrabble, letterSelection) {

  describe('Letter View', function() {
    var letter;
    var collection;
    var player;
    var view;

    beforeEach(function() {
      letterSelection.reset();
      letter = Scrabble.LetterFactory.create();
      collection = new Scrabble.PlayerLetters([letter]);
      player = Scrabble.PlayerFactory.create();
      view = new Scrabble.LetterView({
        model: letter,
        player: player
      });
    });

    describe('#letterClicked', function() {
      it('selects letter and adds to letterSelection', function() {
        view.letterClicked();

        expect(letter.get('status')).to.eql('selected');
        expect(letterSelection.letters).to.eql([letter]);
      });
    });

    describe('#selectedLetterClicked', function() {
      it('unselects letter and player replaces letter', function() {
        view.letterClicked();
        view.selectedLetterClicked();

        expect(letter.get('status')).to.eql('unselected');
        expect(letterSelection.letters).to.eql([]);
      });
    });
  });
});