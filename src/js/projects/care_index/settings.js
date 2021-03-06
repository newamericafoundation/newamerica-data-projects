let { colors } = require("../../helper_functions/colors.js")

let variables = {
	state: {"variable":"state", "displayName":"State", "format": "string"},
	state_id: {"variable":"state_id", "displayName":"State ID", "format": "number"},
	cost_rank: {"variable":"cost_rank", "displayName":"Cost Rank", "format":"number", "category":"Cost", "scaleType":"quantize", "customRange":[colors.white, colors.red.light, colors.red.dark], "numBins":4},
	cost_in_home_yearly: {"variable":"cost_in_home_yearly", "displayName":"Cost in Home", "format":"price", "category":"Cost", "scaleType":"quantize", "customRange":[colors.white, colors.red.light, colors.red.dark], "numBins":5},
	cost_in_center_yearly: {"variable":"cost_in_center_yearly", "displayName":"Cost in Center", "format":"price", "category":"Cost", "scaleType":"quantize", "customRange":[colors.white, colors.red.light, colors.red.dark], "numBins":5},
	average_cost: {"variable":"average_cost", "displayName":"Average Cost", "format":"price", "category":"Cost", "scaleType":"quantize", "customRange":[colors.white, colors.red.light, colors.red.dark], "numBins":5},
	cost_as_proportion_of_hhi: {"variable":"cost_as_proportion_of_hhi", "displayName":"Cost as % of Household Income", "format":"percent", "category":"Cost", "scaleType":"quantize", "customRange":[colors.white, colors.red.light, colors.red.dark], "numBins":5},
	cost_as_proportion_of_min_wage: {"variable":"cost_as_proportion_of_min_wage", "displayName":"Cost as % of Min. Wage", "format":"percent", "category":"Cost", "scaleType":"quantize", "customRange":[colors.white, colors.red.light, colors.red.dark], "numBins":5},
	quality_rank: {"variable":"quality_rank", "displayName":"Quality Rank", "format":"number", "category":"Quality", "scaleType":"quantize", "customRange":[colors.white, colors.purple.light, colors.purple.dark], "numBins":4},
	quality_total_norm: {"variable":"quality_total_norm", "displayName":"Quality", "format":"integer", "category":"Quality", "scaleType":"quantize", "customRange":[colors.white, colors.purple.light, colors.purple.dark], "numBins":5},
	availability_total_norm: {"variable":"availability_total_norm", "displayName":"Availability", "format":"integer", "category":"Availability", "scaleType":"quantize", "customRange":[colors.white, colors.blue.light, colors.blue.dark], "numBins":5},
	care_index_combined: {"variable":"care_index_combined", "displayName":"Care Index Score", "format":"integer", "category":"Overall", "scaleType":"quantize", "customRange":[colors.white, colors.turquoise.light, colors.turquoise.dark], "numBins":5},
	children_5_under: {"variable":"children_5_under", "displayName":"Children 5 & Under", "format":"number", "category":"Cost", "scaleType":"quantize", "customRange":[colors.white, colors.blue.light, colors.blue.dark], "numBins":5},
	in_center_pct_accred_statewide: {"variable":"in_center_pct_accred_statewide", "displayName":"Proportion of Accredited Child Care Centers", "format":"percent", "scaleType":"quantize", "customRange":[colors.white, colors.turquoise.light, colors.turquoise.dark], "numBins":5},

	who_pays_for_care_source: {"variable":"source", "displayName":"Who Pays For Care?", "format":"string", "scaleType": "categorical", "customDomain":["Parents", "Federal, State, and Local Government", "Philanthropy"], "customRange":[colors.turquoise.light, colors.blue.medium, colors.purple.light]},
	who_pays_for_care_value: {"variable":"value", "displayName":"Who Pays For Care?", "format":"percent", "scaleType": "categorical"},
}

