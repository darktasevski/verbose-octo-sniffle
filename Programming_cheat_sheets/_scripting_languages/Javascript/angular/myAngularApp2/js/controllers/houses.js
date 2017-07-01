(function(){  // wrap in a closure is good pactice
    var app = angular.module("housesControllerModule", []);

    app.controller('housesController', [ '$http', function($http){

        var house = this;

        // initialize the variable, before calling $http
        house.temp = [];

        // services: $http, $filter, $log
        // API from:  http://openweathermap.org/appid (I signed-up FREE)
        var url = 'http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=feb2ba5c1077688f103fb27f1e2fa3d7';
        var config = {}; //{myApiKeyIs: 'DFndn356DF7n8f3dNFer83nfe8rn'};

        // $http.get(url, config).success(function(data){   // WORKS! BUT I AM SAVING CALLS TO API...
        //   house.temp = data;
        // }).error(function(msg, code){
        //   console.log(' msg: ' + msg + '\n code: ' + code);
        // });

        // $http.post(...);
        // $http.delete(...);
        // $http({method: 'OPTIONS', url: 'http://example/foo.json'});
        // $http({method: 'PATCH', url: 'http://example/foo.json'});
        // $http({method: 'TRACE', url: 'http://example/foo.json'});
    }]);

})();
