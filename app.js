// App.js

/*
	SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

var db = require('./database/db-connector.js');
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

PORT        = 1712;                 // Set a port number at the top so it's easy to change in the future

/*
	ROUTES
*/
app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
	{
		let query1 = "SELECT * FROM Species;";

		db.pool.query(query1, function(error, rows, fields){

			res.render('species', {data: rows});
		})
	});


/*
	LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
	console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
