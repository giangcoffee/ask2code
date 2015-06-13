var app = angular.module('ask2code', ['ngCookies', 'ngProgress'],
 // Change interpolation symbols
 function ($interpolateProvider) {
    $interpolateProvider.startSymbol('<[');
    $interpolateProvider.endSymbol(']>');
});

app.config(function(ngProgressProvider){
    // Default color is firebrick
    ngProgressProvider.setColor('red');
    // Default height is 2px
    ngProgressProvider.setHeight('2px');
});
app.controller("HomeController", function($scope, $cookies, $http, ngProgress){
    ngProgress.start();
    $http.get("/api/v1/posts/").then(function(response) {
        $scope.items=  response.data;
        ngProgress.complete();
    }, function(errorResponse) {
        console.log('can not read data');
    });

    $scope.items = [];
    $scope.showLogin = !!$cookies.authenticatedAccount;
    $scope.username = '';

    if($scope.showLogin) {
        var account = JSON.parse($cookies.authenticatedAccount);
        $scope.username = account.username;
    }
});