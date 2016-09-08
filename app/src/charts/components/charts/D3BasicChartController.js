"use strict";

import * as d3 from "d3";

class D3BasicChartController {
    constructor() {
        let model = this;
        model.message = "noob";

        const width = 600,
            height = 600;

        let dataSet = [74,16,60,80,20,210];

        const color = d3.scale.category20b()
            .domain([0, d3.max(dataSet)/2])
            .range(colorbrewer.Blues[9]);

        const colorGreen = d3.scale.category20b()
            .domain([0, d3.max(dataSet)/2])
            .range(colorbrewer.Greens[9]);



        const svg = d3.select("#basic-chart").append("svg")
            .attr({
                "width": width,
                "height": height,
            })
            .style("background", "#EEEEEE");

        svg.selectAll("circle")
            .data(dataSet)
            .enter()
            .append("circle")
            .attr({
                "cx": (d) => d,
                "cy": (d) => d,
                "r": (d) => d/2,
                "fill": (d) => color(d)
            });

        svg.selectAll("ellipse")
            .data(dataSet)
            .enter()
            .append("ellipse")
            .attr("cx", (d) => d)           // position the x-centre
            .attr("cy", (d) => height-d)           // position the y-centre
            .attr("rx", (d) => d*2)           // set the x radius
            .attr("ry", (d) => d)         // set the y radius
            .attr("fill", (d) => colorGreen(d));         // set the y radius

        svg.append("rect")
            .attr("x", width/2)
            .attr("y", height/2)
            .attr("height", 100)
            .attr("width", 100)
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("fill", "pink");

        svg.append("line")
            .attr({
                "x1": 100,
                "y1": 50,
                "x2": 300,
                "y2": 150,
            })
            .style({
                "stroke":"black",
                "stroke-width":3
            });

        svg.append("polyline")
            .style({
                "stroke":"red",
                "fill":"grey"
            })
            .attr("points", "100,50, 200,150, 300,30");

        svg.append("polygon")
            .style({
                "stroke":"brown",
                "fill":"none"
            })
            .attr("points", "100,50, 200,250, 300,30");

        svg.append("path")
            .style({
                "stroke":"yellow",
                "stroke-width":3,
                "fill":"#EEEEEE"
            })
            .attr("d", "M 0 0, L 200, 150, L 300, 50 Z");

        svg.append("text")
            .style({
                "fill":"tan",
                "font-family": "monospace"
            })
            .attr({
                "x": 200,
                "y": 100,
                "dy": ".35em",
                "text-anchor": "middle"
            })
            .text("Blow Hole");
    }
}

export default D3BasicChartController;

