let { colors } = require("../../helper_functions/colors.js")
const d3 = require("d3");
const { combineSources } = require("../../helper_functions/combine_sources.js")

let strikeCompareDate = new Date();
strikeCompareDate.setMonth(strikeCompareDate.getMonth() - 6)

let variables = {
	country: {"variable":"country", "displayName":"Country", "format": "string"},
	date: {"variable":"date", "displayName":"Date", "format": "date"},
	year: {"variable":"year", "displayName":"Year", "format": "year"},
	geo_lat: {"variable":"geo_lat", "displayName":"Latitude", "format": "number"},
	geo_lon: {"variable":"geo_lon", "displayName":"Longitude", "format": "number"},
	village: {"variable":"village", "displayName":"Village", "format": "string"},
	region: {"variable":"region", "displayName":"Region", "format": "string"},
	city_district: {"variable":"city_district", "displayName":"City District", "format": "string"},
	total_avg: {"variable":"total_avg", "displayName":"Total Casualties", "format": "integer", "color": colors.turquoise.light, "scaleType": "linear"},
	civilians_avg: {"variable":"civilians_avg", "displayName":"Civilians", "format": "integer", "color": colors.blue.medium},
	unknown_avg: {"variable":"unknown_avg", "displayName":"Unknown", "format": "integer", "color": colors.grey.medium},
	militants_avg: {"variable":"militants_avg", "displayName":"Militants", "format": "integer", "color": colors.turquoise.medium},
	total_low: {"variable":"total_low", "displayName":"Total Casualties", "format": "string"},
	total_high: {"variable":"total_high", "displayName":"Total Casualties", "format": "string", "color": colors.turquoise.light, "scaleType": "linear"},
	total_lowhigh: {"variable":"total_lowhigh", "displayName":"Total Casualties", "format": "string", "color": colors.turquoise.light, "scaleType": "linear"},
	civilians_low: {"variable":"civilians_low", "displayName":"civilian Casualties", "format": "string"},
	civilians_high: {"variable":"civilians_high", "displayName":"civilian Casualties", "format": "string", "color": colors.turquoise.light, "scaleType": "linear"},
	civilians_lowhigh: {"variable":"civilians_lowhigh", "displayName":"Civilians", "format": "string", "color": colors.turquoise.light},
	unknown_lowhigh: {"variable":"unknown_lowhigh", "displayName":"Unknown", "format": "string", "color": colors.blue.light},
	militants_lowhigh: {"variable":"militants_lowhigh", "displayName":"Militants", "format": "string", "color": colors.purple.light},
	president: {"variable":"president", "displayName":"President", "format": "string", "scaleType": "categorical", "customDomain": ["Bush", "Obama", "Trump"], "customRange": [colors.red.light, colors.blue.dark, colors.red.dark]},
	president_bush: {"variable":"president_bush", "displayName":"Bush", "format": "number", "color": colors.red.light},
	president_obama: {"variable":"president_obama", "displayName":"Obama", "format": "number", "color": colors.blue.dark},
	president_trump: {"variable":"president_trump", "displayName":"Trump", "format": "number", "color": colors.red.dark},
	target_organization_name: {"variable":"target_organization_name", "displayName":"Target Organization", "format": "string", "scaleType":"categorical"},
	target_description: {"variable":"target_description", "displayName":"Target Description", "format": "long_text", "disableTableOrdering": true},
	sources_combined: {"variable":"sources_combined", "displayName":"Media Outlets", "format": "link"},
	leader_names: {"variable":"leader_names", "displayName":"Leader(s)", "format": "string"},
	leader_description: {"variable":"leader_description", "displayName":"Leader Description", "format": "string"},
	leaders_killed: {"variable":"leaders_killed", "displayName":"Leaders Killed", "format": "number", "scaleType": "linear"},
	strike_type: {"variable":"strike_type", "displayName":"Strike Type", "format": "string", "scaleType": "categorical", "customDomain": ["Drone Strike", "Air Strike", "Ground Operation", "Surveillance Operation"], "customRange": [colors.turquoise.light, colors.blue.light, colors.purple.light, colors.red.medium]},
	belligerent_combined: {"variable":"belligerent_combined", "displayName":"Belligerent", "format": "string", "scaleType": "categorical", "customDomain": ["LNA", "GNA", "GNC", "Egypt", "UAE", "Israel", "US", "France", "Contested", "Unknown"], "customRange": [colors.turquoise.light, colors.turquoise.dark, colors.blue.light, colors.blue.dark, colors.purple.light, colors.purple.dark, colors.orange.light, colors.orange.dark, colors.grey.dark, colors.grey.medium]},
	individual_munitions: {"variable":"individual_munitions", "displayName":"Strikes", "format": "number"},

	pk_total_strikes: {"variable":"pk_total_strikes", "displayName":"Total Strikes", "format": "number"},
	pk_civilians_lowhigh: {"variable":"pk_civilians_lowhigh", "displayName":"Civilian Casualties", "format": "string", "disableTableOrdering": true},
	pk_militants_lowhigh: {"variable":"pk_militants_lowhigh", "displayName":"Militant Casualties", "format": "string", "disableTableOrdering": true},
	pk_unknown_lowhigh: {"variable":"pk_unknown_lowhigh", "displayName":"Unknown Casualties", "format": "string", "disableTableOrdering": true},
	pk_total_lowhigh: {"variable":"pk_total_lowhigh", "displayName":"Total Casualties", "format": "string", "disableTableOrdering": true},
	ym_total_strikes: {"variable":"ym_total_strikes", "displayName":"Total Strikes", "format": "number"},
	ym_civilians_lowhigh: {"variable":"ym_civilians_lowhigh", "displayName":"Civilian Casualties", "format": "string", "disableTableOrdering": true},
	ym_militants_lowhigh: {"variable":"ym_militants_lowhigh", "displayName":"Militant Casualties", "format": "string", "disableTableOrdering": true},
	ym_unknown_lowhigh: {"variable":"ym_unknown_lowhigh", "displayName":"Unknown Casualties", "format": "string", "disableTableOrdering": true},
	ym_total_lowhigh: {"variable":"ym_total_lowhigh", "displayName":"Total Casualties", "format": "string", "disableTableOrdering": true},
	sm_total_strikes: {"variable":"sm_total_strikes", "displayName":"Total Strikes", "format": "number"},
	sm_civilians_lowhigh: {"variable":"sm_civilians_lowhigh", "displayName":"Civilian Casualties", "format": "string", "disableTableOrdering": true},
	sm_militants_lowhigh: {"variable":"sm_militants_lowhigh", "displayName":"Militant Casualties", "format": "string", "disableTableOrdering": true},
	sm_unknown_lowhigh: {"variable":"sm_unknown_lowhigh", "displayName":"Unknown Casualties", "format": "string", "disableTableOrdering": true},
	sm_total_lowhigh: {"variable":"sm_total_lowhigh", "displayName":"Total Casualties", "format": "string", "disableTableOrdering": true},
	lb_total_strikes: {"variable":"lb_total_strikes", "displayName":"Total Strikes", "format": "number"},
	lb_civilians_lowhigh: {"variable":"lb_civilians_lowhigh", "displayName":"Civilian Casualties", "format": "string", "disableTableOrdering": true},
	lb_militants_lowhigh: {"variable":"lb_militants_lowhigh", "displayName":"Militant Casualties", "format": "string", "disableTableOrdering": true},
	lb_unknown_lowhigh: {"variable":"lb_unknown_lowhigh", "displayName":"Unknown Casualties", "format": "string", "disableTableOrdering": true},
	lb_total_lowhigh: {"variable":"lb_total_lowhigh", "displayName":"Total Casualties", "format": "string", "disableTableOrdering": true},
	belligerent: {"variable":"belligerent", "displayName":"Belligerent", "format": "string"},
	lb_total_munitions: {"variable":"lb_total_munitions", "displayName":"Total Strikes", "format": "number"},

	us_strikes_year: {"variable":"year", "displayName":"Year", "format":"string", "scaleType":"categorical"},
	us_strikes_strikes: {"variable":"strikes", "displayName":"Strikes", "format":"number", "color": colors.turquoise.light},
	us_strikes_casualties: {"variable":"casualties", "displayName":"Casualties", "format":"number", "scaleType":"linear", "color": colors.blue.medium},


}

