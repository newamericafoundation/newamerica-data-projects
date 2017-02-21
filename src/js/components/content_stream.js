import $ from 'jquery';

let d3 = require("d3");

export class ContentStream {
	constructor(vizSettings) {
		Object.assign(this, vizSettings);

		let contentStreamContainer = d3.select(this.id)
			.append("div")
			.attr("class", "content-stream__container");

		console.log(vizSettings);
		this.defaultText = contentStreamContainer
			.append("div")
			.append("h5")
			.attr("class", "content-stream__default-text")
			.text(this.defaultText);

		let contentStreamTitleContainer = contentStreamContainer
			.append("div")
			.attr("class", "content-stream__title-container");

		this.contentStreamTitle = contentStreamTitleContainer
			.append("div")
			.attr("class", "content-stream__title");

		this.contentStream = contentStreamContainer
			.append("ul")
			.attr("class", "content-stream");
	}

	render(data) {
		console.log(data);
		console.log(data[this.primaryDataSheet]);
		this.dataNest = d3.nest()
			.key((d) => { return d.state_id; })
			.map(data[this.primaryDataSheet]);

		console.log(this.dataNest);
	}

	hide() {
		if (this.entries) { this.entries.remove(); }

		this.contentStreamTitle
			.text("");

		this.defaultText.classed("hidden", false);
	}

	changeValue(value) {
		if (!value) { return; }
		let valueList = this.dataNest.get(String(value));
		if (!valueList) { this.hide(); return; }
		this.defaultText.classed("hidden", true);
		let sortedList = valueList.sort((a, b) => { return new Date(b.date) - new Date(a.date); });

		if (this.entries) { this.entries.remove(); }
		if (this.fadeout) { this.fadeout.remove(); }

		this.contentStreamTitle
			.text(sortedList[0].state);

		this.entries = this.contentStream.selectAll("li")
			.data(sortedList)
		   .enter().append("li")
		   	.attr("class", "content-stream__entry");

		let entriesLinks = this.entries.append("a")
		   	.attr("href", (d) => { return d.url; });

		entriesLinks.selectAll("div.content-stream__entry__image-container")
			.data((d) => { console.log(d); return d.image_url ? [d] : []})
		  .enter().append("div")
			.attr("class", "content-stream__entry__image-container")
		  .append("img")
			.attr("class", "content-stream__entry__image")
			.attr("src", (d) => { return d.image_url });

		let entryTextContainers = entriesLinks.append("div")
			.attr("class", "content-stream__entry__text-container");

		entryTextContainers.append("h5")
			.attr("class", "content-stream__entry__date")
			.text((d) => { return d.date; });

		entryTextContainers.append("h5")
			.attr("class", "content-stream__entry__title")
			.text((d) => { return d.title; });

		entryTextContainers.append("h5")
			.attr("class", "content-stream__entry__description")
			.text((d) => { return d.description; });


		this.fadeout = this.contentStream
			.append("div")
			.attr("class", "content-stream__fadeout");
		   	
	}


}