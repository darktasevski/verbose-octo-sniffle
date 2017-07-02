(function(){
    angular.module('myApp')
        .controller('usersController', ['$http', '$scope', 'myFactory', function($http, $scope, myFactory){
            var self = this;
            self.foo = 'bar';
            self.myModel = 'brian';
            self.myEmail = 'brian@example.com';
            self.myUrl = 'http://example.com/foo?name=brian&age=27';
            self.myNum = 10;

            $scope.$watch('myModel',function(){
                $scope.changeHandler();
            });

            $scope.changeHandler = function(){
                console.log('changed!');
            };

            this.getContact = function(){
                console.log('using a factory method...');
                myFactory.getContact();
            };
        }]);
})();
