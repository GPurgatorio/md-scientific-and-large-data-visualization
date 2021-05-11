// Builds the two stacked bar charts (2017-2018)
function show_stacked_bar_chart() {
	
	data_2017 = generate_stack_bar_data(2017)
	data_2018 = generate_stack_bar_data(2018)

	stacked_layout_2017 = {
		title: "<b>Percentage of given funds (2017)</b>",
		height: chart_height,
		margin: {"t": 50, "b": 50, "l": 50, "r": 50},
		paper_bgcolor: 'rgba(102,112,221,0.1)',
		plot_bgcolor: 'rgba(0,0,0,0)',
		barmode: 'stack',
	}

	Plotly.newPlot('graph-general-2017', data_2017, stacked_layout_2017, {
		displayModeBar: false
	})
	
	stacked_layout_2018 = {
		title: "<b>Percentage of given funds (2018)</b>",
		height: chart_height,
		margin: {"t": 50, "b": 50, "l": 50, "r": 50},
		paper_bgcolor: 'rgba(102,112,221,0.1)',
		plot_bgcolor: 'rgba(0,0,0,0)',
		barmode: 'stack'
	}

	Plotly.newPlot('graph-general-2018', data_2018, stacked_layout_2018, {
		displayModeBar: false
	})
}


// Thicken the border on the hovered region on both stacked bar charts
function highlight_bar_chart(region) {

	// Highlight by increasing border of selected region (2017 bar chart)
	let index = data_2017[0]["x"].indexOf(dictToStr[region.id])

	for(let i = 0; i < 3; i++) {
		for(let j = 0; j < data_2017[i]["marker"]["line"]["width"].length; j++) {
			if (j == index) {
				data_2017[i]["marker"]["line"]["width"][j] = 3
				data_2017[i]["marker"]["line"]["color"][j] = 'rgb(19, 56, 135)'
			}
			else {
				data_2017[i]["marker"]["line"]["width"][j] = .5
				data_2017[i]["marker"]["line"]["color"][j] = 'rgb(0,0,0)'
			}
		}
	}

	Plotly.update('graph-general-2017', data_2017, stacked_layout_2017, {
		displayModeBar: false
	});

	
	// Highlight by increasing border of selected region (2018 bar chart)
	index = data_2018[0]["x"].indexOf(dictToStr[region.id])

	for(let i = 0; i < 3; i++) {
		for(let j = 0; j < data_2018[i]["marker"]["line"]["width"].length; j++) {
			if (j == index) {
				data_2018[i]["marker"]["line"]["width"][j] = 3
				data_2018[i]["marker"]["line"]["color"][j] = 'rgb(19, 56, 135)'
			}
			else {
				data_2018[i]["marker"]["line"]["width"][j] = .5
				data_2018[i]["marker"]["line"]["color"][j] = 'rgb(0,0,0)'
			}
		}
	}

	Plotly.update('graph-general-2018', data_2018, stacked_layout_2018, {
		displayModeBar: false
	});
}


// Builds the sunburst chart
function show_sunburst(region) {

	let sunburst_data = generate_sunburst_data(region)

	let sunburst_layout = {
		height: chart_height,
		width: chart_height,
		margin: {"t": 0, "b": 0, "l": 0, "r": 0},
		paper_bgcolor: 'rgba(0,0,0,0)',
		sunburstcolorway:["#111a82","#822212","#066149"],
	};

	Plotly.newPlot('sunburst', sunburst_data, sunburst_layout, {
		displayModeBar: false
	});
}


