AngularJS Introduction : Part Four
==================================

### [Prev: Services](https://github.com/scottoffen/ps-notes/blob/master/angularjs/introduction/angularjs-introduction-03.md) ###

# Routing #

Routing uses the URL fragment to match defined routes in your single-page application, and displays different information.

We'll inject the built-in [`$routeProvider`](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider) service into `app.js`. We can then add routes using the `.when()` method call, and create a default route using the `.otherwise()` method call.

**.when()**

```javascript
$routeProvider.when('/events',
{
    templateUrl:'templates/EventList.html',
    controller:'EventListController'
});
```

**.otherwise()**

If no matching route is found, we can specify a default route - using the same method as above - or redirect to an existing route.

```javascript
$routeProvider.otherwise({ redirectTo : '/events' });
```

As you can see, we give it a path to find our template HTML and the name of the controller to use. We can then remove the controller directive from our template HTML.

**Route Parameters**

We can specify parameters in our routes by prefacing the variable name with a colon (:), and then access those values - using the same variable name - in our services and controllers by injecting the `$routeParams` service.

**JavaScript**

```javascript
$routeProvider.when('/event/:eventId',
{
    templateUrl:'templates/EventDetails.html',
    controller:'EventController'
});
```

**HTML**

```html
$scope.event = eventData.getEvent($routeParams.eventId);
```

## Basic Example ##

### Setting Up A Default Page ###

Routing is contained in a different module, we'll need to include that on our page.

**index.html**

```html
<!doctype html>
<html lang="en" ng-app="eventsApp">
    <head>
        <meta charset="utf-8">
        <title>Angular Events</title>
        <link rel="stylesheet" href="/css/bootstrap.min.css">
        <link rel="stylesheet" href="/css/app.css">
    </head>

    <body>
        <div class="container-fluid">
            <div class="navbar">
                <div class="navbar-inner">
                    <ul class="nav">
                        <li><a href="#/newEvent">Create Event</a></li>
                    </ul>
                </div>
            </div>

            <ng-view>
				<!-- This is where our routes will be displayed -->
            </ng-view>
        </div>

        <script src="/lib/jquery.min.js"></script>
        <script src="/lib/angular/angular.js"></script>
        <script src="/lib/angular/angular-resource.js"></script>
        <script src="/lib/angular/angular-route.js"></script>
        <script src="/js/app.js"></script>
        <script src="/js/filters.js"></script>
        <script src="/js/controllers/EditEventController.js"></script>
        <script src="/js/controllers/EventListController.js"></script>
        <script src="/js/controllers/EventController.js"></script>
        <script src="/js/services/EventData.js"></script>
        <script src="/lib/bootstrap.min.js"></script>
    </body>
</html>
```

### Create The Templates ###

Create a new `/templates` folder, and move your templates to there - sans the surrounding html.

**EventList.html**

```html
<div>
    <h1>Events</h1>
    <hr><hr>

    <ul class="thumbnails">
        <li ng-repeat="event in events|orderBy:sortorder" class="span5">
            <a href="#/event/{{event.id}}">
                <div class="well hoverwell">
                    <div class="row">
                        <h2 class="span6">{{event.name}}</h2>
                    </div>
                    <div class="row">
                        <span class="span1">Date</span>
                        <span>{{event.date}}</span>
                    </div>
                    <div class="row">
                        <span class="span1">Time</span>
                        <span>{{event.time}}</span>
                    </div>
                    <div class="row">
                        <span class="span1">Location:</span>
                        <span>{{event.location.address}}</span>
                    </div>
                    <div class="row">
                        <span class="span1">&nbsp;</span>
                        <span>{{event.location.city}}, {{event.location.province}}</span>
                    </div>
                </div>
            </a>
        </li>
    </ul>
</div>
```

**EventDetails.html**

