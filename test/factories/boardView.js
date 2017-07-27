var Scrabble = Scrabble || {};

Scrabble.BoardViewFactory = Backbone.View.extend(_, {
  create: function(context) {
    context = context || {};

    var boardTiles = context.boardTiles || new Scrabble.BoardTiles();
    var placedLettersCollection = context.boardTiles || new Scrabble.PlacedLetters();
    var players = context.players || new Scrabble.Players(
      [Scrabble.PlayerFactory.create(), Scrabble.PlayerFactory.create()]
    );

    return new Scrabble.BoardView({
      boardTiles: boardTiles,
      placedLettersCollection: placedLettersCollection,
      players: players
    });
  }
});
