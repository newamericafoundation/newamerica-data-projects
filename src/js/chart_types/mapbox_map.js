let mapboxgl = require('mapbox-gl');

window.mapboxgl = mapboxgl;
// require('mapbox-gl-geocoder');
let GeoJSON = require('geojson');

import { colors } from "../helper_functions/colors.js";
import { getColorScale } from "../helper_functions/get_color_scale.js";
import { formatValue } from "../helper_functions/format_value.js";
import { PopupDataBox } from "../components/popup_data_box.js";
import { Slider } from "../components/slider.js";

import $ from 'jquery';

let d3 = require("d3");

mapboxgl.acessToken = 'pk.eyJ1IjoibmV3YW1lcmljYW1hcGJveCIsImEiOiJjaXVmdTUzbXcwMGdsMzNwMmRweXN5eG52In0.AXO-coBbL621lzrE14xtEA';
mapboxgl.config.ACCESS_TOKEN = 'pk.eyJ1IjoibmV3YW1lcmljYW1hcGJveCIsImEiOiJjaXVmdTUzbXcwMGdsMzNwMmRweXN5eG52In0.AXO-coBbL621lzrE14xtEA';

export class MapboxMap {
    constructor(vizSettings, imageFolderId) {
        // if (!mapboxgl.supported()) {
        //     alert('Your browser does not support Mapbox GL');
        //     return;
        // }

        Object.assign(this, vizSettings);

        this.mapContainer = d3.select(this.id).append("div")
            .attr("id", this.id.replace("#", "") + '-map-container')
            .style("width", "100%")

        this.setDimensions();

        Object.assign(this.mapboxSettings, {
            container: this.id.replace("#", "") + '-map-container',
            minZoom: 3,
            maxZoom: 8,
            attributionControl: true
        })

        this.map = new mapboxgl.Map(this.mapboxSettings);
        console.log("initializing map")

        this.addControls();
    }

    setDimensions() {
        this.w = $(this.id).width();
        this.h = this.widthHeightConversionFunc ? this.widthHeightConversionFunc(this.w) : 500;

        this.mapContainer.style("height", this.h + "px")
    }

    render(data) {
        console.log("rendering map")
        this.data = data[this.primaryDataSheet]
        if (this.filterInitialDataBy) {
            this.data = this.data.filter((d) => { return d[this.filterInitialDataBy.field] == this.filterInitialDataBy.value; })
        }

        if (this.radiusVar) {
            this.data = this.data.filter((d) => { return d[this.radiusVar.variable] && Number(d[this.radiusVar.variable]) > 0 });
            this.setRadiusScale(this.data);
        }

        this.setPopupDataBox();

        if (this.colorVar) {
            this.setColorScale(this.data);
        }

        if (this.sliderSettings) {
            this.addSlider()
            this.slider.render(this.data);
        }

        if (this.showLegend) {this.addLegend();}

        if (this.overrideClickFunction) {
            this.clickPrompt = this.mapContainer.append("h3")
                .attr("class", "mapbox-map__click-prompt hidden")
                .text("Click to Visit County Profile");
        }

        this.processData(this.data);
        this.map.on('load', () => {
            console.log("calling on load function")
            this.map.addSource("dataSource", this.source);
            this.map.addLayer({
                "id": "points",
                "type": "circle",
                "source": "dataSource",
                "paint": {
                    'circle-color': this.colorVar ? {
                        property: this.colorVar.variable,
                        type: 'categorical',
                        stops: this.colorStops
                    } : this.defaultColor,
                    'circle-radius': this.radiusVar ? {
                        property: this.radiusVar.variable,
                        stops: this.radiusStops
                    } : this.defaultRadius,
                    'circle-stroke-color': "#ffffff",
                    'circle-stroke-width': 1,
                }
            });

            this.map.addLayer({
                "id": "points-selected",
                "type": "circle",
                "source": "dataSource",
                "paint": {
                    'circle-color': this.colorVar ? {
                        property: this.colorVar.variable,
                        type: 'categorical',
                        stops: this.colorStops
                    } : this.defaultColor,
                    'circle-radius': this.radiusVar ? {
                        property: this.radiusVar.variable,
                        stops: this.radiusStops
                    } : this.defaultRadius,
                    'circle-stroke-color': "#ffffff",
                    'circle-stroke-width': 5,
                },
                "filter": ["==", "id", ""]
            });

            if (this.fitBounds && this.w > 600) {
                this.map.fitBounds(this.fitBounds)
            }

            if (this.hasHover) {
                this.map.on('mousemove', (e) => {
                    let features = this.map.queryRenderedFeatures(e.point, { layers: ['points'] });


                    if (!features.length) {
                        this.map.setFilter("points-selected", ["==", "id", ""]);
                        this.dataBox.hide();
                        if (this.clickPrompt) { this.clickPrompt.classed("hidden", true); }
                        return;
                    }

                    this.map.setFilter("points-selected", ["==", "id", features[0].properties.id]);

                    this.dataBox.show(features[0].properties, this.h);

                    if (this.overrideClickFunction) {
                        this.clickPrompt
                            .classed("hidden", false)
                            .style("top", (e.point.y + 20) + "px")
                            .style("left", (e.point.x - 55) + "px")
                    }
                });
            }

            this.map.on('click', (e) => {
                let features = this.map.queryRenderedFeatures(e.point, { layers: ['points'] });

                if (!features.length) {
                    this.map.setFilter("points-selected", ["==", "id", ""]);
                    this.dataBox.hide();
                    return;
                }

                this.map.setFilter("points-selected", ["==", "id", features[0].properties.id]);

                if (this.overrideClickFunction) {
                    this.overrideClickFunction(features[0].properties)
                } else {
                    this.dataBox.show(features[0].properties, this.h);

                    let newZoom = this.map.getZoom() < 7 ? 7 : this.map.getZoom();
                    this.map.flyTo({
                        center: e.lngLat,
                        zoom: newZoom
                    });
                }
            });
        });

    }

