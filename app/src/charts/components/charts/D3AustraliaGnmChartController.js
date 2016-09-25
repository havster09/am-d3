"use strict";

import * as d3 from "d3";

class D3AustraliaGnmChartController {
    constructor() {
        let model = this;
        model.message = "mmmm";

        var regions = [
            {
                id: "0",
                name: "NSW Metro",
                lat: -33.873,
                lon: 151.206,
                orders: Math.floor(Math.random() * 1000000),
                uiSref: "",
                profit: Math.floor(Math.random() * 1000),
                quantity: Math.floor(Math.random() * 1000000),
                sales: Math.floor(Math.random() * 100)
            },
            {
                id: "1",
                name: "NSW North",
                lat: -32.4,
                lon: 152.39,
                orders: Math.floor(Math.random() * 1000000),
                uiSref: "",
                profit: Math.floor(Math.random() * 1000),
                quantity: Math.floor(Math.random() * 1000000),
                sales: Math.floor(Math.random() * 100)
            },
            {
                id: "2",
                name: "NSW South",
                lat: -34.462,
                lon: 150.841,
                orders: Math.floor(Math.random() * 1000000),
                uiSref: "",
                profit: Math.floor(Math.random() * 1000),
                quantity: Math.floor(Math.random() * 1000000),
                sales: Math.floor(Math.random() * 100)
            },
            {
                id: "3",
                name: "QLD Metro",
                lat: -26.3,
                lon: 152.323,
                orders: Math.floor(Math.random() * 1000000),
                uiSref: "",
                profit: Math.floor(Math.random() * 1000),
                quantity: Math.floor(Math.random() * 1000000),
                sales: Math.floor(Math.random() * 100)
            },
            {
                id: "4",
                name: "QLD North",
                lat: -14.952,
                lon: 144.857,
                orders: Math.floor(Math.random() * 1000000),
                uiSref: "",
                profit: Math.floor(Math.random() * 1000),
                quantity: Math.floor(Math.random() * 1000000),
                sales: Math.floor(Math.random() * 100)
            },
            {
                id: "5",
                name: "QLD South",
                lat: -27.814,
                lon: 152.963,
                orders: Math.floor(Math.random() * 1000000),
                uiSref: "",
                profit: Math.floor(Math.random() * 1000),
                quantity: Math.floor(Math.random() * 1000000),
                sales: Math.floor(Math.random() * 100)
            },
            {
                id: "6",
                name: "TAS",
                lat: -42.471,
                lon: 147.023,
                orders: Math.floor(Math.random() * 1000000),
                uiSref: "",
                profit: Math.floor(Math.random() * 1000),
                quantity: Math.floor(Math.random() * 1000000),
                sales: Math.floor(Math.random() * 100)
            },
            {
                id: "7",
                name: "VIC North",
                lat: -36.928,
                lon: 146.599,
                orders: Math.floor(Math.random() * 500),
                uiSref: "",
                profit: Math.floor(Math.random() * 1000),
                quantity: Math.floor(Math.random() * 1000000),
                sales: Math.floor(Math.random() * 100)
            },
            {
                id: "8",
                name: "VIC West",
                lat: -37.928,
                lon: 145.599,
                orders: Math.floor(Math.random() * 500),
                uiSref: "",
                profit: Math.floor(Math.random() * 1000),
                quantity: Math.floor(Math.random() * 1000000),
                sales: Math.floor(Math.random() * 100)
            }
        ];

        var regionsSales = [
            {id: "0",category: "Frames",sales: Math.floor(Math.random() * 100)},
            {id: "0",category: "Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "0",category: "Contact Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "1",category: "Frames",sales: Math.floor(Math.random() * 100)},
            {id: "1",category: "Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "1",category: "Contact Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "2",category: "Frames",sales: Math.floor(Math.random() * 100)},
            {id: "2",category: "Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "2",category: "Contact Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "3",category: "Frames",sales: Math.floor(Math.random() * 100)},
            {id: "3",category: "Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "3",category: "Contact Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "4",category: "Frames",sales: Math.floor(Math.random() * 100)},
            {id: "4",category: "Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "4",category: "Contact Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "5",category: "Frames",sales: Math.floor(Math.random() * 100)},
            {id: "5",category: "Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "5",category: "Contact Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "6",category: "Frames",sales: Math.floor(Math.random() * 100)},
            {id: "6",category: "Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "6",category: "Contact Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "7",category: "Frames",sales: Math.floor(Math.random() * 100)},
            {id: "7",category: "Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "7",category: "Contact Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "8",category: "Frames",sales: Math.floor(Math.random() * 100)},
            {id: "8",category: "Lenses",sales: Math.floor(Math.random() * 100)},
            {id: "8",category: "Contact Lenses",sales: Math.floor(Math.random() * 100)}
        ];

        var width = 960,
            height = 600;

        var color = d3.scale.linear()
            .domain([0, 10])
            .range(colorbrewer.Greys[9]);

        function formatSales(val) {
            var prefix = d3.formatPrefix(val),
                format = d3.format(".2f");
            return format(prefix.scale(val)) + prefix.symbol;
        }

        var formatRatio = d3.format("%");

        var formatNum = d3.format(".1");

        var projection = d3.geo.mercator()
            .center([140, -25])
            .scale(850);

        var path = d3.geo.path()
            .projection(projection);

        var radius = d3.scale.sqrt()
            .domain([0, 1e6])
            .range([3, 15]);

        var svg = d3.select("#australia-gnm-chart").append("svg")
            .attr("width", width)
            .attr("height", height);

        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (width - 50) + "," + (height - 20) + ")")
            .selectAll("g")
            .data([1e6, 5e6, 1e7])
            .enter().append("g");

