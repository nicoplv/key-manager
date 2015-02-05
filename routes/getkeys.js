var express = require('express');
var fs = require('fs');

module.exports = (function() {
	var router = express.Router();

    router.get('/', function(req, res) {
		res.render('getkeys.twig', {
			datafile : req.datafile,
			datafilename : req.datafilename,
			tags : req.tags,
			lists : __lists
		});
    });
	
	router.post('/', function (req, res) {
		if(!(req.body.email&&req.body.tag&&req.body.number)){
			res.render('error.twig', {
				message : 'Error with form',
				goback : '/getkeys/'+req.datafile,
				lists : __lists
			});
			return;
		}
		// Init var
		var email = req.body.email;
		var tag = req.body.tag;
		var number = req.body.number;
		// Get keys
		var returnkeys = [];
		for(var keynumber in req.keys){
			var key = req.keys[keynumber];
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
				goback : '/getkeys/'+req.datafile,
				lists : __lists
			});
			return;
		}
		// Show list
		res.render('getkeys.twig', {
			datafile : req.datafile,
			datafilename : req.datafilename,
			tags : req.tags,
			keys : returnkeys,
			lists : __lists
		});
		// Save data
		var data = {'tags':req.tags, 'keys':req.keys};
		fs.writeFile(req.datafilepath, JSON.stringify(data, null, 4), function(error) {
			if(error)
				console.log('Error at save: ' + error);
		});
	});

    return router;
})();