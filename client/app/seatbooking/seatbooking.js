'use strict';

angular.module('yeotempApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/seatbooking', {
        template: '<seatbooking></seatbooking>'
      });
  });
