"use strict";

var helpersApp = angular.module('helpersApp', []);

helpersApp.controller('AskCtrl', function ($scope, $http) {
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

helpersApp.controller('QuestionsCtrl', function($scope) {
  var socket = io.connect();
  $scope.questions = [];

  socket.on('connect', function () {
    console.log('Connected to backend');
  });

  socket.on('question', function (question) {
    $scope.questions.push(question);
    $scope.$apply();
  });
});
