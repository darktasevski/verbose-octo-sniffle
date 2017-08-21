AngularJS Introduction : Part Three
===================================

### [Prev: Controllers & Markup](https://github.com/scottoffen/ps-notes/blob/master/angularjs/introduction/angularjs-introduction-02.md) ###

# Services #

A service is a worker object that performs some sort of (typically reusable) business logic. While it is not accessed "over the wire" (i.e. a web service), it may be used to perform operations that do, such as make AJAX calls.  Services are generally stateless, although it is not unusual for services to cache data that is accessed frequently.

Services facilitate reusablility and ease of maintenance. You don't want to put all of your logic inside of a controller as that would be difficult to maintain and would violate the [single responsibility principle](https://github.com/scottoffen/ps-notes/blob/master/solid-introduction.md#single-responsibility-principle) (SRP).

Services can be injected into your controllers - and other services - that need them. This also makes your code more testable, because you can inject your services in as you need them. Angular is unaware of your services until you register them, but once register, it can easily be injected as needed.

>The ubiquitous `$scope` object is an example of a service, and a built-in one at that!

## Creating Services ##

Services are created by calling the `factory` method on the module you want that service to be available in, then it can be injected by referencing it.

### EventData.js ###

```javascript
eventsApp.factory('eventData', function ()
{
    var service =
    {
        event :
        {
            name : 'Angular Boot Camp',
            date : '1/1/2015',
            time : '10:30 am',
            location :
            {
                address  : 'Google Headquarters',
                city     : 'Mountain View',
                province : 'CA'
            },
            imgUrl : '/img/angularjs-logo.png',
            sessions :
            [
                {
                    name        : 'Directives Masterclass',
                    creatorName : 'Bob Smith',
                    duration    : 1,
                    level       : 'Advanced',
                    abstract    : 'In this session you will learn the ins and outs of directives!',
                    upVoteCount : 0
                },
                {
                    name        : 'Scopes For Fun And Profit',
                    creatorName : 'John Doe',
                    duration    : 2,
                    level       : 'Introductory',
                    abstract    : 'This session will take a closer look at scopes. Learn what they do, how they do it, and how to get them to do it for you!',
                    upVoteCount : 0
                },
                {
                    name        : 'Well Behaved Controllers',
                    creatorName : 'Jane Doe',
                    duration    : 4,
                    level       : 'Intermediate',
                    abstract    : 'Controllers are the beginning of everything Angular does. Learn how to craft controllers that will win the respect of your friends and neighbors.',
                    upVoteCount : 0
                }
            ]
        }
    };

    return service;
});
```

### EventController.js ###

```javascript
'use strict';

eventsApp.controller('EventController', function ($scope, eventData)
{
    $scope.snippet = '<span style="color: red;">hi there</span>';
    $scope.boolValue = true;
    $scope.mystyle = {color:'red'};
    $scope.myclass = 'blue';
    $scope.event = eventData.event;

    $scope.upVoteSession = function (session)
    {
        session.upVoteCount++;
    };

    $scope.downVoteSession = function (session)
    {
        session.upVoteCount--;
    };
});
```

>Notice that only built-in services begin with the `$`. Since `eventData` is a custom service, we omit the `$`.

## Commonly Used Built-In Services ###

In addition to building your own services, Angular has many built-in services to choose from.

### $http and $q ###

