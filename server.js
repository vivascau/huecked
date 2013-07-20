var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , hue = require('hue-module')

app.listen(8000);

hue.load("192.168.2.166", "bazathackedio");
var gameStarted = false;


var startGame = function() {
		gameStarted = true;
		var colourRandomizer = function() {
					Math.floor((Math.random() * 255));
		};

		var changeColours = function(r_colour, g_colour, b_colour) {
			hue.lights(function(lights){
				for(i in lights) {
					if(lights.hasOwnProperty(i)){
						hue.change(lights[i].set({"on": false, "rgb":[r_colour, g_colour, b_colour]}));
					}
				}
			});
		};

		setInterval(function() {
						var r_colour = colourRandomizer();
						var g_colour = colourRandomizer();
						var b_colour = colourRandomizer();
			changeColours(r_colour, g_colour, b_colour);
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

io.sockets.on('connection', function (socket) {
  socket.on('connect', function(data) {
		if (!gameStarted) {
			socket.emit('connected', state);
		}
	});

});


