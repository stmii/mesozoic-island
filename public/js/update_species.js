// Get objects that need to be modified
let updateSpecies = document.getElementById('update-person-form-ajax');

// Modify the object 
updateSpecies.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get for fields we need to get data from 
    let inputSpeciesName = document.getElementById('mySelect');
    let inputPeriod = document.getElementById('input_period_update');
    let inputType = document.getElementById('input_type_update');
    let inputDiet = document.getElementById('input_diet_update');

    // Get values from the form fields
    let speciesNameValue = inputSpeciesName.value;
    let periodValue = inputPeriod.value;
    let typeValue = inputType.value;
    let dietValue = inputDiet.value;

    // Currently Species table does not allow for updating to NULL so we must exit 
    if (isNaN(speciesNameValue)) {
        return;
    }

    // Put our data we want to send in a JS object
    let data = {
        speciesName: speciesNameValue,
        period: periodValue,
        type: typeValue,
        diet: dietValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open('PUT', '/put-species-ajax', true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add updated data to the table 
            updateRow(xhttp.response, speciesNameValue);
        }
        else if (xhttp.readyState == 4 & xhttp.status != 200) {
            console.log('There was an error with the input')
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

function updateRow(data, speciesID) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById('species-table');

    for (let i = 0, row; row = table.rows[i]; i++) {
        // iterate through rows, rows are accessed using the 'row' variable assigned in the for loop
        if (table.rows[i].getAttribute('data-value') == speciesID) {
            let updateRowIndex = table.getElementsByTagName('tr')[i];
            let td = updateRowIndex.getElementsByTagName('td')[3];
            td.innerHTML = parsedData[0].name;
        }
    }
}