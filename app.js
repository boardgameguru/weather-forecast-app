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

  .when('/forecast/:days', {
      templateUrl: 'pages/forecast.html',
      controller: 'forecastController'
  })
});

//Services

weatherApp.service('cityService', function() {

    this.city = "Toronto,CA";

});

//Custom Directive

weatherApp.directive('weatherReport', function() {
    return {
        templateUrl: 'directive/weatherReport.html',
        replace: true,
        restrict: 'E',
        scope: {
            currentWeather: "=",
            convertToStandardTemp: "&",
            convertToStandardDate: "&",
            dateFormat: "@"
        }
    }
});

//Controllers

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    $scope.city = cityService.city;

    $scope.$watch('city', function() {
        cityService.city = $scope.city
    });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    $scope.city = cityService.city

    $scope.days = $routeParams.days || '1'

    var currentWeatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast?q=:city&cnt=:days&appid=:appid', { city: $scope.city, days: $scope.days , appid: config.weatherAPIKey });

    $scope.currentWeather = currentWeatherAPI.get();

    $scope.convertToCelcius = function(kelvin) {
        return Math.round(kelvin -273.15)
    };

    $scope.convertToDate = function(date) {
        return new Date(date)
    }

}]);
