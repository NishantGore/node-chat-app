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

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat application'
	});
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New User joined to chat room'
	});

	socket.on('createMessage', function(msg){
		msg.timeStamp = new Date().toString();
		console.log('Message received from client', msg);
		io.emit('newMessage', {
			from: msg.from,
			text: msg.text,
			createdAt: new Date().toString()
		});
	});

	socket.on('disconnect', function(){
		console.log('User is disconnected');
	})
});



server.listen(port, function(){
	console.log('Server running on port ' + port);
})