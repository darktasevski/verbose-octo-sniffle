requirejs.config({
    // baseUrl: 'aaa',  // base folder to find .js files
    paths: {
        mylib: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min'  // outside of main.js,  dont use .js <-----
    }
});


require(["helper/baz"], function(baz) {									// in require();  and define();  if I dont specify a name, it uses the name of the file - .js  !!!
	alert('just loaded the helper/baz.js  ' + baz);
    //This function is called when scripts/helper/baz.js is loaded.
    
    //If baz.js calls define(), then this function is not fired until
    //baz's dependencies have loaded, and the baz argument will hold
    //the module value for "helper/baz".
});

// requirejs(array, callback);





// use the require function to get stuff that is in a `define` function

// the require function requires the files,
//	and those  files could need dependencies! so they would use the define() function


// My rule of thumb:

// Define: If you want to declare a module other parts of your application will depend on.

// Require: If you just want to load and use stuff.