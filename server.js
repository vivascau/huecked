var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
    , hue = require('hue-module')
    , hueMod = require('./hue')


app.listen(8000);

hue.load("192.168.2.166", "bazathackedio");
hueMod.init(hue);

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

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


/**
 *
 *
 * SOCKET related code
 *
 *
 *
 */
io.sockets.on('connection', function (socket) {
  socket.on('connect', function(data) {
		if (!gameStarted) {
			socket.emit('connected', false);
		}
	});

});


