angular.module('starter.services', [])

.factory('Lights', function($http,$rootScope) {

  var settings = JSON.parse(window.localStorage['settings'] || '{ "address": "192.168.178.2", "port": "8080" }');
  var url = "http://" + settings.address + ":" + settings.port;

  if(settings.enableAuth == true) {
    var encodedData = window.btoa(settings.address + ":" + settings.password);

    //$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"};
    $http.defaults.withCredentials = true;
    $http.defaults.headers.common.Authorization = "Basic " + encodedData;    
  }

  return {
    getURL: function() {
      var settings = JSON.parse(window.localStorage['settings'] || '{ "address": "192.168.178.2", "port": "8080" }');
      var url = "http://" + settings.address + ":" + settings.port;

      return url;
    },
    all: function() {
      url = this.getURL();

      return $http.jsonp(url + "/json.htm?type=devices&filter=all&used=true&order=Name&jsoncallback=JSON_CALLBACK").then(function(response){
        lights = response.data.result;
        for(var i = 0; i < lights.length; i++) {
          if(lights[i].Type == "Temp + Humidity") {
            //delete lights[i];
            lights.splice( i, 1 );
          }
          else {
            var status = lights[i].Status;
            if(status == "Off") {
              lights[i].checked = false;
            } else {
              lights[i].checked = true;
            }
          }

        }
        return lights;
      });
  
    },
    get: function(friendId) {
      // Simple index lookup
      //return friends[friendId];
    },
    switch: function(idx, value) {
      url = this.getURL();
      $http.get(url + "/json.htm?type=command&param=switchlight&idx="+idx+"&switchcmd="+value+"&level=0");
    },
    switchGroup: function(idx, value) {
      url = this.getURL();
      $http.get(url + "/json.htm?type=command&param=switchscene&idx="+idx+"&switchcmd="+value+"&level=0");
    },
    favorites: function() {
      url = this.getURL();
      
      return $http.jsonp(url + "/json.htm?type=devices&filter=all&used=true&order=Name&jsoncallback=JSON_CALLBACK").then(function(response){
        devices = response.data.result;
        for(var i = 0; i < devices.length; i++) {

          var status = devices[i].Status;
          if(status == "Off") {
            devices[i].checked = false;
          } else {
            devices[i].checked = true;
          }

        }

        return devices;
      });
      

    },
    groups: function() {
      url = this.getURL();
      return $http.get(url + "/json.htm?type=scenes").then(function(response){
        groups = response.data.result;
        for(var i = 0; i < groups.length; i++) {
          var status = groups[i].Status;
          if(status == "Off") {
            groups[i].checked = false;
          } else {
            groups[i].checked = true;
          }
        }
        return groups;
      });

    },
    week: function(idx) {
      url = this.getURL();

      return $http.jsonp(url + "/json.htm?type=graph&sensor=counter&idx=" + idx + "&range=week&jsoncallback=JSON_CALLBACK").then(function(response){
        return response.data.result;
      });
    }
  }
});