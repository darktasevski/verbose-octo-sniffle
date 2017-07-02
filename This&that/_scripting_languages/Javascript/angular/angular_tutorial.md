# angular tutorial
  - https://docs.angularjs.org/tutorial/

  -  you should load the Angular.js in the HTML `<head>`, or before your scripts!

  - Your application should have at least one module file, 
    - and one controller file for each controller.
  - you can add twitter-bootstrap to your angular project! just add the CSS in the HTML `<head>`  
    - `<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">`

### example:

- The `ng-app` tells AngularJS that the <div> element is the "owner" of an AngularJS application.
  - The `ng-app` will automatically initialize the application when a web page is loaded.

- The `ng-model` gets the value of the (input, select, textarea) field, and sets the application variable `name` to its value.
  - it can provide validation
  - status of data such as: invalid, dirty, touched, error
  - provide CSS for HTML elements
  - bind HTML elements to HTML forms


- The `ng-bind` puts the application variable `name` inside the <p> element.

- Each controller has its own scope: the HTML element where they were defined.

```html
<!DOCTYPE html>
<html>

<head>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
</head>

<body>

<div ng-app="">
    <p>Name: <input type="text" ng-model="name"></p>
    <p ng-bind="name"></p>
</div>

</body>
</html>
```


### ng-init

- initializes a variable

- You can use `data-ng-`, instead of `ng-`, if you want to make your page HTML5 valid.

```html
<div ng-app="" ng-init="firstName='John'">

<p>The name is <span ng-bind="firstName"></span></p>

</div>
```


### Expressions

- they need to be inside a `ng-app` div tag
- expressions are written inside double braces: `{{ 1 + 1 }}`.


```html
<!DOCTYPE html>
<html>

<head>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
</head>

<body>

<div ng-app="">
    <p>My first expression: {{ 5 + 5 }}</p>
</div>

</body>
</html>
```


### ng-controller 

- The controller code will execute when the page loads.

- the `ng-controller` value will execute a JS function with the same name

- `$scope` is the context of the page (so the variables are available to the page)
  - `$scope` is the application object (the owner of application variables and functions).

- A controller is a JavaScript Object, created by a standard JavaScript object constructor.

- you can store controllers in external files:
  - just add the code to a file called `personController.js`
  - and replace the controller code with: `<script src="personController.js"></script>` at the botom of the page


```html
<div ng-app="" ng-controller="personController">

First Name: <input type="text" ng-model="firstName"><br>
Last Name: <input type="text" ng-model="lastName"><br>
<br>
Full Name: {{firstName + " " + lastName}}

Full Name: {{fullName()}}

</div>

<script>
function personController($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    }
}
</script>
```




### objects

```html
<div ng-app="" ng-init="person={firstName:'John',lastName:'Doe'}">

<p>The name is {{ person.lastName }}</p>

</div>
```


### ng-repeat

```html

- this example repeats the <li> tag

<div ng-app="" ng-init="names=['Jani','Hege','Kai']">
  <ul>
    <li ng-repeat="x in names">
      {{ x }}
    </li>
  </ul>
</div>

```

```html
<div ng-app="" ng-init="names=[
{name:'Jani',country:'Norway'},
{name:'Hege',country:'Sweden'},
{name:'Kai',country:'Denmark'}]">

<ul>
  <li ng-repeat="x  in names">
    {{ x.name + ', ' + x.country }}
  </li>
</ul>

</div>

```

### Filters

  - filters can be used to transform data
  - A filter can be added to an expression with a pipe character (|) and a filter.

Filter      Description
currency    Format a number to a currency format.
filter      Select a subset of items from an array.
lowercase   Format a string to lower case.
orderBy     Orders an array by an expression.
uppercase   Format a string to upper case.


```html
<div ng-app="" ng-controller="personController">

<p>The name is {{ lastName | uppercase }}</p>

</div>
```


### filters for directives
  - orderBy:'country'

```html
<div ng-app="" ng-controller="namesController">

<ul>
  <li ng-repeat="x in names | orderBy:'country'">
    {{ x.name + ', ' + x.country }}
  </li>
</ul>

<div>
```


### filtering input
  - like a name search
  - The `filter` filter selects a subset of an array
  - its filtering against the `my_search_text` variable


