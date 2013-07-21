var app = angular.module('app',['ui.state','hmTouchevents'])

app.factory('PlayersService', function(){

    var PlayersService = {};
    var playerList = [];

    PlayersService.clearPlayers = function(){ playerList = [] };
    PlayersService.getPlayer = function( playerId ){ return playerList[playerId] };
    PlayersService.getPlayers = function() { return playerList };
    PlayersService.createPlayers = function(numberOfPlayers){
        PlayersService.clearPlayers();
        for(var i = 0; i < numberOfPlayers; i++) {
            PlayersService.createPlayer();
        }
    }
    PlayersService.createPlayer = function() {
        var player = {};
        playerList.push(player);
        console.log('PlayersService: created new player (id='+playerList.length+')');
    }
    PlayersService.resetClickTimers = function(){
        for(var i = 0; i < playerList.length; i++) {
            playerList[i].clickTimer = undefined;
        }
    }

    return PlayersService;

});

app.factory('GameService', function(){

    var GameService = {};

    return GameService;

});

app.controller('GameController', ['$scope', '$location', '$timeout', 'PlayersService', function ($scope, $location, $timeout, PlayersService) {
    console.log("GameController");

    // show countdown

    $scope.countdownSeconds = 3;
    var startCountdown = function(){

        if($scope.countdownSeconds > 0){
            $timeout( function() { $scope.countdownSeconds--; startCountdown(); }, 1000 );
        }else if($scope.countdownSeconds == 0){
            $scope.countdownSeconds = '';
            $scope.game.currentColor = 'go!'
            startRound();
        }

    }
    startCountdown();


    // create players

    PlayersService.createPlayers(2);
    $scope.players = PlayersService.getPlayers();

    // game options

    var red = 'Red';

    var getColors = function(){
        return ["Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue"]
    }

    // game configuration

    var game = {

        'startTime' : undefined,
        'roundNumber' : 0,
        'colors' : undefined,
        'cycle' : 0,
        'currentColor' : 'ready...',
        'isRed' : false

    };

    $scope.game = game;

    // start round

    var startRound = function(){

        game.startTime = new Date();

        game.colors = getColors();

        drawColorWithDelay();

    }

    // delay
    var minMsDelay = 500;
    var maxMsDelay = 2000;

    var drawColorWithDelay = function(){

        var randomMsDelay = (minMsDelay) + Math.floor(Math.random() * ( (maxMsDelay-minMsDelay) + 1)) + 0;


        if(game.currentColor != red){
            $timeout( function() {
                game.currentColor = drawColor(game.cycle++, game.colors);
                drawColorWithDelay();
            }, randomMsDelay );
        }else{
            game.isRed = true;
        }

    };

    var drawColor = function(cycle, colors){

        if(cycle == 3){
            addRedColor(colors);
        }

        console.log('length='+colors.length);

        var randomIndex = Math.floor(Math.random() * (colors.length + 1)) + 0;

        var drawnColor = colors.splice(randomIndex, 1)[0];

        console.log('drawnColor= '+drawnColor +', notDrawn='+colors.toString());

        return drawnColor;

    }

    var addRedColor = function(colors){
        colors.push(red);
    }


    $scope.click = function(playerId){
        if(game.isRed){
            $scope.result = 'Player '+playerId+' wins!';

        }else{
            $scope.result = 'Player '+playerId+' loses!'
        }
        console.log($scope.result);
    }

}]);



app.config(function($stateProvider, $routeProvider){
    $stateProvider
        .state('index', {
            url: "", // root route
            views: {
                "main": {
                    templateUrl: "js/templates/Intro.html",
                    controller: 'IntroController.js'
                }
            }
        })
        .state('start', {
            url: "/start",
            views: {
                "main": {
                    templateUrl: "js/templates/Start.html"
                }
            }
        })
        .state('game', {
            url: "/game",
            views: {
                "main": {
                    templateUrl: "js/templates/Game.html",
                    controller: 'GameController'
                }
            }
        })
        .state('selectPlayers', {
            url: "/selectPlayers",
            views: {
                "main": {
                    templateUrl: "js/templates/SelectPlayers.html",
                    controller: 'SelectPlayersController'
                }
            }
        })
        .state('busy', {
            url: "/busy",
            views: {
                "main": {
                    templateUrl: "js/templates/Busy.html"
                }
            }
        })
        .state('newGame', {
            url: "/newGame",
            views: {
                "main": {
                    templateUrl: "js/templates/NewGame.html",
                    controller: 'NewGameController'

                }
            }
        })
})