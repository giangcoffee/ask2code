var app = angular.module('ask2code', ['markdown', 'ngSanitize', 'ngCookies'],
 // Change interpolation symbols
 function ($interpolateProvider) {
    $interpolateProvider.startSymbol('<[');
    $interpolateProvider.endSymbol(']>');
});

app.config(['$locationProvider', function($location) {
  $location.hashPrefix('!');
}]);

app.config(["markdownConfig", function (markdownConfig) {
  markdownConfig = {
  // Outline static markup
  outline: true,
  // Escape html
  escapeHtml: false,
  // Sanitize html,
  sanitize: true,
  // Showdown options
  showdown: {
    extensions: [
	'github']
  }
};
}]);

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

app.controller('BlogController', ["$scope", "$cookies", "$http", function ($scope, $cookies, $http) {
    $scope.showLogin = !!$cookies.authenticatedAccount;
    $scope.username = '';

    if($scope.showLogin) {
        var account = JSON.parse($cookies.authenticatedAccount);
        $scope.username = account.username;
    }

    $scope.title = '';
    $scope.content = '';
    $scope.tags = '';

    $scope.submit = function(){
        var data = {};
        data.title = $scope.title;
        data.content = $scope.content;
        data.tags = $scope.tags;
        $http.post('/api/v1/posts/', data).
        then(function(data, status, headers, config) {
            window.location = '/';
        }, function(data, status, headers, config) {
            console.error('Epic failure!');
        });
    }
}]);