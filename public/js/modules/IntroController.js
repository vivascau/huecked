app.controller('IntroController.js', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
    console.log("IntroController.js");

    // connect everytime
    socket.emit('connect');

    socket.on('connected', function(data) {
        $timeout( function() {

            console.log("connected: "+data);

            var status = data.status;
            var player = data.player;
            console.log('player='+player);

            // if there is space, the user joins
            if (status == "ready") {
                // ready
                socket.emit('join');
                $location.path('newGame');
                $scope.$apply()
            }else{
                // if it's already started the game (busy) show error
                $location.path('busy');
                $scope.$apply()
            }

        }, 1000 );


    });

}]);