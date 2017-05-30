'use strict';

angular.module('yeotempApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movies', {
        template: '<movies></movies>',
        // templateUrl: 'app/movies/movies.html',
        // controller: 'MoviesComponent',
        // controllerAs: 'moviesCtrl',
         authenticate: 'admin'
      });
  });
