(function(){
	// the `app` variable is private to this file because of the closure

	// adding another module as a dependency (it seems that the loading of the javascript files in the HTML do not matter)
	// by adding another module as a dependency, I can use it's attributes, for example: the other module's controllers
	var app = angular.module('myApp', ['anotherModule', 'baseCtrlModule','derivedCtrlModule']);

	// a cntroller is a property of the 'myApp' module
	app.controller('FooCtrl', ['$http', 'BazFactory', function($http, BazFactory){  // BazFactory is from `anotherModule`
		Foo = this;

		Foo.message = 'hello from FooCtrl';

		Foo.doSomething = function(){
			alert('doing something in FooCtrl');
			BazFactory.objAction();
			alert(BazFactory.objMessage);
		};
	}]);
})();
