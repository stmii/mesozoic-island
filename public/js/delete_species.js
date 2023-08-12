function deleteSpecies(species_ID) {
    let data = {
        species_ID: species_ID
    };

    // Setup AJAX req
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-species-ajax/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // delete the data from the table
            deleteRow(species_ID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(species_ID){
    let table = document.getElementByID("species-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == species_ID) {
	      table.deleteRow(i);
	      break;
	    }
    }
}

