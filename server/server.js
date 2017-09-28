const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 8000;
var publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

app.get('/', function(req, res){
	res.send('Hello');
	console.log('GET');
});

app.listen(port, function(){
	console.log('Server running on port ' + port);
})