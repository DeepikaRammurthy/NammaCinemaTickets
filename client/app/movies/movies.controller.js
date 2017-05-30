    'use strict';

    (function(){

    class MoviesComponent {
      constructor($scope,$http,socket) {
        this.message = 'Hello';
        this.$http=$http;
        this.socket=socket;
        this.movie=[];
        this.OMDBData=[];
        this.Title;
        this.Year;
        this.Language;
        this.isAvailable=false;
        $scope.$on('$destroy', function() {
          socket.unsyncUpdates('thing');
        });
    }


    $onInit()
    {
      this.$http.get('/api/moviesendpoints').then(response =>{
      this.movie=response.data;
      /*sessionStorage.setItem('name',JSON.stringify(this.movie));
      var s=sessionStorage.getItem('name');
      s=JSON.parse(s);
      console.log("hii"+ s[0].Name);
      console.log(this.message);*/
      this.socket.syncUpdates('moviesendpoint',this.movie);
      });
    }

    /*Fetch Movie Details From OMDB Api*/
    searchOMDB(title,year,language)
    {
        if(title==""||title===undefined)
          alert("Enter the Movie Name");
        else
        {
          this.$http.get('http://api.myapifilms.com/imdb/idIMDB?title=dangal&token=a729a74b-119d-4c48-a592-be005d350e0b').then(response=>
          {
            this.OMDBData = response.data;
            this.Title="";
          });
          if(this.OMDBData.length==0)
            alert("No Result Found");
        }
    }

    /*Add Movie From OMDB Api into Namma Cinema Database*/
    AddMovie(OMDBData)
    {
      if(OMDBData.Title!==undefined&&OMDBData.Title!==null)
        this.$http.post('/api/moviesendpoints',{Poster:OMDBData.Poster,Name:OMDBData.Title,Year:OMDBData.Year,Genre:OMDBData.Genre});
      else
        alert("Please Get The Valid Movie From MYAPIFILMS");
    }

    /*Delete Movie From Namma Cinema Database*/
    RemoveMovie(movie)
    {
      if(confirm("Press OK to Delete "+movie.Name+" from the AppDB or hit Cancel to stop deleting.."))
      {
        this.$http.delete('/api/moviesendpoints/'+movie._id);
        alert(movie.Name+" Deleted");
      }
      else
        alert(movie.Name+" not Deleted");
    }
  }

    angular.module('yeotempApp')
      .component('movies', {
        templateUrl: 'app/movies/movies.html',
        controller: MoviesComponent,
        controllerAs: 'moviesCtrl'
      });

    })();
