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

  $scope.hint = "How can we help you today?";

  $scope.askQuestion = function ($event) {
    if ($event.keyCode == 13) {

      $http({
        method: 'POST',
        data: { question: $scope.Question },
        url: '/ask'
      }).then(function successCallback(response) {
        $scope.$parent.showLobby = false;
        $scope.$parent.showChat = true;

        const myId = response.data;

        window.postMessage({
          type: "theHelpers.question",
          question: $scope.Question,
          id: myId
        }, "*");

        socket.on('answer', function (id) {
          if (myId == id) {
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
      
      var peer = new Peer('xx_' + id, {
        host: 'localhost',
        port: 8000,
        path: '/p2p'
      });
      
      navigator.webkitGetUserMedia({ video: true, audio: true }, function (stream) {
        peer.call(id, stream);
        peer.on('stream', function (remoteStream) {
          var url = URL.createObjectURL(remoteStream);
          console.log(url);
          $scope.$parent.showLobby = false;
          $scope.$parent.showChat = true;
          $scope.$parent.videoUrl = url;
        });
      }, function (err) {
        console.log("Failed to get stream");
      });
      
    }, function errorCallback(response) {
      console.log(response);
    });
  };

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

helpersApp.controller('ChatCtrl', function($scope) {
  var socket = io.connect();
  $scope.messages = [];

  $scope.sendMessage = function ($event) {
    if ($event.keyCode == 13) {
      socket.emit('message', $scope.Message);
      $scope.messages.push($scope.Message);
      $scope.Message = "";
    }

  };
});
