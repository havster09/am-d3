"use strict";

import ChartsListController from './ChartsListController';

export default {
  name : 'chartsList',
  config : {
    templateUrl      : 'src/charts/components/list/ChartsList.html',
    controller       : ['$log', '$location', ChartsListController]
  }
};

