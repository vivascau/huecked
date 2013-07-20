app.controller('IntroController.js', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
    console.log("IntroController.js");

    socket.on('gameStatus', function(data) {
        $timeout( function() {

            console.log("gameStatus: "+data);

            var status = data.status;
            console.log('gameStatus status='+status);

            if (status === true) {
                socket.emit('join');
                $scope.$apply()
            }else{
                $location.path('busy');
                $scope.$apply()
            }

        }, 1000 );

    });

    socket.on('joinStatus', function(data){

        var status = data.status;
        console.log('gameStatus status='+status);

        if(status){
            $location.path('newGame');
            $scope.$apply()

        } else{
            $location.path('busy');
            $scope.$apply()

        }

    });

}]);