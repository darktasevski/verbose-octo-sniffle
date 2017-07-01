(function(){
	// the `anotherModule` variable is private to this file
	var anotherModule = angular.module('anotherModule', []);

	// a cntroller is a property of the 'myApp' module
	anotherModule.controller('BarCtrl', ['$http', function($http){
		Bar = this;

		Bar.message = 'hello there from BarCtrl in anotherModule';

		Bar.doSomething = function(){
			alert('doing something for BarCtrl in anotherModule');
		};

	}]);


	//----------------- factory in another module:
	// since I am including `anotherModule` in the `myApp` module, I can include this factory in `myApp`'s controllers!
	anotherModule.factory('BazFactory', function(){
		var obj = {};

		obj.objMessage = 'hello from a factory';
		obj.objAction = function(){
			alert('work from a factory');
		};

		return obj;
	});

})();