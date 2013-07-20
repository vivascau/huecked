var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , hue = require('hue-module')

app.listen(8000);

hue.load("192.168.2.166", "bazathackedio");

var switchLights = function(state) {
	hue.lights(function(lights){
    for(i in lights) {
			if(lights.hasOwnProperty(i)){
		    hue.change(lights[i].set({"on": state, "rgb":[0,255,255]}));
			}
		}
	});
};

function colourRandomizer() {
	Math.floor((Math.random() * 255));
};

var iterateColours = function() {
	hue.lights(function(lights){
    for(i in lights) {
			if(lights.hasOwnProperty(i)){
				var hueLight = lights[i];
						hue.change(hueLight.set({"on": true, "rgb":[	Math.floor((Math.random() * 255)),
																													Math.floor((Math.random() * 255)),
																													Math.floor((Math.random() * 255))
																												]}));
			}
		}
	});
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
  socket.on('switchOn', function(data) {
		//switchLights(data.state);
		iterateColours();
  });

});


