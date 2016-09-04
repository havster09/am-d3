class ChartDetailsController  {

  /**
   * Constructor
   *
   * @param $mdBottomSheet
   * @param $log
   */
  constructor($mdBottomSheet, $log) {
    this.$mdBottomSheet = $mdBottomSheet;
    this.$log = $log;
  }

  /**
   * Show the bottom sheet
   */
  share() {
    var chart = this.selected;
    var $mdBottomSheet = this.$mdBottomSheet;

    $mdBottomSheet.show({
      parent: angular.element(document. getElementById('content')),
      templateUrl: 'src/charts/components/details/ContactSheet.html',
      controller: [ '$mdBottomSheet', ChartSheetController],
      controllerAs: "$ctrl",
      bindToController : true
    }).then((clickedItem) => {
      this.$log.debug( clickedItem.name + ' clicked!');
    });

    /**
     * Bottom Sheet controller for the Avatar Actions
     */
    function ChartSheetController( $mdBottomSheet ) {
      this.chart = chart;
      this.items = [
        { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
        { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
        { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
        { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
      ];
      this.performAction = (action) => {
        $mdBottomSheet.hide(action);
      };
    }
  }

}
export default ChartDetailsController;

