'use strict';

(function(){

  class TheatreComponent {
    constructor($http, $scope, socket) {
      this.message = 'Hello';
      this.$http= $http;
      this.socket= socket;
      this.theatres= [];
      this.showTimes=[];
      this.firstRow;
      this.lastRow;
      this.goldClassSeats=[];
      this.silverClassSeats=[];
      this.classes=["Gold","Silver"];
      this.showTime;
      this.rows=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
      this.numOfSeats;
      this.selectedClassOption;
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

    $onInit()
    {
      this.$http.get('/api/theatreendpoints').then(response => {
        this.theatres=response.data;
        this.socket.syncUpdates('theatreendpoint',this.theatres);
      });
    }

    addRow()
    {
      if(this.firstRow!==undefined&&this.lastRow!==undefined&&this.numOfSeats!==undefined&&this.selectedClassOption!==undefined)
      {
        console.log("entered");
        if(this.selectedClassOption=="Gold")
          this.goldClassSeats.splice(0,1,{FirstRow:this.firstRow[0],LastRow:this.lastRow[0],NumberOfSeats:this.numOfSeats});

        if(this.selectedClassOption=="Silver")
          this.silverClassSeats.splice(0,1,{FirstRow:this.firstRow[0],LastRow:this.lastRow[0],NumberOfSeats:this.numOfSeats});
      }
    }

    removeSilverClassRow(row)
    {
      var index=this.silverClassSeats.indexOf(row);
      this.silverClassSeats.splice(index,1);
    }

    removeGoldClassRow(row)
    {
      var index=this.goldClassSeats.indexOf(row);
      this.goldClassSeats.splice(index,1);
    }
    addTimes()
    {
      console.log(this.theatres);
      if(this.showTime!==undefined)
      {
        var showTime={showTime:(this.showTime.getHours()+":"+this.showTime.getMinutes()),selected:false};
        this.showTimes.push(showTime);
        this.showTime='';
      }
    }

    removeTime(showTime)
    {
      var index=this.showTimes.indexOf(showTime);
      this.showTimes.splice(index,1);
    }

    AddTheatre()
    {
      this.$http.post('/api/theatreendpoints',{
        TheatreName:this.TheatreName,
        PlaceName:this.PlaceName,
        City:this.City,
        ShowTimes:this.showTimes,
        GoldClassSeats:this.goldClassSeats[0],
        SilverClassSeats:this.silverClassSeats[0]
      });

      this.TheatreName="";
      this.PlaceName="";
      this.City="";
      this.showTimes=[];
      this.goldClassSeats=[];
      this.noOfSeats="";
      this.silverClassSeats=[];
      this.firstRow="";
      this.lastRow="";
    }

    RemoveTheatre(theatre)
    {
      this.$http.delete('/api/theatreendpoints/' + theatre._id);
    }
    EditTheatre(theatre)
    {
      this.$http.put('/api/theatreendpoints/'+theatre._id,{
        TheatreName:this.TheatreName,
        PlaceName:this.PlaceName,
        City:this.City,
        ShowTimes:this.showTimes,
        GoldClassSeats:this.goldClassSeats,
        SilverClassSeats:this.silverClassSeats
      });
      this.TheatreName="";
      this.PlaceName="";
      this.City="";
      this.showTimes=[];
    }
  }

  angular.module('yeotempApp')
  .component('theatre', {
    templateUrl: 'app/theatre/theatre.html',
    controller: TheatreComponent,
    controllerAs: 'theatreCtrl'
  });

})();
