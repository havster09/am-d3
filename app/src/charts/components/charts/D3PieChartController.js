"use strict";

import * as d3 from "d3";

class D3PieChartController {
    constructor() {
        let model = this;
        model.message = "pie son";

        const donutWidth = 75;

        const width = 360,
            height = 360,
            radius = Math.min(width, height) / 2,
            legendRectSize = 18,
            legendSpacing = 4;

        const color = d3.scale.ordinal()
            .range(["#ccebff", "#66c2ff", "#005c99", "#0099ff", "#33adff", "#003d66", "#002e4d"]);

        const svg = d3.select("#pie-chart").append("svg")
            .attr({
                "width": width,
                "height": height
            })
            .append("g")
            .attr("transform", `translate(${(width / 2)},${height / 2})`);

        const arc = d3.svg.arc()
            .innerRadius(radius-donutWidth)
            .outerRadius(radius);

        const pie = d3.layout.pie()
            .value((d) => d.count)
            .sort(null);

        const tooltip = d3.select("#pie-chart")
            .append("div")
            .attr("class","tooltip");

        tooltip.append('div')
            .attr('class', 'label');

        tooltip.append('div')
            .attr('class', 'count');

        tooltip.append('div')
            .attr('class', 'percent');


        var datasetWeekdays = [];

        d3.csv("assets/csv/weekdays.csv", function(error, dataset) {
            dataset.forEach((d) => {
                d.count = +d.count;
                d.enabled = true;
                datasetWeekdays.push(d);
            });

            console.log(datasetWeekdays);

            const path = svg.selectAll("path")
                .data(pie(datasetWeekdays))
                .enter()
                .append("path")
                .attr({
                    "d": arc,
                    "fill": (d, i) => color(i),
                    "opacity": "1",
                    "data-label": (d) => d.data.label
                })
                .each(function(d) { this._current = d; });

            path.on("mouseover", (d) => {
                const total = d3.sum(datasetWeekdays.map(function(d) {
                    return (d.enabled) ? d.count : 0;
                }));
                const percent = Math.round(1000 * d.data.count / total) / 10;
                tooltip.select('.label').html(d.data.label);
                tooltip.select('.count').html(d.data.count);
                tooltip.select('.percent').html(percent + '%');
                tooltip.style('display', 'block');
            });

            path.on("mouseout", (d) => {
                tooltip.style('display', 'none');
            });

            const legend = svg.selectAll(".legend")
                .data(color.domain())
                .enter()
                .append("g")
                .attr({
                    "class": "legend",
                    "transform": function(d, i) {
                        const height = legendRectSize + legendSpacing,
                            offset = height * color.domain().length/2,
                            horz = -2 * legendRectSize,
                            vert = i * height - offset;
                        return `translate(${horz}, ${vert})`;
                    }
                });

            legend.append("rect")
                .attr({
                    "data-label": (d,i) => datasetWeekdays[i].label,
                    "width": legendRectSize,
                    "height": legendRectSize,
                    "fill":color
                })
                .style("stroke", color)
                .on('click', function(label) {
                    var rect = d3.select(this);
                    var enabled = true;
                    var totalEnabled = d3.sum(dataset.map(function(d) {
                        return (d.enabled) ? 1 : 0;
                    }));

                    if (rect.attr('class') === 'disabled') {
                        rect.attr('class', '');
                    } else {
                        if (totalEnabled < 2) return;
                        rect.attr('class', 'disabled');
                        enabled = false;
                    }

                    pie.value(function(d) {
                        if (d.label === label) d.enabled = enabled;
                        return (d.enabled) ? d.count : 0;
                    });

                    let path = d3.select('path[data-label="'+this.getAttribute("data-label")+'"]');

                    let transitionOpacityTo;

                    if(parseInt(path.attr("opacity")) > 0) {
                        transitionOpacityTo = 0;
                    }
                    else {
                        transitionOpacityTo = 1;
                    }

                    path.transition()
                        .attr("opacity", transitionOpacityTo)
                        .duration(750);
                });

            legend.append("text")
                .attr({
                    "x": legendRectSize + legendSpacing,
                    "y": legendRectSize - legendSpacing
                })
                .text((d,i) => {
                    return datasetWeekdays[i].label;
                });
        });
    }
}

export default D3PieChartController;

