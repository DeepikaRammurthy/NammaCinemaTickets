'use strict';

angular.module('yeotempApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movies', {
        template: '<movies></movies>'
      });
  });
