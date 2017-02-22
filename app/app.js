'use strict';

// Declare app level module which depends on views, and components
angular.module('ngAppThis', [
  'ngRoute',
  'ngAppThis.home'
]).
config(['$locationProvider', '$routeProvider', ($locationProvider, $routeProvider) => {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
