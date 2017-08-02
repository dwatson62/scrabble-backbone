require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    expect: '../vendor/index.js',
    scrabble: '../js/scrabble',

    boardTilesTest: 'collections/boardTiles',
    lettersBagTest: 'collections/lettersBag',
    placedLettersTest: 'collections/placedLetters',
    playedWordsTest: 'collections/playedWords',
    playerLettersTest: 'collections/playerLetters',
    playersTest: 'collections/players',

    dictionaryHelperTest: 'helpers/dictionaryHelper',
    letterHelperTest: 'helpers/letterHelper',
    playerTurnHelperTest: 'helpers/playerTurnHelper',
    tileHelperTest: 'helpers/tileHelper',
    tileHighlighterTest: 'helpers/tileHighlighter',

    letterTest: 'models/letter',
    playerTest: 'models/player',
    tileTest: 'models/tile',

    blankLetterViewTest: 'views/blankLetterView',
    boardViewTest: 'views/boardView',
    invalidWordViewTest: 'views/invalidWordView',
    letterViewTest: 'views/letterView',
    playerDashboardViewTest: 'views/playerDashboardView',
    tileViewTest: 'views/tileView',




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
  'backbone', 'jquery', 'scrabble',

  'lettersBag', 'playedWords', 'placedLetters', 'playerLetters', 'players', 'boardTiles',

  'tileHelper', 'tileHighlighter', 'letterHelper', 'letterSelection', 'dictionaryHelper',
  'playerTurnHelper',

  'letter', 'tile', 'word', 'player',

  'boardViewFactory','letterFactory','lettersBagFactory','playerFactory','tileFactory',

  'baseModalView', 'blankLetterView', 'boardView', 'invalidWordView', 'letterView', 'playedWordsView',
  'playerDashboardView','tileView', 'wordView',
], function() {
  mocha.run();
});
