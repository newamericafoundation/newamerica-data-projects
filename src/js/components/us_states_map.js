import $ from 'jquery';
import Tabletop from 'tabletop';

import {usStates} from '../../geography/us-states.js';
console.log(usStates);

let d3 = require("d3");

export class usStatesMap {
	constructor(id) {
		console.log(id);
		this.id = id;
	}

	initialRender() {
		let self = this;
		Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1dGMIGe-14nOiMBf_BLtTTnzqTKelNl96fObhiqqb_HU/pubhtml',
                    callback: function(d) {
                   		self.buildGraph(d);
                   	},
                    simpleSheet: true } );
	}

	buildGraph(data) {
		console.log(usStates);
		//Width and height
		var w = 500;
		var h = 300;
		//Define map projection
		var projection = d3.geoAlbersUsa()
							   .translate([w/2, h/2])
							   .scale([500]);
		//Define path generator
		var path = d3.geoPath()
						 .projection(projection);
						 
		//Define quantize scale to sort data values into buckets of color
		var color = d3.scaleQuantize()
							.range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);
							//Colors taken from colorbrewer.js, included in the D3 download
		
		console.log(this.id);
		//Create SVG element
		var svg = d3.select(this.id)
					.append("svg")
					.attr("width", w)
					.attr("height", h);

		//Set input domain for color scale
		color.domain([
			d3.min(data, function(d) { return d.value; }), 
			d3.max(data, function(d) { return d.value; })
		]);

		// Merge the ag. data and GeoJSON
		// Loop through once for each ag. data value
		for (var i = 0; i < data.length; i++) {
	
			//Grab state name
			var dataState = data[i].state;
			
			//Grab data value, and convert from string to float
			var dataValue = parseFloat(data[i].value);
	
			//Find the corresponding state inside the GeoJSON
			for (var j = 0; j < usStates.features.length; j++) {

				var jsonState = usStates.features[j].properties.name;

				if (dataState == jsonState) {
					//Copy the data value into the JSON
					usStates.features[j].properties.value = dataValue;
					
					//Stop looking through the JSON
					break;
					
				}
			}		
		}
		// Bind data and create one path per GeoJSON feature
		svg.selectAll("path")
		   .data(usStates.features)
		   .enter()
		   .append("path")
		   .attr("d", path)
		   .style("fill", function(d) {
		   		//Get data value
		   		var value = d.properties.value;
		   		
		   		if (value) {
		   			//If value exists…
			   		return color(value);
		   		} else {
		   			//If value is undefined…
			   		return "#ccc";
		   		}
		   });
	}
			
}