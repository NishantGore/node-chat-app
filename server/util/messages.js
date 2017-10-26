var generateMessage = function(from, text){
	return {
		from,
		text,
		createdAt: new Date().getTime()
	}
}

var generateLocationMessage = function(from, lat, lon){
	return {
		from,
		lat,
		lon,
		url: `https://www.google.com/maps?q=${lat},${lon}`,
		createdAt: new Date().getTime()
	}
}

module.exports = {generateMessage, generateLocationMessage};