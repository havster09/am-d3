"use strict";

import * as d3 from "d3";

class D3UpdateChartController {
    constructor() {
        let model = this;
        model.message = "up u";

        const width = 960,
            height = 500;

        var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

        const svg = d3.select("#update-chart").append("svg")
            .attr({
                "width": width,
                "height": height
            })
            .style({
                "background":"#eeeeee"
            });

        const g = svg.append("g")
            .attr({
                "transform": `translate(32,${height/2})`
            });


        const updateText = function(data) {
            const t = d3.transition()
                .duration(750);

            let text = g.selectAll("text")
                .data(data, (d) => d);

            text.exit()
                .attr("class", "exit")
                .transition(t)
                .attr({
                    "y":60
                })
                .style({
                    "fill-opacity":1e-6
                })
                .remove();

            text.attr({
                "class":"update",
                "y":0
            })
                .style({
                    "fill-opacity":1
                })
                .transition(t)
                .attr({
                    "x":(d,i) => i * 32
                });

            text.enter()
                .append("text")
                .attr({
                    "class":"enter",
                    "dy":".35em",
                    "y":-60,
                    "x":(d,i) => i * 32
                })
                .style({
                    "fill-opacity": 1e-6
                })
                .text((d) => d)
                .transition(t)
                .attr("y",0)
                .style("fill-opacity",1);

        };

        updateText(alphabet);


        const havenInterval = setInterval(() => {
            updateText(d3.shuffle(alphabet)
                .slice(0, Math.floor(Math.random() * 26))
                .sort()
            );
        }, 500);





    }
}

export default D3UpdateChartController;

