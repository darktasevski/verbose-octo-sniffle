app.controller("usersController", function($scope, $http) {
    $scope.count = 0;
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $http.get("http://www.w3schools.com/website/Customers_JSON.php")
    .success(function(response) {
        $scope.names = response;
    });
});