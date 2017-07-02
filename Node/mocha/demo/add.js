var nextYear = (function (){
	var startYear = 2017;
	return function () {
		return startYear += 1;
	}
})();

exports.nextYear = nextYear;