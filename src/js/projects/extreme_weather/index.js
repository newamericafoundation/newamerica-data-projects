import { setupProject } from "../../viz_controller.js";

import { colors } from "../../helper_functions/colors.js";


let variables = {
	year: {"variable":"year", "displayName":"Year", "format":"year"},
	event_category: {"variable":"event_category", "displayName":"Event Category", "format":"string", "scaleType":"categorical", "customDomain":["Drought", "Wildfire", "Flooding", "Freeze", "Winter Storm", "Severe Storm", "Tropical Cyclone"], "customRange":[colors.red.light, colors.red.medium, colors.blue.light, colors.blue.medium, colors.blue.dark, colors.purple.light, colors.turquoise.light]},
	event_name: {"variable":"event_name", "displayName":"Event Name", "format":"string"},
	deaths: {"variable":"deaths", "displayName":"Deaths", "format":"number"},
	begin_date: {"variable":"begin_date", "displayName":"Begin Date", "format":"string"},
	end_date: {"variable":"end_date", "displayName":"End Date", "format":"string"},
	states: {"variable":"states", "displayName":"States Affected", "format":"string"},
	info_link: {"variable":"info_link", "displayName":"Info Link", "format":"string"},
	cpi_adjusted_cost: {"variable":"cpi_adjusted_cost", "displayName":"CPI Adjusted Cost (Billions)", "format":"number", "scaleType":"quantize", "numBins":4, "customDomain":[1, 19], "customRange":[colors.grey.medium, colors.grey.dark]},

	event_fips: {"variable":"fips", "displayName":"County Fips", "format":"number"},
	event_county_name: {"variable":"county_name", "displayName":"County", "format":"string"},

	fema_fips: {"variable":"fips", "displayName":"County Fips", "format":"number"},
	fema_county_name: {"variable":"county_name", "displayName":"County", "format":"string"},
	fema_all: {"variable":"all", "displayName":"All", "format":"number", "scaleType":"linear", "customRange":[colors.white, colors.turquoise.dark]},
	fema_other: {"variable":"other", "displayName":"Other", "format":"number", "scaleType":"linear", "customRange":[colors.white, colors.turquoise.dark]},
	fema_flood: {"variable":"flood", "displayName":"Flood", "format":"number", "scaleType":"linear", "customRange":[colors.white, colors.blue.dark]},
	fema_severe_ice_storm: {"variable":"severe_ice_storm", "displayName":"Severe Ice Storm", "format":"number", "scaleType":"linear", "customRange":[colors.white, colors.blue.dark]},
	fema_severe_storms: {"variable":"severe_storms", "displayName":"Severe Storm(s)", "format":"number", "scaleType":"linear", "customRange":[colors.white, colors.purple.dark]},
	fema_snow: {"variable":"snow", "displayName":"Snow", "format":"number", "scaleType":"linear", "customRange":[colors.white, colors.blue.dark]},
	fema_tornado: {"variable":"tornado", "displayName":"Tornado", "format":"number", "scaleType":"linear", "customRange":[colors.white, colors.purple.dark]},
	fema_fire: {"variable":"fire", "displayName":"Fire", "format":"number", "scaleType":"linear", "customRange":[colors.white, colors.red.dark]},
	fema_hurricane: {"variable":"hurricane", "displayName":"Hurricane", "format":"number", "scaleType":"linear", "customRange":[colors.white, colors.purple.dark]},

	storm_type: {"variable":"storm_type", "displayName":"Storm Type", "format":"string", "scaleType":"categorical"},
	frequency: {"variable":"frequency", "displayName":"Frequency", "format":"number", "color": colors.turquoise.medium},
	average_cost: {"variable":"average_cost", "displayName":"Average Cost (Billions)", "format":"number", "scaleType":"linear", "color": colors.blue.medium},
}

let numBillionDollarEvents = 142;

