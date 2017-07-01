(function(){
	// the `baseCtrlModule` variable is private to this file
	var baseCtrlModule = angular.module('baseCtrlModule', []);

	// a cntroller is a property of the 'myApp' module
	baseCtrlModule.controller('BaseCtrl', ['$http', function($http){
		mySelf = this;

		mySelf.message = 'hello there from BaseCtrl in baseCtrlModule';

		mySelf.doSomething = function(){
			alert('doing something for BaseCtrl in baseCtrlModule');
		};
	}]);
})();