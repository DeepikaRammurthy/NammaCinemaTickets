'use strict';

angular.module('yeotempApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        template: '<home></home>'
      });
  });
