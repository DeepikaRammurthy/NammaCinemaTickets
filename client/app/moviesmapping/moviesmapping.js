'use strict';

angular.module('yeotempApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/moviesmapping', {
        template: '<moviesmapping></moviesmapping>'
      });
  });
