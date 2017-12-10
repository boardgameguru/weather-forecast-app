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