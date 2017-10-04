const express = require('express');
const path = require('path');
const http = require('http');
var socketIO = require('socket.io');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));
const port = process.env.PORT || 8000;

io.on('connection', function(socket){
	console.log('New User logged in');
	socket.on('disconnect', function(){
		console.log('User is disconnected');
	})
});

server.listen(port, function(){
	console.log('Server running on port ' + port);
})