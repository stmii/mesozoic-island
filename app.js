// App.js

/*
	SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Database
var db = require('./database/db-connector.js');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

// Static Files
app.use(express.static('public'));

PORT        = 1712;                 // Set a port number at the top so it's easy to change in the future

/*
	ROUTES
*/
app.get('/', function(req, res)
  {
    res.render('index');
  });

//----GET ROUTES----//
app.get('/species/', function(req, res)                 // This is the basic syntax for what is called a 'route'
	{
		let query1 = "SELECT * FROM Species;";

		db.pool.query(query1, function(error, rows, fields){

			res.render('species', {data: rows});
		})
	});

app.get('/dinosaurs/', function(req, res)
	{
		let query1 = "SELECT * FROM Dinosaurs;";
		let query2 = "SELECT * FROM Species;";
		let query3 = "SELECT * FROM Exhibits;";

		// query Dinosaurs
		db.pool.query(query1, function(error, rows, fields){
			// save the dinos
			let Dinosaurs = rows;
			
			// query Species
			db.pool.query(query2, function(error, rows, fields){
				//save the species
				let species = rows;
				
				// query Exhibits
				db.pool.query(query3, function(error, rows, fields){
					// save the rows
					let exhibits = rows;

					res.render('dinosaurs', {data: Dinosaurs, species: species, exhibits: exhibits});
				})
			})
		})
	});

app.get('/exhibits/', function(req, res)                 // This is the basic syntax for what is called a 'route'
	{
		let query1 = "SELECT * FROM Exhibits;";

		db.pool.query(query1, function(error, rows, fields){

			res.render('exhibits', {data: rows});
		})
	});

app.get('/employees/', function(req, res)                 // This is the basic syntax for what is called a 'route'
	{
		let query1 = "SELECT * FROM Employees;";

		db.pool.query(query1, function(error, rows, fields){

			res.render('employees', {data: rows});
		})
	});

app.get('/shifts/', function(req, res)                 // This is the basic syntax for what is called a 'route'
	{
		let query1 = "SELECT * FROM Shifts;";

		db.pool.query(query1, function(error, rows, fields){

			res.render('shifts', {data: rows});
		})
	});

//----POST ROUTES----//
app.post('/add-species-ajax/', function(req, res)
{
	// Capture the incoming data and parse it back to a JS object
	let data = req.body;
	
	// Capture NULL values
	// not applicable for SPECIES
	
	// Create the query and run it on the database
	query1 = `INSERT INTO Species (species_name, period, type, diet) VALUES ('${data.sName}', '${data.period}', '${data.type}', '${data.diet}')`;
	db.pool.query(query1, function(error, rows, fields){
		//Check for error
		if (error) {
			// Log the error to the terminal and send status
			console.log(error);
			res.sendStatus(400);
		}
		else
		{
			query2 = "SELECT * FROM Species;";
			db.pool.query(query2, function(error, rows, fields){
				if (error) {
					console.log(error);
					res.sendStatus(400);
				}
				else {

					res.send(rows);
				}
			})
		}
	})
});


app.post('/add-dinosaur-ajax/', function(req, res)
{
	// Capture the incoming data and parse it back to a JS object
	let data = req.body;
	
	// Capture NULL values
	// not applicable for SPECIES
	
	// Create the query and run it on the database
	query1 = `INSERT INTO Dinosaurs (dinosaur_name, species_ID, exhibit_ID, dinosaur_birthdate) VALUES ('${data.dinosaur_name}', '${data.species_ID}', '${data.exhibit_ID}', '${data.dinosaur_birthdate}')`;
	db.pool.query(query1, function(error, rows, fields){
		//Check for error
		if (error) {
			// Log the error to the terminal and send status
			console.log(error);
			res.sendStatus(400);
		}
		else
		{
			query2 = "SELECT * FROM Dinosaurs;";
			db.pool.query(query2, function(error, rows, fields){
				if (error) {
					console.log(error);
					res.sendStatus(400);
				}
				else {

					res.send(rows);
				}
			})
		}
	})
});

app.delete('/delete-species-ajax/', function(req,res,next){
	let data = req.body;
	let species_ID = parseInt(data.species_ID);
	let deleteSpecies = `DELETE FROM Species WHERE species_ID = ?`;
	
	db.pool.query(deleteSpecies, [species_ID], function(error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		} else {
			res.sendStatus(204);
		
		}
	})
});

/*
	LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
	console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
