// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','angles'])

.run(function($ionicPlatform, $rootScope,Lights) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // Change light function
  $rootScope.changeLight = function(idx, status) {
    if(status == false) {
      Lights.switch(idx, "Off");
    } else {
      Lights.switch(idx, "On");
    }
  };

  // Change group function
  $rootScope.changeGroup = function(idx, status) {
    if(status == false) {
      Lights.switchGroup(idx, "Off");
    } else {
      Lights.switchGroup(idx, "On");
    }
  }

})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.useXDomain = true;

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.lights', {
    url: '/lights',
    views: {
      'tab-lights': {
        templateUrl: 'templates/tab-lights.html',
        controller: 'LightsCtrl'
      }
    }
  })

  .state('tab.energy', {
    url: '/energy',
    views: {
      'tab-energy': {
        templateUrl: 'templates/tab-energy.html',
        controller: 'EnergyCtrl'
      }
    }
  })

  .state('tab.energy-detail', {
    url: '/energy/:idx',
    views: {
      'tab-energy': {
        templateUrl: 'templates/tab-energy-details.html',
        controller: 'EnergyDetailCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
