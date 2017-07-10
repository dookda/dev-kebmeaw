angular.module('app', ['ngRoute','app.controller','app.service'])

.config(function($routeProvider) {
  $routeProvider

  .when('/map', {
    templateUrl : 'map.html',
    controller  : 'mapCtrl'
  })

  .otherwise({redirectTo: '/map'});
})