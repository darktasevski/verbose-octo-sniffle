# AJAX tutorial


# syntax
```javascript
$.ajax(url, js_object); // js_object is for configuration

// example 1
$.ajax("/users", {success: function(){alert("success")}, data: {"guitar": "ibanez"} });

// you can use the HTML data-attributes!
$.ajax("/users", {success: function(){alert("success")}, data: $('.guitar').data("brand") });

// here is a more simple use:
$.get(url, success_function);

// if you know you are getting JSON from the server:
// so you dont need to specify the 'contentType' and 'dataType'
$.getJSON(url, function(){ });
```

# the js_object parameters for $.ajax();
```javascript
js_object = {
  error: function(request, errorType, errorMessage){console.log("woops")}, // function to execute when there is a error
  data: {"guitar": "ibanez"}, // data to send with URL, like the query string
  timeout: 5000, // 5 seconds to wait until it errors out
  beforeSend: function_1, // function to execute before sending the AJAX request
  complete: function_2, // after success or error
  context: variable1, // defines the value of 'this' key word
  type: 'POST', // HTTP verb
  dataType: 'json', // when you get the response, parse it as JSON
  contentType: 'application/json' // ask the server to respond as JSON

}
```

# tips:
- organize code in a js object and use that object in the 'document ready'
- use the methods inside that object
- remember to use: 'this.my_function();' inside the object


# tips 2:
```javascript
// use js constructors?
// example:
function Vacation(destination, el){
  this.el = el;
  // ...
};

$(function(){ // 'on document ready'
  var paris = new Vacation('Paris');
  // ...
});
```
