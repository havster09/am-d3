"use strict";

import * as d3 from "d3";

class D3BarChartController {
    constructor() {
        let model = this;
        model.message = "booyah";
        //  the data that powers the bar chart, a simple array of numeric values
        var chartdata = [40, 60, 80, 100, 40, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140, 140, 120, 150, 70, 60, 100, 120, 70, 100, 80, 60, 40];

        let chartdata1 = [10, 20, 30, 40, 50, 60, 75, 90, 110, 130, 150, 190];

        var margin = {top: 30, right: 10, bottom: 30, left: 50};

        function endAll(transition, callback) {
            var n = 0;
            transition.each(function() { ++n; })
                .each('end', function() {
                    if (!--n && callback) callback.apply(this, arguments);
                });
        }

        const height = 400 - margin.top - margin.bottom,
            width = 720 - margin.left - margin.right,
            barWidth = 40,
            barOffset = 20;

        const colors = d3.scale.linear()
            .domain([0, chartdata.length * 0.33, chartdata.length * 0.66, chartdata.length])
            .range(["#ccebff", "#66c2ff", "#005c99", "#003d66"]);

        const yScale = d3.scale.linear()
            .domain([0, d3.max(chartdata)])
            .range([0, height]);

        const xScale = d3.scale.ordinal()
            .domain(d3.range(0, chartdata.length))
            .rangeBands([0, width]);

        var dynamicColor;

        const svg = d3.select("#bar-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style({
                "background": "none"
            })
            .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
            .selectAll("rect").data(chartdata)
            .enter()
            .append("rect")
            .attr({
                "width": xScale.rangeBand(),
                "height": 0,
                "x": (d, i) => xScale(i),
                "y": height
            })
            .style({
                "fill": (d, i) => colors(i),
                "stroke": "black",
                "stroke-width": "1"
            });


            svg.on("mouseover", function () {
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
            .on("click", (d, i) => console.log(`go to route ${i}`));

        const text = d3.select("#bar-chart svg").append("g").selectAll("text").data(chartdata)
            .enter()
            .append("text")
            .attr({
                "class":"barLabels",
                "x":(d, i) => xScale(i) + margin.left + xScale.rangeBand()/2,
                "y": height,
                "dy": "3em",
                "fill": "white"
            })
            .style({
                "text-anchor": "middle"
            })
            .text((d) => d.toString());

        const textTransition = function() {
            text.transition()
                .attr({
                    "y": (d) => height - yScale(d)
                })
                .delay((d, i) => i * 20)
                .duration(1000)
                .ease("elastic");
        };

        svg.transition()
            .attr({
                "height": (d) => yScale(d),
                "y": (d) => height - yScale(d)
               })
            .delay((d, i) => i * 20)
            .duration(1000)
            .ease("elastic")
            // .call(endAll, textTransition);
            .call(textTransition);

        const verticalGuideScale = d3.scale.linear()
            .domain([0, d3.max(chartdata)])
            .range([height, 0]);

        const vAxis = d3.svg.axis()
            .scale(verticalGuideScale)
            .orient("left")
            .ticks(10);

        const verticalGuide = d3.select("#bar-chart svg").append("g");
        vAxis(verticalGuide);
        verticalGuide.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
        verticalGuide.selectAll("path")
            .style({fill: "none", stroke: "black"});
        verticalGuide.selectAll("line")
            .style({stroke: "black"});

        const hAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(chartdata.size);

        const horizontalGuide = d3.select("#bar-chart svg").append("g");
        hAxis(horizontalGuide);
        horizontalGuide.attr("transform", "translate(" + margin.left + ", " + (height + margin.top) + ")");
        horizontalGuide.selectAll("path")
            .style({fill: "none", stroke: "black"});
        horizontalGuide.selectAll("line")
            .style({stroke: "black"});

    }
}

export default D3BarChartController;

