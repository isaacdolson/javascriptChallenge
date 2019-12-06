var tableData = data;

var debug = true;

// function clearcontent(elementID) { 
//     var div = document.getElementById(elementID); 
        
//     while(div.firstChild) { 
//         div.removeChild(div.firstChild); 
//     } 
// }  

// // to clear,
// // document.getElementById(elementID).innerHTML = "";
function printTable(data) {
    // below doesn't seem to work. testing something new...
    //clearcontent('tbody');    //goes to far...
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

//put a button click check.
button.on("click", function(){
    event.preventDefault()
    var wantedFilter = inputField.property("value");
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
});

//have the function for button filter by day and then call the printTable function on the new data.
inputField.on("change", function(){
    event.preventDefault();
    var wantedFilter = inputField.property("value");
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

        printTable(filtered);
    }
    event.preventDefault();
});
