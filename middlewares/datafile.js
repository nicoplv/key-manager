module.exports = (function (req, res, next, id) {
	var datafile = req.params.datafile;
	var datafilename = datafile+'.json';
	// Load Data
	var datafilepath = __maindirname+'/datas/'+datafilename;
	var data = null;
	try {
		delete require.cache[require.resolve(datafilepath)];
		data = require(datafilepath);
	}
	catch (e) {
		res.render('error.twig', {
			message : '"'+datafilename+'" not found'
		});
		return;
	}
	var tags = data.tags;
	var keys = data.keys;
	// If no Types, create them
	if(tags===undefined || tags.length===0){
		tags = [];
		keys.forEach( function (key) {
			if(tags.indexOf(key.tag) < 0)
				tags.push(key.tag);
		});
	}
	// send to next middleware
	req.datafile = datafile;
	req.datafilename = datafilename;
	req.datafilepath = datafilepath;
	req.tags = tags;
	req.keys = keys;
	next();
});