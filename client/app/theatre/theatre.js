'use strict';

angular.module('yeotempApp')
  .config(function ($routeProvider) {
    $routeProvider.when('/theatre', {
      template:'<theatre></theatre>',
        // templateUrl: 'app/theatre/theatre.html',
        // controller: 'TheatreComponent',
        // controllerAs: 'theatreCtrl',
         authenticate: 'admin'
      });
  });
