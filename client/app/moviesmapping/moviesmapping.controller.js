      'use strict';

      (function(){

        class MoviesmappingComponent
        {
          constructor($scope,$http,socket,$window) {

          /* $(document).ready(function(){
              $(".showDates").css('background-color','cyan');
            });*/

            this.$window=$window;this.movieTomap;
            this.message = 'Hello';
            this.$http=$http;this.flag=false;
            this.socket=socket;this.isTheatreSelected=false;
            this.movieNames=[];this.selectedMovieName=[];this.selectedCityName=[];this.cityNames=[];this.theatreDetails=[];
            this.theatres=[];this.displayDates=[];this.mappingDates=[];this.displayTheatres=[];this.selectedTheatres=[];
            this.selectedTheatreOption;this.reversedTheatreOption;this.mappings=[];this.mappedShowTimes=[];this.theatres=[];
            this.silverClassSeats=[];this.goldClassSeats=[];this.silverClassSeatsDetails=[];this.goldClassSeatsDetails=[];
            this.goldClassSeatsOfScreen=[];this.silverClassSeatsOfScreen=[];this.seatBookings=[];this.goldClassPrice;this.silverClassPrice;
            this.isOK=true;
          }

          $onInit()
          {
            /** Fetch Movie Names from Movies Collection **/
            this.$http.get('/api/moviesendpoints').then(response =>
            {
              this.movieNames=response.data;
              this.socket.syncUpdates('moviesendpoints',this.movieNames);
            });

            /** Fetch City Names from Theatres Collection **/
            this.$http.get('/api/theatreendpoints').then(response =>
            {
              this.theatreDetails=response.data;
              for(var index=0;index<response.data.length;index++)
              {
                this.cityNames[index]=response.data[index].City;
                this.theatres[index]=response.data[index];
              }
              this.socket.syncUpdates('theatreendpoints',this.theatreDetails);
            });

            /** Fetch Shows(SeatBookings) from Seatbookings Collection **/
            this.$http.get('/api/seatbookendpoints').then(response =>
            {
              this.seatBookings=response.data;
              this.socket.syncUpdates('seatbookendpoints',this.seatBookings);
              console.log(this.seatBookings);
              $(document).ready(function(){
                $(".price").click(function(){
                  $(".price").children('input').css('visibility','hidden');
                  $(this).children('input').css('visibility','visible');
                });
              });
            });

            /** Fetch Moviesmapping from Moviesmappings Collection **/
            this.$http.get('/api/moviesmappingendpoints').then(response=>
            {
              this.mappings=response.data;
              this.socket.syncUpdates('moviesmappingendpoints',this.mappings);
              for(var index=0;index<this.theatres.length;index++)
                this.theatreDetails[index]=this.theatres[index];
            });

          }

          /** Fetch Moviesmapping from Moviesmappings Collection **/
          addSelectedTheatres()
          {
            if(this.selectedTheatreOption!==undefined && this.selectedTheatreOption[0]!==undefined)
            {
              for(var index=0;index<this.theatreDetails.length;index++)
                if((this.theatreDetails[index].TheatreName+":"+this.theatreDetails[index].PlaceName)==this.selectedTheatreOption[0])
                {
                  this.selectedTheatres.push(this.theatreDetails[index]);
                  this.theatreDetails.splice(index,1);
                }
                this.mappingDetails();
                this.isTheatreSelected=true;
              }
            }

            /**Display Mapping Details While Fetching Next 7 Dates For Mapping**/
            mappingDetails()
            {
                this.displayTheatres=this.selectedTheatres;
                this.displayDates=[];
                for(var i=1;i<=7;i++)
                {
                  var date=(new Date(new Date().getTime()+((24*3600*1000)*i))).toDateString();
                  var datePushedFlag=false;
                  var dateRecord={date,datePushedFlag};
                  this.displayDates.push(dateRecord);
                }

                $(document).ready(function(){
                  $(".showDates").click(function(){
                     $(this).children(".mark").children().toggleClass("check");
                   });
                   $(".timestomap").click(function(){
                     $(this).children(".mark").children().toggleClass("check");
                   });
                 });
              }

              /** Select Theatres From Fetched List To Mapping List For Mapping**/
              addAllTheatres()
              {
                for(var index=0;index<this.theatreDetails.length;index++)
                this.selectedTheatres.push(this.theatreDetails[index]);
                this.theatreDetails=[];
                this.mappingDetails();
                this.isTheatreSelected=true;
              }

              /** Reverse Selected Theatres From Mapping List To Fetched List For Mapping**/
              reverseSelectedTheatres()
              {
                if(this.reversedTheatreOption!==undefined && this.reversedTheatreOption[0]!==undefined)
                for(var index=0;index<this.selectedTheatres.length;index++)
                if((this.selectedTheatres[index].TheatreName+":"+this.selectedTheatres[index].PlaceName)==this.reversedTheatreOption[0])
                {
                  this.theatreDetails.push(this.selectedTheatres[index]);
                  this.selectedTheatres.splice(index,1);
                }
                if(this.selectedTheatres.length==0)
                {
                  this.displayDates=[];
                  this.isTheatreSelected=false;
                }
              }

              /** Reverse All Theatres From Mapping List To Fetched List For Before Mapping**/
              reverseAllTheatres()
              {
                for(var index=0;index<this.selectedTheatres.length;index++)
                this.theatreDetails.push(this.selectedTheatres[index]);
                this.selectedTheatres.splice(0,this.selectedTheatres.length);
                if(this.selectedTheatres.length==0)
                {
                  this.displayDates=[];
                  this.isTheatreSelected=false;
                }
              }

              /** Select Dates To Map **/
              addDates(selectedDate)
              {
                if(selectedDate.datePushedFlag==false)
                selectedDate.datePushedFlag=true;
                else
                selectedDate.datePushedFlag=false;
              }

              /** Select Times To Map **/
              addTimes(showTime,theatre)
              {
                if(showTime.selected==false)
                showTime.selected=true;
                else
                showTime.selected=false;
              }

              /** Save Mapping For Selected Theatres, Movie, Dates and Times  **/
              saveMapping()
              {
                this.flag=false;
                if(this.displayTheatres.length>0&&this.selectedMovieName!==undefined&&this.selectedCityName!==undefined)
                  if(this.selectedMovieName.length>0&&this.selectedCityName.length>0)
                  {
                    this.mappingDates=[];
                    for(var index=0;index<this.displayDates.length;index++)
                      if(this.displayDates[index].datePushedFlag==true)
                        this.mappingDates.push(this.displayDates[index].date);
                        if(this.mappingDates.length>0)
                        {
                          for(var index=0;index<this.displayTheatres.length;index++)
                          {
                            this.mappedShowTimes=[];
                            for(var pointer=0;pointer<this.displayTheatres[index].ShowTimes.length;pointer++)
                            {
                              var check=this.displayTheatres[index].ShowTimes[pointer];
                              if(check.selected==true)
                              this.mappedShowTimes.push(check);
                            }
                            if(this.mappedShowTimes.length>0)
                              this.displayTheatres[index].ShowTimes=this.mappedShowTimes;
                          }
                          if(this.mappedShowTimes.length>0)
                          {
                            for(var mov=0;mov<this.movieNames.length;mov++)
                              if(this.movieNames[mov].Name==this.selectedMovieName)
                                this.movieTomap=this.movieNames[mov];

                            if(this.mappings.length>0)
                            {
                              for(var map=0;map<this.mappings.length;map++)
                                if(this.mappings[map].MovieName==this.selectedMovieName&&this.mappings[map].City==this.selectedCityName)
                                  for(var thet=0;thet<this.displayTheatres.length;thet++)
                                    if(this.mappings[map].TheatreName==this.displayTheatres[thet].TheatreName&&this.mappings[map].PlaceName==this.displayTheatres[thet].PlaceName)
                                      for(var mapdat=0;mapdat<this.mappings[map].MovieDates.length;mapdat++)
                                        for(var dat=0;dat<this.mappingDates.length;dat++)
                                          if(this.mappings[map].MovieDates[mapdat]==this.mappingDates[dat])
                                            for(var mapshwt=0;mapshwt<this.mappings[map].ShowTimings.length;mapshwt++)
                                              for(var shwt=0;shwt<this.mappedShowTimes.length;shwt++)
                                                if(this.mappings[map].ShowTimings[mapshwt].showTime==this.mappedShowTimes[shwt].showTime)
                                                {
                                                  alert("One Of The Mapping With Movie: "+this.mappings[map].MovieName+"Theatre: "+this.mappings[map].TheatreName+"City: "+this.mappings[map].City+"place: "+this.mappings[map].PlaceName+"Date: "+this.mappings[map].MovieDates[mapdat]+"Time: "+this.mappings[map].ShowTimings[mapshwt].showTime+" Already Exists. Choose another mapping.");
                                                  this.flag=true;
                                                }
                                                if(this.flag!=true)
                                                {
                                                  for(var index=0;index<this.displayTheatres.length;index++)
                                                    this.$http.post('/api/moviesmappingendpoints',{
                                                      MovieName: this.movieTomap.Name,
                                                      TheatreName: this.displayTheatres[index].TheatreName,
                                                      PlaceName:this.displayTheatres[index].PlaceName,
                                                      City: this.selectedCityName,
                                                      Year:this.movieTomap.Year,
                                                      Genre:this.movieTomap.Genre,
                                                      Poster:this.movieTomap.Poster,
                                                      MovieDates:this.mappingDates,
                                                      ShowTimings:this.displayTheatres[index].ShowTimes
                                                    });
                                                  alert("Mapping Saved");
                                                  this.populateSeatDetails();
                                                  this.selectedTheatres=[];
                                                  this.displayTheatres=[];
                                                  this.displayDates=[];
                                                  this.mappingDates=[];
                                                  this.mappedShowTimes=[];
                                                  this.selectedMovieName=undefined;
                                                  this.selectedCityName=undefined;
                                                  this.$window.location.reload();
                                                }
                                                else
                                                  alert("Mapping Not Saved");
                            }
                            else
                            {
                              for(var index=0;index<this.displayTheatres.length;index++)
                                this.$http.post('/api/moviesmappingendpoints',{
                                  MovieName: this.movieTomap.Name,
                                  TheatreName: this.displayTheatres[index].TheatreName,
                                  PlaceName:this.displayTheatres[index].PlaceName,
                                  City: this.selectedCityName,
                                  Year:this.movieTomap.Year,
                                  Genre:this.movieTomap.Genre,
                                  Poster:this.movieTomap.Poster,
                                  MovieDates:this.mappingDates,
                                  ShowTimings:this.displayTheatres[index].ShowTimes
                                });
                              alert("Mapping Saved");
                              this.populateSeatDetails();
                              this.selectedTheatres=[];
                              this.displayTheatres=[];
                              this.displayDates=[];
                              this.mappingDates=[];
                              this.mappedShowTimes=[];
                              this.selectedMovieName=undefined;
                              this.selectedCityName=undefined;
                              this.$window.location.reload();
                            }
                           }else alert("Select Valid Mapping Show Times.")
                         }else alert("Select The Mapping Dates.")
                   }else alert("Select Valid Mapping Theatres Movie and City.");
               }

        /** Create Seatbookings For Each Theatre Movie Date And Time **/
        populateSeatDetails()
        {
          for(var index=0;index<this.displayTheatres.length;index++)
            for(var everyDate=0;everyDate<this.mappingDates.length;everyDate++)
              for(var everyShowTime=0;everyShowTime<this.displayTheatres[index].ShowTimes.length;everyShowTime++)
              {
                this.silverClassSeatsDetails=this.displayTheatres[index].SilverClassSeats;
                this.goldClassSeatsDetails=this.displayTheatres[index].GoldClassSeats;
                this.silverClassSeats=[];
                this.goldClassSeats=[];

                if(this.silverClassSeatsDetails!==undefined&&this.silverClassSeatsDetails!="")
                {
                  var firstRow=this.silverClassSeatsDetails.FirstRow.charCodeAt(0);
                  var lastRow=this.silverClassSeatsDetails.LastRow.charCodeAt(0);
                  var noOfSeats=this.silverClassSeatsDetails.NumberOfSeats;
                  for(var row=lastRow;row>=firstRow;row--)
                  {
                    var rowSeats=[];
                    for(var number=1;number<=noOfSeats;number++)
                      rowSeats.push({Seat:String.fromCharCode(row)+number,Booked:false,Class:"seat"});
                    this.silverClassSeats.push({Row:String.fromCharCode(row),NumberOfSeats:number-1,SeatsInRow:rowSeats});
                  }
                 }
                if(this.goldClassSeatsDetails!==undefined&&this.goldClassSeatsDetails!="")
                {
                  firstRow=this.goldClassSeatsDetails.FirstRow.charCodeAt(0);
                  lastRow=this.goldClassSeatsDetails.LastRow.charCodeAt(0);
                  noOfSeats=this.goldClassSeatsDetails.NumberOfSeats;
                  for(var row=lastRow;row>=firstRow;row--)
                  {
                    var rowSeats=[];
                    for(var number=1;number<=noOfSeats;number++)
                      rowSeats.push({Seat:String.fromCharCode(row)+number,Booked:false,Class:"seat"});
                    this.goldClassSeats.push({Row:String.fromCharCode(row),NumberOfSeats:number-1,SeatsInRow:rowSeats});
                  }
                }
                this.$http.post('/api/seatbookendpoints',{
                    MovieName: this.selectedMovieName,
                    TheatreName: this.displayTheatres[index].TheatreName,
                    PlaceName:this.displayTheatres[index].PlaceName,
                    CityName:this.selectedCityName,
                    Date: this.mappingDates[everyDate],
                    ShowTime:this.displayTheatres[index].ShowTimes[everyShowTime].showTime,
                    GoldClassSeats:this.goldClassSeats,
                    SilverClassSeats:this.silverClassSeats,
                    GoldClassPrice:this.goldClassPrice,
                    SilverClassPrice:this.silverClassPrice});
                    this.isTheatreSelected=false;
                }
         }

         /** Fix Prices For Shows **/
        fixPrice(seatBooking)
        {

                if(this.goldClassPrice>0&&this.silverClassPrice>0)
                {
                  seatBooking.GoldClassPrice=this.goldClassPrice;
                  seatBooking.SilverClassPrice=this.silverClassPrice;
                  this.$http.put('/api/seatbookendpoints/'+seatBooking._id,{
                    GoldClassPrice:this.goldClassPrice,
                    SilverClassPrice:this.silverClassPrice
                  });
                  alert("Prices updated");
               }
               else
                alert("Enter a non negative number for classes");
               this.goldClassPrice="";
               this.silverClassPrice="";
          }

          /** Delete Shows **/
          deleteSeatBooking(seatBooking)
          {
            if(confirm("Press OK to Delete the Seat Booking component from the AppDB or hit Cancel to stop deleting.."))
            {
              this.$http.delete('/api/seatbookendpoints/'+seatBooking._id);
              this.seatBookings.splice(this.seatBookings.indexOf(seatBooking),1);
              alert("Seat Booking component Deleted");
            }
            else
              alert("Seat Booking component not Deleted");
          }

          /** Delete MovieMappings **/
          deleteMapping(mapping)
          {
            if(confirm("Press OK to Delete "+mapping.MovieName+" : "+mapping.TheatreName+" mapping from the AppDB or hit Cancel to stop deleting.."))
            {
              this.$http.delete('/api/moviesmappingendpoints/'+mapping._id);
              alert(mapping.MovieName+" : "+mapping.TheatreName+" mapping Deleted");
            }
            else
              alert(mapping.MovieName+" : "+mapping.TheatreName+" mapping not Deleted");
            this.socket.syncUpdates('moviesmappingendpoint',this.mappings);
          }

        }
            angular.module('yeotempApp').component('moviesmapping', {
                templateUrl: 'app/moviesmapping/moviesmapping.html',
                controller: MoviesmappingComponent,
                controllerAs: 'moviesmappingCtrl'
             });

      })();
