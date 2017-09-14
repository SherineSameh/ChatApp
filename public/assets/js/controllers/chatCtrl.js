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
      data = data.contacts;
      $scope.currentChat = $scope.contacts[0];
      $scope.currentIndex = 0;
      $scope.msgLength = [];
      for (var i = 0; i < $scope.contacts.length; i++) {
        $scope.msgLength[i] = $scope.contacts[i].messages.length
      }
    });
    $interval(function() {
      currentTime = new Date();
      receivedMessage = {
        'content' : 'test notifications',
        'type': 0,
        'time': currentTime.getHours() + ':' + currentTime.getMinutes()
      };
      index = Math.floor(Math.random() * 14) + 1
      $scope.contacts[index].messages.push(receivedMessage);
      console.log($scope.contacts[index]);

      for (var i = 0; i < $scope.contacts.length; i++) {
        if ($scope.contacts[i].messages.length != $scope.msgLength[i]
        && $scope.contacts[i].messages[$scope.contacts[i].messages.length -1].type != 1) {
          temp = $scope.contacts[i];
          if(i != 0) {
            $scope.contacts.splice(i, 1);
            $scope.contacts.unshift(temp);
            $scope.notification = true;
          }
          $scope.msgLength[i] = $scope.contacts[i].messages.length;
        }
      }
    }, 30000);
    $scope.openChat = function(element, id) {
     var index = -1;
     for( var i = 0; i < $scope.contacts.length; i++ ) {
   			if( $scope.contacts[i].id === id ) {
   				index = i;
   				break;
   			}
   	 }
     $scope.currentChat = $scope.contacts[index];
     $scope.currentIndex = element;
    }
    $scope.send = function(message) {
      currentTime = new Date();
      sentMessage = {
        'content' : message,
        'type': 1,
        'time': currentTime.getHours() + ':' + currentTime.getMinutes()
      };
      $scope.currentChat.messages.push(sentMessage);
      // if($scope.currentIndex !== 0) {
      //   index = $scope.currentChat.id - 1 ;
      //   temp = $scope.contacts[index];
      //   $scope.contacts.splice($scope.currentIndex, 1);
      //   $scope.contacts.unshift(temp);
      //   $scope.currentIndex = 0;
      // }
    };
    $scope.openChatbot = function() {
      
    }
});
