app.controller('IntroController.js', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
    console.log("IntroController.js");

    var msDelay = 3000;

    $timeout( function(){ $location.path('start') }, msDelay);
}]);