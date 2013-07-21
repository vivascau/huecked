Array.prototype.random = function (length) {
    return this[Math.floor((Math.random()*length))];
}

var express = require('express');
var app = express();

var server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs'),
    HueApi = require('node-hue-api').HueApi,
    hueMod = require('./hue'),
    colorsMod = require('./colors'),
    gameMod = require('./game')

var hue = new HueApi("192.168.2.166", "bazathackedio");
//init modules
hueMod.init(hue);
gameMod.init(hueMod, colorsMod);

//resetHue

hueMod.resetHUE();

var gameStarted = false;

var startGame = function() {
		gameStarted = true;
		setInterval(function() {
						var r_colour = hueMod.colourRandomizer();
						var g_colour = hueMod.colourRandomizer();
						var b_colour = hueMod.colourRandomizer();
			hueMod.changeColours(r_colour, g_colour, b_colour);
		}, 1000);
}

// The number of milliseconds in one day
var oneDay = 86400000;

app.set("port", 8000);
// Use compress middleware to gzip content
app.use(express.compress());

// Serve up content from public directory
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));



server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});




/**
 *
 *
 * SOCKET related code
 *
 *
 *
 */
var connections;

io.sockets.on('connection', function (socket) {
    //user connects to teh app

    socket.on('getGameStatus', function(data) {
        socket.emit('gameStatus', {"started": gameMod.hasGameStarted()});
    });

    //user has joined the game
    socket.on('join', function(data) {
        gameMod.setSocket(socket);
        var player = gameMod.addPlayerToGame();

        if(player){
            socket.emit('joinStatus', {"status":true, "player": player});
        } else{
            socket.emit('joinStatus', {"status":false});
        }
        if(gameMod.canStartGame()){
            gameMod.startGame();
        }
    });


    socket.on('tap', function(data){
       console.log('TAP='+JSON.stringify(data));

        if(gameMod.taps === undefined){
            gameMod.taps = [];
        }

        var now = new Date();
        gameMod.taps.push({player: data.colorName, tapTime: now});



        if(gameMod.whenMagicColorDrawn === undefined){
            console.log('wrong tap for '+data.colorName);
        }else{
            console.log('correct tap after '+ ( new Date() - gameMod.whenMagicColorDrawn) );
        }


        if(gameMod.minimumUsers === gameMod.taps.length){

            if(gameMod.whenMagicColorDrawn === undefined){
                gameMod.whenMagicColorDrawn = new Date();
            }

            for(var i = 0; i < gameMod.taps.length; i++){
                gameMod.taps[i].tapDelay = gameMod.taps[i].tapTime - gameMod.whenMagicColorDrawn;
            }

            socket.broadcast.emit('leaderboard', gameMod.taps);
        }
    });

});


