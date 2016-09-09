/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */

"use strict";

function AppController(UsersDataService, $mdSidenav) {
    var self = this;

    self.selected = null;
    self.users = [];
    self.selectUser = selectUser;
    self.toggleList = toggleUsersList;

    self.charts = [
        {
            "name": "D3 Bar Chart",
            "content": " arf"
        }
    ];

    self.selected = self.charts[0];

    self.selectChart = selectChart;

    // Load all registered users

    UsersDataService
        .loadAllUsers()
        .then(function (users) {
            self.users = [].concat(users);
        });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
        $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser(user) {
        self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    }

    function selectChart(chart) {
        self.selected = angular.isNumber(chart) ? $scope.charts[chart] : chart;
    }
}

export default ['UsersDataService', '$mdSidenav', AppController];