```html
<div ng-app="" ng-controller="namesController">

<p><input type="text" ng-model="my_search_text"></p>

<ul>
  <li ng-repeat="x in names | filter:my_search_text | orderBy:'country'">
    {{ (x.name | uppercase) + ', ' + x.country }}
  </li>
</ul>

</div>

```




### $http

  - read data from remote servers
  - `$http.get(url)` is the function to use for reading server data.


```html
<div ng-app="" ng-controller="customersController"> 

<ul>
  <li ng-repeat="x in names">
    {{ x.Name + ', ' + x.Country }}
  </li>
</ul>

</div>

<script>
function customersController($scope,$http) {
    $http.get("http://www.w3schools.com/website/Customers_JSON.php")
    .success(function(response) {
        $scope.names = response;
    });
}
</script>
```

```json
// http://www.w3schools.com/website/Customers_JSON.php
[

{
"Name" : "Alfreds Futterkiste",
"City" : "Berlin",
"Country" : "Germany"
},
{
"Name" : "Berglunds snabbköp",
"City" : "Luleå",
"Country" : "Sweden"
},
{
"Name" : "Centro comercial Moctezuma",
"City" : "México D.F.",
"Country" : "Mexico"
}

]

```

### display data in a table

```html
<div ng-app="" ng-controller="customersController"> 

<table>
  <tr ng-repeat="x in names">
    <td>{{ x.Name }}</td>
    <td>{{ x.Country }}</td>
  </tr>
</table>

</div>

<script>
function customersController($scope,$http) {
  $http.get("http://www.w3schools.com/website/Customers_JSON.php")
  .success(function(response) {$scope.names = response;});
}
</script>
```



### ng-disabled
  - disable a button if "true"

```html
<div ng-app="" ng-init="mySwitch=true">
<p>
<button ng-disabled="mySwitch">Click Me!</button>
</p>
<p>
<input type="checkbox" ng-model="mySwitch"/>Button
</p>
<p>
{{ mySwitch }}
</p>
</div> 
```


### ng-show or (ng-hide)
  - The ng-show directive shows or hides an HTML element.

```html
<div ng-app="">

<p ng-show="true">I am visible.</p>

<p ng-show="false">I am not visible.</p>

<p ng-show="hour > 12">I am visible.</p>

</div>

```


### ng-click

  - here it increments the count every time you click
  - on click, the code will be evaluated
  - it could also call a method of a controller

```html
<div ng-app="" ng-controller="myController">

<button ng-click="count = count + 1">Click me!</button>

<p>{{ count }}</p>

</div>
```



# MODULES
  - All application controllers should belong to a module.
  - they keep the global namespace clean.
  - the `ng-app` receives the name of the MODULE
  - the controller is a property of the module

```html
<!DOCTYPE html>
<html>

<head>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
</head>

<body>

<div ng-app="myApp" ng-controller="myCtrl">
{{ firstName + " " + lastName }}
</div>

<script>
var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});
</script>

</body>
</html>
```



# folder structure

```
/index.html
/myApp.js
/myCtrl1.js
/myCtrl2.js
/myCtrl3.js
```

```js
// /myApp.js
var app = angular.module("myApp", []);
```

```js
// /myCtrl.js

app.controller("myCtrl", function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});
```

```html
<!-- /index.html -->
<!DOCTYPE html>
<html>

<head>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
</head>

<body>

<div ng-app="myApp" ng-controller="myCtrl">
{{ firstName + " " + lastName }}
</div>

<script src="myApp.js"></script> <!-- load the module first, then the controllers -->
<script src="myCtrl.js"></script>

</body>
</html>
```


### HTML forms
  - The novalidate attribute is new in HTML5. It disables any default browser validation.

```html
<div ng-app="" ng-controller="formController">
  <form novalidate>
    First Name:<br>
    <input type="text" ng-model="user.firstName"><br>
    Last Name:<br>
    <input type="text" ng-model="user.lastName">
    <br><br>
    <button ng-click="reset()">RESET</button>
  </form>
  <p>form = {{user}}</p>
  <p>master = {{master}}</p>
</div>

<script>
function formController ($scope) {
    $scope.master = {firstName: "John", lastName: "Doe"};
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
};
</script>
```




# validation
  - remember that you need SERVER SIDE VALIDATION


