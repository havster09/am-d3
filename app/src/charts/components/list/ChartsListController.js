"use strict";

class ChartsListController {
    /**
     * Constructor
     *
     * @param $log
     */
    constructor($log, $location) {
        this.$log = $log;
        this.$location = $location;

        console.log($location);

        this.selected = 'D3 Bar Chart';

        this.charts = [
            {name: 'D3 Bar Chart'},
            {name: 'D3 Pie Chart'},
            {name: 'D3 Globe Chart'},
            {name: 'D3 World Map Chart'},
            {name: 'D3 Australia Chart'},
            {name: 'D3 Australia Gnm Chart'},
            {name: 'D3 Us Chart'},
            {name: 'D3 Basic Chart'},
            {name: 'D3 Update Chart'},
            {name: 'D3 Line Chart'},
            {name: 'D3 Stacked Chart'},
            {name: 'D3 Multi Stacked Chart'},
            {name: 'D3 Concurrent Transition Chart'},
            {name: 'D3 Brushing Chart'},
        ];
    }

    handleSelect(name) {
        this.selected = name;
    }
}
export default ChartsListController;

