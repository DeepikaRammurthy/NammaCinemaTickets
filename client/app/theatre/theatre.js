'use strict';

angular.module('yeotempApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/theatre', {
        template: '<theatre></theatre>'
      });
  });
