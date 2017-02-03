import { setupProject } from "../../viz_controller.js";

import { colors } from "../../helper_functions/colors.js";


let variables = {
	title: {"variable":"title", "displayName":"Title", "format": "string"},
	url: {"variable":"url", "displayName":"Url", "format": "string"},
	description: {"variable":"description", "displayName":"Description", "format": "string"},
	image_url: {"variable":"image_url", "displayName":"Image Url", "format": "string"},
	state_id: {"variable":"state_id", "displayName":"State ID", "format": "string"},
	show_on_map: {"variable":"show_on_map", "displayName":"Show On Map", "format": "string", "scaleType":"categorical", "customDomain":["0", "1"], "customRange":[colors.grey.light, colors.turquoise.light]},
	city: {"variable":"city", "displayName":"city", "format": "string"},
}

let vizSettingsList = [
	// {
	// 	id: "#dll-work-group__map", 
	// 	vizType: "topo_json_map",
	// 	primaryDataSheet: "states",
	// 	filterVars: [ variables.show_on_map ],
	// 	geometryType: "states",
	// 	geometryVar: variables.state_id,
	// 	stroke: {"color": colors.white, "width":"1", "opacity": "1", "hoverColor": colors.white, "hoverWidth": "3"},
	// 	filterGroupSettings: {"hidden": false},
	// },
	{
		id: "#dll-work-group__map", 
		vizType: "dashboard",
		layoutRows: [
			[
				{
					vizType: "topo_json_map",
					primaryDataSheet: "states",
					width: "50%",
					filterVars: [ variables.show_on_map ],
					geometryType: "states",
					geometryVar: variables.state_id,
					stroke: {"color": colors.white, "width":"1", "opacity": "1", "hoverColor": colors.white, "hoverWidth": "3"},
					filterGroupSettings: {"hidden": false},
					isMessagePasser: true,
					interaction: "click",
				},
				{
					vizType: "content_stream",
					primaryDataSheet: "dll_work",
					defaultText: "The Dual Language Learner Working Group has been engaging in projects and with communities across the country for the past two years.  Click on a state to explore the work we have undertaken there.",
					width: "50%",
					isMessagePasser: false,
					messageHandlerType: "change_value",
				}
			],
		]
	}
	
]

let projectSettings = {
	dataUrl: "https://na-data-projects.s3.amazonaws.com/data/edpolicy/dll_work_group.json",
	downloadDataLink: "https://docs.google.com/spreadsheets/d/1kJyTZR372JIXYCWnHEOQPv3r56dlLZqjuZUwr56FUGc/",
	dataSheetNames:["states", "dll_work"],
	vizSettingsList: vizSettingsList
}

setupProject(projectSettings);
