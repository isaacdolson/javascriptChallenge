var tableData = data;

var debug = false;

function printTable(data) {
    for (var i = 0; i < data.length; i++){
        var onePoint = data[i];
        var row = d3.select('tbody').append('tr');
        //maybe I should think about doing something with the Object. whatever, but this works for now.
        row.append('td').text(onePoint['datetime']);
        row.append('td').text(onePoint['city']); 
        row.append('td').text(onePoint['state'].toUpperCase()); 
        row.append('td').text(onePoint['country'].toUpperCase()); 
        row.append('td').text(onePoint['shape']); 
        row.append('td').text(onePoint['durationMinutes']); 
        row.append('td').text(onePoint['comments'])
    }
}

printTable(tableData);

var button = d3.select('#filter-btn')
var inputField = d3.select("#datetime")
var form = d3.select('form')

//button click working!
button.on("click", inputDealing );
//enter not working, I have no idea why, it doesn't seem to even go into it.
form.on("submit", inputDealing );

function inputDealing(){
    if(debug){
    alert("In the function")
    }
    d3.event.preventDefault();
    if(debug){
        alert("after default")
    }
    d3.event.stopImmediatePropagation();
    // d3.event.stopre
    var wantedFilter = inputField.property("value");
    // d3.event.preventDefault();
    if(debug){
        console.log(wantedFilter);
    }
    d3.select('tbody').selectAll('tr').remove()
    if (wantedFilter === ''){
        // Not really sure if I should bring back the basic table, or just leave it how it is if nothing is entered,
        //but seems better do something than take away all the data...
        printTable(tableData)
    } else {
        var filtered = data.filter(function(x){return x.datetime === wantedFilter});
        if (filtered.length === 0){
            filtered = data.filter(function(x){return x.state === wantedFilter.toLowerCase()});
        } 
        if (filtered.length === 0){
            filtered = data.filter(function(x){return x.city === wantedFilter.toLowerCase()});
        } 
        if (filtered.length === 0){
            filtered = data.filter(function(x){return x.country === wantedFilter.toLowerCase()});
        } 
        if (filtered.length === 0){
            filtered = data.filter(function(x){return x.shape === wantedFilter.toLowerCase()});
        }
        if (filtered.length === 0){
            filtered = tableData;
        }
        // } else {
        //     // maybe I should print an error message somewhere...
        //     filtered = tableData;
        // }
        printTable(filtered);
    }
}

//have the function for button filter by day and then call the printTable function on the new data.

//  function(){
//     if(debug){
//         console.log('In enter function.');
//     }
//     d3.event.preventDefault();
//     if(debug){
//         console.log('After prevent default');
//     }
//     var wantedFilter = inputField.property("value");
//     if(debug){
//         console.log(wantedFilter);
//     }
//     d3.select('tbody').selectAll('tr').remove()
//     if (wantedFilter === ''){
//         // Not really sure if I should bring back the basic table, or just leave it how it is if nothing is entered,
//         //but seems better do something than take away all the data...
//         printTable(tableData)
//     } else {
//         var filtered = data.filter(function(x){return x.datetime === wantedFilter});

//         printTable(filtered);
//     }
// });
