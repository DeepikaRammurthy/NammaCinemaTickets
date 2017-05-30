'use strict';

angular.module('yeotempApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/moviesmapping', {
        template: '<moviesmapping></moviesmapping>',
        // templateUrl: 'app/moviesmapping/moviesmapping.html',
        // controller: 'MoviesmappingComponent',
        // controllerAs: 'moviesmappingCtrl',
         authenticate: 'admin'
      });
  });
