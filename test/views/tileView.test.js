var Scrabble = Scrabble || {};

describe('Tile View', function() {
  var letter;
  var tile;
  var collection;
  var playerCollection;
  var player;
  var view;
  var parentView;

  beforeEach(function() {
    letter = Scrabble.LetterFactory.create('a');
    collection = new Scrabble.PlacedLetters();
    player = new Scrabble.Player();
    playerCollection = new Scrabble.Players([player]);
    tile = new Scrabble.TileFactory.create();

    parentView = new Scrabble.BoardView({
      boardTiles: new Scrabble.BoardTiles(),
      placedLettersCollection: collection,
      players: playerCollection
    });

    view = new Scrabble.TileView({
      model: tile,
      parentView: parentView
    });
  });

  describe('#emptyTileClicked', function() {
    it('places letter on tile', function() {
      player.pickUpLetter(letter);

      view.emptyTileClicked();

      expect(tile.letter).to.eql(letter);
    });
  });
});
