'use strict';

angular.module('yeotempApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/rating', {
        template: '<rating></rating>'
      });
  });
