function sendRequest($http) {
  return $http.get('app/mockupData.json')
    .success(function(data) {
      return data;
    })
    .error(function(error) {
      return error;
    });
}
app.controller('chatCtrl', function($scope, $interval, $http) {
  sendRequest($http).success(function(data) {
    $scope.contacts = data.contacts;
    $scope.currentChat = $scope.contacts[0];
    $scope.currentIndex = 0;
  });
  $interval(function() {
    currentTime = new Date();
    receivedMessage = {
      'content': 'test notifications',
      'type': 0,
      'time': currentTime.getHours() + ':' + currentTime.getMinutes()
    };
    index = Math.floor(Math.random() * 14) + 1
    $scope.contacts[index].messages.push(receivedMessage);
    $scope.contacts[index].notifications++;
    if($scope.contacts[index] !== $scope.currentIndex) {
      temp = $scope.contacts[index];
      $scope.contacts.splice(index,1);
      $scope.contacts.unshift(temp);
      toastContent = $('<div class="row no-padding no-margin">\
                          <div class="col s12">\
                            <span class="time lighten-5">'+ temp.messages[temp.messages.length -1].time + '</span>\
                          </div>\
                          <div class="col s3">\
                            <img src="'+ temp.img + '" alt="" class="circle" style="width:7vh;">\
                          </div>\
                          <div class="col s9">\
                            <span class="title">'+ temp.name + '</span><br />\
                            <span class="last-msg truncate">'+ temp.messages[temp.messages.length -1].content + '</span><br />\
                          </div>\
                        </div>');
      Materialize.toast(toastContent, 10000);
    }
  }, 30000);
  $scope.openChat = function(element, id) {
    var index = -1;
    for (var i = 0; i < $scope.contacts.length; i++) {
      if ($scope.contacts[i].id === id) {
        index = i;
        break;
      }
    }
    $scope.contacts[index].notifications = 0;
    $scope.currentChat = $scope.contacts[index];
    $scope.currentChat.notifications = 0;
    $scope.currentIndex = element;
  }
  $scope.send = function(message) {
    currentTime = new Date();
    sentMessage = {
      'content': message,
      'type': 1,
      'time': currentTime.getHours() + ':' + currentTime.getMinutes()
    };
    $scope.currentChat.messages.push(sentMessage);
    if($scope.currentIndex !== 0) {
      temp = $scope.currentChat;
      $scope.contacts.splice($scope.currentIndex, 1);
      $scope.contacts.unshift(temp);
      $scope.currentIndex = 0;
    }
  }
  $scope.openChatbot = function() {};
});
