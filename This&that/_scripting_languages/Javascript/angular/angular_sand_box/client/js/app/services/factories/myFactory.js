(function(){
    angular.module('myApp')
        .factory('myFactory', function(){
            var obj = {
                getContact: function(){
                    console.log('getting contact');
                },
                foo: 'baz'
            };
            return obj;
        });
})();