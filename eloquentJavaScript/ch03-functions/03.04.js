// http://eloquentjavascript.net/03_functions.html#h_y6WGSsYfER

var launchMissiles = function(value) {
  missileSystem.launch("now");
};
if (safeMode)
  launchMissiles = function(value) {/* do nothing */};