```html
<div>
    <div id="me">
        <img ng-src="{{event.imgUrl}}" alt="{{event.name}}">

        <div class="row">
            <div class="spann11">
                <h2 ng-bind-template="{{event.name | uppercase}}"></h2>
            </div>
        </div>

        <div class="row">
            <div class="span3">
                <div><strong>Date: </strong>{{event.date}}</div>
                <div><strong>Time: </strong>{{event.time}}</div>
                <div><strong>Price: </strong>{{34 | currency }}</div>
            </div>
            <div class="span4">
                <strong>Address:</strong><br>
                {{event.location.address}}<br>
                {{event.location.city}}, {{event.location.province}}
            </div>
        </div>

        <hr>

        <h3>Sessions</h3>

        <ul class="thumbnails">
            <li ng-repeat="session in event.sessions | filter:query | orderBy:sortorder" class="span11" id="session{{session.id}}">
                <div class="row session">
                    <div class="span0 well votingWidget">
                        <div class="votingButton" ng-click="upVoteSession(session)">
                            <i class="icon-chevron-up icon-white"></i>
                        </div>
                        <div class="badge badge-inverse">
                            <div>{{session.upVoteCount}}</div>
                        </div>
                        <div class="votingButton" ng-click="downVoteSession(session)">
                            <i class="icon-chevron-down icon-white"></i>
                        </div>
                    </div>

                    <div class="well span9">
                        <h4>{{session.name}}</h4>
                        <h6 style="margin-top: -10px">{{session.creatorName}}</h6>
                        <span>Duration: {{session.duration | durations}}</span><br>
                        <span>Level: {{session.level}}</span><br><br>

                        <p>{{session.abstract}}</p>
                    </div>
                </div>
            </li>
    </div>
</div>
```

**NewEvent.html**

```html
<div>
    <div class="container">
        <h1>New Event</h1>
        <hr>

        <form name="newEventForm">
            <fieldset>
                <label for="eventName">Event Name:</label>
                <input id="eventName" type="text" required ng-model="event.name" placeholder="Name of your event...">

                <label for="eventDate">Event Date:</label>
                <input id="eventDate" type="text" required ng-pattern="/\d{2}/\d{2}/\d{4}/" ng-model="event.date" placeholder="format (mm/dd/yyyy)...">

                <label for="eventTime">Event Time:</label>
                <input id="eventTime" type="text" ng-model="event.time" placeholder="start and end time...">

                <label for="eventLocation">EventName Location:</label>
                <input id="eventLocation" type="text" ng-model="event.location.address" placeholder="Address of event...">
                <br>

                <input id="eventCity" type="text" ng-model="event.location.city" class="input-small" placeholder="City...">
                <input id="eventProvince" type="text" ng-model="event.location.province" class="input-small" placeholder="Province...">

                <label for="eventImageUrl">Image:</label>
                <input id="eventImageUrl" type="url" ng-model="event.imgUrl" class="input-xlarge" placeholder="Url of image...">
            </fieldset>

            <img ng-src="{{event.imgUrl}}" src="">
            <br><br>

            <button type="submit" ng-disabled="newEventForm.$invalid" class="btn btn-primary" ng-click="saveEvent(event, newEventForm)">Save</button>
            <button type="button" class="btn btn-default" ng-click="cancelEdit()">Cancel</button>
        </form>
    </div>
</div>
```

### Update Controllers ###

Update your controllers to use the route params.

**EventController.js**

```javascript
eventsApp.controller('EventController', function EventController ($scope, eventData, $routeParams)
{
    $scope.event = eventData.getEvent($routeParams.eventId);

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

### Wire Up Routes ###

And, finally, we'll wire up our routes.

**app.js**

```javascript
'use strict';

var eventsApp = angular.module('eventsApp', ['ngResource', 'ngRoute'])
.config(function ($routeProvider)
{
    $routeProvider.when('/newEvent',
    {
        templateUrl:'templates/NewEvent.html',
        controller:'EditEventController'
    });

    $routeProvider.when('/events',
    {
        templateUrl:'templates/EventList.html',
        controller:'EventListController'
    });

    $routeProvider.when('/event/:eventId',
    {
        templateUrl:'templates/EventDetails.html',
        controller:'EventController'
    });

	$routeProvider.otherwise({redirectTo : '/events'});
});
```

## The `$route` Service ##

### Custom Properties ###

We can also set custom properties on the route, which can then be accessed using the `$route` service.

**app.js**

```javascript
...
    $routeProvider.when('/event/:eventId',
    {
		foo:'bar',
        templateUrl:'templates/EventDetails.html',
        controller:'EventController'
    });
