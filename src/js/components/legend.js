import $ from 'jquery';

import * as global from "./../utilities.js";

import { formatValue } from "../helper_functions/format_value.js";

import { colors } from "../helper_functions/colors.js";

import { questionSVGPath } from "../utilities/icons.js";

let d3 = require("d3");

let continuousLegendHeight = 20,
	continuousLegendOffset = 40;

export class Legend {
	constructor(legendSettings) {
		Object.assign(this, legendSettings);
	}

	render(legendSettings) {
		Object.assign(this, legendSettings);
		console.log(this);
		if (this.legend) {
			this.legend.remove();
		}
		this.legend = d3.select(this.id)
			.append("div")
			.attr("class", "legend " + this.orientation);

		if (this.showTitle) {
			let titleContainer = this.legend.append("div")
				.attr("class", "legend__title-container");

			let title;
			if (this.customTitleExpression) {
				title = this.customTitleExpression.replace("<<>>",this.title);
			} else {
				title = this.title;
			}

			this.titleDiv = titleContainer.append("h3")
				.attr("class", "legend__title")
				.text(title);

			if (this.annotation) {
				titleContainer.append("span")
					.attr("class", "legend__annotation")
					.text(this.annotation);
			}
			
			if (this.varDescriptionData) {
				let varDescriptionText = this.getVarDescriptionText();
				console.log(varDescriptionText)
				if (varDescriptionText) {
					console.log("showing description!");
					this.appendVarDescription(varDescriptionText);
				}
			}

		}

		this.cellContainer = this.legend.append("div")
			.attr("class", "legend__cell-container");

		if (this.scaleType == "linear" || this.scaleType == "logarithmic") {
			this.renderContinuous();
		} else {
			this.renderDiscrete();
		}
	}

	renderContinuous() {
		this.legendWidth = $(this.id).width();
		if (this.legendWidth > 500) {
			this.legendWidth = 500;
		}
		this.legendSvg = this.cellContainer.append("svg")
			.attr("width", this.legendWidth)
			.attr("height", continuousLegendHeight*2);

		this.defineGradient();
		this.legendSvg.append("rect")
			.attr("width", this.legendWidth - 2*continuousLegendOffset)
			.attr("height", continuousLegendHeight)
			.attr("x", continuousLegendOffset)
			.attr("y", 0)
			.style("fill", "url(#linear-gradient)");

		this.addLabels();
	}

	defineGradient() {
		//Append a defs (for definition) element to your SVG
		let defs = this.legendSvg.append("defs");

		//Append a linearGradient element to the defs and give it a unique id
		let linearGradient = defs.append("linearGradient")
		    .attr("id", "linear-gradient")
		    .attr("x1", "0%")
		    .attr("y1", "0%")
		    .attr("x2", "100%")
		    .attr("y2", "0%");

		linearGradient.append("stop") 
		    .attr("offset", "0%")   
		    .attr("stop-color", this.colorScale.range()[0]);

		//Set the color for the end (100%)
		linearGradient.append("stop") 
		    .attr("offset", "100%")   
		    .attr("stop-color", this.colorScale.range()[1]);
	}

	addLabels() {
		let legendXScale;
		//Set scale for x-axis
		if (this.scaleType == "logarithmic") {
			legendXScale = d3.scaleLog();
		} else {
			legendXScale = d3.scaleLinear();
		}
		legendXScale
			.domain(this.colorScale.domain())
			.range([continuousLegendOffset, this.legendWidth - continuousLegendOffset]);

		//Define x-axis
		let legendXAxis = d3.axisBottom()
			  .tickValues([legendXScale.domain()[0], legendXScale.domain()[1]])
			  .tickFormat((d) => { return legendXScale.tickFormat(4,d3.format(",d"))(d) })
			  .scale(legendXScale);

		//Set up X axis
		this.legendSvg.append("g")
			.attr("class", "axis legend__axis")
			.attr("transform", "translate(0," + continuousLegendHeight + ")")
			.call(legendXAxis);
	}

	renderDiscrete() {
		let {scaleType, format, colorScale, valChangedFunction, valCounts} = this;

		this.cellList ? this.cellList.remove() : null;
		this.cellList = this.cellContainer.append("ul")
			.attr("class", "legend__cell-list");
		this.valsShown = [];

		this.numBins = this.colorScale.range().length;

		if (scaleType == "quantize") {
			[this.dataMin, this.dataMax] = this.colorScale.domain();
			let dataSpread = this.dataMax - this.dataMin;
			this.binInterval = dataSpread/this.numBins;
		}
		this.legendCellDivs = [];

		for (let i = 0; i < this.numBins; i++) {
			this.valsShown.push(i);
			let cell = this.cellList.append("li")
				.classed("legend__cell", true);

			if (this.disableValueToggling) {
				cell.style("cursor", "initial");
			} else {
				cell.on("click", () => { this.toggleValsShown(i); valChangedFunction(this.valsShown); });
			}
			this.appendCellMarker(cell, i);
			valCounts ? this.appendValCount(cell, i, valCounts) : null;
			this.appendCellText(cell, i);
			
			this.legendCellDivs[i] = cell;
		}
	}

