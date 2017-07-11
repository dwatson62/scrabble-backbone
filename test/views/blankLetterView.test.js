var Scrabble = Scrabble || {};

describe('Blank Letter View', function() {
  var letter;
  var view;

  beforeEach(function() {
    letter = Scrabble.LetterFactory.create({ value: 'blank' });
    view = new Scrabble.BlankLetterView();
  });

  describe('#displayModal', function() {
    it('updates the model in use and calls render', function() {
      var viewSpy = sinon.stub(view, 'render');
      view.displayModal(letter);

      expect(view.model).to.eql(letter);
      expect(viewSpy.calledOnce).to.be(true);
    });
  });

  describe('#updateBlankLetter', function() {
    it('hides modal, updates letter with given value and triggers the correct event', function() {
      var viewSpy = sinon.stub(view, 'hideModal');
      var letterSpy = sinon.spy(letter, 'trigger');
      view.model = letter;

      view.updateBlankLetter('x');

      expect(letter.get('value')).to.eql('x');
      expect(letterSpy.calledWith('letter:placeLetter')).to.be(true);
      expect(viewSpy.calledOnce).to.be(true);
    });
  });

  describe('#valid', function() {
    it('returns true if input is a letter', function() {
      expect(view.valid('a')).to.be(true);
    });

    it('returns false if input is not a letter', function() {
      expect(view.valid('1')).to.be(false);
      expect(view.valid('.')).to.be(false);
    });
  });
});