```html


<form  ng-app=""  ng-controller="validateCtrl"
name="myForm" novalidate>

<p>Username:<br>
  <input type="text" name="user" ng-model="user" required>
  <span style="color:red" ng-show="myForm.user.$dirty && myForm.user.$invalid">
  <span ng-show="myForm.user.$error.required">Username is required.</span>
  </span>
</p>

<p>Email:<br>
  <input type="email" name="email" ng-model="email" required>
  <span style="color:red" ng-show="myForm.email.$dirty && myForm.email.$invalid">
  <span ng-show="myForm.email.$error.required">Email is required.</span>
  <span ng-show="myForm.email.$error.email">Invalid email address.</span>
  </span>
</p>

<p>
  <input type="submit"
  ng-disabled="myForm.user.$dirty && myForm.user.$invalid ||
  myForm.email.$dirty && myForm.email.$invalid">
</p>

</form>

<script>
function validateCtrl($scope) {
    $scope.user = 'John Doe';
    $scope.email = 'john.doe@gmail.com';
}
</script>



```


# twitter-bootstrap example

```html
<!DOCTYPE html>
<html ng-app="">
<head>
<link rel="stylesheet" href = "http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
</head>

<body ng-controller="userController">
<div class="container">

<h3>Users</h3>

<table class="table table-striped">
  <thead>
    <tr>
      <th>Edit</th>
      <th>First Name</th>
      <th>Last Name</th>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="user in users">
      <td>
        <button class="btn" ng-click="editUser(user.id)">
          <span class="glyphicon glyphicon-pencil"></span>  Edit
        </button>
      </td>
      <td>{{ user.fName }}</td>
      <td>{{ user.lName }}</td>
    </tr>
  </tbody>
</table>

<hr>
<button class="btn btn-success" ng-click="editUser('new')">
<span class="glyphicon glyphicon-user"></span>  Create New User
</button>
<hr>

<h3 ng-show="edit">Create New User:</h3>
<h3 ng-hide="edit">Edit User:</h3>

<form class="form-horizontal">
  <div class="form-group">
    <label class="col-sm-2 control-label">First Name:</label>
    <div class="col-sm-10">
    <input type="text" ng-model="fName" ng-disabled="!edit" placeholder="First Name">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">Last Name:</label>
    <div class="col-sm-10">
    <input type="text" ng-model="lName" ng-disabled="!edit" placeholder="Last Name">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Password:</label>
    <div class="col-sm-10">
    <input type="password" ng-model="passw1" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Repeat:</label>
    <div class="col-sm-10">
    <input type="password" ng-model="passw2" placeholder="Repeat Password">
    </div>
  </div>
</form>

<hr>
<button class="btn btn-success" ng-disabled="error || incomplete">
<span class="glyphicon glyphicon-save"></span>  Save Changes
</button>

</div>

<script src= "myUsers.js"></script>

</body>
</html>
```

```js
// /myUsers.js

function userController($scope) {
$scope.fName = '';
$scope.lName = '';
$scope.passw1 = '';
$scope.passw2 = '';
$scope.users = [
{id:1, fName:'Hege',  lName:"Pege" },
{id:2, fName:'Kim',   lName:"Pim" },
{id:3, fName:'Sal',   lName:"Smith" },
{id:4, fName:'Jack',  lName:"Jones" },
{id:5, fName:'John',  lName:"Doe" },
{id:6, fName:'Peter', lName:"Pan" }
];
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.editUser = function(id) {
  if (id == 'new') {
    $scope.edit = true;
    $scope.incomplete = true;
    $scope.fName = '';
    $scope.lName = '';
    } else {
    $scope.edit = false;
    $scope.fName = $scope.users[id-1].fName;
    $scope.lName = $scope.users[id-1].lName; 
  }
};

$scope.$watch('passw1',function() {$scope.test();});
$scope.$watch('passw2',function() {$scope.test();});
$scope.$watch('fName', function() {$scope.test();});
$scope.$watch('lName', function() {$scope.test();});

$scope.test = function() {
  if ($scope.passw1 !== $scope.passw2) {
    $scope.error = true;
    } else {
    $scope.error = false;
  }
  $scope.incomplete = false;
  if ($scope.edit && (!$scope.fName.length ||
  !$scope.lName.length ||
  !$scope.passw1.length || !$scope.passw2.length)) {
       $scope.incomplete = true;
  }
};

}

```




# includes (like rails partials)
  - if your main html gets too long, use this!

```html
<body>

<div class="container">
  <div ng-include="'file1.htm'"></div>
  <div ng-include="'file2.htm'"></div>
</div>

</body>
```






