const casualtyTypeNestDataFunction = (data, filterVar) => {
	let nestedVals = d3.nest()
		.key((d) => { return d.year; })
		.sortKeys(d3.ascending)
		.rollup((v) => {
			let retVal = [];

			for (let filter of [variables.militants_avg, variables.civilians_avg, variables.unknown_avg]) {
				let sum = d3.sum(v, (d) => { return Number(d[filter.variable]); });
				retVal.push({key:filter.displayName, value: sum});
			}
			return retVal;
		})
		.entries(data);

	return nestedVals;
}

const casualtiesNestDataFunction = (data, filterVar) => {
	let nestedVals = d3.nest()
		.key((d) => { return d.year; })
		.key((d) => { return d[filterVar.variable]})
		.sortKeys((a, b) => {return filterVar.customDomain.indexOf(a) - filterVar.customDomain.indexOf(b); })
		.rollup((v) => {
			return d3.sum(v, (valueObject) => {
				return valueObject.total_avg;
			})
		})
		.entries(data);

	return nestedVals;
}

const strikesNestDataFunction = (data, filterVar) => {
	let nestedVals = d3.nest()
		.key((d) => { return d.year; })
		.key((d) => { return d[filterVar.variable]})
		.sortKeys((a, b) => {return filterVar.customDomain.indexOf(a) - filterVar.customDomain.indexOf(b); })
		.rollup((v) => { return v.length; })
		.entries(data);

	return nestedVals;
}

const libyaStrikesNestDataFunction = (data, filterVar) => {
	let nestedVals = d3.nest()
		.key((d) => { return d.year; })
		.key((d) => { return d[filterVar.variable]})
		.sortKeys((a, b) => {return filterVar.customDomain.indexOf(a) - filterVar.customDomain.indexOf(b); })
		.rollup(v => d3.sum(v, valueObject => valueObject.individual_munitions))
		.entries(data);

	return nestedVals;
}

const leadersFilterFunction = (d) => {
	return d.leaders_killed && d.leaders_killed > 0;
}

