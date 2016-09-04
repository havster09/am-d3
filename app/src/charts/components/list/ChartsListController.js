"use strict";

class ChartsListController {
    /**
     * Constructor
     *
     * @param $log
     */
    constructor($log) {
        this.$log = $log;
        console.log("fire charts");

        this.charts = [
            {name: 'D3 Bar Chart'},
            {name: 'D3 Pie Chart'},
            {name: 'D3 Globe Chart'},
            {name: 'D3 Australia Chart'},
        ];
    }
}
export default ChartsListController;