let vizSettingsList = [
	// {
	// 	id: "#extreme-weather__county-by-year", 
	// 	vizType: "us_counties_map",
	// 	primaryDataSheet: "county_by_year",
	// 	secondaryDataSheet: "events",
	// 	// filterVars: [ variables.availability_total_norm ],
	// 	// tooltipVars: [ variables.state, variables.availability_total_norm]
	// },
	// {
	// 	id: "#extreme-weather__county-by-year", 
	// 	vizType: "bar_chart",
	// 	primaryDataSheet: "events",
	// 	xVars: [ variables.year ],
	// 	yScaleType: "count",
	// 	yAxisLabelText: "Number of Disasters",
	// 	// filterVars: [ variables.availability_total_norm ],
	// 	// tooltipVars: [ variables.state, variables.availability_total_norm]
	// },
	// {
	// 	id: "#extreme-weather__events-by-year", 
	// 	vizType: "dot_histogram",
	// 	primaryDataSheet: "events",
	// 	groupingVars: [ variables.year ],
	// 	filterVars: [ variables.cpi_adjusted_cost ],
	// 	tooltipVars: [ variables.event_name, variables.event_category, variables.begin_date, variables.end_date, variables.cpi_adjusted_cost, variables.states ],
	// 	labelSettings: { interval: 5 }
	// },
	// {
	// 	id: "#extreme-weather__counties_map", 
	// 	vizType: "us_map",
	// 	primaryDataSheet: "fips_by_event",
	// 	geometryType: "counties",
	// 	stroke: {"color": "grey", "width":".5", "opacity": ".7", "hoverColor": colors.black, "hoverWidth": "2"},
	// 	geometryVar: variables.event_fips,
	// 	filterVars: getEventFilterVars(),
	// 	tooltipVars: [variables.event_county_name ],
	// 	legendSettings: {"orientation": "horizontal-center"}
	// },
	{
		id: "#extreme-weather__fema-declarations", 
		vizType: "us_map",
		primaryDataSheet: "fema_declarations",
		geometryType: "counties",
		stroke: {"color": "grey", "width":".5", "opacity": ".7", "hoverColor": colors.black, "hoverWidth": "2"},
		geometryVar: variables.fema_fips,
		filterVars: [variables.fema_all, variables.fema_fire, variables.fema_flood, variables.fema_hurricane, variables.fema_severe_ice_storm, variables.fema_severe_storms, variables.fema_snow, variables.fema_tornado, variables.fema_other],
		tooltipVars: [variables.fema_county_name, variables.fema_all, variables.fema_fire, variables.fema_flood, variables.fema_hurricane, variables.fema_severe_ice_storm, variables.fema_severe_storms, variables.fema_snow, variables.fema_tornado, variables.fema_other],
		legendSettings: {"orientation": "horizontal-center", "customTitleExpression": "<<>> Declarations", "showTitle": true},
		filterGroupSettings: { "mobileSelectBox": true },
	},
	// {
	// 	id: "#extreme-weather__counties_map", 
	// 	vizType: "dashboard",
	// 	defaultValue: numBillionDollarEvents - 1,
	// 	layoutRows: [
	// 		[
	// 			{
	// 				vizType: "select_box",
	// 				primaryDataSheet: "events",
	// 				variable: variables.event_name,
	// 				isMessagePasser: true,
	// 				messageHandlerType: "change_value",
	// 			}
	// 		],
	// 		[
	// 			{
	// 				vizType: "dot_histogram",
	// 				width: "450px",
	// 				isMessagePasser: true,
	// 				messageHandlerType: "change_value",
	// 				primaryDataSheet: "events",
	// 				groupingVars: [ variables.year ],
	// 				filterVars: [ variables.cpi_adjusted_cost ],
	// 				dotSettings: { "width": 14, "offset": 3},
	// 				labelSettings: { interval: 5 },
	// 				legendSettings: {"orientation": "horizontal-center", "showTitle": true, "title": "CPI Adjusted Cost (Billions)", "openEnded": true, "disableValueToggling": true},
	// 				eventSettings: {
	// 					"mouseover":{ "tooltip": false, "fill": false, "stroke": "black"},
	// 					"click":{ "tooltip": false, "fill": "turqouise", "stroke": "none", "handlerFuncType": "change_value"}
	// 				}
	// 			},
	// 			{
	// 				vizType: "text_box",
	// 				width: "calc(100% - 450px)",
	// 				primaryDataSheet: "events",
	// 				textBoxVars: [ variables.event_name, variables.event_category, variables.begin_date, variables.end_date, variables.deaths, variables.cpi_adjusted_cost, variables.states, variables.info_link ],
	// 				messageHandlerType: "change_value",
	// 			}
	// 		],
	// 		[
	// 			{
	// 				vizType: "us_map",
	// 				messageHandlerType: "change_filter",
	// 				primaryDataSheet: "fips_by_event",
	// 				geometryType: "counties",
	// 				stroke: {"color": "grey", "width":".5", "opacity": ".7", "hoverColor": colors.black, "hoverWidth": "2"},
	// 				geometryVar: variables.event_fips,
	// 				filterGroupSettings: { "hidden":true },
	// 				filterVars: getEventFilterVars(),
	// 				tooltipVars: [variables.event_county_name ],
	// 				legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": true}
	// 			}

	// 		]
	// 	]
	// },
	// {
	// 	id: "#extreme-weather__event-types", 
	// 	vizType: "bar_chart",
	// 	primaryDataSheet: "event_types",
	// 	groupingVar: variables.storm_type,
	// 	filterVars: [ variables.frequency, variables.average_cost],
	// 	legendSettings: {"orientation": "horizontal-center top", "showTitle": false, "disableValueToggling": false}
	// },
]

let projectSettings = {
	dataUrl: "https://na-data-projects.s3.amazonaws.com/data/resourcesecurity/extreme_weather.json",
	downloadDataLink: "https://docs.google.com/spreadsheets/d/18WEcJVDByP5bCPACgt2s9-sYIOItweq9fI9PCMIpUjY/",
	dataSheetNames:["events", "fips_by_event", "fema_declarations", "event_types"],
	vizSettingsList: vizSettingsList
}

setupProject(projectSettings);

function getEventFilterVars() {
	let filterVars = [];
	let curr;
	for (let i = 0; i < numBillionDollarEvents; i++) {
		curr = {"variable":String(i), "displayName":"All", "format":"string", "scaleType":"categorical", "customDomain":["Drought", "Extreme Heat", "Wildfire", "Flooding", "Cold Weather/Wind Chill or Freezing", "Snow Storms or Ice Storms", "Tornado or Funnel Cloud", "Tropical Storm", "Wind, Hail, or Lightning", "Other"], "customRange":[colors.red.light, colors.red.medium, colors.red.dark, colors.blue.light, colors.blue.medium, colors.blue.dark, colors.turquoise.light, colors.turquoise.dark, colors.purple.light, colors.grey.light]};
		filterVars.push(curr);
	}

	return filterVars;
}

