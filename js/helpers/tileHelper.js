define([], function () {

  var tileHelper = {
    boundaryLeft: [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210],
    boundaryRight: [14, 29, 44, 59, 74, 89, 104, 119, 134, 149, 164, 179, 194, 209, 224],

    oneTileBelow: function(tileNumber) {
      if (tileNumber <= 210) {
        return tileNumber + 15;
      }
    },

    oneTileAbove: function(tileNumber) {
      if (tileNumber >= 15) {
        return tileNumber - 15;
      }
    },

    oneTileToLeft: function(tileNumber) {
      if (this.boundaryLeft.indexOf(tileNumber) === -1) {
        return tileNumber - 1;
      }
    },

    oneTileToRight: function(tileNumber) {
      if (this.boundaryRight.indexOf(tileNumber) === -1) {
        return tileNumber + 1;
      }
    }
  };

  return tileHelper;
});