// This function is a pure mess, but lets say it generates the sunburst plot okay? :)
function generate_stack_bar_data(yr) {
	
	let temp_split = [];
	let temp_values = []
	let temp_x = []

	for (let reg = 0; reg < 20; reg++) {
		temp_split[reg] = data["sunburst"][yr][reverseDict[reg]].split(",");
		temp_x.push(dictToStr[reverseDict[reg]])
		temp_values[reg] = []
		temp_values[reg].push(parseInt(temp_split[reg][0]))
		temp_values[reg].push(parseInt(temp_split[reg][1]))
		temp_values[reg].push(parseInt(temp_split[reg][2]))
	}
	
	let trace_new = {
		name: 'New Structures',
		x: temp_x,
		type: 'bar'
	};
	let trace_old = {
		name: 'Old Structures',
		x: temp_x,
		type: 'bar'
	};
	let trace_ext = {
		name: 'Extra',
		x: temp_x,
		type: 'bar'
	};

	let temp_new = []
	let temp_old = []
	let temp_ext = []
	
	for(let idx = 3; idx < temp_split.length; idx++) {
		// 3 = NEW, 4 = OLD, 5 = EXT
		for (let reg = 0; reg < 20; reg ++) {
			try {
				let t = temp_split[reg][idx].split(";")

				let count = 0
				for (let elem of t) {
					let s = elem.split(":")
					count += parseInt(s[1])
				}
				if (t[0].startsWith("__N")) {
					temp_new.push(count)
				}
				else if (t[0].startsWith("__O")) {
					temp_old.push(count)
				}
				else if (t[0].startsWith("__E")) {
					temp_ext.push(count)
				}
			}
			catch (error) {
				if (idx == 3)
					temp_new.push(0)
				if (idx == 4)
					temp_old.push(0)
				if (idx == 5)
					temp_ext.push(0)
			}
		}
	}

	let final_new = []
	let final_old = []
	let final_ext = []

	let stacked_data = []
	let data_2017 = []

	for(let i=0; i < 20; i++) {
		let tot = parseInt(temp_values[i][0]) + parseInt(temp_values[i][1]) + parseInt(temp_values[i][2])
		let perc = temp_new[i] + temp_old[i] + temp_ext[i]

		let res = Math.round(parseInt(perc) * 100 / parseInt(tot))
		if (isNaN(res)) 
			res = 0

		let res_new = temp_new[i] * 100 / tot
		res_new = (isNaN(res_new)) ? 0 : Math.round(res_new)
		let res_old = temp_old[i] * 100 / tot
		res_old = (isNaN(res_old)) ? 0 : Math.round(res_old)
		let res_ext = temp_ext[i] * 100 / tot
		res_ext = (isNaN(res_ext)) ? 0 : Math.round(res_ext)

		final_new.push(res_new)
		final_old.push(res_old)
		final_ext.push(res_ext)

		data_2017.push(res)
	}

	
	trace_new["y"] = final_new
	trace_old["y"] = final_old
	trace_ext["y"] = final_ext

	let gonnakms = []
	for(let i=0;i<20;i++)
		gonnakms.push(dictToStr[reverseDict[i]])

	// Filter 0 elements
	for(let i=0; i<data_2017.length; i++) { 
        if(data_2017[i]==0) {
			data_2017.splice(i,1)
            trace_new["y"].splice(i,1);
			trace_old["y"].splice(i,1);
			trace_ext["y"].splice(i,1);
			gonnakms.splice(i,1)
		}
    }

	// AHAAHAHAHAHAHAH this code is obviously inefficient because I was A N G R Y with Javascript okay
	// If you want to hire me or something DON'T MIND THIS <3 (Code wasn't checked during the exam ;D)
	let newNEW = []
	let newOLD = []
	let newEXT = []
	let AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA = []

	for (let fknJavascript = 0; fknJavascript < 20; fknJavascript++) {
		
		let maxIndex = data_2017.reduce(function(highestIndex, element, index, array){
			return element > array[highestIndex] ? index : highestIndex;
		}, 0);
		if (data_2017[maxIndex] == undefined)
			continue
			
		newNEW.push(trace_new["y"][maxIndex])
		newOLD.push(trace_old["y"][maxIndex])
		newEXT.push(trace_ext["y"][maxIndex])
		AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.push(gonnakms[maxIndex])
		data_2017.splice(maxIndex,1)
		trace_new["y"].splice(maxIndex,1)
		trace_old["y"].splice(maxIndex,1)
		trace_ext["y"].splice(maxIndex,1)
		gonnakms.splice(maxIndex,1)
	}

	trace_new["y"] = newNEW
	trace_old["y"] = newOLD
	trace_ext["y"] = newEXT

	width_arr = []
	color_arr = []
	for (let i = 0; i < trace_new["y"].length; i++) {
		color_arr.push('rgb(0,0,0')
		width_arr.push(.5)
	}

	line_obj = {
		color: color_arr,
		width: width_arr
	}

	trace_new["marker"] = {
		line: line_obj
	}

	trace_old["marker"] = {
		line: line_obj
	}

	trace_ext["marker"] = {
		line: line_obj
	}

	trace_new["x"] = AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
	trace_old["x"] = AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
	trace_ext["x"] = AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

	stacked_data = [trace_new, trace_old, trace_ext]

	return stacked_data;
}



