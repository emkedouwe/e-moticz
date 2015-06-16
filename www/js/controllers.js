angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Lights, $http,$ionicLoading) {

  /*
  $ionicLoading.show({
    template: 'Loading...'
  });*/

  Lights.favorites().then(function(items){
    $scope.devices = items;

    //$ionicLoading.hide();
  });

  $scope.doRefresh = function() {
    Lights.favorites().then(function(items){
      $scope.devices = items;

      $scope.$broadcast('scroll.refreshComplete');
    });
  }

})

.controller('LightsCtrl', function($scope, Lights, $http) {

  Lights.all().then(function(items){
    $scope.devices = items;
  });

  $scope.doRefresh = function() {
    Lights.all().then(function(items){
      $scope.devices = items;

      $scope.$broadcast('scroll.refreshComplete');
    });
  }

})

.controller('EnergyCtrl', function($scope, Lights, $http) {

  Lights.all().then(function(items){
    $scope.devices = items;
  });

  $scope.doRefresh = function() {
    Lights.all().then(function(items){
      $scope.devices = items;

      $scope.$broadcast('scroll.refreshComplete');
    });
  }

})

.controller('EnergyDetailCtrl', function($scope, Lights, $http, $stateParams) {

  Lights.week($stateParams.idx).then(function(items) {
    
    var labels = [];
    var data = [];
    var weekday = new Array(7);
    weekday[0]=  "Zondag";
    weekday[1] = "Maandag";
    weekday[2] = "Dinsdag";
    weekday[3] = "Woensdag";
    weekday[4] = "Donderdag";
    weekday[5] = "Vrijdag";
    weekday[6] = "Zaterdag";

    for(var key in items) {
      //labels.push(items[key].d);
      d = new Date(items[key].d);
      labels.push(weekday[d.getDay()]);

      if(items[key].v2) {
        value = parseFloat(items[key].v) + parseFloat(items[key].v2);
        data.push(value);
      } else {
        data.push(items[key].v);
      }

    }
    Chart.defaults.global.responsive = true;
    
    $scope.chart = {
      labels: labels,
      datasets: [
          {
              fillColor: "#57ab08",
              strokeColor: "",
              highlightFill: "#065900",
              highlightStroke: "rgba(220,220,220,1)",
              data: data
          }
      ],
  };

  }); 

})

.controller('SettingsCtrl', function($scope) {

  var settings = JSON.parse(window.localStorage['settings'] || '{}');

  $scope.settings = settings;

  $scope.saveData = function(form) {
    window.localStorage['settings'] = JSON.stringify(form);
  }
  
});