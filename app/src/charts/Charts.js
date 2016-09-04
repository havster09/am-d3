"use strict";
// Load the custom app ES6 modules
import 'ngcomponentrouter';
import ChartsList from 'src/charts/components/list/ChartsList';
import ChartDetails from 'src/charts/components/details/ChartDetails';
import D3BarChart from 'src/charts/components/charts/D3BarChart';
import D3PieChart from 'src/charts/components/charts/D3PieChart';


// Define the Angular 'charts' module

export default angular
  .module("charts", ['ngMaterial', 'ngComponentRouter'])

  .component(ChartsList.name, ChartsList.config)
  .component(ChartDetails.name, ChartDetails.config)
  .component(D3BarChart.name, D3BarChart.config)
  .component(D3PieChart.name, D3PieChart.config);

