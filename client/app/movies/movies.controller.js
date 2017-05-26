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

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
}


$onInit()
{
  this.$http.get('/api/moviesendpoints').then(response =>{
  this.movie=response.data;
  sessionStorage.setItem('name',JSON.stringify(this.movie));
  var s=sessionStorage.getItem('name');
  s=JSON.parse(s);
  console.log("hii"+ s[0].Name);
  console.log(this.message);
  this.socket.syncUpdates('moviesendpoint',this.movie);
});

}

SearchOMDB(title,year,language)
{
  this.$http.get('http://www.omdbapi.com/?t=&y='+title,+year).then(response => {
      this.OMDBData = response.data;
      console.log(response);
        this.Title="";
      });
}

    AddMovie(OMDBData)
    {
      this.$http.post('/api/moviesendpoints',{Poster:OMDBData.Poster,Name:OMDBData.Title,Year:OMDBData.Year,Genre:OMDBData.Genre});
    }


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
