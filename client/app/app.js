'use strict';

angular.module('yeotempApp', ['yeotempApp.auth', 'yeotempApp.admin', 'yeotempApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'btford.socket-io', 'validation.match','angular.filter'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
  });
