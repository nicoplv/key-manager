var express = require('express');

module.exports = (function() {
	var router = express.Router();

    router.get('/', function (req, res) {
		res.render('listkeys.twig', {
			datafile : __datafile,
			datafilename : __datafilename,
			tags : __tags,
			keys : __keys
		});
	});

    return router;
})();