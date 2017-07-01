AngularJS Introduction : Part Two
=================================

### [Prev: Introduction](https://github.com/scottoffen/ps-notes/blob/master/angularjs/introduction/angularjs-introduction-01.md) ###

# Controllers & Markup #

Go to the [course github site](https://github.com/joeeames/AngularFundamentalsFiles) and download and extract the DemoApp.zip file. Update the version of Angular used in that app, if you'd like.

## Controllers and Scope ##

The controllers responsibility is to create a scope object. The scope object is how we communicate with the view. The scope is used to expose the model to the view - however, the scope **is not** the model. The model is the data we put into the scope.

```
+------------------+       +------------------+       +------------------+
|   Controllers    | <---> |      Scope       | <---> |       View       |
+------------------+       +------------------+       +------------------+
```

The scope is what ties our controller to our view, but the scope is NOT the model.

## Create The Application ##

We create our application module by calling the `module` function off of Angular and passing it a name (which, for convenience, should be the same as the name of the variable we are using) and an array of dependencies.

**app.js**
```javascript
var eventsApp = angular.module('eventsApp', ['ngSanitize']);
```

## Markup & Binding ##

**EventDetails.html**

```html

<body ng-cloak>
...
<div ng-controller="EventController">
    <img ng-src="{{event.imgUrl}}" alt="{{event.name}}" style="width: 200px;">
    <div class="row">
        <div class="spann11">
            <h2>{{event.name}}</h2>
        </div>
    </div>
    <div class="row">
        <div class="span3">
            <div><strong>Date: </strong>{{event.date}}</div>
            <div><strong>Time: </strong>{{event.time}}</div>
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
        <li ng-repeat="session in event.sessions">
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
                    <span>Duration: {{session.duration}}</span><br>
                    <span>Level: {{session.level}}</span><br><br>

                    <p>{{session.abstract}}</p>
                </div>
            </div>
        </li>
    </div>
</div>
...
<script src="/lib/angular/angular.js"></script>
<script src="/js/app.js"></script>
<script src="/js/controllers/EventController.js"></script>
```

**EventController.js**

The controller is attached to our module by calling the `controller` function of the module, and passing it a name - which must match the controller name specified in the HTML - and a function. The function takes an empty `$scope` variable as the first parameter.

>Much like jQuery, the $ at the beginning of the variable name indicates that it is a component provided by Angular.

```javascript
'use strict';

eventsApp.controller('EventController', function ($scope)
{
    $scope.event =
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
                duration    : '1 hr',
                level       : 'Advanced',
                abstract    : 'In this session you will learn the ins and outs of directives!',
                upVoteCount : 0
            },
            {
                name        : 'Scopes For Fun And Profit',
                creatorName : 'John Doe',
                duration    : '30 min',
                level       : 'Introductory',
                abstract    : 'This session will take a closer look at scopes. Learn what they do, how they do it, and how to get them to do it for you!',
                upVoteCount : 0
            },
            {
                name        : 'Well Behaved Controllers',
                creatorName : 'Jane Doe',
                duration    : '2 hrs',
                level       : 'Intermediate',
                abstract    : 'Controllers are the beginning of everything Angular does. Learn how to craft controllers that will win the respect of your friends and neighbors.',
                upVoteCount : 0
            }
        ]
    };

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

### Built-In Directives ###

Directives are a way to give HTML new functionality.

**Four Way to Specify Directives**

1. As a tag itself `<ng-form />`
2. As an attribute of a tag `<div ng-form>`
3. As a class `<div class="ng-form">`
4. Inside an HTML comment (no code samples for this)

>Not all directives can be written in all four ways. Check the documentation for the directive you want to use.

**Event Directives**

1. `ngClick`
2. `ngDblClick`
3. `ngMousedown`
4. `ngMouseenter`
5. `ngMouseleave`
6. `ngMousemove`
7. `ngMouseover`
8. `ngMouseup`
9. `ngChange` (requires `ngModel`)

**Other Directives**

1. `ngApp`
2. `ngBind` : Single bindings
3. `ngBindTemplate` : Multiple bindings
4. `ngBindHtml`
5. ~~`ngBindHtmlUnsafe`~~
6. `ngHide`
7. `ngShow`
8. `ngCloak` : Avoid a flash of unbound html
9. `ngStyle`
10. `ngClass`
11. `ngClassEven`
12. `ngClassOdd`
13. `ngDisabled` : add or remove the attributed based on the true/false of the value assigned
14. `ngChecked`
15. `ngMultiple`
16. `ngReadonly`
17. `ngSelected`
18. `ngForm` : nest forms
19. `ngSubmit`
20. `ngHref` : bind the href property on an anchor tag
21. `ngSrc` : bind the src property on a image tag
22. `ngNonBindable` : don't parse this

>**HTML Injection Workaround**
>
>Given that the `ngBindHtmlUnsafe` directive has been deprecated, here is how you inject HTML using Angular (via [StackOverflow](http://stackoverflow.com/questions/19415394/with-ng-bind-html-unsafe-removed-how-do-i-inject-html)) and [`$sce`](https://docs.angularjs.org/api/ng/service/%24sce).
>
>```javascript
>angular.module('myApp').filter('to_trusted', ['$sce', function($sce)
>{
>	return function(text)
>	{
>		return $sce.trustAsHtml(text);
>	};
>}]);
>```
>
>Usage:
>
>```javascript
><div ng-bind-html="data.html | to_trusted"></div>
>```

**IE Restrictions**

If your site needs to support older versions of IE, you will need to do two things to make Angular work.

1. Polyfill JSON.stringify
2. Avoid using custom tag name directives

**Expressions**

Expressions are code snippets in Angular that support a subset of JavaScript. They use the double-bracket notation.

```javascript
{{ 3 * 10 }

{{ 'hello' + 'world' }}

{{ [1,2,3][2] }}
```

## Filters ##

Filters are a way to tell Angular that you want to modify something for output.

1. Formatting
2. Sorting Datasets
3. Filtering Datasets

```javascript
{{ expression | filter }}
```

### Built In filters ###

1. `uppercase`
2. `lowercase`
3. `number:[decimal]`
4. `currency`
5. `date:'[medium|mediumDate]'`
6. `json` (mostly for debugging)
7. `orderBy`
8. `limitTo`
9. `filter`

### Writing Custom Filters ###

Take an existing module and call the `filter` function on it. The two parameters are the name of the filter you want to create and the second is a function. The second function parameter must return another function

```javascript
module.filter('name', function ()
{
	// This is your actual filter
	return function (input /*, filter parameters */)
	{
		// modify the input and return the modified input
	}
});
```

**ExampleFilter.js**

```javascript
module.filter('myFilter', function ('myService')
{
	var filter = function (input, x, y)
	{
		return [input,x,y].join(' : ');
	};

	return filter;
});
```

**ExampleFilter.html**

```html
<div class="{{binding | myFilter:'hey':'ho'}}">
	Something here...
</div>
```

>Whatever is in the scope binding `binding` will match the filter parameter `input`, and `hey` and `ho` will match `x` and `y`, respectively. 

## Two Way Binding ##

Allows you to use your typical form controls and keep your model up to date automatically.

>The `ng-model` directive works with `input`, `select` and `textarea`.

```html
// A property in the scope
<input type="text" ng-model="property">

// A property of an object in scope
<input type="text" ng-model="object.property">

// A property of an object nested in an object in scope
<input type="text" ng-model="object.container.property">

<span>{{property}}</span>// will be updated on every keystroke
```

## Validation ##

### Required ###

Mark required fields as required, and angular - on form submission - will not allow the form to submit unless there is a value in that field.

### ng-pattern directive ###

Adding a pattern to the field will allow for the field to validated when the form is submitted.

### Form Properties ###

A form object contains properties to indicate its state.

- `$dirty`
- `$pristine`
- `$valid`
- `$invalid`

### CSS Classes ###

Fields that are validated have classes automatically assigned to them indicating whether they are dirty, pristine, valid or invalid.

- `ng-dirty`
- `ng-vaid`
- `ng-required-valid`

Styles can be attached to these classes to make it easy to see what fields are in error.

### Example ###

**HTML**

```html
<!-- A form must have a name in order to check for validity -->
<div ng-controller="EditEventController">
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

**JavaScript**

```javascript
eventsApp.controller('EditEventController', function EditEventController ($scope)
{
    $scope.saveEvent = function (event, newEventForm)
    {
        if (newEventForm.$valid)
        {
            window.alert('event ' + event.name + ' saved');
        }
    };

    $scope.cancelEdit = function ()
    {
        window.location = "/EventDetails.html";
    };
});
```

### [Next : Services](https://github.com/scottoffen/ps-notes/blob/master/angularjs/introduction/angularjs-introduction-03.md) ###
