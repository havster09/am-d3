"use strict";

import * as d3 from "d3";

class D3AustraliaChartController {
    constructor() {
        let model = this;
        model.message = "found a thong";

        var width = 1200,
            height = 1000,
            label_text_size_px = 12;

        var locations = [
            {
                name: "Sydney",
                lat: -33.873,
                lon: 151.206,
                css_class: "temperature_warm population_some still_exists",
                govt_site: "http://nsw.gov.au"
            },
            {
                name: "Canberra",
                lat: -35.308,
                lon: 149.124,
                css_class: "temperature_cool population_veryhot no_longer_exists",
                govt_site: "http://www.gov.au"
            },
            {
                name: "Darwin",
                lat: -12.462,
                lon: 130.841,
                css_class: "temperature_hot population_many still_exists",
                govt_site: "http://nt.gov.au"
            },
            {
                name: "Hobart",
                lat: -42.881,
                lon: 147.323,
                css_class: "temperature_cold population_none still_exists",
                govt_site: "http://tas.gov.au"
            },
            {
                name: "Perth",
                lat: -31.952,
                lon: 115.857,
                css_class: "temperature_veryhot population_few no_longer_exists",
                govt_site: "http://wa.gov.au"
            },
            {
                name: "Melbourne",
                lat: -37.814,
                lon: 144.963,
                css_class: "temperature_cool population_many still_exists",
                govt_site: "http://vic.gov.au"
            },
            {
                name: "Brisbane",
                lat: -27.471,
                lon: 153.023,
                css_class: "temperature_hot population_unknown no_longer_exists",
                govt_site: "http://qld.gov.au"
            },
            {
                name: "Adelaide",
                lat: -34.928,
                lon: 138.599,
                css_class: "temperature_veryhot population_few still_exists",
                govt_site: "http://sa.gov.au"
            }
        ];

        var projection = d3.geo.mercator()
            .center([130, -25])
            .scale(900);

        var path = d3.geo.path()
            .projection(projection);

        // Set dimensions of SVG elemet
        var svg = d3.select("#australia-chart svg")
            .attr("width", width)
            .attr("height", height);

        // Drawings go in #art, and labels go in #labels
        var art = svg.select("#art");
        var labels = svg.select("#labels");

        var color = d3.scale.linear()
            .domain([0, 10])
            .range(colorbrewer.Greys[9]);

        /*d3.json("assets/topojson/topo-australia.json", function(error, data) {
         if (error) return console.error(error);
         art.selectAll("path")
         .data(topojson.feature(data, data.objects.austates).features)
         .enter().append("path")
         .attr("d", path)
         .attr("fill", (d, i) => color(i))
         .attr("stroke", "#ddd");
         });*/

        var dynamicColor;

        d3.json("assets/topojson/topo-au-countries-and-states.json", function (error, data) {
            if (error) return console.error(error);
            art.selectAll("path")
                .data(topojson.feature(data, data.objects.austates).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", (d, i) => {
                    return color(i * 10);
                })
                .on("mouseover", function (d) {
                    console.log(d);
                    dynamicColor = this.style.fill;
                    d3.select(this)
                        .style({
                            "fill": "rgb(255,82,82)"
                        });
                })
                .on("mouseout", function () {
                    d3.select(this)
                        .style({
                            "fill": dynamicColor
                        });
                })
                .on("click", function(d)  {
                    var latlon = projection.invert(d3.mouse(this));
                    console.log(latlon);
                });
        });

        var locationPoints = art.selectAll('circle').data(locations);
        var locationLabels = labels.selectAll('foreignObject').data(locations);

        locationPoints.enter()
            .append('circle')
            .attr('cx', function (d) {
                return projection([d.lon, d.lat])[0];
            })
            .attr('cy', function (d) {
                return projection([d.lon, d.lat])[1];
            })
            .attr('r', 5)
            .attr('fill', 'steelblue');

        var labelForeignObjects = locationLabels.enter()
            .append('foreignObject')
            .attr('x', function (d) {
                return projection([d.lon, d.lat])[0];
            })
            .attr('y', function (d) {
                return projection([d.lon, d.lat])[1] - 1.5 * label_text_size_px;
            })
            .attr('width', function (d) {
                return String(d.name.length * label_text_size_px * 0.75) + "px";
            })
            .attr('height', 2.5 * label_text_size_px + "px");

        var htmlDOMs = labelForeignObjects.append('xhtml:body');

        var htmlLabels = htmlDOMs.append('div')
            .classed('htmlLabel', true);

        htmlLabels.append('p')
            .attr("class", function (d) {
                return d.css_class;
            })
            .style("font-size", label_text_size_px + "px")
            .html(function (d) {
                return "<a href='" + d.govt_site + "'>" + d.name + "</a>";
            });
    }
}

export default D3AustraliaChartController;

