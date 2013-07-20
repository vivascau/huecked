app.controller('NewGameController', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
    console.log("NewGameController");

    $scope.firstTap = true;

    $scope.tap = function(){

        console.log('NewGameController: user tap')
        if($scope.firstTap){
            $scope.firstTap = false;
            console.log('new tap')

        }else{
            console.log('old tap')
        }
    }

    socket.on('Result', function(data) {

    });

}]);