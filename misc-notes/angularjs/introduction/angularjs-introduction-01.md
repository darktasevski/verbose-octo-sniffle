AngularJS Introduction : Part One
=================================

*Simple and Elegant MVC Web Applications*

>**AngularJS vs jQuery** : Most would consider this not a apt comparison, claiming that AngularJS and jQuery serve different purposes. However, AngularJS addresses - and attempts to enforce - good separation of of concerns (SOC), while jQuery does not. How you value the difference is up to you.

- [AngularJS](http://www.angularjs.org)
- [Developer Guide](https://docs.angularjs.org/guide)
- [API Reference](https://docs.angularjs.org/api)

# Introduction #

[Course Update Site](https://github.com/joeeames/AngularFundamentalsFiles)

Angular is an [*opinionated*](https://gettingreal.37signals.com/ch04_Make_Opinionated_Software.php) MV* framework, such as Knockout or Backbone.

### What is MV*? ###

**M**odel is where you store the data and state of your application

**V**iew is where you render the information to and receive input from the user.

__\*__ is anything else, such as a controller, presenter or ViewModel. Angular uses a controller.

### Features ###

- Handles AJAX communication with server
- Shows data on the page
- Updates the data (model) automatically
- Routes from one view to another (SPAs)
- Extends HTML by providing it's own elements and properties (called directives) to allow you to "teach HTML new tricks".
- [Web Components](http://www.w3.org/TR/components-intro/)
- [Object.observe](http://wiki.ecmascript.org/doku.php?id=harmony:observe)

## Angular Architecture ##

- Two Way Binding
- Dirty Checking
- Dependency Injection (Inversion of Control)

### Angular Components ###

```
+------------------+       +------------------+       +------------------+
|    Services      | <---> |    Controllers   | <---> | Views/Directives |
+------------------+       +------------------+       +------------------+
```

- **Controller** : The central component in an angular application
- **Services**: Communicate  with the server, contain complex business logic

## [Angular Seed](https://github.com/angular/angular-seed) ##

A zip file that acts as a starting point for an angular application.  It contains basic organization, and is geared towards a small project. It also contains a simple node server.

Download and extract the zip, then run `npm install`, `npm test` and `npm start`.

### [Next: Controllers and Markup](https://github.com/scottoffen/ps-notes/blob/master/angularjs/introduction/angularjs-introduction-02.md) ###
