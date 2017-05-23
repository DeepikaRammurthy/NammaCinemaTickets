'use strict';

(function(){

  class SeatbookingComponent {
    constructor($http,$scope,socket,$window) {
      this.message = 'Hello';
      this.$window=$window;
      this.$http=$http;
      this.socket=socket;
      this.movieName;
      this.goldClassRowNum=[];
      this.silverClassRowNum=[];
      this.theatreName;
      this.city;
      this.movieDate;
      this.showTime;
      this.seatBookings=[];
      this.m=[];
      this.noOfTickets=0;
      this.seatsDetails=[];
      this.seatsDetailsFinal=[];
      this.noOfTicketsFinal=0;
      this.totalPrice=0;
      this.totalPriceFinal=0;
      this.SilverClassSelection;
      this.GoldClassSelection;
      this.userName;
      this.mobile;this.classPrice;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });

      }

    $onInit()
    {
       this.$http.get('/api/seatbookendpoints/?ShowTime:/?Date1:'+"10:10"+"Mon May 15 2017").then(response=>
        {
           console.log(response.data);
           this.seatBookings=response.data;
           for(var number=0;number<this.seatBookings[0].GoldClassSeats[0].NumberOfSeats;number++)
           this.goldClassRowNum.push(number+1);
           for(var number=0;number<this.seatBookings[0].SilverClassSeats[0].NumberOfSeats;number++)
           this.silverClassRowNum.push(number+1);
           this.socket.syncUpdates('seatbookendpoint',this.seatBookings);
           console.log(this.seatBookings[0]);

          this.SilverClassSelection="ClassDeselected";
          // this.GoldClassSelection="ClassDeselected";
           this.classPrice=this.seatBookings[0].SilverClassPrice;
          this.classPrice=this.seatBookings[0].GoldClassPrice;

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
           });

          });


        }

bookSeat(seat)
{
  console.log(seat);
  if(seat.Booked==false)
  {
  seat.Booked=true;
//  seat.Class="seatBooked";
  this.noOfTickets++;
  this.seatsDetails.push(seat.Seat);
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
  console.log(this.seatsDetails);
}
  this.totalPrice=this.noOfTickets*this.classPrice;
  console.log(this.seatBookings[0].GoldClassSeats);
}

bookSeats()
{
  console.log(this.seatBookings[0]._id);
  console.log(this.seatBookings[0].GoldClassSeats);
  for(var index=0;index<this.seatBookings[0].GoldClassSeats.length;index++)
  {
    for(var seat=0;seat<this.seatBookings[0].GoldClassSeats[index].SeatsInRow.length;seat++)
    {
      if(this.seatBookings[0].GoldClassSeats[index].SeatsInRow[seat].Booked==true)
    this.seatBookings[0].GoldClassSeats[index].SeatsInRow[seat].Class="seatBooked";
    }
  }

  for(var index=0;index<this.seatBookings[0].SilverClassSeats.length;index++)
  {
    for(var seat=0;seat<this.seatBookings[0].SilverClassSeats[index].SeatsInRow.length;seat++)
    {
      if(this.seatBookings[0].SilverClassSeats[index].SeatsInRow[seat].Booked==true)
    this.seatBookings[0].SilverClassSeats[index].SeatsInRow[seat].Class="seatBooked";
    }
  }
  this.seatsDetailsFinal=this.seatsDetails;
  this.noOfTicketsFinal=this.noOfTickets;
  this.totalPriceFinal=this.totalPrice;
  this.GoldClassSelection="ClassDeselected";
  this.SilverClassSelection="ClassDeselected";
  this.barcode="assets/images/barcode.jpg";
  this.offers="assets/images/offers.jpg";
  this.$http.put('/api/seatbookendpoints/'+this.seatBookings[0]._id,{
    GoldClassSeats:this.seatBookings[0].GoldClassSeats,
    SilverClassSeats:this.seatBookings[0].SilverClassSeats
  });

}

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
