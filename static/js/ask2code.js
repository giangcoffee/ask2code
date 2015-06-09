(function () {
  'use strict';

  angular.module('ask2code', [
      'ask2code.authentication',
      'ask2code.config'
    ]).run(run);

    run.$inject = ['$http'];
    angular.module('ask2code.config', []);

    /**
* @name run
* @desc Update xsrf $http headers to align with Django's defaults
*/
function run($http) {
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
}
})();