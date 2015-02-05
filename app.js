// GLOBAL VARS
// ==============================================

global.__maindirname = __dirname;
global.__datafile = null;
global.__datafilename = null;
global.__datafilepath = null;
global.__tags = null;
global.__keys = null;

// BASE SETUP
// ==============================================

var port = process.env.PORT || 3000;

var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(express.static(__maindirname, 'public'));

// ROUTES
// ==============================================

app.param('datafile', require('./params/datafile'));

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