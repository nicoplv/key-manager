var mongoose = require( 'mongoose' );
var schema = mongoose.Schema;

// key_list
var key_list = new schema({
    name : String
});
mongoose.model('key_list', key_list);

// key
var key = new schema({
    key : String,
	list: String,
	tag: String,
    sended: Boolean,
    to: String
});
mongoose.model('key', key);

mongoose.connect('mongodb://default:password@ds041861.mongolab.com:41861/key-manager');

mongoose.connection.on('error', function (error) {
	console.log('Mongoose connection error: '+error);
});

mongoose.connection.on('open', function () {
	console.log('Mongoose connection open');
});