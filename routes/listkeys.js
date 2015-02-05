var express = require('express');

module.exports = (function() {
	var router = express.Router();

    router.get('/', function (req, res) {
		res.render('listkeys.twig', {
			datafile : req.datafile,
			datafilename : req.datafilename,
			tags : req.tags,
			keys : req.keys
		});
	});

    return router;
})();