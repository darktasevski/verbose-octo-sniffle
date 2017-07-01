(function(){
    angular.module('myApp')
        .directive('userInfo', function(){
            return {
                scope: {
                    myName_d: '=myNameParameter',  // directive's scope variable => '=directiveParameter'
                    myEmail_d: '=myEmailParameter',
                },
                restrict: 'E',
                templateUrl: 'templates/myDirective.html',
                // template: '<div>'
                //     + '<h1>My directive</h1>'
                //     + '<p>do thing</p>'
                //     + '</div>',
                link: function(scope, el, attrs){
                    // the scope here is the directive's scope, if the `scope: {}` is used here
                    console.log(attrs);
                    console.log(scope);
                    console.log(scope.$parent);
                    //scope.myName = 'bar2';


                    // watch a variable that is in a scope, be it the controller's scope, or the directive's scope
                    scope.$watch('myName_d', function(){
                        console.log('myName_d changed!');
                        scope.myEmail_d = scope.myName_d + '@foo.com';
                    });

                    // scope.$parent.usersCtrl.myEmail = 'hahaha@gmail.com';  // how to change the parent controller! (it needs to be a valid value)
                }
            };
        });
})();



// http://stackoverflow.com/questions/17900201/how-to-access-parent-scope-from-within-a-custom-directive-with-own-scope-in-an



//   have a variable in the directive change with 2 way binding

//  watch that change and call a function


//   change the controller scope
//       (or better, just add the controller's variable that you want to be able to change as
//        a parameter to the directive in the html!)


// <!-- directive -->
//<user-info name='brian' age='27' myName="usersCtrl.myModel"></user-info>  // no brackets









