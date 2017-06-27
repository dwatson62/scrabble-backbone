var tileHelper = {
  oneTileBelow: function(tileId) {
    var splitId = tileId.split('_');
    splitId[1] = String(parseInt(splitId[1]) + 1);
    return splitId.join('_');
  },

  oneTileAbove: function(tileId) {
    var splitId = tileId.split('_');
    splitId[1] = String(parseInt(splitId[1]) - 1);
    return splitId.join('_');
  },

  oneTileToLeft: function(tileId) {
    var splitId = tileId.split('_');
    splitId[2] = String(parseInt(splitId[2]) - 1);
    return splitId.join('_');
  },

  oneTileToRight: function(tileId) {
    var splitId = tileId.split('_');
    splitId[2] = String(parseInt(splitId[2]) + 1);
    return splitId.join('_');
  }
};
