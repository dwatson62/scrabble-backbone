define([
  'underscore',
  'backbone',
  'scrabble',
], function (_, Backbone, Scrabble) {

  describe('Letter', function() {
    var letter = Scrabble.LetterFactory.create();

    describe('#choose()', function() {
      it('updates status to selected', function() {
        letter.choose(letter);
        expect(letter.get('status')).to.eql('selected');
      });
    });

    describe('#unselect()', function() {
      it('updates status to unselected', function() {
        letter.unselect(letter);
        expect(letter.get('status')).to.eql('unselected');
      });
    });

    describe('#resetState()', function() {
      it('resets all states', function() {
        letter.place(letter);
        letter.resetState();

        expect(letter.get('status')).to.eql('unselected');
        expect(letter.get('bonusMultiplier')).to.eql(null);
        expect(letter.get('tileNumber')).to.eql(null);
      });

      it('if letter is a blank, returns to default setting', function() {
        var blank = Scrabble.LetterFactory.create({ value: 'blank' });
        blank.updateValue('b');

        blank.resetState();

        expect(blank.get('value')).to.eql('blank');
      });
    });

    describe('#place()', function() {
      it('updates status to placed', function() {
        letter.place(letter);
        expect(letter.get('status')).to.eql('placed');
      });
    });

    describe('#updateValue()', function() {
      it('updates value', function() {
        letter.updateValue('x');
        expect(letter.get('value')).to.eql('x');
      });
    });
  });
});
