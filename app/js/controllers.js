"use strict";

var helpersApp = angular.module('helpersApp', ['ngAnimate', 'util']);

helpersApp.controller('Init', function($scope) {
  $scope.showButtonRight = true;
  $scope.showButtonLeft = true;

  $scope.showQuestions = false;
  $scope.buttonXorInput = true;
  $scope.showTitleBox = true;
  $scope.showLobby = true;
  $scope.showChat = false;

  $scope.enterQuestion = function() {
    $scope.focusOnClick = true;
    $scope.expandClassQuestion = 'wide';
    $scope.hideClass = 'hideMe';

    $scope.showButtonRight = false;
    $scope.showHelpForm = true;
    $scope.showTitleBox = false;
  };

  $scope.showQuestionList = function() {
    $scope.expandClassFilter = 'wide';

    $scope.showQuestions = true;
    $scope.buttonXorInput = false;
    $scope.showButtonLeft = false;
    $scope.showTitleBox = false;
  };
});

helpersApp.directive('xngFocus', function() {
  return function(scope, element, attrs) {
     scope.$watch(attrs.xngFocus, 
       function (newValue) {
          newValue && element[0].focus();
       },true);
    };    
});


helpersApp.controller('AskCtrl', function ($scope, $http) {
  var socket = io.connect();

  $scope.hint = "with";

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
    question.askedAgo = util.askedAgo(question.ttl) + ' ago';
    $scope.questions.push(question);
    $scope.$apply();
  });
});
