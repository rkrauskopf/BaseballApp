// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var passport     = require('passport');
var flash 	     = require('connect-flash');
var session      = require('express-session');

var configDB = require('./config/database.js');

//var mongoDBConnectString = 'mongodb://localhost/apiDB';

var mongoose = require('mongoose');
mongoose.connect(configDB.url);

require('./config/passport')(passport); // pass passport for configuration

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());
app.use(cookieParser()); //read cookies(needed for auth)
app.use(morgan('dev')); //log every request to the console

//set up ejs for templating
app.set('view engine', 'ejs');

//required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var port = process.env.PORT || 8080; 		// set our port

var router = express.Router();

require('./app/routes/authRoutes.js')(router, passport);
require('./app/routes/viewRoutes.js')(router, passport);
require('./app/routes/apiRoutes.js')(router, passport);

//myRouter is just a router object that has been initialized and set up in the
//routes.js file. This is telling Express to use it at the / level
app.use('/', router);
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);