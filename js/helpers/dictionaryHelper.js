var Scrabble = Scrabble || {};

Scrabble.DictionaryHelper = Backbone.Helper.extend({
  playWord: function(word, success, failure) {
    var config = { params: { 'word': word } };

    $.get('/word', config)
      .done(function(response) {
        if (response.length === 0) {
          failure(word);
        } else {
          success(response);
        }
      });
  }
});
