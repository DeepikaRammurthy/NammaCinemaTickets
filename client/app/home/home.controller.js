'use strict';

(function(){

class HomeComponent {
  constructor($http,$scope,socket) {
    this.message = 'Hello';
    this.$http=$http;
    this.socket=socket;
    this.movie=[];
    this.theatres=[];
    this.theatre=[];
    this.City;
  }


  $onInit()
  {
    this.$http.get('/api/moviesendpoints').then(response =>{
    this.movie=response.data;
    this.socket.syncUpdates('moviesendpoint',this.movie);
  });

  this.$http.get('/api/theatreendpoints').then(response => {

    this.theatres=response.data;
      this.socket.syncUpdates('theatresendpoint',this.theatres);
  });

}

GetTheatre(city)
{
  console.log("hi");
  this.$http.get('/api/theatreendpoints/'+ city).then(response =>{
  this.theatre=response.data;
  console.log(response);
});
}

Ge()
{
  console.log("error");
}
}

angular.module('yeotempApp')
  .component('home', {
    templateUrl: 'app/home/home.html',
    controller: HomeComponent,
    controllerAs: 'homeCtrl'
  });

})();
