angular.module('yeotempApp').service('MyService',function(){
  this.tn;
  this.mn;
  this.cn;
  this.theatreNameNav=function(theareName)
  {
    this.tn=theareName;
  }
  this.theatreNameNav=function()
  {
    return this.tn;
  }

  this.movieNameNav=function(movieName)
  {
    this.mn=movieName;
  }

  this.movieNameNav=function()
  {
    return this.mn;
  }

  this.cityNameNav=function(cityName)
  {
      this.cn=cityName;
  }
  this.cityNameNav=function()
  {
    return this.cn;
  }
});
