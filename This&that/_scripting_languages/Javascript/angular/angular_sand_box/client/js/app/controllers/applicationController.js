(function(){
    angular.module('myApp')
        .controller('applicationController', ['$http', '$scope', function($http, $scope){
            this.rootUrl = 'http://example.com';
        }]);
})();
