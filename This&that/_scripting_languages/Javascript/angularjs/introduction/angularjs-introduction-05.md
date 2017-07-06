AngularJS Introduction : Part Five
==================================

### [Prev: Routing](https://github.com/scottoffen/ps-notes/blob/master/angularjs-introduction-04.md) ###

# Directives #

*A.K.A Where The jQuery Goes*

HTML was intended to create static documents, not dynamic documents or web applications. Angular directives allow you to create highly semantic and reusable components. In a sense you could consider them as the [ultimate precursor](http://www.jvandemo.com/the-nitty-gritty-of-compile-and-link-functions-inside-angularjs-directives/) of [web components](http://www.w3.org/TR/components-intro/).

**Use Directives To:**

- Create Custom Elements
- Create Custom Events
- Observe and React to Changes

## [Creating Your First Directive](https://docs.angularjs.org/guide/directive) ##

Directives are created in much the same way as controllers.

**directives.js**

```javascript
eventsApp.directive('mySample', function ($compile)
{
    var directive =
    {
        // If omitted, defaults to 'A'
		// 'A' means the directive is expected to be used as an attribute.
        // 'E' means the directive is expected to be used as an element.
        // 'C' means the directive is expected to be used as a class.
        // 'M' means the directive is expected to be used as an html comment.
        restrict : 'E',

        link : function (scope, element, attrs, controller)
        {
            var markup = "<input type='text' ng-model='sampleData'> {{sampleData}}<br>";
            angular.element(element).html($compile(markup)(scope));
        },

        // You can use template instead of link, and then you don't have to compile
        //template : "<input type='text' ng-model='sampleData'> {{sampleData}}<br>",

        // Or, better yet, use templateUrl to use an external file.
        //templateUrl : '/templates/directives/MySample.html',

		// Replaces the html instead of appending to it.
		replace : true,
    };

    return directive;
});
```

>When naming your directive (`mySample`), use camel-case. Angular will turn this into dashes (`my-sample`) for use in your HTML as attributes, elements, classes or comments.

```html
<my-sample></my-sample>

<div my-sample></div>

<div class="my-sample"></div>

<!--my-sample-->
```

## Domain Specific Language via Custom Elements ##

Directives allow you to write your HTML using your own Domain Specific Language (DSL).

**EventThumbnail.html**

```html
<a href="event/{{event.id}}">
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
```

**EventThumbnail.js**

```javascript
eventsApp.directive('eventThumbnail', function ()
{
    var directive =
    {
        restrict : 'E',
        replace : true,
        templateUrl : '/templates/directives/EventThumbnail.html'
    };

    return directive;
});
```

**EventList.html**

```html
<div>
    <h1>Events</h1>
    <hr><hr>

    <ul class="thumbnails">
        <li ng-repeat="event in events|orderBy:sortorder" class="span5">
            <event-thumbnail>
        </li>
    </ul>
</div>
```

>While this will work, becuause our directive requires an item named `event` to be available in scope, this requires there to be a binding between the directive and the controller using the directive. We can eliminate this binding (because that's not a good thing) by providing an isolate scope.

## Isolating Directive Scope ##

Creating a scope on the directive will isolate each instance of the directive from all the others. We can add properties as part of the isolate scope that map to attributes on the directive in the HTML.

If we do this in our previous example, this will break the binding, because the new scope we provided does not contain our `event` object - directive scopes do not inheiret from their parent scope. We have to pass parameters to the directive and expose them in our scope.

**EventList.html**

```html
<div>
    <h1>Events</h1>
    <hr><hr>

    <ul class="thumbnails">
        <li ng-repeat="event in events|orderBy:sortorder" class="span5">
            <event-thumbnail my-event="event">
        </li>
    </ul>
</div>
```

>Note that the value in the quotes matches the name of the variable in the repeat statement.

**EventThumbnail.js**

```javascript
eventsApp.directive('eventThumbnail', function ()
{
    var directive =
    {
        restrict : 'E',
        replace : true,
        templateUrl : '/templates/directives/EventThumbnail.html',
        scope :
        {
            event: "=myEvent"
        }
    };

    return directive;
});
```

>Note that the key in the scope matches what our thumbnail HTML is expecting, and the value matches the value quoted in the listing HTML where the directive is being used.
>
>And notice the camel-case replacement that is happening between those values.
>
>If the value is an exact match (no camel-casing), then only the "=" is required.

## Exploring Isolate Scope Bindings ##

We can bind objects to parameters in our isolate scope using the equal-sign (=), as demonstrated above, but we can also bind using the at-sign (@) and the ampersand (&).

The ampersand (&) allows the passing in of functions to call from the isolate scope within the parent scope.

The at-sign (@) allows the passing of strings to the isolate scope.

**EventDetails.html**

```html
...
<li ng-repeat="session in event.sessions | filter:query | orderBy:sortorder" class="span11" id="session{{session.id}}">
    <div class="row session">

		<!-- Our New UpvoteWidget! -->
        <upvote upvote="upVoteSession(session)" downvote="downVoteSession(session)" count="{{session.upVoteCount}}"></upvote>

        <div class="well span9">
            <h4>{{session.name}}</h4>
            <h6 style="margin-top: -10px">{{session.creatorName}}</h6>
            <span>Duration: {{session.duration | durations}}</span><br>
            <span>Level: {{session.level}}</span><br><br>

            <p>{{session.abstract}}</p>
        </div>
    </div>
</li>
...
```

**UpvoteWidget.js**

```javascript
eventsApp.directive('upvote', function ()
{
    var directive =
    {
        restrict : 'E',
        replace : true,
        templateUrl : '/templates/directives/UpvoteWidget.html',
        scope:
        {
            upvote : '&upvote',
            downvote: '&downvote',
            count: '@count'
        }
    };

    return directive;
});
```

**UpvoteWidget.html**

```html
<div class="span0 well votingWidget">
    <div class="votingButton" ng-click="upvote()">
        <i class="icon-chevron-up icon-white"></i>
    </div>
    <div class="badge badge-inverse">
        <div>{{count}}</div>
    </div>
    <div class="votingButton" ng-click="downvote()">
        <i class="icon-chevron-down icon-white"></i>
    </div>
</div>
```

## Handling Events with Directives ##

You can use a directive to handle events.

**DateKeys.js**

```javascript
'use strict';

eventsApp.directive('dateKeys', function ()
{
    var directive =
    {
        restrict: 'A',

        link : function (scope, element, attrs, controller)
        {
            element.on('keydown', function (event)
            {
                return isValidKeyCode(event.keyCode);
            });
        }
    };

    function isValidKeyCode (keyCode)
    {
        if ((isNumericKeyCode(keyCode)) || (isForwardSlashKeyCode(keyCode)) || (isNavigationKeyCode(keyCode)))
        {
            return true;
        }

        return false;
    }

    function isNumericKeyCode (keyCode)
    {
        return ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105));
    }

    function isForwardSlashKeyCode (keyCode)
    {
        return keyCode === 191;
    }

    function isNavigationKeyCode (keyCode)
    {
        switch (keyCode)
        {
            case 8:  //backspace
            case 35: //end
            case 36: //home
            case 37: //left
            case 38: //up
            case 39: //right
            case 40: //down
            case 45: //ins
            case 46: //del
                return true;
            default:
                return false;
        }
    }

    return directive;
});
```

**NewEvent.html**

```html
...
<label for="eventDate">Event Date:</label>
<input id="eventDate" type="text" date-keys required ng-model="event.date" placeholder="format (mm/dd/yyyy)">
...
```

Now the Date input field for new events will only accept numbers and slashs, but you can still use the navigation keys to move around in the field, as well as use the insert, delete and backspace.

## Observing and Responding to Changes ##

Directives can be used to observe and respond to changes.

**EditProfile.html**

```html
<div class="container-fluid">
    <form name="profileForm">
        <div class="row-fluid">
            <div class="span3">

				<!-- Our New Gravatar Widget! -->
                <gravatar email="{{user.emailAddress}}"></gravatar>

            </div>
            <div class="span3">
                <fieldset>
                    <label for="userName">User Name:</label>
                    <input focus id="userName" required ng-pattern="/^[-A-Za-z0-9]{2,20}$/" type="text" placeholder="Username" ng-model="user.userName">
                    <label for="password">Password:</label>
                    <input focus id="password" required type="password" placeholder="Password" ng-model="user.password">
                </fieldset>
                <div style="margin-top: 15px">
                    <fieldset>
                        <label for="name">Name:</label>
                        <input focus id="name" type="text" placeholder="Name" ng-model="user.name">
                        <label for="emailAddress">Email Address:</label>
                        <input focus id="emailAddress" required type="email" placeholder="Email Address" ng-model="user.emailAddress">
                    </fieldset>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6 offset 3">
                <label for="bio">Bio:</label>
                <textarea id="bio" rows="6" style="width: 97%; color : #52575c;" placeholder="Bio" ng-model="user.bio"></textarea>
            </div>
        </div>
    </form>
</div>
```

**GravatarWidget.js**

```javascript
'use strict';

eventsApp.directive('gravatar', function (gravatarUrlBuilder)
{
    var directive =
    {
        restrict: 'E',
        replace: true,
        template: '<img >',
        link: function (scope, element, attrs, controller)
        {
            attrs.$observe('email', function (newValue, oldValue)
            {
                if (newValue !== oldValue)
                {
                    attrs.$set('src', gravatarUrlBuilder.buildGravatarUrl(newValue));
                }
            })
        }
    };

    return directive;
});

```

## Using Controllers Within Directives ##

Controllers can be added to the directive directly. There are a few different ways you can specify the controller inside the directive.

### Inline Declaration ###

You can specify a new controller just as you normally would.

**JavaScript**

```javascript
...
var directive =
{
	...
	controller: function ($scope)
	{
		$scope.val = true;
	}
};
...
```

### Reference Existing Controller ###

You can reference an existing controller by name.

**JavaScript**

```javascript
...
var directive =
{
	...
	controller: 'MySampleController'
};
...
```

### Parameterized Controller Reference ###

You can parameterized the controller you want to use on a directive.

**JavaScript**

```javascript
...
var directive =
{
	...
	controller: '@',
	name: 'ctrl'
};
...
```

**HTML**

```html
<myCustomDirective ctrl="myParameterizedController">
```

## Sharing Directive Controllers via [`require`]() ##

You can communicate between directives *on the same element* using a common controller. You do that by using the `require` property. What you require is the name of a directive that has a controller in it. What you are saying is, in affect, "in order to use this directive, I'm going to require that there be another directive called (whatever it is you require), and that directive needs to have a controller on it".

And then your directives can work together in the context of the same controller.

**greeting.js**

```javascript
eventsApp.directive('greeting', function ()
{
    var directive =
    {
        restrict:'E',
        replace: true,
        template: "<button class='btn' ng-click='sayHello()'>Say Hello</button>",
        controller: function ($scope)
        {
            var greetings = ['hello'];

            $scope.sayHello = function ()
            {
                alert(greetings.join());
            };

            this.addGreeting = function (greeting)
            {
                greetings.push(greeting);
            }
        }
    };

    return directive;
})
.directive('finnish', function ()
{
    var directive =
    {
        restrict:'A',
        require:'greeting',
        link: function (scope, element, attrs, controller)
        {
            controller.addGreeting('hei');
        }
    };

    return directive;
})
.directive('hindi', function ()
{
    var directive =
    {
        restrict:'A',
        require:'greeting',
        link: function (scope, element, attrs, controller)
        {
            controller.addGreeting('हेलो');
        }
    };

    return directive;
});
```

>If multiple controllers are required, the `require` property of the directive can take an array argument. The corresponding parameter being sent to the `link` function will also be an array.

## Directive Priority and Using Terminal ##

### Priority ##

The order that you specify your directives on an element have no bearing on the order in which the directives get called.  If you want to specify an order in which the directives get called, you have to provide a `priority` property.

**greeting.js**
```
...
.directive('finnish', function ()
{
    var directive =
    {
        restrict:'A',
		priority: 1,
        require:'greeting',
        link: function (scope, element, attrs, controller)
        {
            controller.addGreeting('hei');
        }
    };

    return directive;
})
...
```

The lowest number has the highest priority.

### Terminal ###

We can also keep directives of a lower priority from executing when our directive is called by using the `terminal` property.

**greeting.js**
```
...
'use strict';

eventsApp.directive('greeting', function ()
{
    var directive =
    {
        restrict:'E',
        replace: true,
        priority: -1,
        template: "<button class='btn' ng-click='sayHello()'>Say Hello</button>",
        controller: function ($scope)
        {
            var greetings = ['hello'];

            $scope.sayHello = function ()
            {
                alert(greetings.join());
            };

            this.addGreeting = function (greeting)
            {
                greetings.push(greeting);
            }
        }
    };

    return directive;
})
.directive('finnish', function ()
{
    var directive =
    {
        restrict:'A',
        priority: -1,
        terminal: true,
        require:'greeting',
        link: function (scope, element, attrs, controller)
        {
            controller.addGreeting('hei');
        }
    };

    return directive;
})
.directive('hindi', function ()
{
    var directive =
    {
        restrict:'A',
        priority: -2,
        require:'greeting',
        link: function (scope, element, attrs, controller)
        {
            controller.addGreeting('हेलो');
        }
    };

    return directive;
});
```

**HTML**

```
<greeting hindi finnish />
```

Because `finnish` has a higher `priority` than `hindi`, it will execute first. Because `finnish` has the `terminal` property set to `true`, `hindi` will not execute at all.

>In order to make this work, I had to set the `priority` property on all my directives to a negative number. Otherwise, the `terminal` property would negate our `ng-click` directive.

## Using Require With Nested Directives ##

Sometimes, you might want to nest directives within each other. Something like this:

```html
<greeting>
	<div finnish hindi></div>
</greeting>
```

Thus far, our directives have all operated on the same element, with the controller being provided by one of the directives. We can tell our directives to look up the DOM tree until it finds an element with the named directive on it by prefixing the name of the controller on the `require` property with the carat (^).

```javascript
...
.directive('finnish', function ()
{
    var directive =
    {
        restrict:'A',
        require:'^greeting',
        link: function (scope, element, attrs, controller)
        {
            controller.addGreeting('hei');
        }
    };

    return directive;
})
...
```

>Note that for this to work, we will also need to use the `transclude` property on the `greeting` directive, covered next.

## Understanding Transclusion ##

Angular uses the term *transclusion* to mean taking HTML and embedding it inside of a directive. If our directive is set to replace the content of the directive (which it is), the HTML content of the directive on the page will be lost. We can keep it by using the transclude property, and providing a place in our template for the transcluded data to go.

**EventDetails.html**

```html
...
<div class="well span9">
    <collapsible title="{{session.name}}">
        <h6 style="margin-top: -10px">{{session.creatorName}}</h6>
        <span>Duration: {{session.duration | durations}}</span><br>
        <span>Level: {{session.level}}</span><br><br>

        <p>{{session.abstract}}</p>
    </collapsible >
</div>
...
```

Our new directive, `collapsible`, now contains all of a sessions details. We don't want to lose that.

**Collapsible.js**

```javascript
eventsApp.directive('collapsible', function ()
{
    var directive =
    {
        restrict: 'E',
        replace: true,
        template: '<div><h4 class="well-title" ng-click="toggleVisibility()">{{title}}</h4><div ng-transclude ng-show="visible"></div></div>',
        transclude: true,
        controller: function($scope)
        {
            $scope.visible = false;

            $scope.toggleVisibility = function ()
            {
                $scope.visible = !$scope.visible;
            }
        },
        scope:
        {
            title:'@'
        }
    };

    return directive;
});
```

In addition to setting the `transclude` property to true, we put the `ng-transclude` directive on the div that we want the HTML from the the `collapsible` directive on the page to go.

## Using Compile to Transform the DOM ##

We've seen the `link` function used in most of our directives so far - to, for example, observe and respond to changes in the DOM. The `compile` function is similar in that it is used to manipulate the DOM *prior to* the `link` function executing.

**HTML**

```html
Text to repeat: <input type="text" ng-model="text">
<div repeat-x="5">{{text}}</div>
```

**RepeatX.js**

Using the `link` function instead of `compile`.

```javascript
eventsApp.directive('repeatX', function ($compile)
{
    var directive =
    {
        restrict : 'A',

        link : function (scope, element, attrs, controller)
        {
            for (var i = 0, l = Number(attrs.repeatX) - 1; i < l; i += 1)
            {
                element.after($compile(element.clone().attr('repeat-x', 0))(scope));
            }
        }
    };

    return directive;
});
```

This works, but the call to the `$compile` service is expensive. Compiling requires the DOM to be traversed and for Angular to look for directives that need to be processed. What we really need is to stamp out *x* number of clones of the template and then let that all be compiled at once. This performance benefit is the major reason why the Angular team chose to break out the `compile` and `link` functions.

**RepeatX.js**

Using the `compile` function.

```javascript
// I couldn't get this working. I typed in exactly what was on the screen, but it didn't work.
```

## Making jQuery More Explicit with Directives ##

Not only can you use jQuery plugins alongside Angular directives, directives can help to make your jQuery plugins more explicit. You can also create jQuery plugin-like functionality purely with directives, although there is nothing wrong with using jQuery plugins with AngularJS.

### Adding a Date Picker ###

Add a date picker to using jQuery UI to the New Event page. Add a reference to jQuery UI in the index.html for this example to work.

**NewEvent.html**

```html
...
<label for="eventDate">Event Date:</label>
<input id="eventDate" type="text" date-picker date-keys required ng-pattern="/\d{2}/\d{2}/\d{4}/" ng-model="event.date" placeholder="format (mm/dd/yyyy)...">
...
```

**DatePicker.js**

The new date-picker directive.

```javascript
eventsApp.directive('datePicker', function ()
{
    var directive =
    {
        restrict : 'A',
        link : function (scope, element)
        {
            element.datepicker();
        }
    };

    return directive;
});
```

## Exercises ##

![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/angularjs/images/angular-introduction-05-exercises.png)

### [Next: Testing](https://github.com/scottoffen/ps-notes/blob/master/angularjs-introduction-06.md) ###
