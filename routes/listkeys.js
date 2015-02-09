var express = require('express');

module.exports = (function() {
	var router = express.Router();

    router.get('/', function (req, res) {
		res.render('listkeys.twig', {
			list : req.list,
			tags : req.tags,
			keys : req.keys,
			key_lists : __key_lists
		});
	});

    return router;
})();