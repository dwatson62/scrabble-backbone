/*global require*/
'use strict';

require.config({
  shim: {
  },
  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    backbone: '../../bower_components/backbone/backbone',
    underscore: '../../bower_components/underscore/underscore',
    scrabble: '../models/letter'  }
});

require([
  'backbone', 'scrabble'
], function (Backbone) {
  Backbone.history.start();
});
