var socket = io();
socket.on('connect', function(){
	console.log('Connected to the server.');
});

socket.on('disconnect', function(){
	console.log('Disconnected from the server.');
});

socket.on('newMessage', function(msg){
	console.log(msg.from + ': ' + msg.text);
	var newLi = `<li>${msg.from}: ${msg.text}</li>`;
	var ul = document.getElementById("messages");
	ul.innerHTML = ul.innerHTML + "\n" + newLi;
});

var form = document.getElementById('message-form');
var tf = document.getElementsByName('message')[0];
form.addEventListener('submit', function(e){
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'User',
		text: tf.value
	}, function(){

	});
});