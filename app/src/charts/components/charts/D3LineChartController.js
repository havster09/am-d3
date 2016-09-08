"use strict";

import * as d3 from "d3";

class D3LineChartController {
    constructor() {
        let model = this;
        model.message = "tetas";

        function type(d) {
            d.date = formatDate.parse(d.date);
            d.close = +d.close;
            return d;
        }

        const margin = {top:20, right: 20, bottom: 30, left: 50},
            width = 960 -margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        const formatDate = d3.time.format("%d-%b-%y");

        const x = d3.time.scale()
            .range([0, width]);

        const y = d3.scale.linear()
            .range([height, 0]);

        const xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        const yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        const line = d3.svg.line()
            .x((d) => x(d.date))
            .y((d) => y(d.close));

        const svg = d3.select("#line-chart").append("svg")
            .attr({
                "width": width+margin.left+margin.right,
                "height": height+margin.top+margin.bottom
            })
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        d3.tsv("assets/tsv/data.tsv", type, (error, data) => {
           if(error) {throw error;}

            function updateData(data) {
                x.domain(d3.extent(data, (d) => d.date));
                y.domain(d3.extent(data, (d) => d.close));

                let axisCollection = svg.selectAll("g")
                    .data(data, (d) => d);

                let path = svg.selectAll("path")
                    .data(data, (d) => d);

                axisCollection.exit().remove();
                path.exit().remove();

                svg.append("g")
                    .attr({
                        "class": "x axis",
                        "transform": `translate(0, ${height})`
                    })
                    .call(xAxis);

                svg.append("g")
                    .attr({
                        "class": "y axis"
                    })
                    .call(yAxis)
                    .append("text")
                    .attr({
                        "transform": "rotate(-90)",
                        "y":6,
                        "dy": ".71em"
                    })
                    .style({
                        "text-anchor": "end"
                    })
                    .text("Price ($)");

                svg.append("path")
                    .datum(data)
                    .attr({
                        "class": "line",
                        "d": line
                    });
            }

            updateData(data);

            /*const havenInterval = setInterval(() => {
                updateData(data
                    .slice(0, Math.floor(Math.random() * 10))
                );
            }, 1000);*/

        });





    }
}

export default D3LineChartController;

