define([
  'letterHelper'
], function (letterHelper) {

  describe('Letter Helper', function() {
    var helper = letterHelper;

    describe('#calculatePoints', function() {
      it('correctly calculates score of given letters', function() {
        var letters = [{ value: 'c' },
                       { value: 'a' },
                       { value: 't' }];
        expect(helper.calculatePoints(letters)).to.eql(5);
      });

      it('correctly calculates score with doubleletter bonus', function() {
        var letters = [{ value: 'c', bonus: 'doubleletter' },
                       { value: 'a', bonus: undefined },
                       { value: 't', bonus: undefined }];
        expect(helper.calculatePoints(letters)).to.eql(8);
      });

      it('correctly calculates score with tripleletter bonus', function() {
        var letters = [{ value: 'c', bonus: 'tripleletter' },
                       { value: 'a', bonus: undefined },
                       { value: 't', bonus: undefined }];
        expect(helper.calculatePoints(letters)).to.eql(11);
      });

      it('correctly calculates score with doubleword bonus', function() {
        var letters = [{ value: 'c', bonus: undefined },
                       { value: 'a', bonus: undefined },
                       { value: 't', bonus: 'doubleword' }];
        expect(helper.calculatePoints(letters)).to.eql(10);
      });

      it('correctly calculates score with tripleword bonus', function() {
        var letters = [{ value: 'c', bonus: undefined },
                       { value: 'a', bonus: 'tripleword' },
                       { value: 't', bonus: undefined }];
        expect(helper.calculatePoints(letters)).to.eql(15);
      });

      it('correctly calculates score with letter and word bonus', function() {
        var letters = [{ value: 'c', bonus: 'doubleletter' },
                       { value: 'a', bonus: 'tripleword' },
                       { value: 't', bonus: undefined }];
        expect(helper.calculatePoints(letters)).to.eql(24);
      });

      it('correctly calculates bingo bonus with other bonuses', function() {
        var letters = [{ value: 'd', bonus: 'doubleletter' },
                       { value: 'a', bonus: undefined },
                       { value: 'z', bonus: 'tripleword' },
                       { value: 'z', bonus: undefined },
                       { value: 'l', bonus: undefined },
                       { value: 'e', bonus: undefined },
                       { value: 'd', bonus: undefined }];
        expect(helper.calculatePoints(letters)).to.eql(137);
      });
    });
  });
});
