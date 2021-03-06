var app = angular.module('ask2code', ['ngCookies', 'angular-ladda'],
 // Change interpolation symbols
 function ($interpolateProvider) {
    $interpolateProvider.startSymbol('<[');
    $interpolateProvider.endSymbol(']>');
});

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data)
    {
      /**
       * The workhorse; converts an object to x-www-form-urlencoded serialization.
       * @param {Object} obj
       * @return {String}
       */
      var param = function(obj)
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

      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
  }
]);

app.controller("LoginController", function($scope, $http, $cookies){
    $scope.loading = false;
    $scope.email = '';
    $scope.password = '';

    $scope.login = function(){
         $scope.loading = true;
        var data = {};
        data.email = $scope.email;
        data.password = $scope.password;
        $http.post('/api/v1/auth/login/', data).
        then(function(data, status, headers, config) {
            $scope.loading = false;
            $scope.setAuthenticatedAccount(data.data);
            window.location = '/';
        }, function(data, status, headers, config) {
             $scope.loading = false;
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
});