        legend.append("circle")
            .attr("cy", function (d) {
                return -radius(d);
            })
            .attr("r", radius);

        legend.append("text")
            .attr("y", function (d) {
                return -2 * radius(d);
            })
            .attr("dy", "1.3em")
            .text(d3.format(".1s"));

        var barTooltip = d3.select("#australia-gnm-chart").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("width", 600);


        //read in data
        queue()
            .defer(d3.json, "assets/topojson/topo-au-countries-and-states.json") //our topojson from before
            .defer(d3.csv, "assets/csv/category-sales.csv") //our data for the bar chart
            .await(ready);

        function ready(error, data, catSales) {
            if (error) throw error;

            svg.selectAll("path")
                .data(topojson.feature(data, data.objects.austates).features)
                .enter().append("path")
                .attr("d", path)
                .attr("stroke", "white")
                .attr("stroke-width", "1")
                .attr("fill", (d, i) => {
                    return color(i * 10);
                })
                .on("click", function (d) {
                    var latlon = projection.invert(d3.mouse(this));
                    console.log(latlon);
                });

            svg.append("g")
                .attr("class", "bubble")
                .selectAll("circle")
                .data(regions)
                .sort(function (a, b) {
                    return b.orders - a.orders;
                })
                .enter().append("circle")
                .attr('cx', function (d) {
                    return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function (d) {
                    return projection([d.lon, d.lat])[1] - 1.5;
                })
                .attr("r", function (d) {
                    return radius(d.orders);
                })
                .on("mouseover", function (d) {

                    var circleId = d.id;
                    barTooltip.transition()
                        .duration(500)
                        .style("opacity", 0.7);
                    var tip = "<h3>" + d.name + "</h3>";
                    tip = tip + "<strong>Orders:</strong>" + formatNum(d.orders) + "<br/>";
                    tip = tip + "<strong>Profit:</strong> $" + formatSales(d.profit) + "<br/>";
                    tip = tip + "<h4>Category Orders</h4>";

                    barTooltip.html(tip)
                        .style("left", (Math.floor(d3.mouse(this)[0])) + "px")
                        .style("top", (Math.floor(d3.mouse(this)[0])) + "px");

                    var margin = {top: 20, right: 30, bottom: 30, left: 40},
                        height = 60,
                        width = 200;

                    var x = d3.scale.ordinal()
                        .rangeRoundBands([0, width], 0.1);

                    var y = d3.scale.linear()
                        .range([height, 0]);

                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("bottom");

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .tickFormat(d3.format("s"))
                        .ticks(2);


                    var chart = barTooltip.append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    //make sure to filter to the current ID
                    x.domain(regionsSales.map(function (d) {
                        return d.category;
                    }));
                    y.domain([0, d3.max(regions.filter(function (d) {
                        return d.id == circleId;
                    }), function (d) {
                        return d.sales;
                    })]);

                    chart.append("g")
                        .attr("class", "x-axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);

                    chart.append("g")
                        .attr("class", "y-axis")
                        .call(yAxis);

                    chart.selectAll("#barChart")
                        .data(regionsSales)
                        .enter().append("rect")
                    //apply filter for the state we're currently looking at
                        .filter(function (d) {
                            return d.id == circleId;
                        })
                        .attr("class", "bar")
                        .attr("x", function (d) {
                            return x(d.category);
                        })
                        .attr("y", function (d) {
                            return y(d.sales);
                        })
                        .attr("height", function (d) {
                            return height - y(d.sales);
                        })
                        .attr("width", x.rangeBand());

                })
                .on("mouseout", function (d) {
                    barTooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

        }

        d3.select(self.frameElement).style("height", height + "px");
    }
}

export default D3AustraliaGnmChartController;

