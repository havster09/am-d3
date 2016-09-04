"use strict";

// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'ngcomponentrouter';
import 'angular-ui-router';


import AppController from 'src/AppController';
import Users from 'src/users/Users';
import Charts from 'src/charts/Charts';

export default angular.module( 'starter-app', [ 'ngMaterial','ngComponentRouter', 'ui.router', Users.name, Charts.name ] )
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
  .controller('AppController', AppController);
