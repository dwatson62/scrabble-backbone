var Scrabble = Scrabble || {};

describe('BoardView', function() {
  var boardTiles;
  var boardView;
  var letter;

  beforeEach(function() {
    boardTiles = new Scrabble.BoardTiles();

    boardView = new Scrabble.BoardView({
      boardTiles: boardTiles,
      placedLettersCollection: new Scrabble.PlacedLetters()
    });

    letter = new Scrabble.Letter({ tileId: 'tile_7_7' });
  });
});
