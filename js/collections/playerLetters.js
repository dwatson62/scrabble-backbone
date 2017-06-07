var Scrabble = Scrabble || {};

Scrabble.PlayerLetters = Backbone.Collection.extend({
  fetchLetter: function(uid) {
    return this.findWhere({ uid: parseInt(uid) });
  },

  unselectAll: function() {
    _.each(this.models, function(letter) {
      letter.unselect();
    });
  },

  removeUsed: function() {
    this.remove(this.where({ status: 'placed' }));
  },

  replaceWithNewLetters: function(newLetters) {
    this.removeUsed();
    this.add(newLetters);
  }
});
