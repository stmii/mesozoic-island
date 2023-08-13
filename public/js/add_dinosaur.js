// Get objects we need to modify
let addDinosaur = document.getElementById('add-dinosaur-form-ajax');

// Modify objects that we need
addDinosaur.addEventListener('submit', function (e) {

    // Prevent form from submitting
    e.preventDefault();

    //Get form fields we need to get data from 
    let inputDinosaurName = document.getElementById('dinosaur_name_input');
    let inputSpeciesID = document.getElementById('species_ID_input');
    let inputExhibitID = document.getElementById('exhibit_ID_input');
    let inputDinosaurBirthdate = document.getElementById('dinosaur_birthdate_input');

    // Get values from the form fields
    let dinosaurNameValue = inputDinosaurName.value;
    let speciesIDValue = inputSpeciesID.value;
    let exhibitIDValue = inputExhibitID.value;
    let dinosaurBirthdateValue = inputDinosaurBirthdate.value;

    // Put data into a javascript object
    let data = {
        dinosaur_name: dinosaurNameValue,
        species_ID: speciesIDValue,
        exhibit_ID: exhibitIDValue,
        dinosaur_birthdate: dinosaurBirthdateValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-dinosaur-ajax/", true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputDinosaurName.value = '';
            inputSpeciesID.value = '';
            inputExhibitID.value = '';
            inputDinosaurBirthdate.value = '';
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
    let currentTable = document.getElementById('dinosaurs-table');

    // Get location where new row should be inserted
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1] 

    // Create row and the cells for it
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let speciesIDCell = document.createElement("TD");
    let exhibitIDCell = document.createElement("TD");
    let dinosaurNameCell = document.createElement("TD");
    let dinosaurBirthdateCell = document.createElement("TD");

    // Fill cells with proper data
    idCell.innerText = newRow.dinosaur_ID;
    speciesIDCell.innerText = newRow.species_ID;
    exhibitIDCell.innerText = newRow.exhibit_ID;
    dinosaurNameCell.innerText = newRow.dinosaur_name;
    dinosaurBirthdateCell.innerText = newRow.dinosaur_birthdate;

    // Add new cells to row
    row.appendChild(idCell);
    row.appendChild(speciesIDCell);
    row.appendChild(exhibitIDCell);
    row.appendChild(dinosaurNameCell);
    row.appendChild(dinosaurBirthdateCell);

    // Add row to the table now last step yay
    currentTable.appendChild(row)

}