let vizSettings = {
	"care-index__explore-the-index": {
		vizType: "tabbed_chart_layout",
		primaryDataSheet: "state_data",
		tabIcons: ["globe", "table"],
		chartSettingsList: [
			{
				vizType: "topo_json_map",
				filterVars: [ variables.cost_in_home_yearly, variables.cost_in_center_yearly, variables.average_cost, variables.cost_as_proportion_of_hhi, variables.cost_as_proportion_of_min_wage, variables.quality_total_norm, variables.availability_total_norm, variables.care_index_combined ],
				tooltipVars: [ variables.state, variables.cost_in_home_yearly, variables.cost_in_center_yearly, variables.average_cost, variables.cost_as_proportion_of_hhi, variables.cost_as_proportion_of_min_wage, variables.quality_total_norm, variables.availability_total_norm, variables.care_index_combined ],
				geometryType: "states",
				geometryVar: variables.state_id,
				legendSettings: {"orientation": "vertical-right", "showTitle": true},
				stroke: {"color": colors.white, "width":"1", "opacity": "1", "hoverColor": colors.white, "hoverWidth": "3"},
				filterGroupSettings: {"hidden": false},
				addSmallStateInsets: true
			},
			{
				vizType: "table",
				tableVars: [ variables.state, variables.cost_in_home_yearly, variables.cost_in_center_yearly, variables.average_cost, variables.cost_as_proportion_of_hhi, variables.cost_as_proportion_of_min_wage, variables.quality_total_norm, variables.availability_total_norm, variables.care_index_combined ],
				defaultOrdering: [0, "asc"],
				pagination: true,
				numPerPage: 25,
				colorScaling: false
			}
		]
	},
	"care-index__explore-the-index__availability": {
		vizType: "topo_json_map",
		primaryDataSheet: "state_data",
		geometryType: "states",
		geometryVar: variables.state_id,
		stroke: {"color": colors.white, "width":"1", "opacity": "1", "hoverColor": colors.white, "hoverWidth": "3"},
		filterVars: [ variables.availability_total_norm ],
		tooltipVars: [ variables.state, variables.availability_total_norm],
		legendSettings: {"orientation": "vertical-right", "showTitle": true},
	},
	"care-index__child-care-accredidation": {
		vizType: "topo_json_map",
		primaryDataSheet: "state_data",
		geometryType: "states",
		geometryVar: variables.state_id,
		stroke: {"color": colors.white, "width":"1", "opacity": "1", "hoverColor": colors.white, "hoverWidth": "3"},
		filterVars: [ variables.in_center_pct_accred_statewide ],
		tooltipVars: [ variables.state, variables.in_center_pct_accred_statewide],
		legendSettings: {"orientation": "vertical-right", "showTitle": true},
	},
	"care-index__summary-box__new-mexico": {
		vizType: "summary_box",
		primaryDataSheet: "state_data",
		titleLabel: "State Overview",
		titleVar: variables.state,
		titleVarValue: "New Mexico",
		columns: ["value", "color_slider", "rank"],
		vizVars: [ variables.cost_in_home_yearly, variables.cost_in_center_yearly, variables.average_cost, variables.cost_as_proportion_of_hhi, variables.cost_as_proportion_of_min_wage, variables.quality_total_norm, variables.availability_total_norm, variables.care_index_combined ]
	},
	"care-index__summary-box__georgia": {
		vizType: "summary_box",
		primaryDataSheet: "state_data",
		titleLabel: "State Overview",
		titleVar: variables.state,
		titleVarValue: "Georgia",
		columns: ["value", "color_slider", "rank"],
		vizVars: [ variables.cost_in_home_yearly, variables.cost_in_center_yearly, variables.average_cost, variables.cost_as_proportion_of_hhi, variables.cost_as_proportion_of_min_wage, variables.quality_total_norm, variables.availability_total_norm, variables.care_index_combined ]
	},
	"care-index__summary-box__illinois": {
		vizType: "summary_box",
		primaryDataSheet: "state_data",
		titleLabel: "State Overview",
		titleVar: variables.state,
		titleVarValue: "Illinois",
		columns: ["value", "color_slider", "rank"],
		vizVars: [ variables.cost_in_home_yearly, variables.cost_in_center_yearly, variables.average_cost, variables.cost_as_proportion_of_hhi, variables.cost_as_proportion_of_min_wage, variables.quality_total_norm, variables.availability_total_norm, variables.care_index_combined ]
	},
	"care-index__summary-box__massachusetts": {
		vizType: "summary_box",
		primaryDataSheet: "state_data",
		titleLabel: "State Overview",
		titleVar: variables.state,
		titleVarValue: "Massachusetts",
		columns: ["value", "color_slider", "rank"],
		vizVars: [ variables.cost_in_home_yearly, variables.cost_in_center_yearly, variables.average_cost, variables.cost_as_proportion_of_hhi, variables.cost_as_proportion_of_min_wage, variables.quality_total_norm, variables.availability_total_norm, variables.care_index_combined ]
	},
	"care-index__who-pays-for-care": {
		vizType: "pie_chart",
		primaryDataSheet: "who_pays_for_care",
		labelVar: variables.who_pays_for_care_source,
		dataVar: variables.who_pays_for_care_value,
		legendShowVals: true,
	}
}

module.exports = {
	vizSettings: vizSettings,
	dataUrl: "https://na-data-projects.s3.amazonaws.com/data/bll/care_index.json",
	downloadableSheets: ["state_data", "state_data_variables", "types_of_care", "who_pays_for_care"]
}
