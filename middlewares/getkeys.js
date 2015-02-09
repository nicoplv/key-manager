var mongoose = require('mongoose');

module.exports = (function (req, res, next, id) {
	var list = req.params.list;

	// Load List
	mongoose.model('key').find( { 'list': list }, function (error, keys) {
		if (error) {
			console.log('Error at find key lists: ' + error);
			next();
			return;
		}
		var tags = [];
		keys.forEach( function (key) {
			if(tags.indexOf(key.tag) < 0)
				tags.push(key.tag);
		});
		req.list = list;
		req.keys = keys;
		req.tags = tags;
		next();
	});
	
});