The [`$http`](https://docs.angularjs.org/api/ng/service/$http) service is a core Angular service that facilitates communication with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP. The service takes a single argument — a configuration object — that is used to generate an HTTP request and returns a [promise](https://promisesaplus.com/) with two `$http` specific methods: success and error.

The `$http` API is based on the deferred/promise APIs exposed by the [`$q`](https://docs.angularjs.org/api/ng/service/$q) service. While for simple usage patterns this doesn't matter much, for advanced usage it is important to familiarize yourself with these APIs and the guarantees they provide.


**EventData.js**

```javascript
eventsApp.factory('eventData', function ($http, $q)
{
    var service =
    {
        getEvent : function ()
        {
            var deferred = $q.defer();

            $http({method: 'GET', url: '/data/event/1'})
            .success(function (data, status, headers, config)
            {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)
            {
                deferred.reject(status);
            });

            return deferred.promise;
        }
    };

    return service;
});
```

**EventController.js**

```javascript
...
    $scope.event = eventData.getEvent().then(
        function (event)
        {
            $scope.event = event;
        },
        function (statusCode)
        {
            console.log(statusCode);
        }
    );
...
```

### $resource ###

[`$resource`](https://docs.angularjs.org/api/ngResource/service/$resource) is a factory which creates a resource object that lets you interact with RESTful server-side data sources. The returned resource object has action methods which provide high-level behaviors without the need to interact with the low level `$http` service.

**app.js**

```javascript
var eventsApp = angular.module('eventsApp', ['ngSanitize', 'ngResource']);
```

**EventDetails.html & NewEvent.html**

```html
<script src="/lib/angular/angular-sanitize.js"></script>
<script src="/lib/angular/angular-resource.js"></script>
```

**EventData.js**

```javascript
eventsApp.factory('eventData', function ($resource)
{
	var resource = $resource('/data/event/:id', {id:'@id'});

    var service =
    {
        getEvent : function (eventId)
        {
            return resource.get({id:eventId});
        },

		save : function (event)
		{
			return resource.save(event);
		}
    };

    return service;
});
```

**EventController.js**

Without a promise, you can bind the data directly to the property.

```javascript
	$scope.event = eventData.getEvent(1);
```

Or, you can use the `$promise` *property* of the resource returned.

```javascript
	eventData.getEvent(1)
	.$promise.then(
		function (event)
		{
			console.log(event);
			$scope.event = event;
		},
		function (response)
		{
			console.log(response);
		}
	);
```

**EditEventController.js**

```javascript
eventsApp.controller('EditEventController', function EditEventController ($scope, eventData)
{
    $scope.saveEvent = function (event, newEventForm)
    {
        if (newEventForm.$valid)
        {
            eventData.save(event)
                .$promise.then(
                function (response)
                {
                    console.log('success', response);
                },
                function (response)
                {
                    console.log('failure', response);
                }
            );
        }
    };

    $scope.cancelEdit = function ()
    {
        window.location = "/EventDetails.html";
    };
});
```

**Actions**

`$resource` comes with several actions you can use: `get`, `save`,  `query` (same as get but expects array not object), `remove` and `delete`.  You can also create custom actions. See the documentation for more information on that.

### [$anchorScroll](https://docs.angularjs.org/api/ng/service/$anchorScroll) ###

When called, it checks the current value of [$location.hash()](https://docs.angularjs.org/api/ng/service/$location#hash) and scrolls to the related element, according to the rules specified in the Html5 spec.

It also watches the $location.hash() and automatically scrolls to match any anchor whenever it changes. This can be disabled by calling $anchorScrollProvider.disableAutoScrolling().

Additionally, you can use its [yOffset](https://docs.angularjs.org/api/ng/service/$anchorScroll#yOffset) property to specify a vertical scroll-offset (either fixed or dynamic).

### [$cacheFactory](https://docs.angularjs.org/api/ng/service/$cacheFactory) ###

Factory that constructs Cache objects and gives access to them.

**CacheSampleService.js**

```javascript
'use strict';

eventsApp.factory('myCache', function ($cacheFactory)
{
    return $cacheFactory('myCache', {capacity:3});
});
```

**CacheSampleController.js**

```javascript
eventsApp.controller('CacheSampleController', function CacheSampleController($scope, myCache)
{
    $scope.addToCache = function (key, value)
    {
        myCache.put(key,value);
    };

    $scope.readFromCache = function (key)
    {
        return myCache.get(key);
    };

    $scope.getCacheStats = function ()
    {
        return myCache.info();
    };
});
```

**CacheSample.html**
```html
<!doctype html>
<html lang="en" ng-app="eventsApp">
    <head>
        <meta charset="utf-8">
        <title>Cache Sample</title>
        <link rel="stylesheet" href="/css/bootstrap.min.css">
        <link rel="stylesheet" href="/css/app.css">
    </head>

    <body>
        <div class="container">
            <div ng-controller="CacheSampleController" style="padding:20px;">
                key: <input type="text" ng-model="key"><br>
                value: <input type="text" ng-model="value"><br>
                <button type="button" class="btn" ng-click="addToCache(key, value);">Add To Cache</button>
                <br>
                <br>
                <input type="text" ng-model="keyToRead"><br>
                <h3>Value From Cache: {{readFromCache(keyToRead)}}</h3>
                <h3>Cache Stats: {{getCacheStats()}}</h3>
            </div>
        </div>

        <script src="/lib/jquery.min.js"></script>
        <script src="/lib/angular/angular.js"></script>
        <script src="/lib/angular/angular-resource.js"></script>
        <script src="/js/app.js"></script>
        <script src="/js/controllers/CacheSampleController.js"></script>
        <script src="/lib/bootstrap.min.js"></script>
    </body>
</html>
```

>The number of items in the cache is limited by the `capacity` argument property. Items are dropped out of the cache in a FIFO basis - *apparently unless the item is in use*.

### [$compile](https://docs.angularjs.org/api/ng/service/$compile) ###

Compiles an HTML string or DOM into a template and produces a template function, which can then be used to link scope and the template together. This is not something you would typically use outside of a [directive](https://github.com/scottoffen/ps-notes/blob/master/angularjs/introduction/angularjs-introduction-05.md).

**CompileSampleController.js**
```javascript
"use strict";

eventsApp.controller('CompileSampleController', function CacheSampleController($scope, $compile)
{
    $scope.appendDivToElement = function (markup)
    {
        return $compile(markup)($scope).appendTo(angular.element("#appendHere"));
    };
});
```

**CompileSample.html**

```html
<!doctype html>
<html lang="en" ng-app="eventsApp">
    <head>
        <meta charset="utf-8">
        <title>Compile Sample</title>
        <link rel="stylesheet" href="/css/bootstrap.min.css">
        <link rel="stylesheet" href="/css/app.css">
    </head>

    <body>
        <div class="container">
            <div ng-controller="CompileSampleController" style="padding:20px;">
                <div id="appendHere"></div>
                <br>
                name: <input type="text" ng-model="name"><br>
                markup: <input type="text" ng-model="markup"><br>
                <button class="btn" ng-click="appendDivToElement(markup);">Append</button>
            </div>
        </div>

        <script src="/lib/jquery.min.js"></script>
        <script src="/lib/angular/angular.js"></script>
        <script src="/lib/angular/angular-resource.js"></script>
        <script src="/js/app.js"></script>
        <script src="/js/controllers/CompileSampleController.js"></script>
        <script src="/lib/bootstrap.min.js"></script>
    </body>
</html>
```

>AngularJS version 1.2.28 produces the following warning when using this code:
>
>Error: [$parse:isecdom] Referencing DOM nodes in Angular expressions is disallowed! Expression: appendDivToElement(markup);
>
>This is expected, as this code is being used for demonstration purposes only.

### [$parse](https://docs.angularjs.org/api/ng/service/$parse) ###

Converts an Angular [expression](https://docs.angularjs.org/guide/expression) into a function. This is not something you would typically use outside of a [directive](https://github.com/scottoffen/ps-notes/blob/master/angularjs/introduction/angularjs-introduction-05.md).

```javascript
var fn = $parse('1 + 2');
console.log(fn());
```

**ParseSampleController.js**

```javascript
eventsApp.controller('CompileSampleController', function CacheSampleController($parse)
{
    var getter = $parse('event.name');
    var setter = getter.assign;

    var context1 = {event: {name: 'Code Camp'}};

    console.log(getter(context1));
    setter(context1, 'Code Retreat');
	console.log(getter(context1));
});
```

### $locale ###

Provides localization rules for various Angular components. To change the locale, you will need to download a [locale specific file](https://code.angularjs.org/1.2.28/i18n/) to include in your HTML page. This example is using Spanish.

**LocaleSampleController.js**

```javascript
eventsApp.controller('LocaleSampleController', function CacheSampleController($scope, $locale)
{
    $scope.myDate = Date.now();
    $scope.myFormat = $locale.DATETIME_FORMATS.fullDate;
});
```

**LocaleSampleController.js**

```html
<!doctype html>
<html lang="en" ng-app="eventsApp">
    <head>
        <meta charset="utf-8">
        <title>Locale Sample</title>
        <link rel="stylesheet" href="/css/bootstrap.min.css">
        <link rel="stylesheet" href="/css/app.css">
    </head>

    <body>
        <div class="container">
            <div ng-controller="LocaleSampleController" style="padding:20px;">
                <h3>{{myDate | date:myFormat}}</h3>
            </div>
        </div>

        <script src="/lib/jquery.min.js"></script>
        <script src="/lib/angular/angular.js"></script>
        <script src="/lib/angular/angular-resource.js"></script>
		<script src="/lib/angular/angular-locale_es.js"></script>
        <script src="/js/app.js"></script>
        <script src="/js/controllers/LocaleSampleController.js"></script>
        <script src="/lib/bootstrap.min.js"></script>
    </body>
</html>
```

### $timeout ###

Works much like JavaScript's `setTimeout` method.

**TimeoutSample.html**

```html
<!doctype html>
<html lang="en" ng-app="eventsApp">
    <head>
        <meta charset="utf-8">
        <title>Timeout Sample</title>
        <link rel="stylesheet" href="/css/bootstrap.min.css">
        <link rel="stylesheet" href="/css/app.css">
    </head>

    <body>
        <div class="container">
            <div ng-controller="TimeoutSampleController" style="padding:20px;">
				<button class="btn" ng-click="cancel()">Cancel</button>
                <h3>Name : {{name}}</h3>
            </div>
        </div>

        <script src="/lib/jquery.min.js"></script>
        <script src="/lib/angular/angular.js"></script>
        <script src="/lib/angular/angular-resource.js"></script>
        <script src="/js/app.js"></script>
        <script src="/js/controllers/TimeoutSampleController.js"></script>
        <script src="/lib/bootstrap.min.js"></script>
    </body>
</html>
```

**TimeoutSampleController.js**

```javascript
"use strict";

eventsApp.controller('TimeoutSampleController', function TimeoutSampleController($scope, $timeout)
{
    var promise = $timeout(function ()
    {
        $scope.name = "John Doe";
    }, 3000);

	$scope.cancel = function ()
	{
		$timeout.cancel(promise);
	};
});
```

>If you use JavaScripts `setTimeout` method to make changes to the the model (`$scope`), it will happen on a seperate thread, Angular will be unaware of the change and, as a result, will not update the bindings.

### [$exceptionHandler](https://docs.angularjs.org/api/ng/service/$exceptionHandler) ###

Any uncaught exception in angular expressions is delegated to this service. The default implementation simply delegates to `$log.error` which logs it into the browser console.

**ExceptionHandler.js**

>In this case, we actually do want to override the built-in Angular service.

```javascript
eventsApp.factory('$exceptionHandler', function ()
{
    return function (exception)
    {
        console.log("exception handled: " + exception.message);
    };
});
```



### [$filter](https://docs.angularjs.org/api/ng/service/$filter) ###

The `$filter` service gives us access to our filters.

**FilterSample.html**

```html
<!doctype html>
<html lang="en" ng-app="eventsApp">
<head>
    <meta charset="utf-8">
    <title>Filter Sample</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/app.css">
</head>

<body>
<div class="container">
    <div ng-controller="FilterSampleController" style="padding:20px;">
        Duration 1: {{data.duration1}}<br>
        Duration 2: {{data.duration2}}<br>
        Duration 3: {{data.duration3}}<br>
        Duration 4: {{data.duration4}}<br>
    </div>
</div>

<script src="/lib/jquery.min.js"></script>
<script src="/lib/angular/angular.js"></script>
<script src="/lib/angular/angular-resource.js"></script>
<script src="/js/app.js"></script>
<script src="/js/filters.js"></script>
<script src="/js/controllers/FilterSampleController.js"></script>
<script src="/lib/bootstrap.min.js"></script>
</body>
</html>
```

**FilterSampleController.js**

```javascript
eventsApp.controller('FilterSampleController', function FilterSampleController ($scope, $filter)
{
    $scope.data = {};

    var durations = $filter('durations');
    $scope.data.duration1 = durations(1);
    $scope.data.duration2 = durations(2);
    $scope.data.duration3 = durations(3);
    $scope.data.duration4 = durations(4);
});
```

>Note that the `$filter` service is not always required. We could just as easily have done it this way, injecting our `durations` filter by using the name of the filter suffixed with the word 'Filter'.

```javascript
eventsApp.controller('FilterSampleController', function FilterSampleController ($scope, durationsFilter)
{
    $scope.data = {};

    $scope.data.duration1 = durationsFilter(1);
    $scope.data.duration2 = durationsFilter(2);
    $scope.data.duration3 = durationsFilter(3);
    $scope.data.duration4 = durationsFilter(4);
});
```

### [$cookieStore](https://docs.angularjs.org/api/ngCookies/service/$cookieStore) ###

Provides a key-value (string-object) storage, that is backed by session cookies. Objects put or retrieved from this storage are automatically serialized or deserialized by Angular's `toJson`/`fromJson`.

>In order to use `$cookieStore` you must include the Angular Cookies module (angular-cookies.js).

**app.js**

```javascript
var eventsApp = angular.module('eventsApp', ['ngResource', 'ngCookies']);
```

**CookieStoreSample.html**

```html
<!doctype html>
<html lang="en" ng-app="eventsApp">
<head>
    <meta charset="utf-8">
    <title>Cookie Store Sample</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/app.css">
</head>

<body>
<div class="container">
    <div ng-controller="CookieStoreSampleController" style="padding:20px;">
        <button class="btn" ng-click="saveEventToCookie(event)">Store Cookie</button>
        <button class="btn" ng-click="getEventCookie()">Get Cookie</button>
        <button class="btn" ng-click="removeEventCookie()">Remove Cookie</button>
    </div>
</div>

<script src="/lib/jquery.min.js"></script>
<script src="/lib/angular/angular.js"></script>
<script src="/lib/angular/angular-resource.js"></script>
<script src="/lib/angular/angular-cookies.js"></script>
<script src="/js/app.js"></script>
<script src="/js/filters.js"></script>
<script src="/js/controllers/CookieStoreSampleController.js"></script>
<script src="/lib/bootstrap.min.js"></script>
</body>
</html>
```

**CookieStoreSampleController.js**

```javascript
eventsApp.controller('CookieStoreSampleController', function FilterSampleController ($scope, $cookieStore)
{
    $scope.event = { id : 1, name : 'My Event'};

    $scope.saveEventToCookie = function (event)
    {
        $cookieStore.put('event', event);
    };

    $scope.getEventCookie = function ()
    {
        console.log($cookieStore.get('event'));
    };

    $scope.removeEventCookie = function ()
    {
        $cookieStore.remove('event');
    };
});

```

>There is currently no way to set expiration dates on cookies using Angular.

## Less Commonly Used Built-In Services ##

### [$interpolate](https://docs.angularjs.org/api/ng/service/$interpolate) ###

Used internally by `$compile`. It's not something you are going to want to use in most cases.

```javascript
module.config(function($interpolateProvider)
{
	$interpolateProvider.startSymbol('[[').endSymbol(']]');
});
```

### [$log](https://docs.angularjs.org/api/ng/service/$log) ###

Used for diagnostic logging and debugging.

- `$log.log("log");`
- `$log.info("info");`
- `$log.warn("warn");`
- `$log.error("error");`

### [$rootScope](https://docs.angularjs.org/api/ng/service/$rootScope) ###

Every application has a **single** root scope. All other scopes are descendant scopes of the root scope. Scopes provide separation between the model and the view, via a mechanism for watching the model for changes. They also provide an event emission/broadcast and subscription facility.

Every time `$scope` is passed into a controller, it prototypally inherites from `$rootScope`. This allows you to add properties and methods to the prototype of `$rootScope`, and they will be available to all child `$scope` objects. (But don't just make this a dumping ground for global data.)

>While you can also inject `$rootScope` instead of `$scope`, this practice is generally discouraged.

### $window ###

Gives you access to the `window` JavaScript object. Allows you to inject mocks into your code for testing purposes.

### $document ###

Gives you access to the `document` JavaScript object. Allows you to inject mocks into your code for testing purposes.

### $rootElement ###

Gives you access to the Angular root element JavaScript object. Allows you to inject mocks into your code for testing purposes.

## Other Built-In Services ##

- `$route`, `$routeParams` and `$location` are discussed in the section on [Routing](https://github.com/scottoffen/ps-notes/blob/master/angularjs/introduction/angularjs-introduction-04.md)
- `$httpBackend` and `$controller` are discussed in the section on [Testing](https://github.com/scottoffen/ps-notes/blob/master/angularjs/introduction/angularjs-introduction-06.md)

## Exercises ##

![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/angularjs/images/angular-introduction-04-exercises.png)

### [Next: Routing](https://github.com/scottoffen/ps-notes/blob/master/angularjs/introduction/angularjs-introduction-04.md) ###