...
```

**EventController.js**

```javascript
eventsApp.controller('EventController', function EventController ($scope, $route, $routeParams, eventData)
{
...
    console.log($route.current.foo);
...
});
```

### Query String Data ###

Query String data can also be accessed using the `$route` service, without making any changes to the `app.js` file.

**URL**

	/#/events?foo=bar

**EventController.js**

```javascript
eventsApp.controller('EventController', function EventController ($scope, $route, $routeParams, eventData)
{
...
    console.log($route.current.params.foo);
	console.log($route.current.params.eventId); // You also have access to these params    console.log($route.current.pathParams.eventId); // Also works
	console.log($route.current.params.foo); // Does not work
...
});
```

### Reloading A Page ###

Sometime we want to reload a page without reloading the entire app.

**EventDetails.html**

```html
...
<img ng-src="{{event.imgUrl}}" alt="{{event.name}}">
<button class="btn" ng-click="reload()">Reload</button>
...
```

**EventController.js**

```javascript
...
$scope.reload = function()
{
    $route.reload();
};
...
```

## Enabling HTML5 Routing ##

By using HTML5 routing, we can eliminate the hash mark (#) from our routes.

**app.js**

```javascript
var eventsApp = angular.module('eventsApp', ['ngResource', 'ngRoute'])
.config(function ($routeProvider, $locationProvider)
{
	...
    $locationProvider.html5Mode(true);
	...
});
```

Now just update your pages to remove the '#' in any URLs that link pages together. You will also want to add a leading '/' to your `templateUrl` route properties.

>Note that if you now go to `/events` directly, your server will give you a 404 error. You will want to configure the server so that 404's return the `index.html` page for this routing to work.

## Template and Resolve Properties ##

Addition routing properties you should be aware of include:

### Template Property ###

Instead of proving a URL to a template for your route, you can just provide your route with a string. This allows you to create templates on-the-fly using a service, for example.

**app.js**

```javascript
...
    $routeProvider.when('/event/:eventId',
    {
        template:'Hello World',
        controller:'EventController'
    });
...
```

### Resolve Property ###

If our AJAX to load data onto the page takes a long time to return, the template HTML might not be so pretty to look at. We can tell Angular to not display any of the template HTML until a give promise has been resolved.

**app.js**

```javascript
...
    $routeProvider.when('/event/:eventId',
    {
        templateUrl:'/templates/EventDetails.html',
        controller:'EventController',
		resolve:
		{
			event: function ($route, eventData)
			{
				return eventData.getEvent($route.current.pathParams.eventId).$promise;
			}
		}
    });
...
```

**EventController.js**

```javascript
...
$scope.event = $route.current.locals.event;
...
```

## [`$location`](https://docs.angularjs.org/api/ng/service/$location) ##

Instead of using links to navigate through the application, you can use the `$location` service.

**index.html**

```html
...
	<div class="navbar" ng-controller="MainMenuController">
	    <div class="navbar-inner">
	        <ul class="nav">
	            <li><a href="#" ng-click="createEvent()">Create Event</a></li>
	        </ul>
	    </div>
	</div>
...
	<script src="/js/controllers/MainMenuController.js"></script>
...
```

**MainMenuController.js**

```javascript
eventsApp.controller('MainMenuController', function MainMenuController ($scope, $location)
{
    $scope.createEvent = function ()
    {
        $location.url('/newEvent');
    };
});
```

There are a number of properties you can access that will give you information about the current location.

**Getters Only**

- `absUrl()`
- `protocol()`
- `port()`
- `host()`

**Getters & Setters**

- `path()`
- `search()`
- `hash()`
- `url()`

**Setter Only**

- `replace()`

Using `replace()` instead of `url()` will prevent a new entry in the browsers history.

## Exercises ##

![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/angularjs/images/angular-introduction-03-exercises.png)

### [Next: Directives](https://github.com/scottoffen/ps-notes/blob/master/angularjs/introduction/angularjs-introduction-05.md) ###
