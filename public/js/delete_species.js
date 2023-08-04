function deleteSpecies(speciesID) {
    let link = '/delete-species-ajax/';
    let data = {
        id: speciesID
    };

    $.ajax({
        url: link, 
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteRow(speciesID)
        }
    });
}

function deleteRow(speciesID) {
    let table = document.getElementById('species-table')
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute('data-value') == speciesID) {
            table.deleteRow(i);
        }
    }
}
