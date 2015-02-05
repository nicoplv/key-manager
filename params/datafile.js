module.exports = (function (req, res, next, id) {
	__datafile = req.params.datafile;
	__datafilename = __datafile+'.json';
	// Load Data
	__datafilepath = __maindirname + '/datas/'+__datafilename;
	var data = null;
	try {
		delete require.cache[require.resolve(__datafilepath)];
		data = require(__datafilepath);
	}
	catch (e) {
		res.render('error.twig', {
			message : '"'+__datafilename+'" not found'
		});
		return;
	}
	__tags = data.tags;
	__keys = data.keys;
	// If no Types, create them
	if(__tags===undefined || __tags.length===0){
		__tags = [];
		_.each(keys, function(key){
			if(!_.contains(__tags, key.tag)){
				__tags.push(key.tag);
			}
		});
	}
	next();
});