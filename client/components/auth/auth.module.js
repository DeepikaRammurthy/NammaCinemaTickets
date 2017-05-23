'use strict';

angular.module('yeotempApp.auth', ['yeotempApp.constants', 'yeotempApp.util', 'ngCookies',
    'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
