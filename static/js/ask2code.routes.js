(function () {
  'use strict';

  angular
    .module('ask2code.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($routeProvider) {
    $routeProvider.when('/register', {
      controller: 'RegisterController',
      controllerAs: 'vm',
      templateUrl: '/templates/register.html'
    }).when('/signin', {
      controller: 'LoginController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/login.html'
    }).otherwise('/');
  }
})();