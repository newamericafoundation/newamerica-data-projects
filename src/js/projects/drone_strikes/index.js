import { setupProject } from "../../viz_controller.js";

import { colors } from "../../helper_functions/colors.js";


let variables = {
	country: {"variable":"country", "displayName":"Country", "format": "string"},
	date: {"variable":"date", "displayName":"Date", "format": "date"},
	year: {"variable":"year", "displayName":"Year", "format": "year"},
	village: {"variable":"village", "displayName":"Village", "format": "string"},
	province: {"variable":"province", "displayName":"Province", "format": "string"},
	total_avg: {"variable":"total_avg", "displayName":"Total Average", "format": "number", "color": colors.turquoise.light},
	civilians_avg: {"variable":"civilians_avg", "displayName":"Civilians", "format": "number", "color": colors.turquoise.light},
	unknown_avg: {"variable":"unknown_avg", "displayName":"Unknown", "format": "number", "color": colors.blue.light},
	militants_avg: {"variable":"militants_avg", "displayName":"Militants", "format": "number", "color": colors.purple.light},
	president: {"variable":"president", "displayName":"President", "format": "string"},
	president_bush: {"variable":"president_bush", "displayName":"Bush", "format": "number", "color": colors.red.light},
	president_obama: {"variable":"president_obama", "displayName":"Obama", "format": "number", "color": colors.blue.light},
	president_trump: {"variable":"president_trump", "displayName":"Trump", "format": "number", "color": colors.red.dark},
	target_organization_name: {"variable":"target_organization_name", "displayName":"Target Organization", "format": "string", "scaleType":"categorical"},
	target_description: {"variable":"target_description", "displayName":"Target Description", "format": "string", "disableTableOrdering": true},

	total_strikes: {"variable":"total_strikes", "displayName":"Total Strikes", "format": "number"},
	civilians_lowhigh: {"variable":"civilians_lowhigh", "displayName":"Civilians", "format": "string", "disableTableOrdering": true},
	militants_lowhigh: {"variable":"militants_lowhigh", "displayName":"Militants", "format": "string", "disableTableOrdering": true},
	unknown_lowhigh: {"variable":"unknown_lowhigh", "displayName":"Unknown", "format": "string", "disableTableOrdering": true},
	total_lowhigh: {"variable":"total_lowhigh", "displayName":"Total", "format": "string", "disableTableOrdering": true},
}

let vizSettingsList = [
	{
		id: "#drone-strikes__casualties", 
		vizType: "stacked_bar",
		primaryDataSheet: "strike_data",
		xVar: variables.year,
		filterVars: [ variables.militants_avg, variables.unknown_avg, variables.civilians_avg ],
		legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
		xAxisLabelInterval: {"small": 10, "medium": 5, "large": 2},
		showYAxis: true,
		tooltipTitleVar: variables.year,
	},
	{
		id: "#drone-strikes__strikes-by-president", 
		vizType: "stacked_bar",
		primaryDataSheet: "strike_data",
		xVar: variables.year,
		filterVars: [ variables.president_bush, variables.president_obama, variables.president_trump ],
		legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
		xAxisLabelInterval: {"small": 10, "medium": 5, "large": 2},
		showYAxis: true,
		tooltipTitleVar: variables.year,
	},
	{
		id: "#drone-strikes__targets", 
		vizType: "percentage_stacked_bar",
		primaryDataSheet: "strike_data",
		groupingVar: variables.president,
		filterVar: variables.target_organization_name,
	},
	{
		id: "#drone-strikes__strike-list", 
		primaryDataSheet: "strike_data",
		vizType: "table",
		tableVars: [ variables.date, variables.country, variables.village, variables.province, variables.civilians_avg, variables.militants_avg, variables.unknown_avg, variables.total_avg, variables.target_organization_name, variables.target_description ],
		defaultOrdering: [0, "desc"],
		pagination: true,
		numPerPage: 25,
		colorScaling: false
	},
	{
		id: "#drone-strikes__strike-totals-by-president", 
		primaryDataSheet: "strikes_by_president",
		vizType: "table",
		tableVars: [ variables.president, variables.total_strikes, variables.civilians_lowhigh, variables.militants_lowhigh, variables.unknown_lowhigh, variables.total_lowhigh],
		defaultOrdering: [0, "asc"],
		pagination: false,
		numPerPage: 25,
		colorScaling: false,
		disableSearching: true,
	 	disableOrdering: true
	}
]

let projectSettings = {
	dataUrl: "https://na-data-projects.s3.amazonaws.com/data/isp/drone-strikes.json",
	downloadDataLink: "https://docs.google.com/spreadsheets/d/11uMYLFFk8sEbYNIOrX3ENRdgCWxttKdYQ6b8hUW-XbI/",
	dataSheetNames:["strike_data", "strikes_by_president"],
	vizSettingsList: vizSettingsList
}

setupProject(projectSettings);
