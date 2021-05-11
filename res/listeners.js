/**        LISTENERS FUNCTIONS        */

// Set statistics according to hovered region
function handle_stats(region) {

    let stats = get_stats(region);

    if (region != "" && region != undefined) {
        title_text.innerHTML = "Statistics for " + dictToStr[region.id];
        change_percs(region);
        if(region != "")
          show_sunburst(region);
    }

    // If there's no data, handle it and return
    if(stats[0] == "") {
        setAllInnerHTML(values, "No Data To Show");
        setAllInnerHTML(stats_values, "-");
        reset_colors();
    }
    else {
        show_stats(stats);
        highlight_bar_chart(region);
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

    //show_pie();
    show_sunburst(stored_reg);
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