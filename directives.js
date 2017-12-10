//Custom Directive

weatherApp.directive('weatherReport', function() {
    return {
        templateUrl: 'directiveTemplates/weatherReport.html',
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