let vizSettings = {
	"drone-strikes__pakistan__by-president": {
		vizType: "filterable_chart",
		primaryDataSheet: "pakistan_strikes",
		chartType: "stacked_bar",
		customFilterOptions: [
			{key:"Strikes", values:[{id:"strikes"}]},
			{key:"Casualties", values:[{id:"casualties"}]},

		],
		filterType: "select-box",
		chartSettings: [
			{
				dataNestFunction: strikesNestDataFunction,
				xVar: variables.year,
				filterVar: variables.president,
				legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
				xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
				yAxisLabelText: "Strikes",
				showYAxis: true,
				tooltipColorVals: true
			},
			{
				xVar: variables.year,
				filterVar: variables.president,
				dataNestFunction: casualtiesNestDataFunction,
				legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
				xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
				yAxisLabelText: "Casualties",
				showYAxis: true,
				tooltipColorVals: true,
			},
		]
	},
	"drone-strikes__pakistan__by-casualty-type": {
		vizType: "stacked_bar",
		primaryDataSheet: "pakistan_strikes",
		xVar: variables.year,
		customColorScale: {
			domain: [ variables.militants_avg.displayName, variables.civilians_avg.displayName, variables.unknown_avg.displayName],
			range: [ colors.turquoise.light, colors.blue.light, colors.grey.medium ]
		},
		dataNestFunction: casualtyTypeNestDataFunction,
		legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
		xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
		yAxisLabelText: "Casualties",
		showYAxis: true,
		tooltipColorVals: true,
	},
	"drone-strikes__pakistan__targets": {
		vizType: "drone_strikes_targets_stacked_bar",
		// filterInitialDataBy: { field: "country", value:"Pakistan"},
		primaryDataSheet: "pakistan_strikes",
		groupingVar: variables.president,
		filterVar: variables.target_organization_name,
	},
	"drone-strikes__pakistan__strike-totals-by-president": {
		primaryDataSheet: "strikes_by_president",
		vizType: "table",
		tableVars: [ variables.president, variables.pk_total_strikes, variables.pk_civilians_lowhigh, variables.pk_militants_lowhigh, variables.pk_unknown_lowhigh, variables.pk_total_lowhigh],
		defaultOrdering: [0, "asc"],
		pagination: false,
		numPerPage: 10,
		colorScaling: false,
		disableSearching: true,
	 	disableOrdering: true
	},
	"drone-strikes__pakistan__strike-map": {
		vizType: "tabbed_chart_layout",
		primaryDataSheet: "pakistan_strikes",
		tabIcons: ["globe", "table"],
		chartSettingsList: [
			{
				vizType: "mapbox_map",
				// filterInitialDataBy: { field: "country", value:"Pakistan"},
		        mapboxSettings: {
		        	style: "mapbox://styles/newamericamapbox/ciynaplyx001k2sqepxshx05u",
		        	center: [69.3451, 32.3753],
		        	zoom: 5,
		        	// maxBounds: [
		        	// 	[55.00301398655583, 21.96600122382982],
		        	// 	[83.30379523654886, 39.012806004755106]
		        	// ],
		        },
		        colorVar: variables.president,
		        radiusVar: variables.total_avg,
		        showLegend: true,
		        sliderSettings: {
					sliderVar: variables.year,
					showAllButton: true,
					automated: false,
					trackColors: [
						{ domain:[2002, 2009], color: colors.red.light },
						{ domain:[2009, 2017], color: colors.blue.dark },
						{ domain:[2017], color: colors.red.dark }
					]
		        },
		        dataBoxVars: {
		        	title: variables.date,
		        	subtitle: [variables.village, variables.region],
		        	categories: [
			        	{
			        		label: "Target",
			        		fields: [variables.target_organization_name, variables.target_description]
			        	},
			        	{
			        		label: "Casualties",
			        		fields: [variables.civilians_lowhigh, variables.militants_lowhigh, variables.unknown_lowhigh, variables.total_lowhigh]
			        	},
			        	{
			        		label: "Leaders Killed",
			        		fields: [variables.leader_names, variables.leader_description]
			        	},
			        	{
			        		label: "Sources",
			        		fields: [variables.sources_combined]
			        	}
		        	],
		        }
		    },
		    {
				vizType: "table",
				tableVars: [ variables.date, variables.president, variables.village, variables.region, variables.target_organization_name, variables.target_description, variables.civilians_avg, variables.militants_avg, variables.unknown_avg, variables.total_avg, variables.sources_combined],
				defaultOrdering: [0, "desc"],
				pagination: true,
				numPerPage: 10,
				colorScaling: false
			}
		]
	},
	"drone-strikes__pakistan__leaders-map": {
		vizType: "tabbed_chart_layout",
		primaryDataSheet: "pakistan_strikes",
		tabIcons: ["table", "globe"],
		chartSettingsList: [
		    {
				vizType: "table",
				filterInitialDataFunction: leadersFilterFunction,
				tableVars: [ variables.date, variables.leader_names, variables.leader_description, variables.village, variables.region, variables.sources_combined],
				defaultOrdering: [0, "desc"],
				pagination: true,
				numPerPage: 10,
				colorScaling: false
			},
			{
				vizType: "mapbox_map",
				// filterInitialDataBy: { field: "country", value:"Pakistan" },
		        mapboxSettings: {
		        	style: "mapbox://styles/newamericamapbox/ciynaplyx001k2sqepxshx05u",
		        	center: [69.3451, 32.3753],
		        	zoom: 5,
		        	maxBounds: [
		        		[55.00301398655583, 21.96600122382982],
		        		[83.30379523654886, 39.012806004755106]
		        	],
		        },
		        colorVar: variables.president,
		        radiusVar: variables.leaders_killed,
		        showLegend: true,
		        sliderSettings: {
					sliderVar: variables.year,
					showAllButton: true,
					automated: false,
					trackColors: [
						{ domain:[2002, 2009], color: colors.red.light },
						{ domain:[2009, 2017], color: colors.blue.dark },
						{ domain:[2017], color: colors.red.dark }
					]
		        },
		        dataBoxVars: {
		        	title: variables.date,
		        	subtitle: [variables.village, variables.region],
		        	categories: [
		        		{
			        		label: "Leaders Killed",
			        		fields: [variables.leader_names, variables.leader_description]
			        	},
			        	// {
			        	// 	label: "Target",
			        	// 	fields: [variables.target_organization_name, variables.target_description]
			        	// },
			        	// {
			        	// 	label: "Casualties",
			        	// 	fields: [variables.civilians_lowhigh, variables.militants_lowhigh, variables.unknown_lowhigh, variables.total_lowhigh]
			        	// },
			        	{
			        		label: "Sources",
			        		fields: [variables.sources_combined]
			        	}
		        	],
		        }
		    },
		]
	},
	"drone-strikes__yemen__by-casualty-type": {
		vizType: "stacked_bar",
		primaryDataSheet: "yemen_strikes",
		xVar: variables.year,
		customColorScale: {
			domain: [ variables.militants_avg.displayName, variables.civilians_avg.displayName, variables.unknown_avg.displayName],
			range: [ colors.turquoise.medium, colors.blue.medium, colors.grey.medium ]
		},
		dataNestFunction: casualtyTypeNestDataFunction,
		legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
		xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
		yAxisLabelText: "Casualties",
		showYAxis: true,
		tooltipColorVals: true
	},
	"drone-strikes__yemen__by-president": {
		vizType: "filterable_chart",
		primaryDataSheet: "yemen_strikes",
		chartType: "stacked_bar",
		customFilterOptions: [
			{key:"Strikes", values:[{id:"strikes"}]},
			{key:"Casualties", values:[{id:"casualties"}]},

		],
		filterType: "select-box",
		chartSettings: [
			{
				dataNestFunction: strikesNestDataFunction,
				xVar: variables.year,
				filterVar: variables.president,
				legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
				xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
				yAxisLabelText: "Strikes",
				showYAxis: true,
				tooltipColorVals: true,
			},
			{
				xVar: variables.year,
				filterVar: variables.president,
				dataNestFunction: casualtiesNestDataFunction,
				legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
				xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
				yAxisLabelText: "Casualties",
				showYAxis: true,
				tooltipColorVals: true,
			},
		]
	},
	"drone-strikes__yemen__by-strike-type": {
		vizType: "filterable_chart",
		primaryDataSheet: "yemen_strikes",
		chartType: "stacked_bar",
		customFilterOptions: [
			{key:"Strikes", values:[{id:"strikes"}]},
			{key:"Casualties", values:[{id:"casualties"}]},
		],
		filterType: "select-box",
		chartSettings: [
			{
				dataNestFunction: strikesNestDataFunction,
				xVar: variables.year,
				filterVar: variables.strike_type,
				legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
				xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
				yAxisLabelText: "Strikes",
				showYAxis: true,
				tooltipColorVals: true,
			},
			{
				xVar: variables.year,
				filterVar: variables.strike_type,
				dataNestFunction: casualtiesNestDataFunction,
				legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
				xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
				yAxisLabelText: "Casualties",
				showYAxis: true,
				tooltipColorVals: true,
			},
		]
	},
	"drone-strikes__yemen__targets": {
		vizType: "drone_strikes_targets_stacked_bar",
		// filterInitialDataBy: { field: "country", value:"yemen"},
		primaryDataSheet: "yemen_strikes",
		groupingVar: variables.president,
		filterVar: variables.target_organization_name,
	},
	"drone-strikes__yemen__strike-totals-by-president": {
		primaryDataSheet: "strikes_by_president",
		vizType: "table",
		tableVars: [ variables.president, variables.ym_total_strikes, variables.ym_civilians_lowhigh, variables.ym_militants_lowhigh, variables.ym_unknown_lowhigh, variables.ym_total_lowhigh],
		defaultOrdering: [0, "asc"],
		pagination: false,
		numPerPage: 10,
		colorScaling: false,
		disableSearching: true,
	 	disableOrdering: true
	},
	"drone-strikes__yemen__strike-map": {
		vizType: "tabbed_chart_layout",
		primaryDataSheet: "yemen_strikes",
		tabIcons: ["globe", "table"],
		chartSettingsList: [
			{
				vizType: "mapbox_map",
				// filterInitialDataBy: { field: "country", value:"Pakistan"},
		        mapboxSettings: {
		        	style: "mapbox://styles/newamericamapbox/ciynaplyx001k2sqepxshx05u",
		        	center: [45.5164, 15.5527],
		        	zoom: 5,
		        	maxBounds: [
		        		[40.5164, 12.5527],
		        		[55.5164, 20.5527]
		        	],
		        },
		        colorVar: variables.strike_type,
		        radiusVar: variables.total_avg,
		        showLegend: true,
		        sliderSettings: {
					sliderVar: variables.year,
					showAllButton: true,
					automated: false,
		        },
		        dataBoxVars: {
		        	title: variables.date,
		        	subtitle: [variables.village, variables.region],
		        	categories: [
			        	{
			        		label: "Target",
			        		fields: [variables.target_organization_name, variables.target_description]
			        	},
			        	{
			        		label: "Casualties",
			        		fields: [variables.civilians_lowhigh, variables.militants_lowhigh, variables.unknown_lowhigh, variables.total_lowhigh]
			        	},
			        	{
			        		label: "Leaders Killed",
			        		fields: [variables.leader_names, variables.leader_description]
			        	},
			        	{
			        		label: "Sources",
			        		fields: [variables.sources_combined]
			        	}
		        	],
		        }
		    },
		    {
				vizType: "table",
				tableVars: [ variables.date, variables.president, variables.village, variables.region, variables.target_organization_name, variables.target_description, variables.civilians_avg, variables.militants_avg, variables.unknown_avg, variables.total_avg, variables.sources_combined],
				defaultOrdering: [0, "desc"],
				pagination: true,
				numPerPage: 10,
				colorScaling: false
			}
		]
	},
	"drone-strikes__yemen__leaders-map": {
		vizType: "tabbed_chart_layout",
		primaryDataSheet: "yemen_strikes",
		tabIcons: ["table", "globe"],
		chartSettingsList: [
		    {
				vizType: "table",
				tableVars: [ variables.date, variables.leader_names, variables.leader_description, variables.village, variables.region, variables.sources_combined],
				filterInitialDataFunction: leadersFilterFunction,
				defaultOrdering: [0, "desc"],
				pagination: true,
				numPerPage: 10,
				colorScaling: false
			},
			{
				vizType: "mapbox_map",
				// filterInitialDataBy: { field: "country", value:"Pakistan" },
		        mapboxSettings: {
		        	style: "mapbox://styles/newamericamapbox/ciynaplyx001k2sqepxshx05u",
		        	center: [45.5164, 15.5527],
		        	zoom: 5,
		        	maxBounds: [
		        		[40.5164, 12.5527],
		        		[55.5164, 20.5527]
		        	],
		        },
		        colorVar: variables.strike_type,
		        radiusVar: variables.leaders_killed,
		        showLegend: true,
		        sliderSettings: {
					sliderVar: variables.year,
					showAllButton: true,
					automated: false,
		        },
		        dataBoxVars: {
		        	title: variables.date,
		        	subtitle: [variables.village, variables.region],
		        	categories: [
		        		{
			        		label: "Leaders Killed",
			        		fields: [variables.leader_names, variables.leader_description]
			        	},
			        	// {
			        	// 	label: "Target",
			        	// 	fields: [variables.target_organization_name, variables.target_description]
			        	// },
			        	// {
			        	// 	label: "Casualties",
			        	// 	fields: [variables.civilians_lowhigh, variables.militants_lowhigh, variables.unknown_lowhigh, variables.total_lowhigh]
			        	// },
			        	{
			        		label: "Sources",
			        		fields: [variables.sources_combined]
			        	}
		        	],
		        }
		    },
		]
	},

	"drone-strikes__somalia__by-casualty-type": {
		vizType: "stacked_bar",
		primaryDataSheet: "somalia_strikes",
		xVar: variables.year,
		customColorScale: {
			domain: [ variables.militants_avg.displayName, variables.civilians_avg.displayName, variables.unknown_avg.displayName],
			range: [ colors.turquoise.light, colors.blue.light, colors.grey.medium ]
		},
		dataNestFunction: casualtyTypeNestDataFunction,
		legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
		xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
		yAxisLabelText: "Casualties",
		showYAxis: true,
		tooltipColorVals: true,
	},
	"drone-strikes__somalia__by-president": {
		vizType: "filterable_chart",
		primaryDataSheet: "somalia_strikes",
		chartType: "stacked_bar",
		customFilterOptions: [
			{key:"Strikes", values:[{id:"strikes"}]},
			{key:"Casualties", values:[{id:"casualties"}]},

		],
		filterType: "select-box",
		chartSettings: [
			{
				dataNestFunction: strikesNestDataFunction,
				xVar: variables.year,
				filterVar: variables.president,
				legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
				xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
				yAxisLabelText: "Strikes",
				showYAxis: true,
				tooltipColorVals: true
			},
			{
				xVar: variables.year,
				filterVar: variables.president,
				dataNestFunction: casualtiesNestDataFunction,
				legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
				xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
				yAxisLabelText: "Casualties",
				showYAxis: true,
				tooltipColorVals: true,
			},
		]
	},
	"drone-strikes__somalia__by-strike-type": {
		vizType: "filterable_chart",
		primaryDataSheet: "somalia_strikes",
		chartType: "stacked_bar",
		customFilterOptions: [
			{key:"Strikes", values:[{id:"strikes"}]},
			{key:"Casualties", values:[{id:"casualties"}]},
		],
		filterType: "select-box",
		chartSettings: [
			{
				dataNestFunction: strikesNestDataFunction,
				xVar: variables.year,
				filterVar: variables.strike_type,
				legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
				xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
				yAxisLabelText: "Strikes",
				showYAxis: true,
				tooltipColorVals: true
			},
			{
				xVar: variables.year,
				filterVar: variables.strike_type,
				dataNestFunction: casualtiesNestDataFunction,
				legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
				xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
				yAxisLabelText: "Casualties",
				showYAxis: true,
				tooltipColorVals: true,
			},
		]
	},

	"drone-strikes__somalia__targets": {
		vizType: "drone_strikes_targets_stacked_bar",
		// filterInitialDataBy: { field: "country", value:"somalia"},
		primaryDataSheet: "somalia_strikes",
		groupingVar: variables.president,
		filterVar: variables.target_organization_name,
	},
	"drone-strikes__somalia__strike-totals-by-president": {
		primaryDataSheet: "strikes_by_president",
		vizType: "table",
		tableVars: [ variables.president, variables.sm_total_strikes, variables.sm_civilians_lowhigh, variables.sm_militants_lowhigh, variables.sm_unknown_lowhigh, variables.sm_total_lowhigh],
		defaultOrdering: [0, "asc"],
		pagination: false,
		numPerPage: 10,
		colorScaling: false,
		disableSearching: true,
	 	disableOrdering: true
	},
	"drone-strikes__somalia__strike-map": {
		vizType: "tabbed_chart_layout",
		primaryDataSheet: "somalia_strikes",
		tabIcons: ["globe", "table"],
		chartSettingsList: [
			{
				vizType: "mapbox_map",
				// filterInitialDataBy: { field: "country", value:"Pakistan"},
		        mapboxSettings: {
		        	style: "mapbox://styles/newamericamapbox/ciynaplyx001k2sqepxshx05u",
		        	center: [46.1996, 5.1521],
		        	zoom: 5,
		        	maxBounds: [
		        		[40.5164, 0.5527],
		        		[55.5164, 10.5527]
		        	],
		        },
		        colorVar: variables.strike_type,
		        radiusVar: variables.total_avg,
		        showLegend: true,
		        sliderSettings: {
					sliderVar: variables.year,
					showAllButton: true,
					automated: false,
		        },
		        dataBoxVars: {
		        	title: variables.date,
		        	subtitle: [variables.village, variables.region],
		        	categories: [
			        	{
			        		label: "Target",
			        		fields: [variables.target_organization_name, variables.target_description]
			        	},
			        	{
			        		label: "Casualties",
			        		fields: [variables.civilians_lowhigh, variables.militants_lowhigh, variables.unknown_lowhigh, variables.total_lowhigh]
			        	},
			        	{
			        		label: "Leaders Killed",
			        		fields: [variables.leader_names, variables.leader_description]
			        	},
			        	{
			        		label: "Sources",
			        		fields: [variables.sources_combined]
			        	}
		        	],
		        }
		    },
		    {
				vizType: "table",
				tableVars: [ variables.date, variables.president, variables.village, variables.region, variables.target_organization_name, variables.target_description, variables.civilians_avg, variables.militants_avg, variables.unknown_avg, variables.total_avg, variables.sources_combined],
				defaultOrdering: [0, "desc"],
				pagination: true,
				numPerPage: 10,
				colorScaling: false
			}
		]
	},
	"drone-strikes__somalia__leaders-map": {
		vizType: "tabbed_chart_layout",
		primaryDataSheet: "somalia_strikes",
		tabIcons: ["table", "globe"],
		chartSettingsList: [
		    {
				vizType: "table",
				tableVars: [ variables.date, variables.leader_names, variables.leader_description, variables.village, variables.region, variables.sources_combined],
				filterInitialDataFunction: leadersFilterFunction,
				defaultOrdering: [0, "desc"],
				pagination: true,
				numPerPage: 10,
				colorScaling: false
			},
			{
				vizType: "mapbox_map",
				// filterInitialDataBy: { field: "country", value:"Pakistan" },
		        mapboxSettings: {
		        	style: "mapbox://styles/newamericamapbox/ciynaplyx001k2sqepxshx05u",
		        	center: [40.1996, 5.1521],
		        	zoom: 3,
		        	maxBounds: [
		        		[35.5164, -5],
		        		[60.5164, 15]
		        	],
		        },
		        colorVar: variables.strike_type,
		        radiusVar: variables.leaders_killed,
		        showLegend: true,
		        sliderSettings: {
					sliderVar: variables.year,
					showAllButton: true,
					automated: false,
		        },
		        dataBoxVars: {
		        	title: variables.date,
		        	subtitle: [variables.village, variables.region],
		        	categories: [
		        		{
			        		label: "Leaders Killed",
			        		fields: [variables.leader_names, variables.leader_description]
			        	},
			        	// {
			        	// 	label: "Target",
			        	// 	fields: [variables.target_organization_name, variables.target_description]
			        	// },
			        	// {
			        	// 	label: "Casualties",
			        	// 	fields: [variables.civilians_lowhigh, variables.militants_lowhigh, variables.unknown_lowhigh, variables.total_lowhigh]
			        	// },
			        	{
			        		label: "Sources",
			        		fields: [variables.sources_combined]
			        	}
		        	],
		        }
		    },
		]
	},
	"drone-strikes__pakistan__call-out-data": {
		isReact: true,
		vizType: "callout_box",
		primaryDataSheet: "pakistan_strikes",
		backgroundColor: "black",
		columns: [
			{
				width: "100%",
				sections:[
					{
						title: "Live Statistics",
						dataElements: [
							{
								type:"fact-box-list",
								format:"horizontal",
								factBoxVars: [
									{ label: "Strikes in last 6 mos.", type: "count", query: {varName:"date", operation:">", compareValue:strikeCompareDate} },
									{ label: "Total strikes (Overall)",type: "count" },
									{ label: "Civilian casualties (Overall)",type: "sum-range", variableMin: variables.civilians_low, variableMax:variables.civilians_high},
									{ label: "Total casualties (Overall)",type: "sum-range", variableMin: variables.total_low, variableMax:variables.total_high}
								]
							},
						]
					},
					{
						title: "Most Recent Strike",
						dataElements: [
							{
								type:"simple-map",
								country: "pakistan",
								latVar: { type: "value", variable: variables.geo_lat, query: {varName:"date", operation:"max"} },
								lngVar: { type: "value", variable: variables.geo_lon, query: {varName:"date", operation:"max"} }
							},
							{
								type:"fact-box-list",
								format:"vertical",
								factBoxVars: [
									{ label: "Date", type: "value", variable: variables.date, format: "date", query: {varName:"date", operation:"max"} },
									{ label: "Total Casualties", type: "value", variable: variables.total_lowhigh, query: {varName:"date", operation:"max"}, subVars: [
										{ label: "Militants", type: "value", variable: variables.militants_lowhigh, query: {varName:"date", operation:"max"} },
										{ label: "Civilians", type: "value", variable: variables.civilians_lowhigh, query: {varName:"date", operation:"max"} },
										{ label: "Unknown", type: "value", variable: variables.unknown_lowhigh, query: {varName:"date", operation:"max"} }
									]},
									{ label: "Target organization", type: "value", variable: variables.target_organization_name, query: {varName:"date", operation:"max"} }
								],
							},
							{
								type:"paragraph",
								paragraphVar: { label: "Details", type: "value", variable: variables.target_description, query: {varName:"date", operation:"max"} },

							}
						]
					}
				]
			}
		]
	},
	"drone-strikes__libya__strike-map": {
		vizType: "tabbed_chart_layout",
		primaryDataSheet: "libya_strikes",
		tabIcons: ["globe", "table"],
		chartSettingsList: [
			{
				vizType: "mapbox_map",
				// filterInitialDataBy: { field: "country", value:"Pakistan"},
		        mapboxSettings: {
		        	style: "mapbox://styles/newamericamapbox/ciynaplyx001k2sqepxshx05u",
		        	center: [17.5, 31],
		        	zoom: 5,
		        	maxBounds: [
		        		[5, 17],
		        		[35, 37]
		        	],
		        },
		        colorVar: variables.belligerent_combined,
		        radiusVar: variables.total_avg,
		        showLegend: true,
		        sliderSettings: {
					sliderVar: variables.year,
					showAllButton: true,
					automated: false,
		        },
		        dataBoxVars: {
		        	title: variables.date,
		        	subtitle: [variables.village, variables.city_district],
		        	categories: [
			        	{
			        		label: "Target",
			        		fields: [variables.target_description]
			        	},
			        	{
			        		label: "Casualties",
			        		fields: [variables.civilians_lowhigh, variables.militants_lowhigh, variables.unknown_lowhigh, variables.total_lowhigh]
			        	},
			        	{
			        		label: "Sources",
			        		fields: [variables.sources_combined]
			        	}
		        	],
		        }
		    },
		    {
				vizType: "table",
				tableVars: [ variables.date, variables.village, variables.city_district, variables.belligerent_combined, variables.civilians_avg, variables.militants_avg, variables.total_avg, variables.sources_combined],
				defaultOrdering: [0, "desc"],
				pagination: true,
				numPerPage: 25,
				colorScaling: false
			}
		]
	},
	"drone-strikes__libya__strike-totals-by-belligerent": {
		primaryDataSheet: "libya_strikes_by_belligerent",
		vizType: "table",
		tableVars: [ variables.belligerent, variables.lb_total_munitions, variables.lb_civilians_lowhigh, variables.lb_militants_lowhigh, variables.lb_total_lowhigh],
		// defaultOrdering: [0, "desc"],
		pagination: false,
		numPerPage: 10,
		colorScaling: false,
		disableSearching: true,
	 	disableOrdering: true
	},
	"drone-strikes__libya__by-belligerent": {
		vizType: "stacked_bar",
		primaryDataSheet: "libya_strikes",
		dataNestFunction: libyaStrikesNestDataFunction,
		xVar: variables.year,
		filterVar: variables.belligerent_combined,
		legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
		xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
		yAxisLabelText: "Strikes",
		showYAxis: true,
		tooltipColorVals: true,
	},
	"drone-strikes__libya__by-casualty-type": {
		vizType: "stacked_bar",
		primaryDataSheet: "libya_strikes",
		xVar: variables.year,
		customColorScale: {
			domain: [ variables.militants_avg.displayName, variables.civilians_avg.displayName],
			range: [ colors.turquoise.light, colors.blue.light]
		},
		dataNestFunction: casualtyTypeNestDataFunction,
		legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
		xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
		yAxisLabelText: "Casualties",
		showYAxis: true,
		tooltipColorVals: true,
	},
	"drone-strikes__libya__by-casualty-type-us": {
		vizType: "stacked_bar",
		primaryDataSheet: "libya_strikes",
		xVar: variables.year,
		customColorScale: {
			domain: [ variables.militants_avg.displayName, variables.civilians_avg.displayName],
			range: [ colors.turquoise.light, colors.blue.light]
		},
		dataNestFunction: casualtyTypeNestDataFunction,
		legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
		xAxisLabelInterval: {"small": 5, "medium": 2, "large": 1},
		yAxisLabelText: "Casualties",
		showYAxis: true,
		tooltipColorVals: true,
		filterInitialDataBy: { field: "belligerent_combined", value: "US"}
	},
	"drone-strikes__libya__us-strikes": {
		vizType: "bar_chart",
		primaryDataSheet: "libya_us_strikes",
		groupingVar: variables.us_strikes_year,
		filterVars: [ variables.us_strikes_strikes, variables.us_strikes_casualties],
		legendSettings: {"orientation": "horizontal-center", "showTitle": false, "disableValueToggling": false},
		groupingAxisLabelInterval: {"small": 1, "medium": 1, "large": 1},
		labelValues: true,
		showYAxis: false
	},
	"drone-strikes__yemen__call-out-data": {
		isReact: true,
		vizType: "callout_box",
		primaryDataSheet: "yemen_strikes",
		backgroundColor: "black",
		columns: [
			{
				width: "100%",
				sections:[
					{
						title: "Live Statistics",
						dataElements: [
							{
								type:"fact-box-list",
								format:"horizontal",
								factBoxVars: [
									{ label: "Strikes in last 6 mos.", type: "count", query: {varName:"date", operation:">", compareValue:strikeCompareDate} },
									{ label: "Total strikes (Overall)",type: "count" },
									{ label: "Civilian casualties (Overall)",type: "sum-range", variableMin: variables.civilians_low, variableMax:variables.civilians_high},
									{ label: "Total casualties (Overall)",type: "sum-range", variableMin: variables.total_low, variableMax:variables.total_high}
								]
							},
						]
					},
					{
						title: "Most Recent Strike",
						dataElements: [
							{
								type:"simple-map",
								country: "yemen",
								latVar: { type: "value", variable: variables.geo_lat, query: {varName:"date", operation:"max"} },
								lngVar: { type: "value", variable: variables.geo_lon, query: {varName:"date", operation:"max"} }
							},
							{
								type:"fact-box-list",
								format:"vertical",
								factBoxVars: [
									{ label: "Date", type: "value", variable: variables.date, format: "date", query: {varName:"date", operation:"max"} },
									{ label: "Strike type", type: "value", variable: variables.strike_type, query: {varName:"date", operation:"max"} },
									{ label: "Total casualties", type: "value", variable: variables.total_lowhigh, query: {varName:"date", operation:"max"}, subVars: [
										{ label: "Militants", type: "value", variable: variables.militants_lowhigh, query: {varName:"date", operation:"max"} },
										{ label: "Civilians", type: "value", variable: variables.civilians_lowhigh, query: {varName:"date", operation:"max"} },
										{ label: "Unknown", type: "value", variable: variables.unknown_lowhigh, query: {varName:"date", operation:"max"} }
									]},
									{ label: "Target organization", type: "value", variable: variables.target_organization_name, query: {varName:"date", operation:"max"} }
								],
							},
							{
								type:"paragraph",
								paragraphVar: { label: "Details", type: "value", variable: variables.target_description, query: {varName:"date", operation:"max"} },

							}
						]
					}
				]
			}
		]
	},
	"drone-strikes__somalia__call-out-data": {
		isReact: true,
		vizType: "callout_box",
		primaryDataSheet: "somalia_strikes",
		backgroundColor: "black",
		columns: [
			{
				width: "100%",
				sections:[
					{
						title: "Live Statistics",
						dataElements: [
							{
								type:"fact-box-list",
								format:"horizontal",
								factBoxVars: [
									{ label: "Strikes in last 6 mos.", type: "count", query: {varName:"date", operation:">", compareValue:strikeCompareDate} },
									{ label: "Total strikes (Overall)",type: "count" },
									{ label: "Civilian casualties (Overall)",type: "sum-range", variableMin: variables.civilians_low, variableMax:variables.civilians_high},
									{ label: "Total casualties (Overall)",type: "sum-range", variableMin: variables.total_low, variableMax:variables.total_high}
								]
							},
						]
					},
					{
						title: "Most Recent Strike",
						dataElements: [
							{
								type:"simple-map",
								country: "somalia",
								latVar: { type: "value", variable: variables.geo_lat, query: {varName:"date", operation:"max"} },
								lngVar: { type: "value", variable: variables.geo_lon, query: {varName:"date", operation:"max"} }
							},
							{
								type:"fact-box-list",
								format:"vertical",
								factBoxVars: [
									{ label: "Date", type: "value", variable: variables.date, format: "date", query: {varName:"date", operation:"max"} },
									{ label: "Strike type", type: "value", variable: variables.strike_type, query: {varName:"date", operation:"max"} },
									{ label: "Total casualties", type: "value", variable: variables.total_lowhigh, query: {varName:"date", operation:"max"}, subVars: [
										{ label: "Militants", type: "value", variable: variables.militants_lowhigh, query: {varName:"date", operation:"max"} },
										{ label: "Civilians", type: "value", variable: variables.civilians_lowhigh, query: {varName:"date", operation:"max"} },
										{ label: "Unknown", type: "value", variable: variables.unknown_lowhigh, query: {varName:"date", operation:"max"} }
									]},
									{ label: "Target organization", type: "value", variable: variables.target_organization_name, query: {varName:"date", operation:"max"} }
								],
							},
							{
								type:"paragraph",
								paragraphVar: { label: "Details", type: "value", variable: variables.target_description, query: {varName:"date", operation:"max"} },

							}
						]
					}
				]
			}
		]
	},
	"drone-strikes__niger__call-out-data": {
		isReact: true,
		vizType: "callout_box",
		primaryDataSheet: "niger_strikes",
		backgroundColor: "black",
		columns: [
			{
				width: "100%",
				sections:[
					{
						title: "Live Statistics",
						dataElements: [
							{
								type:"fact-box-list",
								format:"horizontal",
								factBoxVars: [
									{ label: "Strikes in last 6 mos.", type: "count", query: {varName:"date", operation:">", compareValue:strikeCompareDate} },
									{ label: "Total strikes (Overall)",type: "count" },
									{ label: "Civilian casualties (Overall)",type: "sum-range", variableMin: variables.civilians_low, variableMax:variables.civilians_high},
									{ label: "Total casualties (Overall)",type: "sum-range", variableMin: variables.total_low, variableMax:variables.total_high}
								]
							},
						]
					},
					{
						title: "Most Recent Strike",
						dataElements: [
							{
								type:"simple-map",
								country: "niger",
								latVar: { type: "value", variable: variables.geo_lat, query: {varName:"date", operation:"max"} },
								lngVar: { type: "value", variable: variables.geo_lon, query: {varName:"date", operation:"max"} }
							},
							{
								type:"fact-box-list",
								format:"vertical",
								factBoxVars: [
									{ label: "Date", type: "value", variable: variables.date, format: "date", query: {varName:"date", operation:"max"} },
									{ label: "Total Casualties", type: "value", variable: variables.total_lowhigh, query: {varName:"date", operation:"max"}, subVars: [
										{ label: "Militants", type: "value", variable: variables.militants_lowhigh, query: {varName:"date", operation:"max"} },
										{ label: "Civilians", type: "value", variable: variables.civilians_lowhigh, query: {varName:"date", operation:"max"} },
										{ label: "Unknown", type: "value", variable: variables.unknown_lowhigh, query: {varName:"date", operation:"max"} }
									]},
									{ label: "Target organization", type: "value", variable: variables.target_organization_name, query: {varName:"date", operation:"max"} }
								],
							},
							{
								type:"paragraph",
								paragraphVar: { label: "Details", type: "value", variable: variables.target_description, query: {varName:"date", operation:"max"} },

							}
						]
					}
				]
			}
		]
	},
	"drone-strikes__libya__call-out-data": {
		isReact: true,
		vizType: "callout_box",
		primaryDataSheet: "libya_strikes",
		backgroundColor: "black",
		columns: [
			{
				width: "100%",
				sections:[
					{
						title: "Live Statistics",
						dataElements: [
							{
								type:"fact-box-list",
								format:"horizontal",
								factBoxVars: [
									{ label: "Strikes in last 6 mos.", type: "sum", variable: variables.individual_munitions, query: {varName:"date", operation:">", compareValue:strikeCompareDate} },
									{ label: "Total strikes (Overall)",type: "sum", variable: variables.individual_munitions },
									{ label: "Civilian casualties (Overall)",type: "sum-range", variableMin: variables.civilians_low, variableMax:variables.civilians_high},
									{ label: "Total casualties (Overall)",type: "sum-range", variableMin: variables.total_low, variableMax:variables.total_high}
								]
							},
						]
					},
					{
						title: "Most Recent Strike",
						dataElements: [
							{
								type:"simple-map",
								country: "libya",
								latVar: { type: "value", variable: variables.geo_lat, query: {varName:"date", operation:"max"} },
								lngVar: { type: "value", variable: variables.geo_lon, query: {varName:"date", operation:"max"} }
							},
							{
								type:"fact-box-list",
								format:"vertical",
								factBoxVars: [
									{ label: "Date", type: "value", variable: variables.date, format: "date", query: {varName:"date", operation:"max"} },
									{ label: "Total Casualties", type: "value", variable: variables.total_lowhigh, query: {varName:"date", operation:"max"}, subVars: [
										{ label: "Militants", type: "value", variable: variables.militants_lowhigh, query: {varName:"date", operation:"max"} },
										{ label: "Civilians", type: "value", variable: variables.civilians_lowhigh, query: {varName:"date", operation:"max"} },
									]},
									{ label: "Belligerent", type: "value", variable: variables.belligerent_combined, format: "string", query: {varName:"date", operation:"max"} },
								],
							},
							// {
							// 	type:"paragraph",
							// 	paragraphVar: { label: "Details", type: "value", variable: variables.target_description, query: {varName:"date", operation:"max"} },
							//
							// }
						]
					}
				]
			}
		]
	},
	"drone-strikes__all__call-out-data": {
		isReact: true,
		vizType: "callout_box",
		primaryDataSheet: "pakistan_strikes",
		secondaryDataSheets: ["yemen_strikes", "somalia_strikes", "niger_strikes", "libya_strikes"],
		backgroundColor: "black",
		columns: [
			{
				width: "100%",
				sections:[
					{
						title: "Live Statistics",
						dataElements: [
							{
								type:"fact-box-list",
								format:"horizontal",
								factBoxVars: [
									{ label: "Strikes in last 6 mos.", type: "count", query: {varName:"date", operation:">", compareValue:strikeCompareDate} },
									{ label: "Total strikes (Overall)", type: "count" },
									{ label: "Civilian casualties (Overall)", type: "sum-range", variableMin: variables.civilians_low, variableMax:variables.civilians_high},
									{ label: "Total casualties (Overall)", type: "sum-range", variableMin: variables.total_low, variableMax:variables.total_high}
								]
							},
						]
					}
				]
			}
		]
	},
}

