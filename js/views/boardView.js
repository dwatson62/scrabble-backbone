var Scrabble = Scrabble || {};

Scrabble.BoardView = Backbone.View
  .extend(letterSelection)
  .extend(tileHighlighter)
  .extend(dictionaryHelper)
  .extend({
  el: '#scrabble-board',

  events: {},

  initialize: function(context) {
    this.boardTilesCollection = context.boardTiles;
    this.placedLettersCollection = context.placedLettersCollection;
    this.players = context.players;
    this.render();

    this.listenTo(Backbone, 'board:cancelPlacedLetters', this.cancelPlacedLetters);
    this.listenTo(Backbone, 'board:playWordClicked', this.playWordClicked);
    this.listenTo(Backbone, 'board:highlightAllTiles', this.highlightAllTiles);
    this.listenTo(Backbone, 'board:letterClicked', this.letterClicked);
  },

  render: function() {
    var self = this;
    _.each(self.boardTilesCollection.models, function(tile) {
      self.renderTile(tile);
    });
    return this;
  },

  renderTile: function(tile) {
    var domId = '#' + tile.get('tileId');
    var tileView = new Scrabble.TileView({
      el: $(domId),
      model: tile,
      parentView: this
    });
    this.$el.find(domId).append(tileView.render().el);
  },

  letterClicked: function() {
    this.unhighlightAllTiles();
    this.highlightAvailableTiles();
  },

  playWordClicked: function() {
    this.prepareWordsForSubmission();
  },

  cancelPlacedLetters: function() {
    this.placedLettersCollection.reset();
    this.boardTilesCollection.returnAllPlacedTiles();
    this.highlightAllTiles();
  }
});
