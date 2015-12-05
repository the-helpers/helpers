"use strict";

var helpersApp = angular.module('helpersApp', ['ngAnimate']);

helpersApp.controller('Init', function($scope) {
  $scope.showButtonRight = true;
  $scope.showButtonLeft = true;
  $scope.showHelpForm = false;
  $scope.showQuestions = false;

  $scope.enterQuestion = function() {
    $scope.showButtonRight = false;
    $scope.showHelpForm = true;
  };

  $scope.showQuestionList = function() {
    $scope.showButtonLeft = false;
    $scope.showQuestions = true;
  };
});


helpersApp.controller('AskCtrl', function ($scope, $http) {
  $scope.hint = "How can we help you today?";

  $scope.askQuestion = function ($event) {
    if ($event.keyCode == 13) {

      $http({
        method: 'POST',
        data: { question: $scope.Question },
        url: '/ask'
      }).then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });

      $scope.Question = "";
    }
  };

  /*
  var socket = io.connect();
  socket.on('answer', function () {
    alert("It's a match!");
  });
  */
});

helpersApp.controller('QuestionsCtrl', function($scope) {
  $scope.questions = [];
  $scope.answerQuestion = function (id) {
  }

  var socket = io.connect();
  socket.on('connect', function () {
    console.log('Connected to backend');
  });

  socket.on('question', function (question) {
    $scope.questions.push(question);
    $scope.$apply();
  });
});
