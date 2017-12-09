/* global angular */
//Module
var weatherApp = angular.module('weatherApp', ['ngResource', 'ngRoute']);

//Routes
weatherApp.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'homeController'
  })

  .when('/forecast', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  })
});

//Services

weatherApp.service('cityService', function() {
   
    this.city = "Toronto, ON";
    
});

//Controllers

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city
    });
}]);

weatherApp.controller('forecastController', ['$scope', 'cityService', function($scope, cityService) {
    $scope.city = cityService.city;
}]);
