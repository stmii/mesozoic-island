function deleteShift(shift_ID) {
    let data = {
        shift_ID: shift_ID
    };

    // Setup AJAX req
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-shift-ajax/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX how to resolve
    xhttp.onreadystatechange = () => {

        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // delete the data from the table
            deleteRow(shift_ID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(shift_ID){


    let table = document.getElementById("shifts-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      console.log(table.rows[i].getAttribute("data-value"));
      if (table.rows[i].getAttribute("data-value") == shift_ID) {
	      table.deleteRow(i);
	      break;
	    }
    }
}

