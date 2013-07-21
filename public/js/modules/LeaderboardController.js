app.controller('LeaderboardController', ['$scope', '$location', '$timeout', 'GameService', function ($scope, $location, $timeout, GameService) {
    console.log("Leaderboard");


    $scope.leaderboard = GameService.leaderboard;

    console.log("in leaderboard"+JSON.stringify($scope.leaderboard));


}]);