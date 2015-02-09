// GLOBAL VARS
// ==============================================

global.__maindirname = __dirname;
global.__key_lists = [];


// BASE SETUP
// ==============================================

require( './database' );

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

app.param('list', require('./middlewares/getkeys'));

app.use(require('./middlewares/getlists'));

app.use('/', require('./routes/home'));

app.use('/getkeys/:list', require('./routes/getkeys'));
app.use('/listkeys/:list', require('./routes/listkeys'));


// START THE SERVER
// ==============================================

if (module.parent === null) {
	app.listen(port);
	console.log('run port ' + port);
}


// Expose app
exports = module.exports = app;