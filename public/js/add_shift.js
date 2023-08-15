// Get objects we need to modify
let addShift = document.getElementById('add-shift-form-ajax');

// Modify objects that we need
addShift.addEventListener('submit', function (e) {

    // Prevent form from submitting
    e.preventDefault();

    // TODO: Add exhibit_ID  insert to ExhibitsShifts

    //Get form fields we need to get data from 
    let inputEmployeeID = document.getElementById('employee_ID_input');
    let inputDuties = document.getElementById('duties_input');
    let inputStartTime = document.getElementById('start_time_input');
    let inputEndTime = document.getElementById('end_time_input');

    // Get values from the form fields
    let employeeIDValue = inputEmployeeID.value;
    let dutiesValue = inputDuties.value;
    let startTimeValue = inputStartTime.value;
    let endTimeValue = inputEndTime.value;

    // Get array og selected exhibits, based on code from 
    // https://www.techiedelight.com/get-selected-values-multi-select-dropdown-javascript/
    var exhibit_ID_array = [];
    for (var option of document.getElementById('exhibit_ID_input').options)
    {
	if (option.selected) {
	    exhibit_ID_array.push(option.value);
	}
    }

    
    // Put data into a javascript object
    let data = {
        employee_ID: employeeIDValue,
        exhibit_ID_array: exhibit_ID_array,
        duties: dutiesValue,
        start_time: startTimeValue,
	end_time: endTimeValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-shift-ajax/", true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEmployeeID.value = '';
            inputDuties.value = '';
            inputStartTime.value = '';
            inputEndTime.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with this input")
        }
    }
    // Send request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload();
})

// Creates a single row from an Object representing a single record from Species table 
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out
    let currentTable = document.getElementById('shifts-table');

    // Get location where new row should be inserted
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1] 

    // Create row and the cells for it
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let employeeIDCell = document.createElement("TD");
 // let exhibitIDCell = document.createElement("TD");
    let dutiesCell = document.createElement("TD");
    let startTimeCell = document.createElement("TD");
    let endTimeCell = document.createElement("TD");

    // Add an option to delete rows to the new rows inserted
    let deleteCell = document.createElement('TD');

    // Fill cells with proper data
    idCell.innerText = newRow.shift_ID;
    employeeIDCell.innerText = newRow.employee_ID;
    dutiesCell.innerText = newRow.duties;
    startTimeCell.innerText = newRow.start_time;
    endTimeCell.innerText = newRow.end_time;

    deleteCell = document.createElement('button');
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteShift(newRow.shift_ID);
    };

    // Add new cells to row
    row.appendChild(idCell);
    row.appendChild(employeeIDCell);
    row.appendChild(dutiesCell);
    row.appendChild(startTimeCell);
    row.appendChild(endTimeCell);
    row.appendChild(deleteCell);

    // Add row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.shift_ID);

    // Add row to the table now last step yay
    currentTable.appendChild(row)

}
