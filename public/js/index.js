var socket = io();
socket.on('connect', function(){
	console.log('Connected to the server.');
	// socket.emit('createMessage', {
	// 	from: 'Nishant',
	// 	text: 'Wassup, hows things in florence'
	// });
});

socket.on('disconnect', function(){
	console.log('Disconnected from the server.');
});

socket.on('newMessage', function(msg){
	console.log(msg.from + ': ' + msg.text);
});