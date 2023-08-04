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
    
})