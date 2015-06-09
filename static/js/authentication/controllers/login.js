var app = angular.module('ask2code', ['ngCookies'],
 // Change interpolation symbols
 function ($interpolateProvider) {
    $interpolateProvider.startSymbol('<[');
    $interpolateProvider.endSymbol(']>');
});

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  }
]);

app.controller("LoginController", function($scope, $http, $cookies){
    $scope.email = '';
    $scope.password = '';

    $scope.login = function(){
        console.log('email -> ' + $scope.email + ' password -> ' + $scope.password);
        var data = {};
        data.email = $scope.email;
        data.password = $scope.password;
        $http.post('/api/v1/auth/login/', $scope.param(data)).
        then(function(data, status, headers, config) {
            $scope.setAuthenticatedAccount(data.data);
            window.location = '/';
        }, function(data, status, headers, config) {
            console.error('Epic failure!');
        });
    };

    $scope.getAuthenticatedAccount = function getAuthenticatedAccount() {
      if (!$cookies.authenticatedAccount) {
        return;
      }

      return JSON.parse($cookies.authenticatedAccount);
    };

    $scope.isAuthenticated = function isAuthenticated() {
      return !!$cookies.authenticatedAccount;
    };

    $scope.setAuthenticatedAccount = function setAuthenticatedAccount(account) {
      $cookies.authenticatedAccount = JSON.stringify(account);
    };

    $scope.unauthenticate = function unauthenticate() {
      delete $cookies.authenticatedAccount;
    };

    $scope.param = function(obj)
      {
        var query = '';
        var name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj)
        {
          value = obj[name];

          if(value instanceof Array)
          {
            for(i=0; i<value.length; ++i)
            {
              subValue = value[i];
              fullSubName = name + '[' + i + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
          else if(value instanceof Object)
          {
            for(subName in value)
            {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
          else if(value !== undefined && value !== null)
          {
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
          }
        }

        return query.length ? query.substr(0, query.length - 1) : query;
      };
});