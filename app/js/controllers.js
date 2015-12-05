"use strict";

var helpersApp = angular.module('helpersApp', []);

helpersApp.controller('QueryCtrl', function ($scope, $http) {
  $scope.hint = "How can we help you today?";

  $scope.askQuestion = function ($event) {
    if ($event.keyCode == 13) {

      $http({
        method: 'POST',
        data: { question: $scope.Question },
        url: '/ask'
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
      });

      $scope.Question = "";
    }
  };
});