// Guess what this does by its name
function generate_sunburst_data(region) {

	if(region == undefined || region == "") {
		return [{
			type: "sunburst",
			labels: ["Hover on a region", "Funds (New Structures)", "Funds (Existing Structures)", "Extra funds", "_", "__", "___"],
			parents: ["", "Hover on a region", "Hover on a region", "Hover on a region","Funds (New Structures)", "Funds (Existing Structures)", "Extra funds"],
			values: [100, 34, 33, 33, 0, 0, 0],
			branchvalues: "total",
			outsidetextfond: {size:20, color: "#377eb8"},
			leaf: {opacity: 0.7},
			marker: {line: {width: 2}},
			autoresize: true
		}];
	}
	let year = get_selected_year();

	let name = "<b>" + dictToStr[region.id] + "</b><br>(" + year + ")"
	sunburst_ids = [name, "NEW", "OLD", "EXT"]
	sunburst_labels = [name, "New Structures", "Existing Structures", "Extras"]
	sunburst_parents = ["", name, name, name]
	sunburst_values = []
	
	let temp_split = data["sunburst"][year][region.id].split(",");
	
	sunburst_values.push(parseInt(temp_split[0]) + parseInt(temp_split[1]) + parseInt(temp_split[2]))
	sunburst_values.push(parseInt(temp_split[0]))
	sunburst_values.push(parseInt(temp_split[1]))
	sunburst_values.push(parseInt(temp_split[2]))

	for(let idx = 3; idx < temp_split.length; idx++) {
		// 3 = NEW, 4 = OLD, 5 = EXT
		let idxToStr = (idx == 3) ? "NEW" : ((idx == 4) ? "OLD" : "EXT")
		let spl = temp_split[idx].split(";")
		for (let elem of spl) {
			let s = elem.split(":")
			if (s[0].startsWith("__"))
				idxToStr = s[0].startsWith("__N") ? "NEW" : (s[0].startsWith("__O") ? "OLD" : "EXT")
			for (let counter=0; counter < s.length; counter++) {
				if (s[counter].startsWith("__")) {
					s[counter] = s[counter].substring(7)
				}
			}
			sunburst_ids.push(idxToStr + " - " + s[0])
			sunburst_labels.push(s[0])
			sunburst_parents.push(idxToStr)
			sunburst_values.push(s[1])
		}
	}

	if(year == 2016) {
		sunburst_ids.push("NEW - ")
		sunburst_labels.push("")
		sunburst_values.push(0)
		sunburst_parents.push("NEW")
		sunburst_ids.push("OLD - ")
		sunburst_labels.push("")
		sunburst_values.push(0)
		sunburst_parents.push("OLD")
		sunburst_ids.push("EXT - ")
		sunburst_labels.push("")
		sunburst_values.push(0)
		sunburst_parents.push("EXT")
	}
	
	let sunburst_data = [{
		type: "sunburst",
		ids: sunburst_ids,
		labels: sunburst_labels,
		parents: sunburst_parents,
		values: sunburst_values,
		branchvalues: "total",
		outsidetextfond: {size:20, color: "#377eb8"},
		leaf: {opacity: 0.7},
		marker: {line: {width: 2}},
		autoresize: true
	}];
	
	return sunburst_data;
}
