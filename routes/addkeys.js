var express = require('express');
var fs = require('fs');

module.exports = (function() {
	var router = express.Router();

    router.get('/', function(req, res) {
		res.render('addkeys.twig', {
			key_lists : __key_lists
		});
    });
	
	router.post('/', function (req, res) {
		
	});

    return router;
})();