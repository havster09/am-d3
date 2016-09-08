"use strict";

// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'ngcomponentrouter';
import 'angular-ui-router';


// import AppController from 'src/AppController';

import Users from 'src/users/Users';
import Charts from 'src/charts/Charts';

export default angular.module('starter-app', ['ngMaterial', 'ngComponentRouter', 'ui.router', Users.name, Charts.name])
    .config(($mdIconProvider, $mdThemingProvider) => {
        // Register the user `avatar` icons
        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu", "./assets/svg/menu.svg", 24)
            .icon("share", "./assets/svg/share.svg", 24)
            .icon("google_plus", "./assets/svg/google_plus.svg", 24)
            .icon("hangouts", "./assets/svg/hangouts.svg", 24)
            .icon("twitter", "./assets/svg/twitter.svg", 24)
            .icon("phone", "./assets/svg/phone.svg", 24);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');
    })
    .value("$routerRootComponent", "dataViz")
    .component("dataViz", {
        templateUrl: "./src/app.html",
        $routeConfig: [
            {path:"/d3-bar-chart", component: "d3BarChart", name: "D3 Bar Chart", useAsDefault: true},
            {path:"/d3-pie-chart", component: "d3PieChart", name: 'D3 Pie Chart'},
            {path:"/d3-globe-chart", component: "d3GlobeChart", name: 'D3 Globe Chart'},
            {path:"/d3-australia-chart", component: "d3AustraliaChart", name: 'D3 Australia Chart'},
            {path:"/d3-us-chart", component: "d3UsChart", name: 'D3 Us Chart'},
            {path:"/d3-basic-chart", component: "d3BasicChart", name: 'D3 Basic Chart'},
            {path:"/d3-update-chart", component: "d3UpdateChart", name: 'D3 Update Chart'},
            {path:"/d3-line-chart", component: "d3LineChart", name: 'D3 Line Chart'},
            {path:"/d3-stacked-chart", component: "d3StackedChart", name: 'D3 Stacked Chart'},
            { path: "/**", redirectTo: ["D3 Bar Chart", ""] }
        ]
    });

    /*.controller('AppController', AppController);*/
