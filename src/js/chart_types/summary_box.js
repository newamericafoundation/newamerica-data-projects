import $ from 'jquery';

let d3 = require("d3");

import { colors } from "../helper_functions/colors.js";

import { getColorScale } from "../helper_functions/get_color_scale.js";
import { formatValue } from "../helper_functions/format_value.js";

let colorScaleContainerWidth = 450;
let colorScaleWidth = 200;
let colorScaleMarkerSize = 8;

export class SummaryBox {
	constructor(vizSettings) {
		let {id, vizVars, titleLabel, titleVar, titleVarValue, columns, primaryDataSheet} = vizSettings;

		this.titleVar = titleVar;
		this.titleVarValue = titleVarValue;
		this.vizVars = vizVars;
		this.primaryDataSheet = primaryDataSheet;

		let chartWrapper = d3.select(id)
			.append("div")
			.attr("class", "chart-wrapper");

		let summaryBoxOuterWrapper = chartWrapper
			.append("div")
			.attr("class", "summary-box");

		this.summaryBox = summaryBoxOuterWrapper
			.append("div")
			.attr("class", "summary-box__content-container");

		let titleContainer = this.summaryBox
			.append("div")
			.attr("class", "summary-box__title-container");

		titleContainer
			.append("h3")
			.text(titleLabel)
			.classed("summary-box__title-label", true);

		titleContainer
			.append("h1")
			.text(titleVarValue)
			.classed("summary-box__title", true);

		this.valueFields = {};

		let categoryNest = d3.nest()
				.key((d) => { return d.category; })
				.entries(vizVars);
		let showCategories = categoryNest.length > 1;
		let whichContainer;

		for (let category of categoryNest) {
			whichContainer = this.summaryBox;
			if (category.key != "undefined" && showCategories) {
				this.summaryBox.append("h5")
					.classed("summary-box__category-name", true)
					.text(category.key);

				whichContainer = this.summaryBox.append("ul")
					.classed("summary-box__category-list", true);
			}

			for (let variable of category.values) {
				let listElem = whichContainer.append("li")
					.classed("summary-box__list-item", true);

				let valContainer = listElem.append("div")
					.classed("summary-box__list-item__val-container", true);

				let valueField = {};
				valueField.label = valContainer.append("h3")
					.classed("summary-box__list-item__label", true)
					.text(variable.displayName + ":");

				valueField.value = valContainer.append("h3")
					.classed("summary-box__list-item__value", true);

				valueField.colorScaleBox = listElem.append("div")
					.classed("summary-box__list-item__color-scale", true)
					.style("width", colorScaleContainerWidth + "px");

				valueField.rank = listElem.append("h3")
					.classed("summary-box__list-item__rank", true);
					
				this.valueFields[variable.variable] = valueField;
			}
		}
	}

	render(data) {
		this.data = data;
		console.log("rendering");
		let datapoint = data.filter( (d) => { return d[this.titleVar.variable] == this.titleVarValue })[0];
		let natl_average = data.filter( (d) => { return d[this.titleVar.variable] == "United States" })[0];

		let i = 0;
		for (let variable of this.vizVars) {
			let varName = variable.variable;
			let varFormat = variable.format;
			console.log(datapoint[varName]);
			let value = datapoint[varName] ? datapoint[varName] : null;
			let natl_average_value = natl_average[varName] ? natl_average[varName] : null;

			if (value) {
				this.appendValue(variable, value);
				this.appendColorScale(variable, value, natl_average_value, i);
				// this.appendRank(variable, datapoint);
			} else  {
				this.valueFields[varName].label
					.style("display", "none");

				this.valueFields[varName].value
					.style("display", "none");

			}
			i++;
		}
		
	}

	appendValue(variable, value) {
		this.valueFields[variable.variable].label
			.style("display", "inline-block");

		this.valueFields[variable.variable].value
			.style("display", "inline-block")
			.text(formatValue(value, variable.format));
	}

	appendColorScale(variable, value, natl_average_value, i) {
		console.log(variable);
		let colorScaleOuterWrapper = this.valueFields[variable.variable].colorScaleBox;
		let colorScale = getColorScale(this.data, variable);
		let numBins = variable.numBins;
		console.log(colorScale.domain());

		colorScaleOuterWrapper.append("h3")
			.attr("class", "summary-box__list-item__color-scale__label-left")
			.text(formatValue(colorScale.domain()[0], variable.format));

		let colorScaleContainer = colorScaleOuterWrapper.append("div")
			.attr("class", "summary-box__list-item__color-scale__container")

		for (let i = 0; i < numBins; i++) {
			colorScaleContainer.append("div")
				.attr("class", "summary-box__list-item__color-scale__bin")
				.style("width", colorScaleWidth/numBins + "px")
				.style("background-color", colorScale.range()[i]);
		}

		colorScaleContainer.append("div")
			.style("left", this.calcMarkerPosition(colorScale, natl_average_value) + "px")
			.attr("class", "summary-box__list-item__color-scale__average-line");

		if (i == 0) {
			colorScaleContainer.append("h3")
				.style("left", (this.calcMarkerPosition(colorScale, natl_average_value) - 45) + "px")
				.attr("class", "summary-box__list-item__color-scale__average-line-label")
				.text("U.S. Average");
		}
		
		colorScaleContainer.append("svg")
			.attr("class", "summary-box__list-item__color-scale__marker-container")
			.style("left", this.calcMarkerPosition(colorScale, value) + "px")
		   .append("svg:circle")
			.attr("r", colorScaleMarkerSize)
			.attr("cx", 10)
			.attr("cy", 10)
			.style("stroke", colorScale(value))
			.attr("class", "summary-box__list-item__color-scale__marker");

		colorScaleOuterWrapper.append("h3")
			.attr("class", "summary-box__list-item__color-scale__label-right")
			.text(formatValue(colorScale.domain()[1], variable.format));
	}

	appendRank(variable, datapoint) {
		let sortedData = this.data.sort((a, b) => { return a[variable.variable] - b[variable.variable];})
		let rank = sortedData.indexOf(datapoint) + 1;

		sortedData.forEach(function(d) { console.log(d[variable.variable]);});
		this.valueFields[variable.variable].rank
			.text(formatValue(rank, "rank"));
	}

	calcMarkerPosition(colorScale, value) {
		let valueScale = d3.scaleLinear();
		valueScale.domain(colorScale.domain());
		valueScale.range([0, colorScaleWidth - colorScaleMarkerSize]);

		console.log(colorScale.domain());
		return valueScale(value);

	}

	resize() {

	}

}