"use strict";

import * as d3 from "d3";

class D3GlobeChartController {
    constructor() {
        let model = this;
        model.message = "Weather";

        var cities = [
            {
                id: "0",
                name: "Sydney",
                lat: -33.86,
                lon: 151.21,
                conditions: "Rain",
                href: "",
                sales: Math.floor(Math.random() * 100)
            },
            {
                id: "1",
                name: "Melbourne",
                lat: -37.83,
                lon: 144,
                conditions: "Snow",
                href: "",
                sales: Math.floor(Math.random() * 100)
            },
            {
                id: "2",
                name: "Adelaide",
                lat: -34.92,
                lon: 138.62,
                conditions: "Sunny",
                href: "",
                sales: Math.floor(Math.random() * 100)
            }
        ];

        var data = {
            '088': 99,
            '012': 45,
            '262': 56,
            '276': 80,
            '380': 56,
            '372': 25,
            '024': 56,
            '032': 12,
            '008': 67,
            '004': 56,
            '051': 12,
            '784': 67,

            '152': 89,
            '156': 45,
            '384': 51,
            '170': 73,
            '818': 49,
            '208': 66,
            '724': 9,
            '250': 31,
            '242': 51,
            '356': 87,
            '826': 19,
            '360': 26,

            '3514': 63,
            '3515': 47,
            '3516': 47,
            '3517': 63,
            '3518': 47,
            '3519': 47,
            '3520': 67,
            '3521': 19,
            '3522': 71,
            '3523': 36,
            '3524': 56,
            '3525': 12,
            '3526': 67,
            '3527': 19,
            '3528': 71,
            '3529': 36,
            '3530': 56,
            '3531': 12,
            '3532': 71,
            '3533': 36,
            '3534': 56,
            '3535': 12,
            '3536': 67,
            '3537': 19,
            '3538': 71,
            '3539': 36,
            '3540': 56,
            '3541': 19,
            '3542': 71,
            '3543': 36,
            '3544': 56,
            '3545': 12,
            '3546': 67,
            '3547': 19,
            '3548': 71,
            '3549': 36,
            '3550': 56,
            '3551': 12,
            '3552': 71,
            '3553': 21,
            '3554': 34,
            '3555': 45,
            '3556': 5,
            '3557': 25,
            '3558': 56,
            '3559': 36,
            '3560': 56,
            '3561': 19,
            '3562': 71,
            '3563': 36
        };

        var time = Date.now();
        var rotate = [0, 0];
        var velocity = [0.015, -0];

        var color = d3.scale.linear()
            .domain([0, 10])
            .range(colorbrewer.Greys[9]);

        var width = 250, height = 700,
            projection, path,
            svg, features, graticule,
            mapJson = 'assets/topojson/countries-and-states.json',
            states, stateSet, countries, countrySet, set, dynamicColor, weatherBubbles;

        projection = d3.geo.orthographic()
            .translate([width / 2, height / 2])
            .scale(300)
            .clipAngle(90)
            .precision(0.1)
            .rotate([-134.3156069410817, 25.763175224302056]);


        path = d3.geo.path()
            .projection(projection);

        svg = d3.select('.globe-wrapper .globe')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', '0, 0, ' + width + ', ' + height);

        features = svg.append('g');

        features.append('path')
            .datum({type: 'Sphere'})
            .attr('class', 'background')
            .attr('d', path);

        graticule = d3.geo.graticule();

        features.append('path')
            .datum(graticule)
            .attr('class', 'graticule')
            .attr('d', path);

        d3.json(mapJson, function (error, world) {
            states = topojson.feature(world, world.objects.states).features;
            countries = topojson.feature(world, world.objects.countries).features;
            stateSet = drawFeatureSet('state', states);
            countrySet = drawFeatureSet('country', countries);

            weatherBubbles = svg.append("g")
                .attr("class", "bubble")
                .selectAll("circle")
                .data(cities)
                .enter().append("circle")
                .attr('cx', function (d) {
                    return projection([d.lon, d.lat])[0];
                })
                .attr('cy', function (d) {
                    return projection([d.lon, d.lat])[1] - 1.5;
                })
                .attr("r", function (d) {
                    return 0;
                })
                .transition()
                .duration(2000)
                .ease('elastic')
                .attr("r", (d) => {
                    return 5;
                });
        });

        function drawFeatureSet(className, featureSet) {
            set = features.selectAll('.' + className)
                .data(featureSet)
                .enter()
                .append('g')
                .attr('class', className)
                .attr('data-name', function (d) {
                    return d.properties.name;
                })
                .attr('data-id', function (d) {
                    return d.id;
                });

            set.append('path')
                .attr('class', 'land')
                .attr('d', path)
                .attr("fill", (d, i) => {
                    return color(i * 100);
                });

            set.append('path')
                .attr('class', 'overlay')
                .attr('d', path)
                .attr('style', function (d) {
                    if (data[d.id]) {
                        return 'fill-opacity: ' + (data[d.id] / 100);
                    }
                })
                .on("mouseover", function () {
                    dynamicColor = this.style.fill;
                    d3.select(this)
                        .style({
                            "fill": "black"
                        });
                })
                .on("mouseout", function () {
                    d3.select(this)
                        .style({
                            "fill": dynamicColor
                        });
                })
                .on('click', function (d) {
                    var val = (data[d.id]) ? data[d.id] : 0;
                    d3.select('.globe-wrapper .info').html(d.properties.name);
                    if (d.properties.name !== "Australia") {
                        svg.selectAll("circle")
                            .transition()
                            .duration(200)
                            .ease("linear")
                            .attr({
                                "r": (d) => {
                                    return 0;
                                }
                            });
                    }
                    rotateToFocusOn(d);
                    console.log(d);
                });
            return set;
        }

        function rotateToFocusOn(x) {
            var coords = d3.geo.centroid(x);
            coords[0] = -coords[0];
            coords[1] = -coords[1];

            d3.transition()
                .duration(1000)
                .tween('rotate', function () {
                    var r = d3.interpolate(projection.rotate(), coords);
                    return function (t) {
                        projection.rotate(r(t));
                        svg.selectAll('path').attr('d', path);
                    };
                })
                .each("end", () => {
                    if (x.properties.name === "Australia") {
                        renderWeatherCircles();
                    }
                })
                .transition();
        }

        function renderWeatherCircles() {
            svg.selectAll("circle")
                .transition()
                .duration(2000)
                .ease("elastic")
                .attr({
                    "r": (d) => {
                        return 5;
                    }
                });
        }
    }
}

export default D3GlobeChartController;

