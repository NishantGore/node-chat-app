var socket = io();
socket.on('connect', function(){
	console.log('Connected to the server.');
});

socket.on('disconnect', function(){
	console.log('Disconnected from the server.');
});

var ul = document.getElementById("messages");
socket.on('newMessage', function(msg){
	console.log(msg.from + ': ' + msg.text);
	var newLi = `<li>${msg.from}: ${msg.text}</li>`;
	ul.innerHTML = ul.innerHTML + "\n" + newLi;
});

socket.on('newLocationMessage', function(msg){
	var li = document.createElement('li');
	var a = document.createElement('a');
	a.setAttribute('target', '_blank');
	a.textContent = msg.from + ": " + msg.lat + ", " + msg.lon;
	a.setAttribute('href', msg.url);
	li.append(a);
	ul.append(li);
})

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

var locBtn = document.getElementById('sendLocation');
locBtn.addEventListener('click', function(){
	if(!navigator.geolocation){
		return alert('Location could not loaded!');
	}
	navigator.geolocation.getCurrentPosition(function(position){
		
		socket.emit('createLocationMessage', {
			from: 'User',
			lat: position.coords.latitude,
			lon: position.coords.longitude
		});		
	});
});