// IIFE - immediately-invoked function expression (a self-executing anonymous
// function).
// IIFE Example:
(function countToTen() {
	for (i = 1; i < 11; i++) {
		console.log(i);
	}
})();

/* 
Fix this code:

var smartCar = {;
var smartCarMPG = function(totalMiles, totalGallons){
	return{
		calculateMpg : function(){
			console.log("MPG: ");
			return totalMiles / totalGallons;
		}
	};
};

smartCar.mpg = smartCarMPG(____, 15);
consoLe.log(smartCar.mpg);
console.Log(smartCar._____.calculateMpg());
*/


var smartCar = {};
var smartCarMPG = function(totalMiles, totalGallons) {
		calculateMpg = function() {
			console.log("MPG: " + (totalMiles/totalGallons));
			return totalMiles/totalGallons;
	};
};

smartCarMPG(230, 15);



