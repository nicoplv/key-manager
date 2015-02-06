var express = require('express');
var fs = require('fs');

module.exports = (function() {
	var router = express.Router();

    router.get('/', function(req, res) {
		res.render('addlist.twig', {
			lists : __lists
		});
    });
	
	router.post('/', function (req, res) {
		
	});

    return router;
})();