app.controller('IntroController.js', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
    console.log("IntroController.js");

    socket.emit('connect');
    socket.emit('join', {"state" : true});

    socket.on('connected', function(data) {
        $timeout( function() {

            console.log("connected: "+data);

            if (data == "ready") {
                // ready
                $location.path('newGame');
                $scope.$apply()
            }else{
                // busy
                $location.path('busy');
                $scope.$apply()
            }

        }, 1000 );


    });

}]);