const getLowHigh = (low, high) => {
	let lowVal = +low,
		highVal = +high;

	if (lowVal === highVal) {
		return low
	} else {
		return "Between " + low + " and " + high
	}
}

const preProcessData = (data) => {
	const sheets = ["pakistan_strikes", "yemen_strikes", "somalia_strikes", "niger_strikes", "libya_strikes"]

	sheets.forEach(sheet => {
		data[sheet].map(d => {
			d.sources_combined = combineSources([d.source1_url, d.source1_name, d.source2_url, d.source2_name, d.source3_url, d.source3_name, d.source4_url, d.source4_name, d.source5_url, d.source5_name, d.source6_url, d.source6_name, d.source7_url, d.source7_name])
			d.militants_lowhigh = getLowHigh(d.militants_low, d.militants_high)
			d.civilians_lowhigh = getLowHigh(d.civilians_low, d.civilians_high)
			d.unknown_lowhigh = getLowHigh(d.unknown_low, d.unknown_high)
			d.total_lowhigh = getLowHigh(d.total_low, d.total_high)

			return d;
		})
	})

	console.log(data)

	return data;
}

module.exports = {
	vizSettings: vizSettings,
	dataUrl: "https://na-data-projects.s3.amazonaws.com/data/isp/drone-strikes-all.json",
	preProcessData: preProcessData,
	downloadableSheets: ["pakistan_strikes", "yemen_strikes", "somalia_strikes"]
}