	calcBinVal(i, dataMin, binInterval) {
		let binVal = dataMin + (binInterval * i);
		return Math.round(binVal * 100)/100;
	}

	appendCellMarker(cell, i) {
		let size = this.markerSettings.size;
		let shape = this.markerSettings.shape;

		let svg = cell.append("svg")
			.attr("height", size)
			.attr("width", size)
			.style("margin-top", 10 - size/2)
			.attr("class", "legend__cell__color-swatch-container");

		let marker = svg.append(shape)
			.attr("class", "legend__cell__color-swatch")
			.attr("fill", this.colorScale.range()[i]);

		if (shape == "circle") {
			marker.attr("r", size/2)
				.attr("cx", size/2)
				.attr("cy", size/2);
		} else {
			marker.attr("width", size)
				.attr("height", size)
				.attr("x", 0)
				.attr("y", 0);
		}
	}

	appendValCount(cell, i, valCounts) {
		let valKey = this.colorScale.domain()[i];

		cell.append("h5")
			.attr("class", "legend__cell__val-count")
			.style("color", this.colorScale.range()[i])
			.text(valCounts.get(valKey));
	}

	appendCellText(cell, i) {
		let cellText = cell.append("h5")
			.classed("legend__cell__label", true);

		if (this.scaleType == "quantize") {
			if (this.openEnded && i == this.colorScale.range().length - 1) {
				cellText.text(formatValue(Math.ceil(this.calcBinVal(i, this.dataMin, this.binInterval)), this.format) + "+");
				return;
			}
			if (this.format == "percent") {
				cellText.text(formatValue(Math.ceil(100*this.calcBinVal(i, this.dataMin, this.binInterval))/100, this.format) + " to " + formatValue(Math.floor(100*this.calcBinVal(i+1, this.dataMin, this.binInterval))/100, this.format));
			} else {
				cellText.text(formatValue(Math.ceil(this.calcBinVal(i, this.dataMin, this.binInterval)), this.format) + " to " + formatValue(Math.floor(this.calcBinVal(i+1, this.dataMin, this.binInterval)), this.format));
			}
		} else if (this.scaleType == "categorical") {
			if (this.customLabels) {
				cellText.text(this.customLabels[i]);
			} else {
				cellText.text(this.colorScale.domain()[i] ? this.colorScale.domain()[i] : "null" );
			}
		}
	}

	appendVarDescription(varDescriptionText) {
		console.log("appending again!");
		this.titleDiv.append("div")
			.classed("legend__description-icon", true)
			.append("svg")
			.attr("viewBox", "0 0 16 16")
			.attr("width", "16px")
			.attr("height", "16px")
			.on("mouseover", () => { this.showVarDescription(d3.event); })
			.on("mouseout", () => { this.varDescriptionPopup.classed("hidden", true); })
			.append("g")
			.attr("fill", colors.grey.medium)
			.attr("transform", "translate(-48, -432)")
			.append("path")
			.attr("d", questionSVGPath);

		this.varDescriptionPopup = d3.select("body").append("div")
			.attr("class", "legend__description-popup")
			.classed("hidden", true)
			.text(varDescriptionText)
	}

	showVarDescription(eventObject) {
		this.varDescriptionPopup
			.classed("hidden", false)
			.attr('style', 'left:' + (eventObject.pageX - 70) + 'px; top:' + (eventObject.pageY + 10) + 'px');
	}

	getVarDescriptionText() {
		let retVal;

		this.varDescriptionData.forEach((d) => {
			if (d.variable === this.varDescriptionVariable) {
				retVal = d.description;
			}
		})

		return retVal;
	}

	toggleValsShown(valToggled) {
		// if all toggled, just show clicked value
		if (this.valsShown.length == this.numBins) {
			this.valsShown = [valToggled];
			this.legendCellDivs.map( function(item) { item.classed("disabled", true)});
			this.legendCellDivs[valToggled].classed("disabled", false);

		} else {
			let index = this.valsShown.indexOf(valToggled);
			// value is currently shown
			if (index > -1) {
				this.valsShown.splice(index, 1);
				this.legendCellDivs[valToggled].classed("disabled", true);
			} else {
				this.valsShown.push(valToggled);
				this.legendCellDivs[valToggled].classed("disabled", false);
			}
		}

		// if none toggled, show all values
		if (this.valsShown.length == 0) {
			for (let i = 0; i < this.numBins; i++) {
				this.valsShown.push(i);
			}
			this.legendCellDivs.map( function(item) { item.classed("disabled", false)});
		}
	}

	setOrientation(orientation) {
		this.orientation = orientation;
	}

	resize() {
		this.render();
	}

}