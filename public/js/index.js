var socket = io();
socket.on('connect', function(){
	console.log('Connected to the server.');
});

socket.on('disconnect', function(){
	console.log('Disconnected from the server.');
});

var ul = document.getElementById("messages");
socket.on('newMessage', function(msg){
	var time = moment(msg.createdAt).format('h:mm a');
	console.log(msg.from + ': ' + msg.text);
	var newLi = `<li>${msg.from} ${time}: ${msg.text}</li>`;
	ul.innerHTML = ul.innerHTML + "\n" + newLi;
});

socket.on('newLocationMessage', function(msg){
	var time = moment(msg.createdAt).format('h:mm a');
	var li = document.createElement('li');
	var a = document.createElement('a');
	a.setAttribute('target', '_blank');
	a.textContent = "My Current Location";
	a.setAttribute('href', msg.url);
	li.append(msg.from + " " + time + ": ");
	li.append(a);
	ul.append(li);
});

var form = document.getElementById('chat-form');
var tf = document.getElementsByName('message')[0];
form.addEventListener('submit', function(e){
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'User',
		text: tf.value
	}, function(){
		tf.value='';
	});
});

var locBtn = document.getElementById('sendLocation');
locBtn.addEventListener('click', function(){
	if(!navigator.geolocation){
		return alert('Location could not loaded!');
	}
	locBtn.setAttribute('disabled', 'true');
	locBtn.textContent = "Sending location...";
	navigator.geolocation.getCurrentPosition(function(position){
		
		socket.emit('createLocationMessage', {
			from: 'User',
			lat: position.coords.latitude,
			lon: position.coords.longitude
		}, function(){
			locBtn.removeAttribute('disabled');
			locBtn.textContent = "Send location";
		});		
	});
});