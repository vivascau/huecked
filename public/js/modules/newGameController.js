app.controller('NewGameController', ['$scope', '$location', '$timeout', 'GameService', function ($scope, $location, $timeout, GameService) {
    console.log("NewGameController");

    $scope.firstTap = true;

    $scope.colorName = GameService.player.name;

    $scope.tap = function(){

        console.log('NewGameController: user tap')
        if($scope.firstTap){
            $scope.firstTap = false;
            console.log('new tap = '+GameService.player.name)
            socket.emit('tap', { colorName: GameService.player.name})
        }else{
            console.log('old tap = '+GameService.player.name)
        }
    }

    socket.on('leaderboard', function(data) {
        console.log('LEADERBOARD='+JSON.stringify(data));
        GameService.leaderboard = data;

        $location.path('leaderboard');
        $scope.$apply()


    });

}]);