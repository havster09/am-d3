"use strict";

import * as d3 from "d3";

class D3WorldMapChartController {
    constructor() {
        let model = this;
        model.message = "lets do this";

        d3.select(window).on("resize", throttle);

        var centered;

        var color = d3.scale.linear()
            .domain([0, 20])
            .range(colorbrewer.Blues[9]);

        function clicked(d) {
            var latlon = projection.invert(d3.mouse(this));
            console.log(latlon);

            var x, y, k;

            if (d && centered !== d) {
                var centroid = path.centroid(d);
                x = centroid[0];
                y = centroid[1];
                k = 4;
                centered = d;
            } else {
                x = width / 2;
                y = height / 2;
                k = 1;
                centered = null;
            }

            var zoom = d3.behavior.zoom()
                .translate(projection.translate())
                .scale(projection.scale())
                .scaleExtent([height, 8 * height])
                .on("zoom", zoomed);

            function zoomed() {
                projection.translate(d3.event.translate).scale(d3.event.scale);
                g.selectAll("path").attr("d", path);
            }

            g.selectAll("path")
                .classed("active", centered && function (d) {
                        return d === centered;
                    });

            g.transition()
                .duration(750)
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                .style("stroke-width", 1.5 / k + "px");
        }

        var width = document.getElementById('world-map-chart').offsetWidth;
        var height = width / 2;

        var topo, projection, path, svg, g;

        var graticule = d3.geo.graticule();

        var tooltip = d3.select("#world-map-chart").append("div").attr("class", "tooltip hidden");

        setup(width, height);

        function setup(width, height) {
            projection = d3.geo.mercator()
                .translate([(width / 2), (height / 2)])
                .scale(width / 2 / Math.PI);

            path = d3.geo.path().projection(projection);

            svg = d3.select("#world-map-chart").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g");

            g = svg.append("g");

        }

        d3.json("assets/topojson/world-topo-min.json", function (error, world) {

            var countries = topojson.feature(world, world.objects.countries).features;

            topo = countries;
            draw(topo);

        });

        function draw(topo) {

            svg.append("path")
                .datum(graticule)
                .attr("class", "graticule")
                .attr("d", path);


            g.append("path")
                .datum({type: "LineString", coordinates: [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]]})
                .attr("class", "equator")
                .attr("d", path);


            var country = g.selectAll(".country").data(topo);

            country.enter().insert("path")
                .attr("class", "country")
                .attr("d", path)
                .attr("id", function (d, i) {
                    return d.id;
                })
                .attr("title", function (d, i) {
                    return d.properties.name;
                })
                .style("fill", function (d, i) {
                    // return d.properties.color;
                    return color(i);
                });

            //offsets for tooltips
            var offsetL = document.getElementById('world-map-chart').offsetLeft + 20;
            var offsetT = document.getElementById('world-map-chart').offsetTop + 10;

            //tooltips
            country
                .on("mousemove", function (d, i) {

                    var mouse = d3.mouse(svg.node()).map(function (d) {
                        return parseInt(d);
                    });

                    tooltip.classed("hidden", false)
                        .attr("style", "left:" + (mouse[0] + offsetL) + "px;top:" + (mouse[1] + offsetT) + "px")
                        .html(d.properties.name);

                })
                .on("mouseout", function (d, i) {
                    tooltip.classed("hidden", true);
                })
                .on("click", clicked);


            //EXAMPLE: adding some capitals from external CSV file
            d3.csv("assets/csv/country-capitals.csv", function (err, capitals) {

                capitals.forEach(function (i) {
                    addpoint(i.CapitalLongitude, i.CapitalLatitude, i.CapitalName);
                });

            });

        }


        function redraw() {
            width = document.getElementById('world-map-chart').offsetWidth;
            height = width / 2;
            d3.select('svg').remove();
            setup(width, height);
            draw(topo);
        }

        var throttleTimer;

        function throttle() {
            window.clearTimeout(throttleTimer);
            throttleTimer = window.setTimeout(function () {
                redraw();
            }, 200);
        }

//function to add points and text to the map (used in plotting capitals)
        function addpoint(lat, lon, text) {

            var gpoint = g.append("g").attr("class", "gpoint");
            var x = projection([lat, lon])[0];
            var y = projection([lat, lon])[1];

            gpoint.append("svg:circle")
                .attr("cx", x)
                .attr("cy", y)
                .attr("class", "point")
                .attr("r", 1.5);

            //conditional in case a point has no associated text
            if (text.length > 0) {

                gpoint.append("text")
                    .attr("x", x + 2)
                    .attr("y", y + 2)
                    .attr("class", "text")
                    .text(text);
            }

        }
    }
}

export default D3WorldMapChartController;

