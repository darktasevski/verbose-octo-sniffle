angular.module('myApp')
    .controller('applicationController', ['$log', function($log){
        $log.log('hello');
    }]);