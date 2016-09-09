"use strict";

import * as d3 from "d3";

class D3MultiStackedChartController {
    constructor() {
        let model = this;
        model.message = "pina coladas";

        const margin = {
            top: 20,
            right: 50,
            bottom: 30,
            left: 50
        },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;


        const parseDate = d3.time.format("%y-%b-%d").parse,
            formatPercent = d3.format(".0%");

        const x = d3.time.scale()
            .range([0,width]);

        const y = d3.scale.linear()
            .range([height,0]);

        const color = d3.scale.category20();

        const xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        const yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(formatPercent);

        const line = d3.svg.area()
            .interpolate("basis")
            .x((d) => x(d.date))
            .y0((d) => x(d.y))
            .y1((d) => x(d.y));

        function line_to_stacked(t) {
            return d3.svg.area()
                .interpolate("basis")
                .x((d) => x(d.date))
                .y0((d) => y(t*d.y0 + d.y))
                .y1((d) => y(t*d.y0 + d.y));
        }

        function area_to_stacked(t) {
            return d3.svg.area()
                .interpolate("basis")
                .x((d) => x(d.date))
                .y0((d) => y(d.y0 + (1-t) *d.y))
                .y1((d) => y(d.y0 + d.y));
        }

        const stack = d3.layout.stack()
            .values((d) => d.values);

        const svg = d3.select("#multi-stacked-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        d3.tsv("assets/tsv/data-area-multi.tsv", (error, data) => {
           if(error) throw error;

            color.domain(d3.keys(data[0]).filter((key) => key !== "date"));

            data.forEach((d) => {d.date = parseDate(d.date);});
            const browsers = stack(color.domain().map((name) => {
                return {
                    name:name,
                    values: data.map(function(d) {
                        return {date: d.date, y: d[name] / 100};
                    })
                };
            }));

            x.domain(d3.extent(data, (d) => d.date));

            const browser = svg.selectAll(".browser")
                .data(browsers)
                .enter()
                .append("g")
                .attr("class", "browser");

            browser.append("path")
                .attr({
                    "class":"area",
                    "d": (d) => line(d.values)
                })
                .style("stroke", (d) => color(d.name))
                .style("fill", (d) => {
                    return color(d.name);
                });

            browser.append("text")
                .datum(function(d) {
                    return {
                        name: d.name,
                        value: d.values[d.values.length -1]
                    };
                })
                .attr({
                    "transform" : (d) => `translate(${+x(d.value.date)}, ${y(d.value.y)})`,
                    "x":3,
                    "dy": ".35em"
                })
                .style({
                    "fill": (d) => color(d.name)
                })
                .text((d) => d.name);

            svg.append("g")
                .attr({
                    "class": "x axis",
                    "transform": `translate(0, ${height})`
                })
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            var is_area_plot = false;

            model.transition = function() {
                var duration = 2000;
                var browser = svg.selectAll(".browser");
                var transition = browser.transition()
                    .delay(function(d, i) { return i * 1000; })
                    .duration(duration);
                var postTransition = transition.transition();
                if (!is_area_plot) {
                    transition.selectAll("path")
                        .attrTween("d", shapeTween(line_to_stacked, 1));
                    transition.selectAll("text")
                        .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y) + ")"; });
                    postTransition.selectAll("path")
                        .attrTween("d", shapeTween(area_to_stacked, 1))
                        .style("stroke-opacity", 0.0);
                    postTransition.selectAll("text")
                        .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y / 2) + ")"; });
                } else {
                    transition.selectAll("path")
                        .style("stroke-opacity", 1.0)
                        .attrTween("d", shapeTween(area_to_stacked, 0));
                    transition.selectAll("text")
                        .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y) + ")"; });
                    postTransition.selectAll("path")
                        .attrTween("d", shapeTween(line_to_stacked, 0));
                    postTransition.selectAll("text")
                        .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y) + ")"; });
                }
                is_area_plot = !is_area_plot;
            };

            function shapeTween(shape, direction) {
                return function(d, i, a) {
                    return function(t) {
                        return shape(direction ? t : 1.0 - t)(d.values);
                    };
                };
            }

            model.transition();
        });
    }

}

export default D3MultiStackedChartController;

