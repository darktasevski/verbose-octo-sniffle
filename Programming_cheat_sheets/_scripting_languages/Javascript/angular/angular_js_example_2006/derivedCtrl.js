(function(){
	// the `derivedCtrlModule` variable is private to this file
	var derivedCtrlModule = angular.module('derivedCtrlModule', []);

	// a cntroller is a property of the 'myApp' module
	derivedCtrlModule.controller('DerivedCtrl', ['$http', function($http){
		mySelf = this;

		mySelf.message = 'hello there from DerivedCtrl in derivedCtrlModule';

		mySelf.doSomething = function(){
			alert('doing something for DerivedCtrl in derivedCtrlModule');
		};
	}]);
})();