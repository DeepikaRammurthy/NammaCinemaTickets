  'use strict';

  (function(){

    class SeatbookingComponent {
      constructor($http,$scope,socket,$window) {
        this.message = 'Hello';
        this.$window=$window;
        this.$http=$http;
        this.socket=socket;this.goldClass;this.silverClass;
        this.movieName;this.movieToBookFinal;this.classToBookFinal;
        this.theatreToBookFinal;this.dateToBookFinal;this.timeToBookFinal;
        this.goldClassRowNum=[];this.seatbookingFinal;
        this.silverClassRowNum=[];this.card;this.cardNumber;this.cvv;this.expDate;
        this.theatreName;this.barcode="assets/images/barcode.jpg";
        this.offers="assets/images/offers.jpg";
        this.city;this.tickets=false;
        this.movieDate;this.checkSeats=false;
        this.showTime;
        this.seatBookings=[];
        this.m=[];
        this.noOfTickets=0;
        this.seatsDetails=[];
        this.seatsDetailsFinal=[];
        this.noOfTicketsFinal;
        this.totalPrice=0;
        this.totalPriceFinal;
        this.SilverClassSelection;
        this.GoldClassSelection;
        this.userName;
        this.mobile;this.goldClassPrice;this.silverClassPrice;this.classPrice;

        $scope.$on('$destroy', function() {
          socket.unsyncUpdates('thing');
        });

      }

      $onInit()
      {
        /** Fetch SeatBookings **/
         this.$http.get('/api/seatbookendpoints').then(response=>
          {
            this.seatBookings=response.data;
            /** Check If User Has Booked Tickets **/
            var tick=sessionStorage.getItem('tickets');
            this.tickets=JSON.parse(tick);
            console.log(this.tickets);

            /** Fetch Tickets Details **/
            var noOfTick=sessionStorage.getItem('noOfTicketsFinal');
            this.noOfTicketsFinal=JSON.parse(noOfTick);
            console.log(this.noOfTicketsFinal);

            var seatsBookedDetails=sessionStorage.getItem('seatsDetailsFinal');
            this.seatsDetailsFinal=JSON.parse(seatsBookedDetails);
            console.log(this.seatsDetailsFinal);

            var totalprice=sessionStorage.getItem('totalPriceFinal');
            this.totalPriceFinal=JSON.parse(totalprice);
            console.log(this.totalPriceFinal);

            var uName=sessionStorage.getItem('userName');
            this.userName=JSON.parse(uName);
            console.log(this.userName);

            var mob=sessionStorage.getItem('mobile');
            this.mobile=JSON.parse(mob);
            console.log(this.mobile);
            console.log(response.data);

             this.movieToBookFinal=sessionStorage.getItem('bookmoviename');
             this.movieToBookFinal=JSON.parse(this.movieToBookFinal);

             this.dateToBookFinal=sessionStorage.getItem('bookdatename');
             this.dateToBookFinal=JSON.parse(this.dateToBookFinal);

             this.timeToBookFinal=sessionStorage.getItem('booktimename');
             this.timeToBookFinal=JSON.parse(this.timeToBookFinal);

             this.theatreToBookFinal=sessionStorage.getItem('booktheatrename');
             this.theatreToBookFinal=JSON.parse(this.theatreToBookFinal);

             this.classToBookFinal=sessionStorage.getItem('bookclassname');
             this.classToBookFinal=JSON.parse(this.classToBookFinal);

             /** Select SeatBooking For The Booked Show  **/
            if(this.classToBookFinal!=undefined)
            {
             for(var index=0;index<this.seatBookings.length;index++)
               if(this.seatBookings[index].MovieName==this.movieToBookFinal&&this.seatBookings[index].TheatreName==this.theatreToBookFinal&&
               this.seatBookings[index].Date==this.dateToBookFinal&&this.seatBookings[index].ShowTime==this.timeToBookFinal)
               {
                 this.seatbookingFinal=this.seatBookings[index];
                 console.log(this.seatbookingFinal);
                 console.log(this.seatbookingFinal.GoldClassSeats[1]);
                 console.log(this.seatbookingFinal.SilverClassSeats[1]);
                 for(var number=0;number<this.seatbookingFinal.GoldClassSeats[1].NumberOfSeats;number++)
                 this.goldClassRowNum.push(number+1);
                 for(var number=0;number<this.seatbookingFinal.SilverClassSeats[1].NumberOfSeats;number++)
                 this.silverClassRowNum.push(number+1);
                 this.silverClassPrice=this.seatbookingFinal.SilverClassPrice;
                 this.goldClassPrice=this.seatbookingFinal.GoldClassPrice;
                }
                this.goldClass="Gold";
                this.silverClass="Silver";
                if(this.classToBookFinal=="Gold")
                {
                  this.classPrice=this.goldClassPrice;
                  this.SilverClassSelection="ClassDeselected";
                }
                else
                {
                  this.classPrice=this.silverClassPrice;
                  this.GoldClassSelection="ClassDeselected";
                }
            }
            else alert("Please Select The Movie Theatre Date Time and Class To Book Seats.");

            /** Create Jquery Design For Selected Seats And Class. **/
             $(document).ready(function(){
                $(".seat").click(function(){
                  $(this).toggleClass("green");
                    var id=$(this).attr('id');
                    if($(this).children('.chair').is(':visible'))
                    $(this).children('.chair').hide();
                    else
                    $(this).children('.chair').show();

                    if($(this).children('.sofa').is(':visible'))
                    $(this).children('.sofa').hide();
                    else
                    $(this).children('.sofa').show();
                  });

                /** Create Jquery Design For Selected Seats And Class **/
                $(".ttip").click(function(e){
                  e.preventDefault();
                });
                $(".ttip").popover();
                $('[rel="tooltip"]').tooltip();
             });

             this.socket.syncUpdates('seatbookendpoint',this.seatBookings);
             console.log(this.seatBookings[1]);
            });
          }

      /** Select Seat To Book **/
      bookSeat(seat)
      {
        console.log(seat);
        if(seat.Booked==false)
        {
          seat.Booked=true;
          this.noOfTickets++;
          this.seatsDetails.push(seat.Seat);
          this.checkSeats=true;
          console.log(this.seatsDetails);
          console.log(seat);
        }
        else
        {
          console.log(seat);
          seat.Booked=false;
          //seat.Class="seat";
          console.log(seat);
          this.noOfTickets--;
          console.log(this.seatsDetails);
          var index=this.seatsDetails.indexOf(seat.Seat);
          console.log(index);
          this.seatsDetails.splice(index,1);
          if(this.seatsDetails.length==0)
          this.checkSeats=false;
          console.log(this.seatsDetails);
        }
        this.totalPrice=this.noOfTickets*this.classPrice;
        console.log(this.seatBookings[0].GoldClassSeats);
      }

      /** Book The Selected Seats And Update DB **/
      bookSeats()
      {
        console.log(this.seatBookings[1]._id);
        console.log(this.seatBookings[1].GoldClassSeats);
        if(this.seatsDetails.length>0&&(this.userName!=undefined||this.userName!=" ")&&(this.mobile!=undefined||this.mobile!="")&&
        this.card!=undefined&&(this.cardNumber!=undefined)&&this.cvv!=undefined&&this.expDate!=undefined)
        {
          this.tickets=true;
          sessionStorage.setItem('tickets',JSON.stringify(this.tickets));
          for(var index=0;index<this.seatbookingFinal.GoldClassSeats.length;index++)
          {
            for(var seat=0;seat<this.seatbookingFinal.GoldClassSeats[index].SeatsInRow.length;seat++)
            {
              if(this.seatbookingFinal.GoldClassSeats[index].SeatsInRow[seat].Booked==true)
            this.seatbookingFinal.GoldClassSeats[index].SeatsInRow[seat].Class="seatBooked";
            }
          }

          for(var index=0;index<this.seatbookingFinal.SilverClassSeats.length;index++)
          {
            for(var seat=0;seat<this.seatbookingFinal.SilverClassSeats[index].SeatsInRow.length;seat++)
            {
              if(this.seatbookingFinal.SilverClassSeats[index].SeatsInRow[seat].Booked==true)
              this.seatbookingFinal.SilverClassSeats[index].SeatsInRow[seat].Class="seatBooked";
            }
          }
          this.seatsDetailsFinal=this.seatsDetails;
          sessionStorage.setItem('seatsDetailsFinal',JSON.stringify(this.seatsDetailsFinal));
          this.noOfTicketsFinal=this.noOfTickets;
          sessionStorage.setItem('noOfTicketsFinal',JSON.stringify(this.noOfTicketsFinal));
          this.totalPriceFinal=this.totalPrice;
          sessionStorage.setItem('totalPriceFinal',JSON.stringify(this.totalPriceFinal));
          sessionStorage.setItem('userName',JSON.stringify(this.userName));
          sessionStorage.setItem('mobile',JSON.stringify(this.mobile));

          this.$http.put('/api/seatbookendpoints/'+this.seatbookingFinal._id,{
            GoldClassSeats:this.seatbookingFinal.GoldClassSeats,
            SilverClassSeats:this.seatbookingFinal.SilverClassSeats
          });
          alert("Seats Booked Succesfully. Check Ticket Details.");
          this.$window.location.reload();
        }
        else
          alert("Please Enter the Valid Details");
      }

      /** Clear Selections And Refresh The Page For Another Booking **/
      doAnotherBooking()
      {
        this.$window.location.reload();
      }
  }
        angular.module('yeotempApp')
        .component('seatbooking', {
          templateUrl: 'app/seatbooking/seatbooking.html',
          controller: SeatbookingComponent,
          controllerAs: 'seatbookingCtrl'
        });

      })();
