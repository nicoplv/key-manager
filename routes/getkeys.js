var express = require('express');
var fs = require('fs');

module.exports = (function() {
	var router = express.Router();

    router.get('/', function(req, res) {
		res.render('getkeys.twig', {
			datafile : __datafile,
			datafilename : __datafilename,
			tags : __tags
		});
    });
	
	router.post('/', function (req, res) {
		if(!(req.body.email&&req.body.tag&&req.body.number)){
			res.render('error.twig', {
				message : 'Error with form',
				goback : '/getkeys/'+__datafile
			});
			return;
		}
		// Init var
		var email = req.body.email;
		var tag = req.body.tag;
		var number = req.body.number;
		// Get keys
		var returnkeys = [];
		for(var keynumber in __keys){
			var key = __keys[keynumber];
			if(key.sended === 'false' && key.tag === tag){
				key.sended = 'true';
				key.to = email;
				returnkeys.push(key);
			}
			if(returnkeys.length>=number)
				break;
		}
		// No more keys available
		if(returnkeys.length<number){
			res.render('error.twig', {
				message : 'No more keys available',
				goback : '/getkeys/'+__datafile
			});
			return;
		}
		// Show list
		res.render('getkeys.twig', {
			datafile : __datafile,
			datafilename : __datafilename,
			tags : __tags,
			keys : returnkeys
		});
		// Save data
		var data = {'tags':__tags, 'keys':__keys};
		fs.writeFile(__datafilepath, JSON.stringify(data, null, 4), function(error) {
			if(error)
				console.log('Error at save: ' + error);
		});
	});

    return router;
})();