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

    this.city = "Toronto,CA";

});

//Controllers

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    $scope.city = cityService.city;

    $scope.$watch('city', function() {
        cityService.city = $scope.city
    });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource ,cityService) {
    $scope.city = cityService.city

    var currentWeatherAPI = $resource('http://api.openweathermap.org/data/2.5/weather?q=:city&appid=:appid', { city: $scope.city, appid: config.weatherAPIKey });

    $scope.currentWeather = currentWeatherAPI.get();

    $scope.convertToCelcius = function(kelvin) {
        return Math.round(kelvin -273.15)
    };

    $scope.convertToDate = function(date) {
        return new Date(date)
    }

}]);
