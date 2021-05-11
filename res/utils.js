/**         UTILS FUNCTIONS          */

// Support function for retrieving data for given region and year
function get_data(region, year) {

    return data[year][region.id]
}


// Support function for retrieving the requested year
function get_selected_year() {
    
    let year= '';
    
    $('.btn.active').each(function() {
        year = $(this).attr('id'); 
    });
    return year;
}


// Support function for retrieving requested data
function get_stats(region) {

    if (region == "")
        return "";
    
    // Get selected year
    let year = get_selected_year();
    
    // Get data for that region in that year
    let data = get_data(region, year);
    
    return data.split(",") ;
}


/**        SUPPORT FUNCTIONS        */
  
// Support function for setting statistics' text
function setAllInnerHTML(array, value) {
    
    var i, n = array.length;
    
    for (i = 0; i < n; ++i) {
        array[i].innerHTML = value;
    }
}