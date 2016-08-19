import $ from 'jquery';

let d3 = require("d3");

let dt = require('datatables.net');
// let zf = require('datatables.net-responsive');


import { getColorScale } from "./get_color_scale.js";

let table, id, tableVars;

export class Table {
	constructor(projectVars) {
		({id, tableVars} = projectVars);


		d3.select(id).append("table")
			.attr("id", "dataTable")
			.attr("class", "hover order-column cell-border");
	}

	render(data) {
		this.data = data;
		table = $("#dataTable").DataTable({
			data: data,
			columns: this.getColumnNames(),
		    lengthChange: false,
		    paging: false,
		}).on('order.dt', this.orderChanged.bind(this));

	}

	getColumnNames() {

		console.log(tableVars);
		let columnNames = [];
		for (let tableVar of tableVars) {
			columnNames.push({"data": tableVar.variable});
		}

		return columnNames;
	}

	orderChanged() {
		let orderingIndex = table.order()[0][0];
		let orderingColumn = tableVars[orderingIndex];

		console.log("here!");

		let dataMin = Number(d3.min(this.data, function(d) { return d[orderingColumn.variable]; })); 
		let dataMax = Number(d3.max(this.data, function(d) { return d[orderingColumn.variable]; }));

		console.log(dataMin);

		let colorScale = getColorScale(orderingColumn, dataMin, dataMax);

		console.log(colorScale);

		let sorted = d3.selectAll(".sorting_1")
			.style("background-color", function() { return colorScale($(this).text());});


		console.log(sorted);

	}

	applyColorScale() {
		console.log($(".sorting_1"));
	}
}


