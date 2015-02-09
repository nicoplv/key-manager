var mongoose = require('mongoose');

module.exports = (function (req, res, next) {
	
	if(__key_lists.length === 0){
		__key_lists = [];
		mongoose.model('key_list').find( function (error, key_lists) {
			if (error) {
				console.log('Error at find key lists: ' + error);
				next();
				return;
			}
			__key_lists = key_lists;
			next();
		});
	}
	else
		next();
	
});