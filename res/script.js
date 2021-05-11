// Support function for setting statistics' text
function setAllInnerHTML(array, value) {

    var i, n = array.length;
    
    for (i = 0; i < n; ++i) {
        array[i].innerHTML = value;
    }
}


// Function called by pressing a button (2016, 2017, 2018)
function update_year() {

    // If there's a focused region, handle its stat in the new year
    if(stored_reg != "") 
        handle_stats(stored_reg);

    // Else change values and percentages to "-"
    else {
        change_percs("");
        setAllInnerHTML(values, "-")
    }
    
    // Repaint gradients for all regions
    paint_gradient_italy();
}


// Support function for retrieving data for given region and year
function get_data(region, year) {
    
    return data[year][region.id]
}


// Support function for retrieving the requested year
function get_selected_year() {
    
    let year = '';
    
    $('.btn.active').each(function(){
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


// Support function for showing requested data
function show_stats(stats) {
    
    if (stats == "")
        return;
    
    for(let i=0; i<4; i++)
        values[i].innerHTML = stats[i].concat(",00 €")
}


// Set statistics according to hovered region
function handle_stats(region) {

    let stats = get_stats(region);

    if (stats == "")
        return;

    // If there's no data, handle it and return
    if(stats[0] == "") {
        setAllInnerHTML(values, "No Data To Show");
        return;
    }

    show_stats(stats);
    change_percs(region);
}


// Select which stats to show
function toggle_focus_on_region(region) {

    // Remove focus from the previously selected region, if there's any
    if (stored_reg.id != undefined) {
        document.getElementById(stored_reg.id).classList.remove("selected")

        // If clicking on the already selected region, just reset and return
        if(stored_reg.id == region.id) {
            stored_stats = ""
            stored_reg = ""
            return;
        }

    }

    // Otherwise add focus to the different region and show its stats
    document.getElementById(region.id).classList.add("selected")
    stored_stats = get_stats(region);
    stored_reg = region;

    show_stats(stored_stats);
    change_percs(region);
}


// Paint each region with its own gradient
function paint_gradient_italy() {

    let regions = document.getElementsByClassName("region");

    for (let region of regions)
        paint_region(region)
}


// Change percentages values and colors
function change_percs(region) {

    reset_colors();

    if (region == "" || get_selected_year() == "2016") {
        setAllInnerHTML(stats_values, "-");
        return;
    }

    update_percentages(region);  
}


// Support function called by change_percs() to change automatically values and colors
function update_percentages(region) {

    let idx = -1;
    reset_colors();

    for (let elem of stats_values) {
        idx++;
        let prev_year = parseInt(get_data(region, get_selected_year()-1).split(",")[idx].replaceAll('.', ''));
        let curr_year = parseInt(get_stats(region)[idx].replaceAll('.', ''));
        let increase = parseInt((curr_year * 100 / prev_year) - 100);

        if (isNaN(increase)) {
            elem.innerHTML = "-";
            return;
        }

        elem.innerHTML = (increase >= 0) ? "+" : "-";
        elem.innerHTML += Math.abs(increase) + "%";

        if(increase >= 0)
            elem.classList.add("stats__value--positive");
        
        else
            elem.classList.add("stats__value--negative");
    }
}