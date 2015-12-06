"use strict";

var helpersApp = angular.module('helpersApp', ['ngAnimate']);

helpersApp.controller('Init', function($scope) {
  $scope.showButtonRight = true;
  $scope.showButtonLeft = true;
  $scope.showHelpForm = false;
  $scope.showQuestions = false;
  $scope.showTitleBox = true;
  $scope.showLobby = true;
  $scope.showChat = false;

  $scope.enterQuestion = function() {
    $scope.showButtonRight = false;
    $scope.showHelpForm = true;
    $scope.showTitleBox = false;
  };

  $scope.showQuestionList = function() {
    $scope.showButtonLeft = false;
    $scope.showQuestions = true;
    $scope.showTitleBox = false;
  };
});


helpersApp.controller('AskCtrl', function ($scope, $http) {
  var socket = io.connect();

  $scope.hint = "How can we help you today?";

  $scope.askQuestion = function ($event) {
    if ($event.keyCode == 13) {

      $http({
        method: 'POST',
        data: { question: $scope.Question },
        url: '/ask'
      }).then(function successCallback(response) {
        socket.on('answer', function (id) {
          if (response.data == id) {
            alert("It's a match!");
          }
        });

      }, function errorCallback(response) {
        console.log(response);
      });

      $scope.Question = "";
    }
  };

});

helpersApp.controller('QuestionsCtrl', function($scope, $http) {
  $scope.questions = [];
  $scope.answerQuestion = function (id) {
    $http({
      method: 'POST',
      data: { id: id },
      url: '/answer'
    }).then(function successCallback(response) {
      $scope.$parent.showLobby = false;
      $scope.$parent.showChat = true;
    }, function errorCallback(response) {
    });
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
