'use strict';

(function() {

  class MainController {

    constructor($http,$scope,socket,$window,Auth) {
      this.message = 'Hello';
      this.$http=$http;
      this.socket=socket;
      this.movie=[];this.enable=false;
      this.theatres=[];
      this.theatre=[];
      this.City;this.seatBookings=[];
      this.movieToBookFinal;
      this.theatresToBookFinal=[];
      this.theatreToBookFinal;
      this.theatrebooked=false;
      this.datesToBookFinal=[];
      this.dateToBookFinal;this.classesToBookFinal=["Gold","Silver"];
      this.dateBooked=false;
      this.timesToBookFinal=[];
      this.timeToBookFinal;
      this.timeBooked=false;
      this.classBooked=false;
      this.classToBookFinal;
      /*this.movieName="m";
      this.theatreName="Inox";
      this.cityName="c";*/
      this.$window=$window;this.movieNames=[];
    }


    $onInit()
    {
      /*var m=sessionStorage.getItem('movieNameNav');
      var t=sessionStorage.getItem('theatreNameNav');
      var c=sessionStorage.getItem('cityNameNav');
      this.movieName=JSON.parse(m);
      this.theatreName=JSON.parse(t);
      this.cityName=JSON.parse(c);
      console.log(  this.movieName + " "+this.theatreName+" "+this.cityName);*/

      /*Fetch The Existing Movies From Database*/
      this.$http.get('/api/moviesendpoints').then(response =>{
       this.movie=response.data;
        for(var index=0;index<response.data.length;index++)
          this.movieNames[index]=response.data[index].MovieName;
        console.log(this.movieNames);
        this.socket.syncUpdates('moviesmappingendpoints',this.movie);

        /*Jquery For Rating Heart Icons Popover*/
        $(document).ready(function()
        {
          $(".heart").click(function(e){
            e.preventDefault();
          });
          $(".heart").popover();
        });
      });

      /*Fetch The Existing Theatres From Database*/
      this.$http.get('/api/theatreendpoints').then(response => {
        this.theatres=response.data;
        this.socket.syncUpdates('theatresendpoint',this.theatres);
      });

      /*Fetch The Existing SeatBookings From Database*/
      this.$http.get('/api/seatbookendpoints').then(response =>
      {
        this.seatBookings=response.data;
        this.socket.syncUpdates('seatbookendpoints',this.seatBookings);
        /*console.log(this.seatBookings);
        this.enable=sessionStorage.getItem('enable');
        this.enable=JSON.parse(this.enable);
        if(this.enable==true)*/
      });
    }

    /*Fetch The Existing Theatres For Movie Choosed To Book From Database*/
    bookMovie(movie)
    {
      // location="https://localhost:9000/seatbooking.html";
      this.movieToBookFinal=movie.Name;
      sessionStorage.setItem('bookmoviename',JSON.stringify(this.movieToBookFinal));
      for(var index=0;index<this.seatBookings.length;index++)
        if(this.seatBookings[index].MovieName==this.movieToBookFinal&&this.seatBookings[index].GoldClassPrice!=undefined)
          this.theatresToBookFinal.push(this.seatBookings[index].TheatreName);
      console.log(this.theatresToBookFinal);
    }

    /*Fetch The Existing ShowDates For Theatre and Movie Choosed To Book From Database*/
    bookDate()
    {
      if(this.theatreToBookFinal!=undefined)
        this.theatreBooked=true;
      sessionStorage.setItem('booktheatrename',JSON.stringify(this.theatreToBookFinal));
      for(var index=0;index<this.seatBookings.length;index++)
        if(this.seatBookings[index].MovieName==this.movieToBookFinal&&this.seatBookings[index].TheatreName==this.theatreToBookFinal&&this.seatBookings[index].GoldClassPrice!=undefined)
          this.datesToBookFinal.push(this.seatBookings[index].Date);
    }

    /*Fetch The Existing ShowTimes For ShowDates Theatre and Movie Choosed To Book From Database*/
    bookTime()
    {
      if(this.dateToBookFinal!=undefined)
        this.dateBooked=true;
      sessionStorage.setItem('bookdatename',JSON.stringify(this.dateToBookFinal));
      for(var index=0;index<this.seatBookings.length;index++)
        if(this.seatBookings[index].MovieName==this.movieToBookFinal&&this.seatBookings[index].TheatreName==this.theatreToBookFinal&&
            this.seatBookings[index].Date==this.dateToBookFinal&&this.seatBookings[index].GoldClassPrice!=undefined)
              this.timesToBookFinal.push(this.seatBookings[index].ShowTime);
    }

    /*Set Show Time Booked Details (this.timeBooked) Flag To true Proceed To Class Selection*/
    bookClass()
    {
      if(this.timeToBookFinal!=undefined)
        this.timeBooked=true;
      sessionStorage.setItem('booktimename',JSON.stringify(this.timeToBookFinal));
    }

    /*Set Class Booked Details (this.classBooked) Flag To true And Proceed To Seatings*/
    showSeatsSelection()
    {
      if(this.classToBookFinal!=undefined)
      {  // this.classBooked=true;
        sessionStorage.setItem('bookclassname',JSON.stringify(this.classToBookFinal));
        for(var index=0;index<this.seatBookings.length;index++)
          if(this.seatBookings[index].MovieName==this.movieToBookFinal&&this.seatBookings[index].TheatreName==this.theatreToBookFinal&&
            this.seatBookings[index].Date==this.dateToBookFinal&&this.seatBookings[index].ShowTime==this.timeToBookFinal&&this.seatBookings[index].GoldClassPrice!=undefined)
              sessionStorage.setItem('seatbookid',JSON.stringify(this.seatBookings[index]));
              /*this.enable=true;
              sessionStorage.setItem('enable',JSON.stringify(this.enable));
              this.$window.location.reload();
              if(confirm("Proceed To Select Seats.."))*/
              this.$window.location="http://localhost:9000/seatbooking";
      }
      else {
        alert("Select All The Required Fields");
      }
    }
  }


  angular.module('yeotempApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'homeCtrl'
    });
})();
