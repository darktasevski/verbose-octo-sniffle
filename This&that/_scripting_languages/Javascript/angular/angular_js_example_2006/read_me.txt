Gotchas:
	- use 'ng-controller FooCtrl as Foo' notation, so you dont get lost when there are nested controllers
	- did you include the .js file in the index.html ???
		- causes Error: $injector:modulerr Module Error

	- ngApp, typos, including js file in html
	- dependency injection
	- ng-repeat should be on the repeated html element
	- controllers privide functionality to a div
	- set $scope.foo inside and outside a $http.get() function
	- use $http inside a cunction
	- dont pass a $scope to a factory
	
	- to separate out your files, you should wrap them in a closure, and use the following notation:
		angular.module('myApp')
			.controller('FooCtrl', function(){ ... });













http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/


Factory:  (like an object)
	- When you’re using a Factory you create an object, add properties to it, then return that same object. 
	  When you pass this service into your controller, those properties on the object will now be available 
	  in that controller through your factory.

Service:
	- When you’re using Service, it’s instantiated with the 'new' keyword. Because of that, you’ll add properties 
	  to 'this' and the service will return 'this'. When you pass the service into your controller, 
	  those properties on 'this' will now be available on that controller through your service.

Providers:
	- Providers are the only service you can pass into your .config() function. Use a provider when you want 
	  to provide module-wide configuration for your service object before making it available.
