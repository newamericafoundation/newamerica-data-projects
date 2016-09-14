import $ from 'jquery';

import { Tooltip } from "../components/tooltip.js";
import { Legend } from "../components/legend.js";
import { FilterGroup } from "../components/filter_group.js";
import { Chart } from "../layouts/chart.js"

import { getColorScale } from "../helper_functions/get_color_scale.js";

import { usStates } from '../../geography/us-states.js';

import { formatValue, deformatValue } from "../helper_functions/format_value.js";

import * as global from "./../utilities.js";

let d3 = require("d3");

export class UsStatesMap extends Chart {
	
	constructor(vizSettings) {
		let {id, tooltipVars, filterVars, primaryDataSheet } = vizSettings;
		super(id);

		this.id = id;
		this.filterVars = filterVars;
		this.primaryDataSheet = primaryDataSheet;

		this.currFilterIndex = 0;
		this.currFilterVar = this.filterVars[this.currFilterIndex].variable;

		this.filterGroup = new FilterGroup(vizSettings);

		let mapContainer = d3.select(id)
			.append("div");

		this.svg = mapContainer
			.append("svg");

		this.tooltip = new Tooltip(id, tooltipVars)
		let legendSettings = {};
		legendSettings.id = id;
		legendSettings.showTitle = true;
		legendSettings.markerSettings = { shape:"circle", size:10 };
		legendSettings.orientation = "vertical-right";

		this.legend = new Legend(legendSettings);

		this.setDimensions();
	}

	setDimensions() {
		this.w = $(this.id).width();
		this.h = 3*this.w/5;

		let translateX = this.w/2;
		let scalingFactor = 5*this.w/4;

		if (this.w > global.showLegendBreakpoint) {
			translateX -= global.legendWidth/2;
			this.h = this.w/2;
			scalingFactor = this.w;
		}

		this.svg
			.attr("width", this.w)
			.attr("height", this.h);

		//Define map projection
		let projection = d3.geoAlbersUsa()
				.scale(scalingFactor)
				.translate([translateX, this.h/2]);

		//Define path generator
		this.pathGenerator = d3.geoPath()
						 .projection(projection);
	}

	render(data) {	
		this.data = data;
		this.processData();
		this.setScale();
		this.bindDataToGeom();
		this.buildGraph();
		this.setLegend();
		this.setFilterGroup();

		super.render();

		// console.log(this.paths);
	}

	processData() {
		for (let variable of this.filterVars) {
			for (let d of this.data) {
				if (d[variable.variable] && !$.isNumeric(d[variable.variable])) {
					d[variable.variable] = deformatValue(d[variable.variable]);
				}
			}
		}
	}

	setScale() {
		this.colorScale = getColorScale(this.data, this.filterVars[this.currFilterIndex]);
	}


	bindDataToGeom() {
		let data = this.data;

		for (let elem of data) {
			let dataState = elem.state;

			for (let state of usStates.features) {
				if (dataState == state.properties.name) {
					state.properties = elem;
					break;
				}
			}
		}
	}

	buildGraph() {
		this.paths = this.svg.selectAll("path")
		   .data(usStates.features)
		   .enter()
		   .append("path");

		this.paths.attr("d", this.pathGenerator)
			.classed("map-feature", true)
		    .style("fill", (d) => {
		   		var value = d.properties[this.currFilterVar];
		   		return value ? this.colorScale(value) : "#ccc";
		    })
		    .attr("value", function(d,i) { return i; })
		    .style("stroke", "white")
		    .on("mouseover", (d, index, paths) => { return this.mouseover(d, paths[index]); })
		    .on("mouseout", (d, index, paths) => { return this.mouseout(paths[index]); });
	}

	setLegend() {
		let legendSettings = {};

		legendSettings.title = this.filterVars[this.currFilterIndex].displayName;
		legendSettings.format = this.filterVars[this.currFilterIndex].format;
		legendSettings.scaleType = this.filterVars[this.currFilterIndex].scaleType;
		legendSettings.colorScale = this.colorScale;
		legendSettings.valChangedFunction = this.changeVariableValsShown.bind(this);

		this.legend.render(legendSettings);

		
	}

	setFilterGroup() {
		this.filterGroup.render(this.changeFilter.bind(this));
	}

	
	resize() {
		this.setDimensions();
		this.paths.attr("d", this.pathGenerator);
	}

	changeFilter(variableIndex) {
		this.currFilterIndex = variableIndex;
		this.currFilterVar = this.filterVars[this.currFilterIndex].variable;

		this.setScale();
		this.setLegend();
		this.paths
			.style("fill", (d) => {
		   		var value = d.properties[this.currFilterVar];
		   		return value ? this.colorScale(value) : "#ccc";
		    })
	}

	changeVariableValsShown(valsShown) {
		console.log(valsShown);
		this.paths
			.style("fill", (d) => {
		   		var value = d.properties[this.currFilterVar];
		   		if (value) {
		   			let binIndex = this.colorScale.range().indexOf(this.colorScale(value));
		   			if (valsShown.indexOf(binIndex) > -1) {
		   				return this.colorScale(value);
		   			}
		   		}
		   		return "#ccc";
		    });
	}

	mouseover(datum, path) {
		d3.select(path).style("stroke-width", "3");
		console.log(path);
		let mousePos = d3.mouse(path);
		console.log(mousePos);
		this.tooltip.show(datum.properties, mousePos);
	}

	mouseout(path) {
		d3.select(path).style("stroke-width", "1");
	    this.tooltip.hide();
	}
			
}