// Get objects we need to modify
let addSpecies = document.getElementById('add-species-form-ajax');

// Modify objects that we need
addSpecies.addEventListener('submit', function (e) {

    // Prevent form from submitting
    e.preventDefault();

    //Get form fields we need to get data from 
    let inputSpeciesName = document.getElementById('species_name_input');
    let inputPeriod = document.getElementById('period_input');
    let inputType = document.getElementById('type_input');
    let inputDiet = document.getElementById('diet_input');

    // Get values from the form fields
    let speciesName = inputSpeciesName.value;
    let periodValue = inputPeriod.value;
    let typeValue = inputType.value;
    let dietValue = inputDiet.value;

    // Put data into a javascript object
    let data = {
        sName: speciesName,
        period: periodValue,
        type: typeValue,
        diet: dietValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-species-ajax", true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputSpeciesName.value = '';
            inputPeriod.value = '';
            inputType.value = '';
            inputDiet.value = '';
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
    let currentTable = document.getElementById('species-table');

    // Get location where new row should be inserted
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1] 

    // Create row and the cells for it
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let speciesNameCell = document.createElement("TD");
    let periodCell = document.createElement("TD");
    let typeCell = document.createElement("TD");
    let dietCell = document.createElement("TD");

    // Add an option to delete rows to the new rows inserted
    let deleteCell = document.createElement('TD');

    // Fill cells with proper data
    idCell.innerText = newRow.id;
    speciesNameCell.innerText = newRow.sName;
    periodCell.innerText = newRow.period;
    typeCell.innerText = newRow.type;
    dietCell.innerText = newRow.diet;

    deleteCell = document.createElement('button');
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteSpecies(newRow.id);
    };

    // Add new cells to row
    row.appendChild(idCell);
    row.appendChild(speciesNameCell);
    row.appendChild(periodCell);
    row.appendChild(typeCell);
    row.appendChild(dietCell);
    row.appendChild(deleteCell);

    // Add row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    // Add row to the table now last step yay
    currentTable.appendChild(row)
}