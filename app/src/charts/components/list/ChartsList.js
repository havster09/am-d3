"use strict";

import ChartsListController from './ChartsListController';

const ChartRoutes = [
  {path:"/", component: "chartHome", name: "Chart Home", useAsDefault: true},
  {path:"/d3-bar-chart", component: "d3BarChart", name: "D3 Bar Chart"},
  {path:"/**", redirectTo:["Chart Home"]}
];


export default {
  name : 'chartsList',
  config : {
    bindings         : {  users: '<', selected : '<', showDetails : '&onSelected' },
    templateUrl      : 'src/charts/components/list/ChartsList.html',
    controller       : ['$log', ChartsListController],
    $routeConfig     : ChartRoutes
  }
};

