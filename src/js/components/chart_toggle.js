import $ from 'jquery';

import { globeSVGPath, tableSVGPath } from "./../utilities/icons.js";

let d3 = require("d3");

let chartToggle; 
export class ChartToggle {
	constructor(id) {
		console.log("in chart toggle constructor");
		chartToggle = d3.select(id).append("div")
			.classed("chart-toggle", true);
	}

	render(visibilityToggles) {
		function toggleAll() {
			if ($(this).hasClass("active")) { return; };
			
			$(".chart-toggle__icon").removeClass("active");
			$(this).addClass("active");
			
			for (let toggleFunc of visibilityToggles) {
				toggleFunc();
			}
		}


		let icon1 = chartToggle.append("svg")
			.classed("chart-toggle__icon active", true)
			.attr("viewBox", "0 0 100 100")
			.on("click", toggleAll);
			
		icon1.append("g").append("path")
			.attr("d", globeSVGPath);
			
		let icon2 = chartToggle.append("svg")
			.classed("chart-toggle__icon", true)
			.attr("viewBox", "0 0 100 100")
			.on("click", toggleAll);
			
		icon2.append("g").append("path")
			.attr("d", tableSVGPath);
	}

}