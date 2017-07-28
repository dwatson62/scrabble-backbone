define([
  'underscore',
  'backbone',
  'scrabble',
  'letterSelection',
], function (_, Backbone, Scrabble, letterSelection) {

  describe('Tile View', function() {
    var boardView;
    var letter;
    var tile;
    var view;

    beforeEach(function() {
      letter = Scrabble.LetterFactory.create();
      tile = Scrabble.TileFactory.create();

      boardView = Scrabble.BoardViewFactory.create();

      view = new Scrabble.TileView({
        model: tile,
        parentView: boardView
      });
    });

    describe('#emptyTileClicked', function() {
      it('places letter on tile', function() {
        letterSelection.pickup(letter);
        view.emptyTileClicked();

        expect(tile.letter).to.eql(letter);
      });
    });
  });
});