    processData(data) {
        console.log("processing data")
        this.data = GeoJSON.parse(data, {Point: ['geo_lat', 'geo_lon']});
        this.source = {
            "type": "geojson",
            "data" : this.data
        }
    }

    addControls() {
        this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    }

    addSlider() {
        this.sliderContainer = d3.select(this.id + '-map-container')
            .append("div")
            .attr("class", "slider-container")
            .attr("id", this.id.replace("#", "") + "__slider-container");

        this.sliderSettings.id = this.id + "__slider-container";
        this.sliderSettings.primaryDataSheet = this.primaryDataSheet;
        this.sliderSettings.filterChangeFunction = this.changeValue.bind(this);
        this.sliderSettings.startStopFunction = this.sliderStartStop.bind(this);
        this.slider = new Slider(this.sliderSettings);
    }


    setColorScale(data) {
        this.colorScale = getColorScale(data, this.colorVar);

        this.colorStops = [];
        for (let i = 0; i < this.colorScale.domain().length; i++) {
            this.colorStops.push([this.colorScale.domain()[i], this.colorScale.range()[i]]);
        }
    }

    setRadiusScale(data) {
        let extents = d3.extent(data, (d) => { return Number(d[this.radiusVar.variable]); });
        this.radiusScale = d3.scaleLinear()
            .domain(extents)
            .range([3, 30]);

        this.radiusStops = [];
        this.radiusStops.push([this.radiusScale.domain()[0], this.radiusScale.range()[0]]);
        this.radiusStops.push([this.radiusScale.domain()[1], this.radiusScale.range()[1]]);
    }

    setPopupDataBox() {
        this.dataBox = new PopupDataBox({
            id: this.id,
            dataBoxBackgroundColor: this.dataBoxBackgroundColor,
            dataBoxVars: this.dataBoxVars
        });
    }

    addLegend() {
        this.legend = d3.select(this.id + " .mapboxgl-canvas-container")
            .append("div")
            .attr("class", "mapbox-map__legend")

        this.cellContainer = this.legend.append("div")
            .attr("class", "mapbox-map__legend__cell-container");

        this.cellContainer.append("h5")
            .attr("class", "mapbox-map__legend__cell-container__label")
            .text(this.colorVar.displayName);

        this.setLegendCellContents();

        this.propCircleContainer = this.legend.append("div")
            .attr("class", "mapbox-map__legend__proportional-circle");

        this.propCircleContainer.append("h5")
            .attr("class", "mapbox-map__legend__proportional-circle__label")
            .text(this.radiusVar.displayName);

        this.setLegendPropCircleContents();
    }

    setLegendCellContents() {
        let legendCells = this.cellContainer.selectAll("div")
            .data(this.colorStops)
          .enter().append("div")
            .attr("class", "mapbox-map__legend__cell");

        legendCells.append("svg")
            .attr("class", "mapbox-map__legend__color-swatch-container")
            .attr("height", 10)
            .attr("width", 10)
           .append("circle")
            .attr("class", "mapbox-map__legend__color-swatch")
            .attr("cx", 5)
            .attr("cy", 5)
            .attr("r", 5)
            .attr("fill", (d) => { return d[1]; });

        legendCells.append("h5")
            .attr("class", "mapbox-map__legend__cell-label")
            .text((d) => { return d[0]; });
    }

    setLegendPropCircleContents() {
        let width = 80,
            height = 90;

        let svg = this.propCircleContainer
            .append("div")
            .attr("class", "mapbox-map__legend__proportional-circle__wrapper")
            .style("width", width + "px")
            .style("margin", "auto")
            .append("svg")
            .attr("height", height)
            .attr("width", width);

        svg.selectAll("circle")
            .data(this.radiusStops)
          .enter().append("circle")
            .attr("fill", "none")
            .attr("stroke", "#6b6d71")
            .attr("stroke-width", 1)
            .attr("cx", width/2)
            .attr("cy", height/2)
            .attr("r", (d) => { return d[1]; });

        svg.selectAll("text")
            .data(this.radiusStops)
          .enter().append("text")
            .attr("x", width/2)
            .attr("y", (d) => { return height/2 - d[1] - 3; })
            .attr("fill", "#6b6d71")
            .style("text-anchor", "middle")
            .text((d) => { return d[0]; });

    }

    resize() {
        console.log("resizing map")
        this.setDimensions()
        if (this.sliderSettings) {
            this.slider.resize();
        }

        if (this.fitBounds && this.w > 600) {
            this.map.fitBounds(this.fitBounds)
        }
    }

    changeValue(value) {
        console.log("changing value")
        if (value) {
            if (value == "all") {
                this.map.setFilter('points', ['!=', 'year', ""]);
            } else {
                this.map.setFilter('points', ['==', 'year', String(value)]);
            }
        }
    }

    sliderStartStop(animationState) {
        console.log("start stop slider")
        if (animationState == "playing") {
            this.map.setFilter("points-selected", ["==", "id", ""]);
            this.dataBox.hide();
        }
    }
}
