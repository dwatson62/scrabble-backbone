var Scrabble = Scrabble || {};

describe('Invalid Word View', function() {
  var word = ['cjat'];
  var view;

  beforeEach(function() {
    view = new Scrabble.InvalidWordView();
  });

  describe('#displayModal', function() {
    it('calls render', function() {
      var viewSpy = sinon.stub(view, 'render');
      view.displayModal(word);

      expect(viewSpy.calledOnce).to.be(true);
    });
  });
});
