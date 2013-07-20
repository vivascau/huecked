var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , hue = require('hue-module')

app.listen(8000);

hue.load("192.168.2.166", "bazathackedio");

var iterateLights = function(state) {
console.log('iteration');
	hue.lights(function(lights){
	    for(i in lights)
		if(lights.hasOwnProperty(i))
		    hue.change(lights[i].set({"on": state, "rgb":[0,255,255]}));
	});
};

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
  console.log('connected');
  socket.emit('news', { hello: 'world' });
  socket.on('switchOn', function(data) {
	iterateLights(data.state);
  });

  socket.on('my other event', function (data) {
    console.log(data);
  });
});


