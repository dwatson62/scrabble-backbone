var Scrabble = Scrabble || {};

Scrabble.PlayerFactory = Backbone.Model.extend(_, {
  create: function(context) {
    context = context || {};

    return new Scrabble.Player({
      name: context.name || 'Daryl'
    });
  }
});
