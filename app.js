// BASE SETUP
// ==============================================

var port = process.env.PORT || 3000;

var express = require('express');
var app = express();
var fs = require('fs');
var bodyparser = require('body-parser');
var _ = require('underscore');

var datafile, datafilename, datafilepath, types, keys;
var keyTypeSended = 'promo';

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname, 'public'));

// ROUTES
// ==============================================

app.param('datafile', function (req, res, next, id) {
	datafile = req.params.datafile;
	datafilename = datafile+'.json';
	// Load Data
	datafilepath = './Datas/'+datafilename;
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
	types = data.types;
	keys = data.keys;
	// If no Types, create them
	if(types===undefined || types.length===0){
		types = [];
		_.each(keys, function(key){
			if(!_.contains(types, key.type)){
				types.push(key.type);
			}
		});
	}
	next();
});

app.get('/get-keys/:datafile', function (req, res) {
	res.render('form.twig', {
		datafile : datafile,
		datafilename : datafilename,
		types : types
	});
});

app.post('/get-keys/:datafile', function (req, res) {
	if(!(req.body.email&&req.body.type&&req.body.number)){
		res.render('error.twig', {
			message : 'Error with form',
			goback : '/get-keys/'+datafile
		});
		return;
	}
	// Init var
	var email = req.body.email;
	var type = req.body.type;
	var number = req.body.number;
	// Get keys
	var returnkeys = [];
	for(var keynumber in keys){
		var key = keys[keynumber];
		if(key.sended === 'false' && key.type === type){
			key.sended = 'true';
			key.to = email;
			returnkeys.push(key);
		}
		if(returnkeys.length>=number)
			break;
	}
	// No more keys available
	if(returnkeys.length<number){
		res.render('error.twig', {
			message : 'No more keys available',
			goback : '/get-keys/'+datafile
		});
		return;
	}
	// Show list
	res.render('form.twig', {
		datafile : datafile,
		datafilename : datafilename,
		types : types,
		keys : returnkeys
	});
	// Save data
	var data = {'types':types, 'keys':keys};
	fs.writeFile(datafilepath, JSON.stringify(data, null, 4), function(err) {
		if(err)
			console.log('Error at save: ' + error);
	});
});

app.get('/list/:datafile', function (req, res) {
	res.render('list.twig', {
		datafile : datafile,
		datafilename : datafilename,
		types : types,
		keys : keys
	});
});

// START THE SERVER
// ==============================================

if (module.parent === null) {
	app.listen(port);
	console.log('run port ' + port);
}

module.exports = app;