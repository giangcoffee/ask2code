var app = angular.module('ask2code', ['ngCookies'],
 // Change interpolation symbols
 function ($interpolateProvider) {
    $interpolateProvider.startSymbol('<[');
    $interpolateProvider.endSymbol(']>');
});

app.controller("HomeController", function($scope, $cookies){
    $scope.showLogin = !!$cookies.authenticatedAccount;
    $scope.username = '';

    if($scope.showLogin) {
        var account = JSON.parse($cookies.authenticatedAccount);
        $scope.username = account.username;
    }
});