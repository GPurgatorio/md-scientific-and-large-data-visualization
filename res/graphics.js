/**        GRAPHIC FUNCTIONS        */

          /** PAINT-ONLY */

// Paint each region with its own gradient
function paint_gradient_italy() {

    for (let region of regions)
        paint_region(region)
}
  

// Paint region's gradient
function paint_region(region) {

    let year = get_selected_year();
    let stats = get_stats(region);
    $svg = $("#italy_svg");

    // If there's no data, default grey color and return
    if(stats[0] == "" || data["sunburst"][year][region.id].startsWith("0,0,0")) {
        $("#" + region.id, $svg).attr('style', "fill:#9a9aab");
        return;
    }

    let final_color = "#";

    // From 9e9eff (good) to 0000ff (bad)
    let sunburst_stats = data["sunburst"][year][region.id].split(",");

    // There's not enough raw data to inference this in 2016
    if (year == 2016) {
        $("#" + region.id, $svg).attr('style', "fill:#9a9aab");
        return;
    }

    let sunburst_total = parseInt(sunburst_stats[0]) + parseInt(sunburst_stats[1]) + parseInt(sunburst_stats[2]);
    let sunburst_new = 0, sunburst_old = 0, sunburst_ext = 0;

    for (let elem of sunburst_stats) {
        
        let sunburst_split = elem.split(";");
        if (elem.startsWith("__NEW__")) {
            for(let pairs of sunburst_split) {
                let temp_sum = pairs.split(":")
                sunburst_new += parseInt(temp_sum[1]);
            }
        }
        else if (elem.startsWith("__OLD__")) {
            for(let pairs of sunburst_split) {
                let temp_sum = pairs.split(":")
                sunburst_old += parseInt(temp_sum[1]);
            }
        }
        else if (elem.startsWith("__EXT__")) {
            for(let pairs of sunburst_split) {
                let temp_sum = pairs.split(":")
                sunburst_ext += parseInt(temp_sum[1]);
            }
        }
    }

    let sunburst_value = 0
    if (sunburst_total != 0)
        sunburst_value = (sunburst_new + sunburst_old + sunburst_ext) * 100 / sunburst_total;

    // Last two chars
    let reg_val = parseInt(stats[0].replaceAll('.',''));
    let population_rateo = parseInt(data["population"][region.id].split(",")[0].replaceAll('.', ''))

    reg_val = Math.floor(reg_val * 100000 / population_rateo)
    let max = parseInt(data[year]["max"]) * 100000 / population_rateo;
    let min = parseInt(data[year]["min"]) * 100000 / population_rateo;
    let range = Math.ceil((max - min) / 6);

    let sum = min;
    sum += range;
    let iter = 0;

    while (reg_val >= sum) {
        iter++;
        sum += range;
    }

    switch(iter) {
        case 0:
            sunburst_value -= sunburst_value*30/100
            break
        case 1:
            sunburst_value -= sunburst_value*15/100
            break
        case 2:
            sunburst_value -= sunburst_value*5/100
            break
        case 3:
            sunburst_value += sunburst_value*5/100
            break
        case 4:
            sunburst_value += sunburst_value*15/100
            break
        case 5:
            sunburst_value += sunburst_value*30/100
            break
        default:
            break
    }

    sunburst_value = (sunburst_value >= 99) ? 99 : sunburst_value;
    let val = (Math.round(sunburst_value/10)).toString()
    val = (val == "10") ? "9" : val
    final_color += val + "9" + val + "9" + "FF"
    $("#" + region.id, $svg).attr('style', "fill:"+final_color);
}
  

// Remove the green/red color to previously shown statistics
function reset_colors() {

    for (let e of pos_stats)
        e.classList.remove("stats__value--positive")

    for (let e of neg_stats)
        e.classList.remove("stats__value--negative")
}



            /** TEXT */
  
// Support function for showing requested data
function show_stats(stats) {
    if (stats == "")
        return;
    for(let i=0; i<4; i++)
        values[i].innerHTML = stats[i].concat(",00 €")
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

        elem.innerHTML = (isNaN(increase) ? "-" : (increase >= 0 ? "+" : "-"))
        elem.innerHTML += Math.abs(increase) + "%";

        if(increase >= 0) 
            elem.classList.add("stats__value--positive");
        
        else 
            elem.classList.add("stats__value--negative");
    }
}
