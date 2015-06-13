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
  }
]);

app.controller("RegisterController", function($scope, $http, $cookies){
    $scope.loading = false;
    $scope.email = '';
    $scope.username = '';
    $scope.first_name = '';
    $scope.last_name = '';
    $scope.password = '';
    $scope.retype_password = '';

    $scope.register = function(){
        $scope.loading = true;
        var data = {};
        data.email = $scope.email;
        data.username = $scope.username;
        data.first_name = $scope.first_name;
        data.last_name = $scope.last_name;
        data.username = $scope.username;
        data.password = $scope.password;
        $http.post('/api/v1/accounts/', $scope.param(data)).
        then(function(data, status, headers, config) {
            $scope.loading = false;
            window.location = '/signin';
        }, function(data, status, headers, config) {
            $scope.loading = false;
            console.error('Epic failure!');
        });
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