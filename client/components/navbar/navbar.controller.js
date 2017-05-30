'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'link': '/'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor($location, Auth,MyService) {
    this.$location = $location;
    this.service=MyService;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.movieName;
    this.theatreName;
    this.cityName;
  }

  isActive(route) {
    return route === this.$location.path();
  }
  search()
  {
    this.service.theatreNameNav(this.theatreName);
    this.service.movieNameNav(this.movieName);
    this.service.cityNameNav(this.cityName);
    // sessionStorage.setItem('theatreNameNav',JSON.stringify(this.theatreName));
    // sessionStorage.setItem('movieNameNav',JSON.stringify(this.movieName));
    // sessionStorage.setItem('movieNameNav',JSON.stringify(this.cityName));
    //   console.log(  this.movieName + " "+this.theatreName+" "+this.cityName);
  }

}

angular.module('yeotempApp')
  .controller('NavbarController', NavbarController);
