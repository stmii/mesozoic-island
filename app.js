// App.js

/*
	SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
var db = require('./database/db-connector.js');
PORT        = 1712;                 // Set a port number at the top so it's easy to change in the future

/*
	ROUTES
*/
app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
	{
		// Define our queries
		query1 = 'INSERT INTO Species (species_name, period, type, diet) VALUES ('Brontosaurus', 'Cretaceous', 'land', 'herbivore');';
		query2 = 'SELECT * FROM Species;';

		// INSERT
		db.pool.query(query1, function (err, results, fields){
			
			// SELECT *
			db.pool.query(query2, function (err, results, fields){
	
				res.send(JSON.stringify(results));
			});
		});
	});
});                                         // requesting the web site.

/*
	LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
	console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
