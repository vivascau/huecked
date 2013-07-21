app.controller('IntroController.js', ['$scope', '$location', '$timeout', 'GameService', function ($scope, $location, $timeout, GameService) {
    console.log("IntroController.js");

    $timeout( function() {
        socket.emit('getGameStatus',{});
    }, 1000 );

    socket.on('gameStatus', function(data) {
        $timeout( function() {

            console.log("gameStatus: "+JSON.stringify(data));

            var started = data.started;
            console.log('gameStatus started='+started);

            if (started === false) {
                socket.emit('join');
                $scope.$apply()
            }else{
                $location.path('busy');
                $scope.$apply()
            }

        }, 1000 );

    });

    socket.on('joinStatus', function(data){

        console.log('joinStatus status='+JSON.stringify(data));

        var status = data.status;
        console.log('joinStatus status='+status);

        if(status){

            // save user info
            GameService.player = data.player;

            $location.path('newGame');
            $scope.$apply()

        } else{
            $location.path('busy');
            $scope.$apply()

        }

    });

}]);