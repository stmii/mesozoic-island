// Get objects we need to modify
let addExhibit = document.getElementById('add-exhibit-form-ajax');

// Modify objects that we need
addExhibit.addEventListener('submit', function (e) {

    // Prevent form from submitting
    e.preventDefault();

    //Get form fields we need to get data from 
    let inputExhibitName = document.getElementById('exhibit_name_input');
    let inputHasDinosaurs = document.getElementById('has_dinosaurs_input');
    let inputAquatic = document.getElementById('aquatic_input');
    let inputLand = document.getElementById('land_input');
    let inputFlying = document.getElementById('flying_input');

    // Get values from the form fields
    let exhibitNameValue = inputExhibitName.value;
    let hasDinosaursValue = inputHasDinosaurs.value;
    let aquaticValue = inputAquatic.value;
    let landValue = inputLand.value;
    let flyingValue = inputFlying.value;

    // Put data into a javascript object
    let data = {
        exhibit_name: exhibitNameValue,
        has_dinosaurs: hasDinosaursValue,
        aquatic: aquaticValue,
        land: landValue,
	flying: flyingValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-exhibit-ajax/", true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputExhibitName.value = '';
            inputHasDinosaurs.value = '';
            inputAquatic.value = '';
            inputLand.value = '';
	    inputFlying.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with this input")
        }
    }
    // Send request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Creates a single row from an Object representing a single record from Species table 
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out
    let currentTable = document.getElementById('exhibits-table');

    // Get location where new row should be inserted
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1] 

    // Create row and the cells for it
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let exhibitNameCell = document.createElement("TD");
    let hasDinosaursCell = document.createElement("TD");
    let aquaticCell = document.createElement("TD");
    let landCell = document.createElement("TD");
    let flyingCell = document.createElement("TD");

    // Fill cells with proper data
    idCell.innerText = newRow.exhibit_ID;
    exhibitNameCell.innerText = newRow.exhibit_name;
    hasDinosaursCell.innerText = newRow.has_dinosaurs;
    aquaticCell.innerText = newRow.aquatic;
    landCell.innerText = newRow.land;
    flyingCell.innerText = newRow.flying;

    // Add new cells to row
    row.appendChild(idCell);
    row.appendChild(exhibitNameCell);
    row.appendChild(hasDinosaursCell);
    row.appendChild(aquaticCell);
    row.appendChild(landCell);
    row.appendChild(flyingCell);

    // Add row to the table now last step yay
    currentTable.appendChild(row)

}
