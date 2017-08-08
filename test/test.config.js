require.config({
  shim: {
    'mocha': {
      init: function () {
        this.mocha.setup('bdd');
        this.mocha.checkLeaks();
        return this.mocha;
      }
    }
  },

  paths: {
    mocha: '../bower_components/mocha/mocha',
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    sinon: '../bower_components/sinon-browser-only/sinon',
    expect: '../vendor/index',
    scrabble: '../js/scrabble',

    boardTilesTest: 'collections/boardTiles.test',
    lettersBagTest: 'collections/lettersBag.test',
    placedLettersTest: 'collections/placedLetters.test',
    playedWordsTest: 'collections/playedWords.test',
    playerLettersTest: 'collections/playerLetters.test',
    playersTest: 'collections/players.test',

    dictionaryHelperTest: 'helpers/dictionaryHelper.test',
    letterHelperTest: 'helpers/letterHelper.test',
    playerTurnHelperTest: 'helpers/playerTurnHelper.test',
    tileHelperTest: 'helpers/tileHelper.test',
    tileHighlighterTest: 'helpers/tileHighlighter.test',

    letterTest: 'models/letter.test',
    playerTest: 'models/player.test',
    tileTest: 'models/tile.test',

    blankLetterViewTest: 'views/blankLetterView.test',
    boardViewTest: 'views/boardView.test',
    invalidWordViewTest: 'views/invalidWordView.test',
    letterViewTest: 'views/letterView.test',
    playerDashboardViewTest: 'views/playerDashboardView.test',
    tileViewTest: 'views/tileView.test',




    boardTiles: '../js/collections/boardTiles',
    lettersBag: '../js/collections/lettersBag',
    placedLetters: '../js/collections/placedLetters',
    playedWords: '../js/collections/playedWords',
    playerLetters: '../js/collections/playerLetters',
    players: '../js/collections/players',

    dictionaryHelper: '../js/helpers/dictionaryHelper',
    letterHelper: '../js/helpers/letterHelper',
    letterSelection: '../js/helpers/letterSelection',
    playerTurnHelper: '../js/helpers/playerTurnHelper',
    tileHelper: '../js/helpers/tileHelper',
    tileHighlighter: '../js/helpers/tileHighlighter',

    letter: '../js/models/letter',
    player: '../js/models/player',
    tile: '../js/models/tile',
    word: '../js/models/word',

    boardViewFactory: '../js/factories/boardView',
    letterFactory: '../js/factories/letter',
    lettersBagFactory: '../js/factories/lettersBag',
    playerFactory: '../js/factories/player',
    tileFactory: '../js/factories/tile',

    baseModalView: '../js/views/baseModalView',
    blankLetterView: '../js/views/blankLetterView',
    boardView: '../js/views/boardView',
    invalidWordView: '../js/views/invalidWordView',
    letterView: '../js/views/letterView',
    playedWordsView: '../js/views/playedWordsView',
    playerDashboardView: '../js/views/playerDashboardView',
    tileView: '../js/views/tileView',
    wordView: '../js/views/wordView'
  }
});

require([
  'mocha', 'backbone', 'jquery', 'scrabble', 'sinon',

  'lettersBag', 'playedWords', 'placedLetters', 'playerLetters', 'players', 'boardTiles',

  'tileHelper', 'tileHighlighter', 'letterHelper', 'letterSelection', 'dictionaryHelper',
  'playerTurnHelper',

  'letter', 'tile', 'word', 'player',

  'boardViewFactory','letterFactory','lettersBagFactory','playerFactory','tileFactory',

  'baseModalView', 'blankLetterView', 'boardView', 'invalidWordView', 'letterView', 'playedWordsView',
  'playerDashboardView','tileView', 'wordView',

  'boardTilesTest', 'lettersBagTest', 'placedLettersTest', 'playedWordsTest', 'playerLettersTest',
  'playersTest',

  'dictionaryHelperTest', 'letterHelperTest', 'playerTurnHelperTest', 'tileHelperTest', 'tileHighlighterTest',

  'letterTest', 'playerTest', 'tileTest',

  'blankLetterViewTest', 'boardViewTest', 'invalidWordViewTest', 'letterViewTest', 'playerDashboardViewTest',
  'tileViewTest',
], function(mocha) {
  mocha.setup('bdd');
  mocha.run();
});
