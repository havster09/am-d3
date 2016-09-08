"use strict";
// Load the custom app ES6 modules
import 'ngcomponentrouter';
import ChartsList from 'src/charts/components/list/ChartsList';
import ChartDetails from 'src/charts/components/details/ChartDetails';
import D3BarChart from 'src/charts/components/charts/D3BarChart';
import D3PieChart from 'src/charts/components/charts/D3PieChart';
import D3GlobeChart from 'src/charts/components/charts/D3GlobeChart';
import D3AustraliaChart from 'src/charts/components/charts/D3AustraliaChart';
import D3UsChart from 'src/charts/components/charts/D3UsChart';
import D3BasicChart from 'src/charts/components/charts/D3BasicChart';
import D3UpdateChart from 'src/charts/components/charts/D3UpdateChart';
import D3LineChart from 'src/charts/components/charts/D3LineChart';


// Define the Angular 'charts' module

export default angular
  .module("charts", ['ngMaterial', 'ngComponentRouter'])

  .component(ChartsList.name, ChartsList.config)
  .component(ChartDetails.name, ChartDetails.config)
  .component(D3BarChart.name, D3BarChart.config)
  .component(D3PieChart.name, D3PieChart.config)
  .component(D3GlobeChart.name, D3GlobeChart.config)
  .component(D3AustraliaChart.name, D3AustraliaChart.config)
  .component(D3UsChart.name, D3UsChart.config)
  .component(D3BasicChart.name, D3BasicChart.config)
  .component(D3UpdateChart.name, D3UpdateChart.config)
  .component(D3LineChart.name, D3LineChart.config);

