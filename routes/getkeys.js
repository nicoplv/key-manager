var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');

module.exports = (function() {
	var router = express.Router();

    router.get('/', function(req, res) {
		res.render('getkeys.twig', {
			list : req.list,
			tags : req.tags,
			key_lists : __key_lists
		});
    });
	
	router.post('/', function (req, res) {
		if(!(req.body.email&&req.body.tag&&req.body.number)){
			res.render('getkeys.twig', {
				list : req.list,
				tags : req.tags,
				errormessage : 'Error with form',
				key_lists : __key_lists
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
			if(key.sended === false && key.tag === tag){
				key.sended = true;
				key.to = email;
				returnkeys.push(key);
			}
			if(returnkeys.length>=number)
				break;
		}
		
		// No more keys available
		if(returnkeys.length<number){
			res.render('getkeys.twig', {
				list : req.list,
				tags : req.tags,
				errormessage : 'No more keys available',
				key_lists : __key_lists
			});
			return;
		}
		
		// Update keys on database
		returnkeys.forEach( function (key) {
			mongoose.model('key').update(
				{ key: key.key },
				{ sended: key.sended, to: key.to },
				function(error, numberAffected, rawResponse) {
					if (error) {
						console.log('Error at update key lists: ' + error);
						next();
						return;
					}
				}
			);
		});
		
		// Show list
		res.render('getkeys.twig', {
			list : req.list,
			tags : req.tags,
			keys : returnkeys,
			key_lists : __key_lists
		});
		
	});

    return router;
})();