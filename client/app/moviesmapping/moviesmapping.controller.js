'use strict';

(function(){

  class MoviesmappingComponent {
    constructor($scope,$http,socket) {

      $(document).ready(function(){
        $(".showDates").css('background-color','cyan');
      });

      this.message = 'Hello';
      this.$http=$http;
      this.socket=socket;
      this.movieNames=[];this.selectedMovieName=[];this.selectedCityName=[];this.cityNames=[];this.theatreDetails=[];
      this.theatres=[];this.displayDates=[];this.mappingDates=[];this.displayTheatres=[];this.selectedTheatres=[];
      this.selectedTheatreOption;this.reversedTheatreOption;this.mappings=[];this.mappedShowTimes=[];this.theatres=[];
      this.silverClassSeats=[];this.goldClassSeats=[];this.silverClassSeatsDetails=[];this.goldClassSeatsDetails=[];
      this.goldClassSeatsOfScreen=[];this.silverClassSeatsOfScreen=[];this.seatBookings=[];this.goldClassPrice;this.silverClassPrice;
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
        }
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
          }
        }
        mappingDetails()
        {
          /**Display Mapping Details**/
          this.displayTheatres=this.selectedTheatres;
          /** Fetch next 7 Dates for booking**/
          this.displayDates=[];
          for(var i=1;i<=7;i++)
          {
            var date=(new Date(new Date().getTime()+((24*3600*1000)*i))).toDateString();

            var datePushedFlag=false;
            var dateRecord={date,datePushedFlag};
            this.displayDates.push(dateRecord);
          }
        }

        addAllTheatres()
        {
          for(var index=0;index<this.theatreDetails.length;index++)
          this.selectedTheatres.push(this.theatreDetails[index]);
          this.theatreDetails=[];
          this.mappingDetails();
        }

        fetchSeatbookings()
        {
          this.$http.get('/api/seatbookendpoints').then(response =>
            {
              this.seatBookings=response.data;
              this.socket.syncUpdates('seatbookendpoints',this.seatBookings);
              console.log(this.seatBookings);
            });
        }

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
          this.displayDates=[];

        }

        reverseAllTheatres()
        {
          for(var index=0;index<this.selectedTheatres.length;index++)
          this.theatreDetails.push(this.selectedTheatres[index]);
          this.selectedTheatres.splice(0,this.selectedTheatres.length);
          if(this.selectedTheatres.length==0)
          this.displayDates=[];
        }

        addDates(selectedDate)
        {
          if(selectedDate.datePushedFlag==false)
          selectedDate.datePushedFlag=true;
          else
          selectedDate.datePushedFlag=false;
        }

        addTimes(showTime,theatre)
        {
          if(showTime.selected==false)
          showTime.selected=true;
          else
          showTime.selected=false;
        }

        saveMapping()
        {
          for(var index=0;index<this.displayDates.length;index++)
          if(this.displayDates[index].datePushedFlag==true)
          this.mappingDates.push(this.displayDates[index].date);
          for(var index=0;index<this.displayTheatres.length;index++)
          {
            this.mappedShowTimes=[];
            for(var pointer=0;pointer<this.displayTheatres[index].ShowTimes.length;pointer++)
            {
              var check=this.displayTheatres[index].ShowTimes[pointer];
              if(check.selected==true)
              this.mappedShowTimes.push(check);
            }
            this.displayTheatres[index].ShowTimes=this.mappedShowTimes;
          }
          for(var index=0;index<this.displayTheatres.length;index++)
          this.$http.post('/api/moviesmappingendpoints',{
            MovieName: this.selectedMovieName,
            TheatreName: this.displayTheatres[index].TheatreName,
            City: this.selectedCityName,
            MovieDates:this.mappingDates,
            ShowTimings:this.displayTheatres[index].ShowTimes
          });
          this.fetchMappings();
          this.populateSeatDetails();
          this.selectedTheatres=[];
          this.displayTheatres=[];
          this.displayDates=[];
          this.mappingDates=[];
          this.selectedMovieName="";
          this.selectedCityName="";
        }

        populateSeatDetails(){
          console.log("hi");
          for(var index=0;index<this.displayTheatres.length;index++)
          for(var everyDate=0;everyDate<this.mappingDates.length;everyDate++)
          for(var everyShowTime=0;everyShowTime<this.displayTheatres[index].ShowTimes.length;everyShowTime++)
          {
              this.silverClassSeatsDetails=this.displayTheatres[index].SilverClassSeats;
              this.goldClassSeatsDetails=this.displayTheatres[index].GoldClassSeats;
              this.silverClassSeats=[];
              this.goldClassSeats=[];
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
          }
        }

        fixPrice(seatBooking)
        {
          this.$http.put('/api/seatbookendpoints/'+seatBooking._id,{
            GoldClassPrice:this.goldClassPrice,
            SilverClassPrice:this.silverClassPrice
          });
            this.goldClassPrice="";
            this.silverClassPrice="";
        }
        fetchMappings()
        {
          this.$http.get('/api/moviesmappingendpoints').then(response=>
            {
              this.mappings=response.data;
            });
            for(var index=0;index<this.theatres.length;index++)
            this.theatreDetails[index]=this.theatres[index];
          }
          deleteMapping(mapping)
          {
            this.$http.delete('/api/moviesmappingendpoints/'+mapping._id);
            this.socket.syncUpdates('moviesmappingendpoint',this.mappings);
          }

          editMapping()
          {
            this.mappingDetails();
          }
          saveEditMapping(mapping)
          {
            for(var index=0;index<this.displayDates.length;index++)
            if(this.displayDates[index].datePushedFlag==true)
            this.mappingDates.push(this.displayDates[index].date);
            console.log(this.mappingDates);
            this.$http.put('/api/moviesmappingendpoints/'+mapping._id,{
              MovieName:this.selectedMovieName,
              MovieDates:this.mappingDates
            });
            this.socket.syncUpdates('moviesmappingendpoint',this.mappings);
            this.mappingDates=[];
            this.displayDates=[];
            this.selectedMovieName="";
            this.selectedCityName="";
          }
        }
        angular.module('yeotempApp')
        .component('moviesmapping', {
          templateUrl: 'app/moviesmapping/moviesmapping.html',
          controller: MoviesmappingComponent,
          controllerAs: 'moviesmappingCtrl'
        });

      })();
