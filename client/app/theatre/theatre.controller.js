'use strict';

(function(){

  class TheatreComponent {
    constructor($http, $scope, socket,$window) {
      this.$window=$window;
      this.message = 'Hello';
      this.$http= $http;
      this.$scope=$scope;
      this.socket= socket;
      this.showTimes=[];this.showTimetoUpdate;this.theatres= [];this.showTimesToUpdateTheatre;
      this.firstRow;this.gold=false;this.silver=false;this.goldClassSeats;
      this.silverClassSeats;this.classes=["Gold","Silver"];this.showTime;this.theatreToUpdate;
      this.theatreToUpdateGold=false;this.theatreToUpdateSelectedClassOption;this.theatreToUpdateLastRow;
      this.theatreToUpdateFirstRow;this.theatreToUpdateNumOfSeats;this.theatreToUpdateGoldClassRow;this.theatreToUpdateSilverClassRow;
      this.theatreToUpdateSilver=false;this.showTimesToUpdate=[];
      this.rows=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
      this.numOfSeats;this.selectedClassOption;
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

    $onInit()
    {
      this.$http.get('/api/theatreendpoints').then(response => {
        this.theatres=response.data;
        console.log(this.theatres);
        this.socket.syncUpdates('theatreendpoint',this.theatres);
      });
    }

     /** Add Seat Details For Selected Class **/
    addRow()
    {
      if(this.firstRow!==undefined&&this.lastRow!==undefined&&this.numOfSeats!==undefined&&this.numOfSeats>0&&this.selectedClassOption!==undefined)
      {
        if(this.firstRow[0].charCodeAt(0)<=this.lastRow[0].charCodeAt(0))
        {
          if(this.selectedClassOption=="Gold")
          {
            this.goldClassSeats={FirstRow:this.firstRow[0],LastRow:this.lastRow[0],NumberOfSeats:this.numOfSeats};
            this.gold=true;
          }
          if(this.selectedClassOption=="Silver")
          {
            this.silverClassSeats={FirstRow:this.firstRow[0],LastRow:this.lastRow[0],NumberOfSeats:this.numOfSeats};
            this.silver=true;
          }
          this.selectedClassOption=undefined;this.firstRow=undefined;this.lastRow=undefined;this.numOfSeats=undefined;
        }else alert("The First Row is Greater than Last Row , select valid rows.");
      }
      else alert("Select all the Class First Row Last Row and valid NumberOfSeats");
    }

    /** Updated Seat Details For Selected Class **/
    addUpdatedRow()
    {
      if(this.theatreToUpdateFirstRow!==undefined&&this.theatreToUpdateLastRow!==undefined&&this.theatreToUpdateNumOfSeats!==undefined&&this.theatreToUpdateSelectedClassOption!==undefined&&this.theatreToUpdateNumOfSeats>0)
      {
        if(this.theatreToUpdateFirstRow[0].charCodeAt(0)<=this.theatreToUpdateLastRow[0].charCodeAt(0))
        {
          if(this.theatreToUpdateSelectedClassOption=="Gold")
          {
            this.theatreToUpdateGoldClassRow={FirstRow:this.theatreToUpdateFirstRow[0],LastRow:this.theatreToUpdateLastRow[0],NumberOfSeats:this.theatreToUpdateNumOfSeats};
            this.theatreToUpdateGold=true;
          }
          if(this.theatreToUpdateSelectedClassOption=="Silver")
          {
            this.theatreToUpdateSilverClassRow={FirstRow:this.theatreToUpdateFirstRow[0],LastRow:this.theatreToUpdateLastRow[0],NumberOfSeats:this.theatreToUpdateNumOfSeats};
            this.theatreToUpdateSilver=true;
          }
          this.theatreToUpdateSelectedClassOption=undefined;this.theatreToUpdateFirstRow=undefined;this.theatreToUpdateLastRow=undefined;this.theatreToUpdateNumOfSeats=undefined;
        } else alert("The First Row is Greater than Last Row , select valid rows.");
     }else alert("Select all the Class First Row Last Row and valid NumberOfSeats");
    }

    /** Remove Seat Details For Silver Class **/
    removeSilverClassRow()
    {
      this.silverClassSeats="";
      this.silver=false;
    }

    /** Add Seat Details For Gold Class **/
    removeGoldClassRow()
    {
      this.goldClassSeats="";
      this.gold=false;
    }

    /** Remove Seat Details For Silver Class **/
    removeUpdatedSilverClassRow()
    {
      this.theatreToUpdateSilverClassRow="";
      this.theatreToUpdateSilver=false;
    }

    /** Remove Seat Details For Gold Class **/
    removeUpdatedGoldClassRow()
    {
      this.theatreToUpdateGoldClassRow="";
      this.theatreToUpdateGold=false;
    }

    /** Add Show Time Details For Theatre **/
    addTimes()
    {
      if(this.showTime!==undefined)
      {
        var showTime={showTime:(this.showTime.getHours()+":"+this.showTime.getMinutes()),selected:false};
        this.showTimes.push(showTime);
        this.showTime='';
      }
      else alert("Please select a valid Time");
    }

    /** Remove Show Time Details For Theatre **/
    removeTime(showTime)
    {
      var index=this.showTimes.indexOf(showTime);
      this.showTimes.splice(index,1);
    }

    /** Save Details For Theatre **/
    AddTheatre()
    {
      if(this.TheatreName!==undefined&&this.PlaceName!==undefined&&this.City!==undefined&&(this.showTimes!==undefined&&this.showTimes.length>0)&&((this.goldClassSeats!==undefined&&this.goldClassSeats!="")&&(this.silverClassSeats!==undefined&&this.silverClassSeats!="")))
      {
      this.$http.post('/api/theatreendpoints',{
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
      this.goldClassSeats=[];
      this.noOfSeats="";
      this.silverClassSeats=[];
      this.firstRow="";
      this.lastRow="";
      this.selectedClassOption="";
      this.gold=false;
      this.silver=false;
      alert("Theatre Added");
    }
    else
      alert("Enter the Valid Theatre Details..");
    }

    /** Clear Fields Theatre **/
    clearFields()
    {
      this.TheatreName="";
      this.PlaceName="";
      this.City="";
      this.showTimes=[];
      this.showTime="";
      this.goldClassSeats=[];
      this.noOfSeats="";
      this.silverClassSeats=[];
      this.firstRow="";
      this.lastRow="";
      this.gold=false;
      this.silver=false;
      this.selectedClassOption="";this.firstRow="";this.lastRow="";this.numOfSeats="";
    }

    /** Delete Theatre From DB**/
    RemoveTheatre(theatre)
    {
      if(confirm("Press OK to Delete "+theatre.TheatreName+" from the AppDB or hit Cancel to stop deleting.."))
      {
        this.$http.delete('/api/theatreendpoints/' + theatre._id);
        alert(theatre.TheatreName+" Deleted");
      }
      else
        alert(theatre.TheatreName+" not Deleted");
    }

    /** Edit Details For Theatre **/
    editTheatre(theatre)
    {
      this.theatreToUpdateGold=false;
      this.theatreToUpdateSilver=false;
      this.theatreToUpdateSilverClassRow="";
      this.theatreToUpdateGoldClassRow="";
      this.theatreToUpdate=theatre;
      this.theatreToUpdateTheatreName=this.theatreToUpdate.TheatreName;
      this.theatreToUpdatePlaceName=this.theatreToUpdate.PlaceName;
      this.theatreToUpdateCity=this.theatreToUpdate.City;
      this.theatreToUpdateSelectedClassOption=undefined;
      this.theatreToUpdateFirstRow=undefined;this.theatreToUpdateLastRow=undefined;
      this.theatreToUpdateNumOfSeats=undefined;
      if(this.theatreToUpdate.GoldClassSeats!==undefined&&this.theatreToUpdate.GoldClassSeats!="")
      {
        this.theatreToUpdateGoldClassRow=this.theatreToUpdate.GoldClassSeats;
        this.theatreToUpdateGold=true;
      }
      if(this.theatreToUpdate.SilverClassSeats!==undefined&&this.theatreToUpdate.SilverClassSeats!="")
      {
        this.theatreToUpdateSilverClassRow=this.theatreToUpdate.SilverClassSeats;
        this.theatreToUpdateSilver=true;
      }
    }

    /** Save Updates Details For Theatre **/
    updateTheatre()
    {
        if(this.theatreToUpdateTheatreName!==undefined&&this.theatreToUpdatePlaceName!==undefined&&this.theatreToUpdateCity!==undefined&&
          (this.theatreToUpdate.ShowTimes!==undefined&&this.theatreToUpdate.ShowTimes.length>0)
          &&((this.theatreToUpdateGoldClassRow!==undefined&&this.theatreToUpdateGoldClassRow!=="")
          &&(this.theatreToUpdateSilverClassRow!==undefined&&this.theatreToUpdateSilverClassRow!=="")))
        {
            this.$http.put('/api/theatreendpoints/'+this.theatreToUpdate._id,{
            TheatreName:this.theatreToUpdateTheatreName,
            PlaceName:this.theatreToUpdatePlaceName,
            City:this.theatreToUpdateCity,
            ShowTimes:this.theatreToUpdate.ShowTimes,
            GoldClassSeats:this.theatreToUpdateGoldClassRow,
            SilverClassSeats:this.theatreToUpdateSilverClassRow
          });
          alert("Theatre updated");
          this.TheatreName="";
          this.PlaceName="";
          this.City="";
          this.theatreToUpdate="";this.theatreToUpdateTheatreName="";this.theatreToUpdatePlaceName="";this.theatreToUpdateCity="";
          this.theatreToUpdateGold=false;this.theatreToUpdateSelectedClassOption="";this.theatreToUpdateLastRow="";
          this.theatreToUpdateFirstRow="";this.theatreToUpdateNumOfSeats="";
          this.theatreToUpdateSilver=false;this.theatreToUpdateGoldClassRow="";this.theatreToUpdateSilverClassRow="";
        }
        else alert("Enter all the  Required Fields");
    }

    /** Edit Show Time Details For Theatre **/
    editTheatreShowTimes(theatre)
    {
      this.showTimesToUpdate=[];
      this.showTimesToUpdateTheatre=theatre;
      for(var index=0;index<theatre.ShowTimes.length;index++)
      this.showTimesToUpdate[index]=theatre.ShowTimes[index];
    }

    /** Save Edited Show Time Details For Theatre **/
    updateTheatreShowTimes()
    {
      if(this.showTimesToUpdate.length>0)
      {
          this.showTimesToUpdateTheatre.ShowTimes=this.showTimesToUpdate;
          this.$http.put('/api/theatreendpoints/'+this.showTimesToUpdateTheatre._id,{
          ShowTimes:this.showTimesToUpdate
        });
      alert("Show Times Updated.");
    }
      else
      alert("Add Show Times For the Theatre");
    }

    /** Add Show Time Details To Update Theatre **/
    addTimesToUpdate()
    {
      if(this.showTimetoUpdate!=undefined)
      {
        var showTime={showTime:(this.showTimetoUpdate.getHours()+":"+this.showTimetoUpdate.getMinutes()),selected:false};
        this.showTimesToUpdate.push(showTime);
        this.showTimetoUpdate='';
      }
      else alert("Please select a valid Time");
    }

    /** Remove Show Time Details To Update Theatre **/
    removeTimeToUpdate(showTime)
    {
      var index=this.showTimesToUpdate.indexOf(showTime);
      this.showTimesToUpdate.splice(index,1);
    }
  }

  angular.module('yeotempApp')
  .component('theatre', {
    templateUrl: 'app/theatre/theatre.html',
    controller: TheatreComponent,
    controllerAs: 'theatreCtrl',
    authenticate:'admin'
  });

})();
