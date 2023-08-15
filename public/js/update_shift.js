// Get the objects we need to modify
let updateShiftForm = document.getElementById('update-shift-form-ajax');

// Modify the objects we need
updateShiftForm.addEventListener("submit", function (e) {
	
	// Prevent the form from submitting
	e.preventDefault();

	// Get form fields we need to get data from
	let inputShiftID = document.getElementById("shift_ID_input");
	
	// Get array of selected exhibits, based on code from
	// https://www.techiedelight.com/get-selected-values-multi-select-dropdown-javascript/
	var exhibit_ID_array = [];
	for (var option of document.getElementById('exhibit_ID_inputs').options)
	{
		if (option.selected) {
			exhibit_ID_array.push(option.value);
		}
	}

	console.log(exhibit_ID_array);
	
	//Get the values from the form fields
	let shiftIDValue = inputShiftID.value;

	// put the data to send in a javascript object
	let data = {
		shift_ID: shiftIDValue,
		exhibit_ID_array: exhibit_ID_array
	}

	// Setup AJAX req
	var xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "/put-shift-ajax", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	// Tell AJAX how to resolve
	
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			
		}
		else if (xhttp.readyState == 4 && xhttp.status != 200) {
			console.log("There was an error with the input.");
		}
	}

	// Send the request and wait for the response
	xhttp.send(JSON.stringify(data));
	location.reload();
})
	
