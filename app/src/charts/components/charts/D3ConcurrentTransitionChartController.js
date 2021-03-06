"use strict";

import * as d3 from "d3";

class D3ConcurrentTransitionChartController {
    constructor() {
        let model = this;
        model.message = "waddap";

        var width = 960,
            height = 500;

        var twizzleLock = {},
            plonkLock = {};

        var svg = d3.select("#concurrent-transition-chart").append("svg")
            .attr("width", width)
            .attr("height", height);

        svg.append("g")
            .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
            .append("path")
            .attr("d", d3.svg.symbol().type("cross").size(50000))
            .call(twizzle, 20000)
            .call(plonk, 2000);

        function twizzle(path, duration) {
            d3.select(twizzleLock).transition()
                .duration(duration)
                .tween("attr:transform", function() {
                    var i = d3.interpolateString("rotate(0)", "rotate(720)");
                    return function(t) { path.attr("transform", i(t)); };
                });

            setTimeout(function() { twizzle(path, duration); }, (Math.random() + 1) * duration);
        }

        function plonk(path, duration) {
            d3.select(plonkLock).transition()
                .duration(duration)
                .tween("style:stroke-width", function() {
                    var i = d3.interpolateString("0px", "30px");
                    return function(t) { path.style("stroke-width", i(t)); };
                })
                .transition()
                .tween("style:stroke-width", function() {
                    var i = d3.interpolateString("30px", "0px");
                    return function(t) { path.style("stroke-width", i(t)); };
                });

            setTimeout(function() { plonk(path, duration); }, (Math.random() + 2) * duration);
        }

    }
}

export default D3ConcurrentTransitionChartController;

