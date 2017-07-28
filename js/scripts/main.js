/*global require*/
'use strict';

require.config({
  shim: {
  },
  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    backbone: '../../bower_components/backbone/backbone',
    underscore: '../../bower_components/underscore/underscore',
    scrabble: '../scrabble',
    game: '../game',

    boardTiles: '../collections/boardTiles',
    lettersBag: '../collections/lettersBag',
    placedLetters: '../collections/placedLetters',
    playedWords: '../collections/playedWords',
    playerLetters: '../collections/playerLetters',
    players: '../collections/players',

    dictionaryHelper: '../helpers/dictionaryHelper',
    letterHelper: '../helpers/letterHelper',
    letterSelection: '../helpers/letterSelection',
    playerTurnHelper: '../helpers/playerTurnHelper',
    tileHelper: '../helpers/tileHelper',
    tileHighlighter: '../helpers/tileHighlighter',

    letter: '../models/letter',
    player: '../models/player',
    tile: '../models/tile',
    word: '../models/word',

    baseModalView: '../views/baseModalView',
    blankLetterView: '../views/blankLetterView',
    boardView: '../views/boardView',
    invalidWordView: '../views/invalidWordView',
    letterView: '../views/letterView',
    playedWordsView: '../views/playedWordsView',
    playerDashboardView: '../views/playerDashboardView',
    tileView: '../views/tileView',
    wordView: '../views/wordView'
  }
});

require([
  'backbone', 'game', 'jquery', 'scrabble',

  'lettersBag', 'playedWords', 'placedLetters', 'playerLetters', 'players', 'boardTiles',

  'tileHelper', 'tileHighlighter', 'letterHelper', 'letterSelection', 'dictionaryHelper',
  'playerTurnHelper',

  'letter', 'tile', 'word', 'player',

  'baseModalView', 'blankLetterView', 'boardView', 'invalidWordView', 'letterView', 'playedWordsView',
  'playerDashboardView','tileView', 'wordView',
], function (_, Game, $) {
  _.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g
  };

  $(document).ready(function() {
    var game = new Game();
    game.create();
  });
});
