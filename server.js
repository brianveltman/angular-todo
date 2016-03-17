// set up ========================
var express  = require('express');
var app      = express();                           // create our app w/ express
var mongoose = require('mongoose');                 // mongoose for mongodb
var morgan = require('morgan');             		// log requests to the console (express4)
var bodyParser = require('body-parser');    		// pull information from HTML POST (express4)
var methodOverride = require('method-override');	// simulate DELETE and PUT (express4)
var Pusher = require('pusher');
var pusher = new Pusher({
	appId: '175457',
	key: '6c58cef4eda9a130ba92',
	secret: 'a64d8d14a6a999252100'
});

// configuration =================
mongoose.connect('mongodb://localhost/todo');
app.use(express.static(__dirname + '/app'));					// set directory for static files
app.use('/bower_components', 									// set prefix for bower components
	express.static(__dirname + '/bower_components'));			// load statics files from bower directory
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(3000, function() {
	console.log("App listening on port 3000");
    });

require('./app/backend/routes')(app, pusher);