// BASE SETUP
// ==============================================

var port = process.env.PORT || 3000;

var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var _ = require('underscore');

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname, 'public'));

// ROUTES
// ==============================================

app.param('datafile', function (req, res, next, id) {
	global.datafile = req.params.datafile;
	global.datafilename = global.datafile+'.json';
	// Load Data
	global.datafilepath = './datas/'+global.datafilename;
	var data = null;
	try {
		delete require.cache[require.resolve(global.datafilepath)];
		data = require(global.datafilepath);
	}
	catch (e) {
		res.render('error.twig', {
			message : '"'+global.datafilename+'" not found'
		});
		return;
	}
	global.tags = data.tags;
	global.keys = data.keys;
	// If no Types, create them
	if(global.tags===undefined || global.tags.length===0){
		global.tags = [];
		_.each(keys, function(key){
			if(!_.contains(global.tags, key.tag)){
				global.tags.push(key.tag);
			}
		});
	}
	next();
});

app.use('/getkeys/:datafile', require('./routes/getkeys'));
app.use('/listkeys/:datafile', require('./routes/listkeys'));

// START THE SERVER
// ==============================================

if (module.parent === null) {
	app.listen(port);
	console.log('run port ' + port);
}

// Expose app
exports = module.exports = app;