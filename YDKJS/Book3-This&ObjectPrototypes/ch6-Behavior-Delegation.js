/*
  ==========
  Book 2. Ch 6. Behavior Delegation
  ==========
*/

// First define an object that will have concrete behavior that includes utility methods that other various tasks can use
var Task = {
  setID: function(ID) {this.id = ID;},
  outputID: function() {console.log(this.id);}
};
// Make `XYZ` delegate to `Task`
var XYZ = Object.create(Task);

// The `this` binding is implicit at call-site and looks directly at `XYZ.prepareTask` when called
XYZ.prepareTask = function(ID, Label) {
  this.setID(ID);
  this.label = Label;
};
XYZ.outputTaskDetails = function() {
  this.outputID();
  console.log(this.label);
};

// ***** Comparing models

// OO style ("prototypal"):
function Foo(who) {
	this.me = who;
}
Foo.prototype.identify = function() {
	return "I am " + this.me;
};

// Using call() here only inherits the constructor "Foo", and not the identify() on Foo.prototype
function Bar(who) {
	Foo.call( this, who );
}
// Links Bar.prototype to Foo.prototype, essentially inheriting identify();
Bar.prototype = Object.create( Foo.prototype);

Bar.prototype.speak = function() {
	alert("Hello, " + this.identify() + ".");
};

var b1 = new Bar("Aos");
var b2 = new Bar("Lou");

b1.speak(); // "Hello, I am Aos."
b2.speak(); // "Hello, I am Lou."

// OLOO (Objects Linked to Other Objects):
var Foo = {
	init: function(who) {
		this.me = who;
	},
	identify: function() {
		return "I am " + this.me;
	}
};
// Create `Bar` with prototypal link to `Foo`
var Bar = Object.create( Foo );
// Add another method on Bar
Bar.speak = function() {
	alert( "Hello, " + this.identify() + "." );
};
// Create new object with prototypal link to `Bar`, able to utilize init(), identify(), and speak()
var b1 = Object.create(Bar);
b1.init("Aos");
var b2 = Object.create(Bar);
b2.init("Lou");

b1.speak(); // "Hello, I am Aos."
b2.speak(); // "Hello, I am Lou."

// ***** Examples
// UI Widget using OO ("class") design pattern, using jQuery

// Parent class
function Widget(width, height) {
  this.width = width || 50;
  this.height = height || 50;
  this.$elem = null;
}

Widget.prototype.render = function($where) {
  if (this.$elem) {
    this.$elem.css( {
      width: this.width + "px",
      height: this.height + "px"
    }).appendTo($where);
  }
};

// Child class
function Button(width, height, label) {
  // "super" constructor call
  Widget.call(this, width, height);
  this.label = label || "Default";

  this.$elem = $("<button>").text(this.label);
}

// Make `Button` "inherit" from `Widget`
Button.prototype = Object.create(Widget.prototype);

// Override base "inherited" `render(...)`
Button.prototype.render = function($where) {
  // "Super" call
  Widget.prototype.render.call(this, $where);
  this.$elem.click(this.onClick.bind(this));
};

Button.prototype.onClick = function(evt) {
  console.log("Button '" + this.label + "' clicked!");
}

$(document).ready(function() {
  var $body = $(document.body);
  var btn1 = new Button(125, 30, "Hello");
  var btn2 = new Button(150, 40, "World");

  btn1.render($body);
  btn2.render($body);
});

// Using ES6 `class` sugar
class Widget {
  constructor(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
  }
  render($where) {
    if (this.$elem) {
      this.$elem.css( {
        width: this.width + "px",
        height: this.height + "px"
      }).appendTo($where);
    }
  }
};

class Button extends Widget {
  constructor(width, height, label) {
    super(width, height);
    this.label = label || "Default";
    this.$elem = $("<button>").text(this.label);
  }
  render($where) {
    super.render($where);
    this.$elem.click(this.onClick.bind(this));
  }
  onClick(evt) {
    console.log("Button '" + this.label + "' clicked!");
  }
}

$(document).ready(function() {
  var $body = $(document.body);
  var btn1 = new Button(125, 30, "Hello");
  var btn2 = new Button(150, 40, "World");

  btn1.render($body);
  btn2.render($body);
})

// Using OLOO style delegation
var Widget = {
  init: function(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
  },
  insert: function($where) {
    if (this.$elem) {
      this.$elem.css( {
        width: this.width + "px",
        height: this.height + "px"
      }).appendTo($where);
    }
  }
};

// Create prototypal link
var Button = Object.create(Widget);
// Build button object methods
Button.setup = function(width, height, label) {
  // Delegated call
  this.init(width, height);
  this.label = label || "Default";

  this.$elem = $("<button>").text(this.label);
};
Button.build = function($where) {
  // Delegated call
  this.insert($where);
  this.$elem.click(this.onClick.bind(this));
};
Button.onClick = function(evt) {
  console.log("Button '" + this.label + "' clicked!");
};

