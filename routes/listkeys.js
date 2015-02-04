var express = require('express');

module.exports = (function() {
	var router = express.Router();

    router.get('/', function (req, res) {
		res.render('list.twig', {
			datafile : global.datafile,
			datafilename : global.datafilename,
			tags : global.tags,
			keys : global.keys
		});
	});

    return router;
})();