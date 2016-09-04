"use strict";

import ChartDetailsController from './ChartDetailsController';

export default {
  name : 'chartDetails',
  config : {
    bindings         : {  selected: '<' },
    templateUrl      : 'src/charts/components/details/ChartDetails.html',
    controller       : [ '$mdBottomSheet', '$log', ChartDetailsController ]
  }
};