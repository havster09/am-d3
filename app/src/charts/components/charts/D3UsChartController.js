"use strict";

import * as d3 from "d3";

class D3UsChartController {
    constructor() {
        let model = this;
        model.message = "big time";

        var width = 960,
            height = 600;

        var path = d3.geo.path()
            .projection(null);

        var svg = d3.select("#us-chart").append("svg")
            .attr("width", width)
            .attr("height", height);

        //define color pallette using colorbrewer
        var color = d3.scale.linear()
            .domain([0, 5000])
            .range(colorbrewer.Blues[9]);

        d3.json("assets/topojson/us.json", function (error, us) {
            if (error) return error;

            // console.log(JSON.stringify(topojson.feature(us, us.objects.counties).features))

            svg.append("path")
                .datum(topojson.feature(us, us.objects.nation))
                .attr("class", "land")
                .attr("d", path);

            svg.append("path")
                .datum(topojson.mesh(us, us.objects.states, function (a, b) {
                    return a !== b;
                }))
                .attr("class", "border state")
                .attr("d", path);

            //draw counties
            svg.append("g")
                .attr("class", "counties")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.counties).features)
                .enter().append("path")
                .attr("class", "county")
                .attr("d", path)
                //add color
                .attr("fill", function (d) {
                    console.log(d);
                    return color(d.properties.profit);
                });

        });
    }
}

export default D3UsChartController;

