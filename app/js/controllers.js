"use strict";

var helpersApp = angular.module('helpersApp', []);

helpersApp.controller('QueryCtrl', function ($scope) {
  $scope.hint = "How can we help you today?";
});
