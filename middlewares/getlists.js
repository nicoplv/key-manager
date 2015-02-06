var fs = require('fs');

module.exports = (function (req, res, next) {
	
	if(__lists.length === 0){
		fs.readdir(__maindirname+'/datas/', function (error, files) {
			
			__lists = [];
			
			if(error) {
				console.log('Error at read directory: ' + error);
				next();
				return;
			}

			files.forEach( function (file) {
				__lists.push({
					name : file.substring(0, file.length-5),
					filename : file,
					link : '/listkeys/'+file.substring(0, file.length-5)
				});
			});

			// send to next middleware
			next();

		});
	}
	else
		next();
	
});