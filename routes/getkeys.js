var express = require('express');
var fs = require('fs');

module.exports = (function() {
	var router = express.Router();

    router.get('/', function(req, res) {
		res.render('form.twig', {
			datafile : global.datafile,
			datafilename : global.datafilename,
			tags : global.tags
		});
    });
	
	router.post('/', function (req, res) {
		if(!(req.body.email&&req.body.tag&&req.body.number)){
			res.render('error.twig', {
				message : 'Error with form',
				goback : '/getkeys/'+global.datafile
			});
			return;
		}
		// Init var
		var email = req.body.email;
		var tag = req.body.tag;
		var number = req.body.number;
		// Get keys
		var returnkeys = [];
		for(var keynumber in global.keys){
			var key = global.keys[keynumber];
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
				goback : '/getkeys/'+global.datafile
			});
			return;
		}
		// Show list
		res.render('form.twig', {
			datafile : global.datafile,
			datafilename : global.datafilename,
			tags : global.tags,
			keys : returnkeys
		});
		// Save data
		var data = {'tags':global.tags, 'keys':global.keys};
		fs.writeFile(global.datafilepath, JSON.stringify(data, null, 4), function(err) {
			if(err)
				console.log('Error at save: ' + error);
		});
	});

    return router;
})();