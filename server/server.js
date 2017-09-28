const express = require('express');
const path = require('path');
const http = require('http');
var app = express();
var server = http.createServer(app);

const port = process.env.PORT || 8000;
var publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));


server.listen(port, function(){
	console.log('Server running on port ' + port);
})