'use strict';

(function() {

  class MainController {

    constructor($http,$scope,socket,$window,Auth) {
      this.message = 'Hello';
      this.isloggedIn=Auth.isLoggedIn;
      this.getCurrentUser=Auth.getCurrentUser;this.setMovieToReviewId;
      this.$http=$http;this.review;this.rating=[];
      this.socket=socket;this.reviews=[];
      this.movie=[];this.moviemapped=false;
      this.theatres=[];this.hearts=[{value:1,click:false,classEmpty:'empty',classInv:'fullinv'},
      {value:2,click:false,classEmpty:'empty',classInv:'fullinv'},
      {value:3,click:false,classEmpty:'empty',classInv:'fullinv'},
      {value:4,click:false,classEmpty:'empty',classInv:'fullinv'},
      {value:5,click:false,classEmpty:'empty',classInv:'fullinv'}];
      this.theatre=[];this.avgRate=0;
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
      this.classToBookFinal;this.movieR=[];
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
       console.log(this.getCurrentUser());

       /**Calculate The Average Of Ratings Of Movie**/
       for(var avg=0;avg<this.movie.length;avg++)
       {
          this.movieR.push(this.movie[avg]);
          this.movieR[avg].AvgRatings.length=0;
          this.movie[avg].AvgRatings.length=0;
        }
        for(var avg=0;avg<this.movieR.length;avg++)
        {
          this.movieR[avg].AvgRatings.splice(0,this.movieR[avg].AvgRatings.length);
          this.avgRate=0;
           for(var rat=0;rat<this.movieR[avg].MovieReviews.length;rat++)
            this.avgRate=this.avgRate+this.movieR[avg].MovieReviews[rat].Rating.length;
          this.avgRate=((this.avgRate/this.movieR[avg].MovieReviews.length)*10).toFixed(0);
          this.avgRate=this.avgRate+"";
          if(this.avgRate[1]>=5)
            this.avgRate=parseInt(this.avgRate[0])+1;
          else
            this.avgRate=this.avgRate[0];
          console.log(this.avgRate);

          for(var number=0;number<this.avgRate;number++)
            this.movieR[avg].AvgRatings.push(number);
            console.log(this.movieR[avg].AvgRatings);
         }
        for(var index=0;index<response.data.length;index++)
          this.movieNames[index]=response.data[index].MovieName;
        console.log(this.movie);
        this.socket.syncUpdates('moviesmappingendpoints',this.movie);

        /*Jquery For Rating Heart Icons Popover*/
        $(document).ready(function()
        {
          $(".heart").click(function(e)
          {
            e.preventDefault();
          });

          /*Jquery To Rate Hearts*/
          // $(".ratehearts").click(function()
          // {
          //     $(this).children(".empty").toggleClass("full");
          //     $(this).children(".fullinv").toggleClass("fullv");
          // });
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
      this.theatresToBookFinal=[];
      this.moviemapped=false;
      this.movieToBookFinal=movie.Name;
      sessionStorage.setItem('bookmoviename',JSON.stringify(this.movieToBookFinal));
      for(var index=0;index<this.seatBookings.length;index++)
        if(this.seatBookings[index].MovieName==this.movieToBookFinal&&this.seatBookings[index].GoldClassPrice!=undefined)
          this.theatresToBookFinal.push(this.seatBookings[index].TheatreName);
          if(this.theatresToBookFinal.length>0)
            this.moviemapped=true;
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

    /*Reviews And Ratings Of The Movie */
    reviewMovie()
    {
      if(this.isloggedIn()==true)
      {
        if((this.review!=undefined&&this.review.length>0)&&this.rating.length>0)
        {
          var userFound=false;
          for(var userReview=0;userReview<this.reviews.length;userReview++)
            if(this.reviews[userReview].User==this.getCurrentUser().name)
            {
              console.log(this.reviews);
              userFound=true;
              this.reviews[userReview].Review=this.reviews[userReview].Review+"."+this.review;
              this.reviews[userReview].Rating=this.rating;
            }
          if(userFound==false)
          {
            console.log(this.reviews);
            this.review={User:this.getCurrentUser().name,Review:this.review,Rating:this.rating};
            this.reviews.push(this.review);
          }
          this.$http.put('/api/moviesendpoints/'+this.setMovieToReview._id,{
            MovieReviews:this.reviews
          });
          this.review="";
          this.reviews=[];
          this.hearts=[{value:1,click:false,classEmpty:'empty',classInv:'fullinv'},
          {value:2,click:false,classEmpty:'empty',classInv:'fullinv'},
          {value:3,click:false,classEmpty:'empty',classInv:'fullinv'},
          {value:4,click:false,classEmpty:'empty',classInv:'fullinv'},
          {value:5,click:false,classEmpty:'empty',classInv:'fullinv'}];
          this.rating=[];
          alert(" Moview Reviews/Ratings updated");
        }
        else
          alert("Please Provide Reviews And Ratings For The Movie");
      }
      else
        alert("Please Log in To Review And Rate Movie");
    }

    setMoviToReview(movie)
    {
      this.setMovieToReview=movie;
      this.noReviewsFound=false;
      for(var index=0;index<this.movie.length;index++)
        if(this.movie[index]._id==this.setMovieToReview._id)
        {
          this.reviews=this.movie[index].MovieReviews;
          if(this.reviews.length==0)
            this.noReviewsFound=true;
          console.log(this.reviews);
        }
    }

    /** Movie Ratings **/
    rateMovie(heart)
    {
      if(heart.click==false)
        heart.click=true;
      else
        heart.click=false;

      if(heart.click==true)
      {
        this.rating.length=heart.value;
        heart.classEmpty="full";
        heart.classInv="fullv";
        for(var val=0;val<heart.value;val++)
         {
            if(val<5)
            {
            this.hearts[val].click=true;
            this.hearts[val].classEmpty="full";
            this.hearts[val].classInv="fullv";
            }
          }
        }

        if(heart.click==false)
        {
          this.rating.length=heart.value-1;
          heart.classEmpty="empty";
          heart.classInv="fullinv";
          for(var val=heart.value-1;val<5;val++)
          {
            this.hearts[val].classEmpty="empty";
            this.hearts[val].classInv="fullinv";
            this.hearts[val].click=false;
          }
        }
        console.log(this.rating.length);
      }
    }


  angular.module('yeotempApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'homeCtrl'
    });
})();
