'use strict';

angular.module('yeotempApp', ['yeotempApp.auth', 'yeotempApp.admin', 'yeotempApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'btford.socket-io', 'validation.match','angular.filter','angular-cors'
  ])
  .config(function($routeProvider, $locationProvider,$httpProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);

  $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  });
