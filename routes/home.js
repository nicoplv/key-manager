var express = require('express');
var fs = require('fs');

module.exports = (function() {
	var router = express.Router();

    router.get('/', function (req, res) {
		res.render('home.twig', {
			lists : __lists
		});
	});

    return router;
})();