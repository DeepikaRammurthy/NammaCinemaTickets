'use strict';

(function() {

  class MainController {

    constructor($http,$scope,socket,$window) {
      this.message = 'Hello';
      this.$http=$http;
      this.socket=socket;
      this.movie=[];
      this.theatres=[];
      this.theatre=[];
      this.City;
      this.$window=$window;
    }


    $onInit()
    {
      this.$http.get('/api/moviesendpoints').then(response =>{
      this.movie=response.data;
      this.socket.syncUpdates('moviesendpoint',this.movie);

      $(document).ready(function()
    {
      $(".heart").click(function(e){
        e.preventDefault();
      });
      $(".heart").popover();
    });
    });

    this.$http.get('/api/theatreendpoints').then(response => {

      this.theatres=response.data;
        this.socket.syncUpdates('theatresendpoint',this.theatres);
    });

  }
bookMovie(movie)
{
  location="https://localhost:9000/seatbooking.html";
}
  GetTheatre(city)
  {
    console.log("hi");
    this.$http.get('/api/theatreendpoints/'+ city).then(response =>{
    this.theatre=response.data;
    console.log(response);
  });
  }
  }


  angular.module('yeotempApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'homeCtrl'
    });
})();
