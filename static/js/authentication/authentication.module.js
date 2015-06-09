(function () {
  'use strict';

  angular
    .module('ask2code.authentication', [
      'ask2code.authentication.controllers',
      'ask2code.authentication.services'
    ]);

  angular
    .module('ask2code.authentication.controllers', []);

  angular
    .module('ask2code.authentication.services', ['ngCookies']);
})();