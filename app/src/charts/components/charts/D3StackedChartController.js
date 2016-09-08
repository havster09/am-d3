"use strict";

import * as d3 from "d3";

class D3StackedChartController {
    constructor() {
        let model = this;
        model.message = "waddap";

        const margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        const parseDate = d3.time.format("%d-%b-%y").parse;

        const x = d3.time.scale().range([0, width]),
            y = d3.scale.linear().range([height, 0]);

        const xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        const yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        const area = d3.svg.area()
            .x((d) => x(d.date))
            .y0(height)
            .y1((d) => y(d.close));

        const svg = d3.select("#stacked-chart").append("svg")
            .attr({
                "width": width + margin.left + margin.right,
                "height": height + margin.top + margin.bottom
            }).append("g")
            .attr({
                "transform": `translate(${margin.left}, ${margin.top})`
            });

        d3.tsv("assets/tsv/data-area.tsv", (error, data) => {
            if (error) throw error;
            data.forEach((d) => {
                d.date = parseDate(d.date);
                d.close = +d.close;
            });

            x.domain(d3.extent(data, (d) => d.date));
            y.domain([0, d3.max(data, (d) => d.close)]);

            console.log(area);

            svg.append("path")
                .datum(data)
                .attr({
                    "class": "area",
                    "d": area
                });

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", `translate(0, ${height})`)
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr({
                    "transform": "rotate(-90)",
                    "y": 6,
                    "dy": ".71em"

                })
                .style("text-anchor", "end")
                .text("Price ($)");
        });


    }
}

export default D3StackedChartController;

