require('../../../scss/index.scss');

import $ from 'jquery';
import { UsStatesMap } from "../../components/us_states_map.js";
import { FilterGroup } from "../../components/filter_group.js";

let projectVars = {
	id: "#test1",
	dataUrl: "https://na-data-projects.s3.amazonaws.com/data/test/ag.json",
	colorVar: "value",
	filterVars: {
		"cost": ["value", "value1"], 
		"quality": ["value1", "value"]
	},
	tooltipVariables: {
		"cost": ["value", "value1"]
	},
	legendBins:5
}

let usMap, filterGroup;

function initialize() {
	window.addEventListener('resize', resize);

	filterGroup = new FilterGroup(projectVars.id, projectVars.filterVars, changeFilter);
	usMap = new UsStatesMap(projectVars.id, projectVars.dataUrl, projectVars.colorVar, projectVars.tooltipVariables, projectVars.legendBins);
	usMap.initialRender();
}

function resize() {
	let w = $(projectVars.id).width();
	usMap.resize(w);
}

function changeFilter() {
	let newFilterVar = $(this).attr("value");
	usMap.changeFilter(newFilterVar);
}

initialize();