$(document).ready(function() {
  var $body = $(document.body);

  var btn1 = Object.create(Button);
  btn1.setup(125, 30, "Hello");

  var btn2 = Object.create(Button);
  btn2.setup(150, 40, "World");

  btn1.build($body);
  btn2.build($body);
})

// ***** Login and authentication example (using jQuery)
// OO design ("class")

// Parent class
function Controller() {
  this.errors = [];
}
Controller.prototype.showDialog = function(title, msg) {
  // display title and message to user in dialog
};
Controller.prototype.success = function(msg) {
  this.showDialog("Success", msg);
};
Controller.prototype.failure = function(err) {
  this.errors.push(err);
  this.showDialog("Error", err);
}

// Child class
function LoginController() {
  Controller.call(this);
}
// Link child class to parent
LoginController.prototype = Object.create(Controller.prototype);
LoginController.prototype.getUser = function() {
  return document.getElementById("login_username").value;
};
LoginController.prototype.getPassword = function() {
  return document.getElementById("login_password").value;
};
LoginController.prototype.validateEntry = function(user, pw) {
  user = user || this.getUser();
  pw = pw || this.getPassword();

  if (!(user && pw)) {
    return this.failure("Please enter a username and password!");
  }
  else if (pw.length < 5) {
    return this.failure ("Password must be 5+ characters!");
  }
  // got here? Validated!
  return true;
};
// Override to extend base `failure()`
LoginController.prototype.failure = function(err) {
  // "super" call
  Controller.prototype.failure.call(this, "Login invalid: " + err);
}

// => Authentication
// Child class
function AuthController(login) {
  Controller.call(this);
  // In addition to inheritance, we also need composition
  this.login = login;
}
// Link child class to parent
AuthController.prototype = Object.create(Controller.prototype);
AuthController.prototype.server = function(url, data) {
  return $.ajax({
    url: url,
    data: data
  });
};
AuthController.prototype.checkAuth = function() {
  var user = this.login.getUser();
  var pw = this.login.getPassword();

  if (this.login.validateEntry(user, pw)) {
    this.server("/check-auth", {
      user: user,
      pw: pw
    })
    .then(this.success.bind(this))
    .fail(this.failure.bind(this));
  }
};
// Override to extend base `success()`
AuthController.prototype.success = function() {
  // "super" call
  Controller.prototype.success.call(this, "Authenticated!");
};
// Override to extend base `failure()`
AuthController.prototype.failure = function(err) {
  // "super" call
  Controller.prototype.failure.call(this, "Auth Failed: " + err);
};

var auth = new AuthController(
  // In addition to inheritance, composition required
  new LoginController()
);
auth.checkAuth();

// Using OLOO-style behavior delegation
var LoginController = {
  errors: [],

  // As of ES6, concise method declaration in any object literal can be done, example:
  getUserConcise() {/* function body */},

  getUser: function() {
    return document.getElementById("login_username").value;
  },
  getPassword: function() {
    return document.getElementById("login_password").value;
  },
  validateEntry: function(user, pw) {
    user = user || this.getUser();
    pw = pw || this.getPassword();

    if (!(user && pw)) {
      return this.failure("Please enter a username & password!");
    }
    else if (pw.length < 5) {
      return this.failure("Password must be 5+ characters long!");
    }

    // If here, validated!
    return true;
  },
  showDialog: function(title, msg) {
    // Display success message to user in dialog
  },
  failure: function(err) {
    this.errors.push(err);
    this.showDialog("Error", "Login invalid: " + err);
  }
};

// Link `AuthController` to delegate to `LoginController`
var AuthController = Object.create(LoginController);

AuthController.errors = [];
AuthController.checkAuth = function() {
  var user = this.getUser();
  var pw = this.getPassword();

  if (this.validateEntry(user, pw)) {
    this.server("/check-auth", {
      user: user,
      pw: pw
    })
    .then(this.accepted.bind(this))
    .fail(this.rejected.bind(this));
  }
};
AuthController.server = function(url, data) {
  return $.ajax({
    url: url,
    data: data
  });
};
AuthController.accepted = function() {
  this.showDialog("Success", "Authenticated!");
};
AuthController.rejected = function(err) {
  this.failure("Auth Failed: " + err);
};

// All that is required is:
AuthController.checkAuth();

// If more objects are required in delegation chain:
var controller1 = Object.create(AuthController);
var controller2 = Object.create(AuthController);

// As of ES6, it is also possible to set up AuthController this way:
var AuthController = {
  errors: [],
  checkAuth() {
    // Function body
  },
  server(url, data) {
    // Function body
  }
};
// Now, link `AuthController` to delegate to `LoginController`
Object.setPrototypeOf(AuthController, LoginController);