var Scrabble = Scrabble || {};
var letterSelection = letterSelection;

describe('Tile View', function() {
  var letter;
  var tile;
  var collection;
  var playerCollection;
  var player;
  var view;
  var parentView;

  beforeEach(function() {
    letter = Scrabble.LetterFactory.create();
    collection = new Scrabble.PlacedLetters();
    tile = new Scrabble.TileFactory.create();

    parentView = new Scrabble.BoardView({
      boardTiles: new Scrabble.BoardTiles(),
      placedLettersCollection: collection
    });

    view = new Scrabble.TileView({
      model: tile,
      parentView: parentView
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
