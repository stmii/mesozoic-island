// Get objects we need to modify
let addEmployee = document.getElementById('add-employee-form-ajax');

// Modify objects that we need
addEmployee.addEventListener('submit', function (e) {

    // Prevent form from submitting
    e.preventDefault();

    //Get form fields we need to get data from 
    let inputEmployeeName = document.getElementById('employee_name_input');
    let inputEmployeeJobTitle = document.getElementById('employee_job_title_input');
    let inputEmployeeHourly = document.getElementById('employee_hourly_input');

    // Get values from the form fields
    let employeeNameValue = inputEmployeeName.value;
    let employeeJobTitleValue = inputEmployeeJobTitle.value;
    let employeeHourlyValue = inputEmployeeHourly.value;

    // Put data into a javascript object
    let data = {
        employee_name: employeeNameValue,
        employee_job_title: employeeJobTitleValue,
        employee_hourly: employeeHourlyValue,
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee-ajax/", true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEmployeeName.value = '';
            inputEmployeeJobTitle.value = '';
            inputEmployeeHourly.value = '';
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
    let currentTable = document.getElementById('employees-table');

    // Get location where new row should be inserted
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1] 

    // Create row and the cells for it
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let employeeNameCell = document.createElement("TD");
    let employeeJobTitleCell = document.createElement("TD");
    let employeeHourlyCell = document.createElement("TD");

    // Fill cells with proper data
    idCell.innerText = newRow.employee_ID;
    employeeNameCell.innerText = newRow.employee_name;
    employeeJobTitleCell.innerText = newRow.employee_job_title;
    employeeHourlyCell.innerText = newRow.employee_hourly;

    // Add new cells to row
    row.appendChild(idCell);
    row.appendChild(employeeNameCell);
    row.appendChild(employeeJobTitleCell);
    row.appendChild(employeeHourlyCell);

    // Add row to the table now last step yay
    currentTable.appendChild(row)

}
